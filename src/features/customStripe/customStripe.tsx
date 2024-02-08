import React, {
    useState, useEffect,
} from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {
    createPaymentIntent,
} from '../donations/mydonations/donationApis';

/* eslint-disable */
const CustomCheckout: React.FC<any> = ({ shipping, cartItems,profileData }) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();
    const [paymentIntentId, setPaymentIntentId] = useState(null);

    useEffect(() => {
        console.log("shipping",shipping);
        console.log("cartItems",cartItems);
     
        if (shipping) {
            const body = {
                cartItems: cartItems,
                shipping: {
                    name: profileData.firstName,
                    address: {
                        line1: shipping.address1,
                    },
                },
                description: 'payment intent for donation for something',
                receipt_email: shipping.email,
            };

            // get session
            const customCheckout = async () => {
                const response = await createPaymentIntent(body);
                const { clientSecret, id  } = response;
                setClientSecret(clientSecret);
                setPaymentIntentId(id);
            };

            customCheckout();
        }
    }, [shipping, cartItems,profileData]);

    const handleCheckout = async () => {
        setProcessing(true);
        if (stripe) {
            const payload = await stripe.confirmCardPayment(clientSecret as string, {
                payment_method: {
                    card: elements?.getElement(CardNumberElement) as any,
                },
            });
            if (payload.error) {
                setError(`Payment Failed: ${payload.error.message}`);
            } else {
                //push('/success');
            }
        } else {
            console.error('Stripe is null');
        }
     
    };

   

    const cardHandleChange = (event: any) => {
        const { error } = event;
        setError(error ? error.message : '');
    };

    const cardStyle = {
        style: {
            base: {
                color: '#000',
                fontFamily: 'Roboto, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#606060',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <div>
            <h4>Enter Payment Details</h4>
            <div className="stripe-card">
                <CardNumberElement
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandleChange}
                />
            </div>
            <div className="stripe-card">
                <CardExpiryElement
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandleChange}
                />
            </div>
            <div className="stripe-card">
                <CardCvcElement
                    className="card-element"
                    options={cardStyle}
                    onChange={cardHandleChange}
                />
            </div>
            <div className="submit-btn">
                <button
                    type="button"
                    disabled={processing}
                    className="button is-black nomad-btn submit"
                    onClick={() => handleCheckout()}
                >
                    { processing ? 'PROCESSING' : 'PAY' }
                </button>
            </div>
            {error && (<p className="error-message">{error}</p>)}
        </div>
    );
};

export default CustomCheckout;
