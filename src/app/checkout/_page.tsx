"use client"

import { useEffect, useState } from 'react';
import Axios from 'axios';

const CheckoutPage: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const dataPrice = 1.00; // Example amount

    const fetchToken = async () => {
        try {
            const response = await fetch('/api/authPaymentToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataPrice }),
            });

            console.log(response)

            if (!response.ok) {
                throw new Error('Failed to fetch token');
            }

            const data = await response.json();
            setToken(data.token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    useEffect(() => {
        if (dataPrice) {
            fetchToken();
        }
    }, [dataPrice]);

    const handleButtonClick = () => {
        const formElement = document.getElementById('send_token') as HTMLFormElement;
        formElement.submit();
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://test.authorize.net') return;

            if (typeof event.data === 'string' && event.data.includes('response=')) {
                const responseData = event.data.split('response=')[1];
                try {
                    const jsonObject = JSON.parse(responseData);
                    const transId = jsonObject?.transId;
                    if (transId) {
                        console.log('Transaction ID:', transId);
                    }
                } catch (error) {
                    console.error('Error parsing response:', error);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div>
            <button onClick={handleButtonClick}>Pay Now</button>
            <iframe
                id="add_payment"
                name="add_payment"
                style={{ display: 'none' }}
            ></iframe>
            <form
                id="send_token"
                method="post"
                target="add_payment"
                action="https://accept.authorize.net/payment/payment"
            >
                <input type="hidden" name="token" value={token || ''} />
            </form>
        </div>
    );
};

export default CheckoutPage;