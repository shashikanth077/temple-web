import React, {
    useEffect, useState, ChangeEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';

import { CircleLoader } from 'react-spinners';
import { mydonationsActions } from '../mydonations/donationSlice';
import { selectCurrentGroceryCartItems } from './grocerySelector';
import { ClearCart } from './grocerySlice';
import { useRedux, useUser } from 'hooks';
import { CAProvinces } from 'constants/CAProvinces';
import { myprofileActions } from 'admin/features/myprofile/myProfileSlice';
import { selectMyProfileDetails } from 'admin/features/myprofile/myProfileSelectors';
import { formatCurrency } from 'helpers/currency';
import { FormInput } from 'sharedComponents/inputs';
import { createPaymentIntent } from 'member/features/donations/mydonations/donationApis';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { selectDonationType } from 'admin/features/donations/donationSelector';

interface GroceryItem {
    _id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: string;
  }

/* eslint-disable */
const GroceryCheckout = () => {
    const { dispatch, appSelector } = useRedux();

    const cartItems: GroceryItem[] = appSelector(selectCurrentGroceryCartItems);
    const UpdateCartItems = cartItems.map(({ _id, image, ...rest }) => rest);

    const getTotalQuantity = () => {
        let total = 0;
        cartItems.forEach((item: any) => {
            total += item.quantity * item.price;
        });
        return total;
    };

    const intl = useIntl();
    const navigate = useNavigate();
    const [currentClientSecret, setCurrentClientSecret] = useState<any>('');

    const stripe: any = useStripe();
    const elements: any = useElements();

    const [billingAddressFormData, setBillingAddressFormData] = useState({
        billingAddress: "",
        billingCity: "",
        billingZipcode: "",
        state: "",
    });

    const [processing, setProcessing] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [cardErrors, setCardErrors] = useState<any>("");
    const [loggedInUser] = useUser();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationByType({ type: 'Grocery Danam' }));
        dispatch(
            myprofileActions.getMyProfileDetails({ userid: loggedInUser?.id }),
        );
    }, [dispatch]);

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            billingZipcode: yup.string().required("Please enter the zipcode"),
            billingCity: yup.string().required("Please enter the city"),
            billingAddress: yup.string().required("Please enter the address"),
            state: yup.string().required("Please select the province"),
            cardholdername: yup.string().required('Please enter the card holder name as per card'),
            comments: yup
                .string()
                .required("Please add some notes for  your grocery donation.")
                .min(
                    10,
                    "This value is too short. It should have 10 characters or more.",
                ),
        }),
    );

    const methods: any = useForm<any>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    const ProfileDetails: any = appSelector(selectMyProfileDetails);
    const BookDetails: any = appSelector(selectDonationType);

    console.log(BookDetails);

    React.useEffect(() => {
        if (isChecked) {
            setSelectedState(ProfileDetails?.homeAddress.province);
            setBillingAddressFormData({
                billingAddress: ProfileDetails?.homeAddress.address1,
                billingCity: ProfileDetails?.homeAddress.city,
                billingZipcode: ProfileDetails?.homeAddress.postalCode,
                state: ProfileDetails?.homeAddress.province,
            });
        } else if (ProfileDetails?.billingAddress) {
            setSelectedState(ProfileDetails?.billingAddress.province);
            setBillingAddressFormData({
                billingAddress: ProfileDetails?.billingAddress.address1,
                billingCity: ProfileDetails?.billingAddress.city,
                billingZipcode: ProfileDetails?.billingAddress.postalCode,
                state: ProfileDetails?.billingAddress.province,
            });
        } else {
            setBillingAddressFormData({
                billingAddress: "",
                billingCity: "",
                billingZipcode: "",
                state: "",
            });
        }
    }, [isChecked, ProfileDetails]);

    const handleBillingToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        setValue("email", ProfileDetails?.email);
        setValue("billingAddress", billingAddressFormData?.billingAddress);
        setValue("billingCity", billingAddressFormData?.billingCity);
        setValue("billingZipcode", billingAddressFormData?.billingZipcode);
        setValue("state", billingAddressFormData?.state);
    }, [setValue, billingAddressFormData]);

    /*
        handle form submission
    */
    const onSubmit = handleSubmit(async (data: any) => {

        setProcessing(true);

        if (!stripe || !elements) {
            setProcessing(false);
            setCardErrors('Something went wrong!');
            return;
        }

        if (stripe) {

            const paymentIntentDetails = {
                currency: 'cad',
                devoteePhonenumber: loggedInUser?.phonenumber,
                receipt_email: loggedInUser?.email,
                payment_method_types: ['card'],
                amount: getTotalQuantity(),
                bookingDetails: UpdateCartItems,
                description: 'grocery donam donation',
                shipping: {
                    name: `${loggedInUser?.userName}`,
                    address: {
                        line1: billingAddressFormData?.billingAddress,
                        city: billingAddressFormData?.billingCity,
                        state: billingAddressFormData?.state,
                        postal_code: billingAddressFormData?.billingZipcode,
                        country: 'CA', // You may need to adjust the country code
                    },
                },
            };

            // Create the payment intent and get the client secret
            const response = await createPaymentIntent(paymentIntentDetails);

            if (!response.clientSecret) {
                setCardErrors("Something went wrong!");
                setProcessing(false);
                return;
            }
            setCurrentClientSecret(response.clientSecret);

            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                setCardErrors("Please enter card details as mentioned above");
                setProcessing(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: data?.cardholdername,
                },
            });

            if (error) {
                setProcessing(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: `Your payment was un-successful. Error: ${error.message}`,
                }).then(() => {
                });
            }
            if (!error) {
                setCardErrors('');
                console.log('payment start');
                const payload = await stripe.confirmCardPayment(response.clientSecret, {
                    payment_method: paymentMethod?.id,
                });

                if (payload.error) {
                    setProcessing(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: `Your payment was un-successful. Error: ${payload.error.message}`,
                    }).then(() => {
                    });
                } else {

                    let PaymentHistory: any = {}
                    PaymentHistory.userId = loggedInUser?.id;
                    PaymentHistory.devoteeId = loggedInUser.devoteeId;
                    PaymentHistory.donateTypeId = BookDetails._id;
                    PaymentHistory.donationType = 'Grocery Danam';
                    PaymentHistory.donorName = ProfileDetails.firstName + ' ' + ProfileDetails.lastName;
                    PaymentHistory.donorEmail = ProfileDetails.email;
                    PaymentHistory.frequency = BookDetails.frequency;
                    PaymentHistory.donorPhoneNumber = ProfileDetails.mobileNumber;
                    PaymentHistory.donorNotes = data.comments;
                    PaymentHistory.stripeReferenceId = payload.paymentIntent.id;
                    PaymentHistory.donatedAmount = getTotalQuantity();
                    PaymentHistory.prasadamOverEmail = BookDetails.prasadamOverEmail;
                    PaymentHistory.transStatus = payload.paymentIntent.status;
                    PaymentHistory.paymentMethod = payload.paymentIntent.payment_method;
                    PaymentHistory.paymentMode = payload.paymentIntent.payment_method_types;
                    PaymentHistory.donatedItems = UpdateCartItems;
                    PaymentHistory.billingAddress = billingAddressFormData;
                    dispatch(mydonationsActions.PayDonation(PaymentHistory));
                    setProcessing(false);
                    dispatch(ClearCart());   //delete cart after purchase

                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: `Your payment was successful. Reference No:${payload.paymentIntent.id}`,
                    }).then(() => {
                        document.body.style.overflow = 'auto';
                        document.body.removeChild(overlay);
                        navigate('/mydonations/list');
                    });

                    document.body.style.overflow = 'hidden';
                    const overlay = document.createElement('div');
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.background = 'rgba(255, 255, 255, 0.5)';
                    overlay.style.backdropFilter = 'blur(8px)';
                    overlay.style.zIndex = '1000';
                    document.body.appendChild(overlay);
                }
            } else {
                setProcessing(false);
                setCardErrors(error?.message);
            }
        } else {
            setProcessing(false);
            setCardErrors('Stripe is null');
        }

    });

    return (
        <>
            {
                processing &&
                <div className="overlay">
                    <CircleLoader />
                </div>
            }
            <div className="checkout-area pt-95 pb-100">
                <div className="container">
                    {cartItems && cartItems?.length >= 1 ? (
                        <div className="row">
                            <form
                                name="shop-payment-form"
                                id="shop-payment-form"
                                onSubmit={onSubmit}
                            >
                                <div className="col-lg-12 mb-4">
                                    <div className="billing-info-wrap">
                                        <h3>Billing Details</h3>

                                        <div className="form-group row">
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        checked={isChecked}
                                                        onChange={
                                                            handleBillingToggle
                                                        }
                                                        type="checkbox"
                                                        id="saveAddress"
                                                    />
                                                    <label
                                                        className="form-check-label d-flex align-items-center"
                                                        htmlFor="saveAddress"
                                                    >
                                                        Save as default address
                                                        <a
                                                            aria-label="profile-edit"
                                                            className="btn btn-primary checkout-edit-btn"
                                                            href="/myprofile/edit-profile"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-edit ml-2" />
                                                        </a>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        type="text"
                                                        register={register}
                                                        key="billingAddress"
                                                        errors={errors}
                                                        label="House number,address"
                                                        control={control}
                                                        name="billingAddress"
                                                        defaultValue={
                                                            billingAddressFormData.billingAddress
                                                        }
                                                        onChange={(e) =>
                                                            setBillingAddressFormData({
                                                                ...billingAddressFormData,
                                                                billingAddress: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        type="text"
                                                        register={register}
                                                        key="billingCity"
                                                        errors={errors}
                                                        label="City"
                                                        control={control}
                                                        name="billingCity"
                                                        defaultValue={
                                                            billingAddressFormData.billingCity
                                                        }
                                                        onChange={(e) =>
                                                            setBillingAddressFormData({
                                                                ...billingAddressFormData,
                                                                billingCity: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        type="select"
                                                        label="State"
                                                        value={selectedState}
                                                        onChange={(e) =>
                                                            setBillingAddressFormData({
                                                                ...billingAddressFormData,
                                                                state: e.target.value,
                                                            })
                                                        }
                                                        name="state"
                                                        id="state"
                                                        className="billing-selectinput"
                                                    >
                                                        <option value="">
                                                            Select
                                                        </option>
                                                        {CAProvinces?.map(
                                                            (
                                                                option: any,
                                                                index: any,
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        option.name
                                                                    }
                                                                >
                                                                    {option.name}{" "}
                                                                </option>
                                                            ),
                                                        )}
                                                    </FormInput>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        type="text"
                                                        register={register}
                                                        key="billingZipcode"
                                                        errors={errors}
                                                        label="Postal code/Zip"
                                                        control={control}
                                                        name="billingZipcode"
                                                        defaultValue={
                                                            billingAddressFormData.billingZipcode
                                                        }
                                                        onChange={(e) =>
                                                            setBillingAddressFormData({
                                                                ...billingAddressFormData,
                                                                billingZipcode: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        type="email"
                                                        register={register}
                                                        key="email"
                                                        errors={errors}
                                                        label="Email"
                                                        control={control}
                                                        name="email"
                                                        defaultValue={
                                                            ProfileDetails.email
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="additional-info-wrap">
                                            <h4>Additional information</h4>
                                            <div className="additional-info">
                                                <FormInput
                                                    register={register}
                                                    key="comments"
                                                    errors={errors}
                                                    label="Notes"
                                                    control={control}
                                                    name="comments"
                                                    type="textarea"
                                                    placeholder="Notes about your grocery donation, e.g. special notes for donations. "
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 order-lg-2">
                                        <div className="your-order-area">
                                            <h3>Your donation details</h3>
                                            <div className="your-order-wrap gray-bg-4">
                                                <div className="your-order-product-info">
                                                    <div className="your-order-top">
                                                        <ul>
                                                            <li>Product</li>
                                                            <li>Total</li>
                                                        </ul>
                                                    </div>
                                                    <div className="your-order-middle">
                                                        <ul>
                                                            {cartItems?.map(
                                                                (
                                                                    cartItem: any,
                                                                    key: any,
                                                                ) => (
                                                                    <li>
                                                                        <span className="order-middle-left">
                                                                            {
                                                                                cartItem.name
                                                                            }{" "}
                                                                            X{" "}
                                                                            {
                                                                                cartItem.quantity
                                                                            }
                                                                        </span>{" "}
                                                                        <span className="order-price">
                                                                            {formatCurrency(
                                                                                intl,
                                                                                cartItem.price *
                                                                                cartItem.quantity,
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="your-order-total">
                                                        <ul>
                                                            <li className="order-total">
                                                                Total
                                                            </li>
                                                            <li>
                                                                {formatCurrency(
                                                                    intl,
                                                                    getTotalQuantity()
                                                                )}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div id="pay-invoice" className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h2 className="text-center">Enter card details</h2>
                                                </div>
                                                <div className="form-group has-success">
                                                    <FormInput
                                                        register={register}
                                                        key="cardholdername"
                                                        errors={errors}
                                                        label="Name on the card"
                                                        control={control}
                                                        name="cardholdername"
                                                        type="text"
                                                        className='mb-3'
                                                        placeholder="Card holder name"
                                                        defaultValue=""
                                                    />
                                                    <CardElement className="card-element card-box form-control mb-4" options={{ style: { base: { fontSize: '16px' } } }} />
                                                    {cardErrors && <p className="error-message">{cardErrors}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-lg-3 order-btn"
                                    style={{ textAlign: "right" }}
                                >
                                    {/* Place Order Button */}
                                    <div className="place-order mt-25">
                                        <button
                                            type="submit"
                                            disabled={processing || !stripe || !elements}
                                            className="btn btn-hover"
                                        >
                                            {processing ? 'PROCESSING' : 'Donate'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-cash" />
                                    </div>
                                    <div className="item-empty-area__text">
                                        No items found in cart to checkout <br />{" "}
                                        <Link
                                            to={`${process.env.PUBLIC_URL}/shop-grid-standard`}
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GroceryCheckout;
