import React, { useEffect, useRef, useState } from 'react';
import CheckoutForm from './checkout';
import { createPaymentIntent } from 'features/donations/mydonations/donationApis';

/* eslint-disable */
function Payment() {
    const [initialClientSecret, setInitialClientSecret] = useState < any > '';
    const [currentClientSecret, setCurrentClientSecret] = useState < any > '';
    const isMounted = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentIntentDetails = {
                    currency: 'ca',
                    description: 'Shopping items from temple',
                };

                // Create the payment intent and get the client secret
                const response =
                    await createPaymentIntent(paymentIntentDetails);

                // Set both the initial and current clientSecret
                setInitialClientSecret(response.clientSecret);
                setCurrentClientSecret(response.clientSecret);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isMounted.current) {
            fetchData();
            isMounted.current = false;
        }
    }, []);

    return <>{currentClientSecret && <CheckoutForm />}</>;
}

export default Payment;
