import React, {
    useEffect, useState, ChangeEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
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
import { serviceActions } from './serviceSlice';
import { selecLocalBookingData } from './serviceSelector';
import { useRedux, useUser } from 'hooks';
import { CAProvinces } from 'constants/CAProvinces';
import { myprofileActions } from 'admin/features/myprofile/myProfileSlice';
import { selectMyProfileDetails } from 'admin/features/myprofile/myProfileSelectors';
import { formatCurrency } from 'helpers/currency';
import { FormInput } from 'sharedComponents/inputs';
import { createPaymentIntent } from 'member/features/donations/mydonations/donationApis';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import ButtonV1 from 'sharedComponents/button/buttonv1';

/* eslint-disable */
const ServiceConfimPage = () => {
    const { dispatch, appSelector } = useRedux();
    const [loggedInUser] = useUser();
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


    useEffect(() => {
        dispatch(
            myprofileActions.getMyProfileDetails({ userid: loggedInUser?.id }),
        );
    }, [dispatch]);


    const BookDetails = appSelector(selecLocalBookingData);
    console.log(BookDetails,"BookDetails");

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
                .required("Please add some notes for  your order")
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
                devoteePhonenumber:loggedInUser?.phonenumber,
                receipt_email: loggedInUser?.email,
                payment_method_types:['card'],
                amount:BookDetails?.amount,
                bookingDetails:BookDetails?.name,
                description: 'Booking for temple service '+BookDetails?.name,
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

            if(!response.clientSecret) {
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
                        dispatch(clearState());
                    });
                } else {

                    let requestPayload: any = {};
                    requestPayload.userId = loggedInUser?.id;
                    requestPayload.godName = BookDetails?.godName;
                    requestPayload.serviceType = BookDetails?.type;
                    requestPayload.devoteeId = loggedInUser?.devoteeId;
                    requestPayload.orderType = 'services';
                    requestPayload.amount =  BookDetails?.amount;
                    requestPayload.bookingDate =  BookDetails?.bookingDate;
                    requestPayload.ServiceName = BookDetails?.name;
                    requestPayload.NoOfPerson = BookDetails?.NoOfPerson;
                    requestPayload.billingAddress = billingAddressFormData;
                    requestPayload.devoteeName = ProfileDetails.firstName + '' + ProfileDetails.lastName;
                    requestPayload.devoteePhoneNumber = loggedInUser?.phonenumber;
                    requestPayload.devoteeEmail = loggedInUser?.email;
                    requestPayload.paymentMethod = payload.paymentIntent.payment_method;
                    requestPayload.transStatus = payload.paymentIntent.status;
                    requestPayload.stripeReferenceId = payload.paymentIntent.id;
                    requestPayload.paymentMode =  payload.paymentIntent.payment_method_types;
                    requestPayload.orderNotes =  data.comments;
                 
                    dispatch(serviceActions.confirmPayment(requestPayload)); //add booking history
                  
                    setProcessing(false);

                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: `Your payment was successful. Reference No:${payload.paymentIntent.id}`,
                    }).then(() => {
                        dispatch(clearState());
                        document.body.style.overflow = 'auto';
                        document.body.removeChild(overlay);
                        navigate('/mybookings/lists'); 
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
                    {BookDetails ? (
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
                                                    placeholder="Notes about your shopping, e.g. special notes for order. "
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-7 order-lg-2">
                                    <div className="your-order-area">
                                        <h2><strong>Your service details</strong></h2>
                                        <div className="your-order-wrap gray-bg-4">
                                            <div className="your-order-product-info">
                                                {/* <div className="your-order-top">
                                                    <ul>
                                                        <li>Donation </li>
                                                        <li>Total</li>
                                                    </ul>
                                                </div> */}
                                                <div className="your-order-middle">
                                                    <ul>
                                                    <li>
                                                            <span className="order-middle-left">
                                                                God name
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.godname}</strong>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="order-middle-left">
                                                                Service type
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.type}</strong>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="order-middle-left">
                                                                Service name
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.name}</strong>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="order-middle-left">
                                                                Booking date
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.bookingDate}</strong>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-total">
                                                    <ul>
                                                        <li className="order-total">Total</li>
                                                        <li>
                                                            {formatCurrency(intl, BookDetails.amount)}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="payment-method" />
                                        </div>
                                    </div>
                                    </div>

                                    {/* Order Details on Right Side */}
                                    <div className="col-lg-5 order-lg-1">
                                        <div className="your-order-area card-payment-details">
                                            <h4>Enter Payment Details</h4>
                                            <div className="billing-info mb-20">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="cardholdername"
                                                    errors={errors}
                                                    label="Card holder name"
                                                    control={control}
                                                    name="cardholdername"
                                                />
                                            </div>
                                            <div className="Card-Info mb-20">
                                                <CardElement
                                                    className='card-details'
                                                    id="card"
                                                    options={{
                                                        style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                color: '#32325d',
                                                                fontFamily: 'Arial, sans-serif',
                                                            },
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {cardErrors && <p className="error-message">{cardErrors}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-3 order-btn"
                                    style={{ textAlign: "right" }}
                                >



                                    {/* Place Order Button */}
                                    <div className="place-order mt-25">
                                    <ButtonV1
                                        disabled={processing || !stripe || !elements}
                                        btnType="submit"
                                        label={processing ? 'PROCESSING' : 'Book service'}
                                        btnClassName='btn btn-hover'
                                   />
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
                                        Something went wrong <br />{" "}
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

export default ServiceConfimPage;
