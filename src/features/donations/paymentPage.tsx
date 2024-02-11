import React, { ChangeEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
import {
    createPaymentIntent,
} from './mydonations/donationApis';
import { mydonationsActions } from './mydonations/donationSlice';
import { selectSavedLocalDonatData } from './mydonations/donationsSelectors';
import { useRedux, useUser } from 'hooks';
import { formatCurrency } from 'helpers/currency';
import { myprofileActions } from 'admin/features/myprofile/myProfileSlice';
import { selectMyProfileDetails } from 'admin/features/myprofile/myProfileSelectors';
import { CAProvinces } from 'constants/CAProvinces';
import { FormInput } from 'sharedComponents/inputs';
import 'sweetalert2/dist/sweetalert2.min.css';

/* eslint-disable */
const DonationPayment = () => {
    const { dispatch, appSelector } = useRedux();
    const intl = useIntl();
    const [loggedInUser] = useUser();

    const { param1, param2 } = useParams();

    const stripe = useStripe(); // Move useStripe inside handlePayment
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const elements: any = useElements();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [cardError, setCardErrors] = useState<any>('');

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            cardholdername: yup.string().required('Please enter the card holder name as per card'),
            comments: yup.string().required('Please add some notes for donation').min(2, 'This value is too short. It should have 2 characters or more.')
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

    const BookDetails = appSelector(selectSavedLocalDonatData);

    /*
        handle form submission
    */
    const onSubmit = handleSubmit(async (data: any) => {
        try {
            setProcessing(true);
            // Construct the payment intent details
            const paymentIntentDetails = {
                donationDetails: [
                    {
                        donationType: BookDetails?.type,
                        frequency: BookDetails?.frequency,
                    }
                ],
                amount: BookDetails?.amount,
                currency: 'usd',
                description: `Donating amount for ${BookDetails?.type}`,
                receipt_email: ProfileDetails?.email,
                shipping: {
                    name: ProfileDetails?.firstName +' '+ProfileDetails?.lastName,
                    phone: ProfileDetails?.mobileNumber,
                    address: {
                        line1: billingAddressFill.address1,
                        city: billingAddressFill.city,
                        country: 'Canada',
                        postal_code: billingAddressFill?.postalCode,
                        state: billingAddressFill?.province
                    },
                },
            };

            // Create the payment intent and get the client secret
            const response = await createPaymentIntent(paymentIntentDetails);
            const { clientSecret, id } = response;

            // Check if clientSecret is obtained successfully
            if (!clientSecret) {
                throw new Error('Failed to retrieve client secret for payment intent');
            }

            // Set the client secret and payment intent id
            setClientSecret(clientSecret);
            setPaymentIntentId(id);

            if (stripe) {
                const cardElement = elements.getElement(CardElement);
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: data?.cardholdername,
                    },
                });

                if (!error) {
                    const payload = await stripe.confirmCardPayment(clientSecret, {
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
                                               
                        //insert in  to database
                        let PaymentHistory:any = {}

                        PaymentHistory.userId = param2;
                        PaymentHistory.devoteeId = loggedInUser.devoteeId;
                        PaymentHistory.donateTypeId = param1;
                        PaymentHistory.donationType = BookDetails.type;
                        PaymentHistory.donorName = ProfileDetails.firstName +' '+ProfileDetails.lastName;
                        PaymentHistory.donorEmail = ProfileDetails.email;
                        PaymentHistory.frequency = BookDetails.frequency;
                        PaymentHistory.donorPhoneNumber = ProfileDetails.mobileNumber;
                        PaymentHistory.donorNotes = data.comments;
                        PaymentHistory.stripeReferenceId = payload.paymentIntent.id;
                        PaymentHistory.donatedAmount = BookDetails.amount;
                        PaymentHistory.transStatus = payload.paymentIntent.status;
                        PaymentHistory.paymentMethod = payload.paymentIntent.payment_method;
                        PaymentHistory.paymentMode = payload.paymentIntent.payment_method_types;
                        PaymentHistory.donatedItems = [];
                        PaymentHistory.billingAddress = billingAddressFill;

                        dispatch(mydonationsActions.PayDonation(PaymentHistory));
                        
                        setProcessing(false);

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
                setError('Stripe is null');
            }
        } catch (error) {
            console.error('Error during payment:', error);
        } 
    });

    useEffect(() => {
        dispatch(
            myprofileActions.getMyProfileDetails({
                userid: param2,
            }),
        );
    }, [dispatch]);

    const ProfileDetails: any = appSelector(selectMyProfileDetails);

    const [billingAddressFill, setBillingAddress] = useState<any>(ProfileDetails?.billingAddress || '');
    const [selectedState, setSelectedState] = useState<string>(''); // Initialize with an empty string

    React.useEffect(() => {
        if (isChecked) {
            setSelectedState(ProfileDetails?.homeAddress.province);
            setBillingAddress(ProfileDetails?.homeAddress);
        } else if (ProfileDetails?.billingAddress) {
            setSelectedState(ProfileDetails?.billingAddress.province);
            setBillingAddress(ProfileDetails?.billingAddress);
        } else {
            setBillingAddress('');
        }
    }, [isChecked, ProfileDetails]);

    useEffect(() => {
        setValue('mobileNumber', ProfileDetails?.mobileNumber);
        setValue('billingAddress', billingAddressFill?.address1);
        setValue('billingCity', billingAddressFill?.city);
        setValue('billingZipcode', billingAddressFill?.postalCode);
        setValue('state', billingAddressFill?.province);
    }, [setValue, billingAddressFill]);

    const handleBillingToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
    };

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
                <form name="donation-payment-form" id="donation-payment-form" onSubmit={onSubmit}>
                    {BookDetails ? (
                        <>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="billing-info-wrap">
                                        <h3>Billing Details</h3>

                                        <div className="form-group row">
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input className="form-check-input" checked={isChecked} onChange={handleBillingToggle} type="checkbox" id="saveAddress" />
                                                    <label className="form-check-label d-flex align-items-center" htmlFor="saveAddress">
                                                        Save as default address
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
                                                        control={control}
                                                        label="Address"
                                                        name="billingAddress"
                                                        defaultValue={billingAddressFill?.address1 || ''}
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
                                                        control={control}
                                                        label="City"
                                                        name="billingCity"
                                                        defaultValue={billingAddressFill?.city || ''} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        register={register}
                                                        key="state"
                                                        label="State"
                                                        errors={errors}
                                                        control={control}
                                                        type="select"
                                                        defaultValue={selectedState}
                                                        onChange={event => setSelectedState(event.target.value)}
                                                        name="state"
                                                        id="state"
                                                        className="billing-selectinput mb-20"
                                                    >

                                                        <option value="">Select</option>
                                                        {CAProvinces?.map((option: any, index: any) => (
                                                            <option key={index} value={option.name} selected={option.name === selectedState}>
                                                                {option.name}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput
                                                        register={register}
                                                        key="postalCode"
                                                        errors={errors}
                                                        label="Postal code"
                                                        control={control}
                                                        type="text"
                                                        name="postalCode"
                                                        defaultValue={billingAddressFill?.postalCode || ''} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="billing-info mb-20">
                                                    <FormInput label="Email address" type="email" name="email" value={ProfileDetails?.email} disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="additional-info-wrap mb-3">
                                            <h4>Additional information</h4>
                                            <div className="additional-info">
                                                <label>Donation notes</label>
                                                <FormInput
                                                    register={register}
                                                    key="comments"
                                                    errors={errors}
                                                    label="Notes"
                                                    control={control}
                                                    name="comments"
                                                    type="textarea"
                                                    placeholder="Notes about your donation, e.g. special notes for donation. "
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='row'>

                                <div className="col-lg-6">
                                    <div id="pay-invoice" className="card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h2 className="text-center">Enter card details</h2>
                                            </div>

                                            <div className="form-group">
                                                <label>Payment amount</label>
                                                <h2>{formatCurrency(intl, BookDetails.amount)}</h2>
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
                                                    className='mb-5'
                                                    placeholder="Card holder name"
                                                    defaultValue=""
                                                />
                                                <CardElement className="card-element card-box form-control mb-4" options={{ style: { base: { fontSize: '16px' } } }} />
                                                {cardError && <p className="error-message">{cardError}</p>}
                                            </div>
                                            <div>
                                                <button id="payment-button" type="submit" className="btn btn-lg btn-success btn-block">
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="btn"
                                                    >
                                                        {processing ? 'PROCESSING' : 'PAY'}
                                                    </button>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="your-order-area">
                                        <h2><strong>Your donation details</strong></h2>
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
                                                                Donation type
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.type}</strong>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="order-middle-left">
                                                                Frequency
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                <strong>{BookDetails.frequency}</strong>
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
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-cash" />
                                    </div>
                                    <div className="item-empty-area__text">
                                        Something went wrong please try again!<br />{' '}
                                        {/* <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                                        Shop Now
                                    </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
        </>

    );
};

export default React.memo(DonationPayment);
