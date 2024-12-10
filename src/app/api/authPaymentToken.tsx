import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_AUTHORIZENET_TOKEN_API_URL || '',
                {
                    getHostedPaymentPageRequest: {
                        merchantAuthentication: {
                            name: process.env.NEXT_PUBLIC_MERCHANT_AUTH_NAME || '',
                            transactionKey: process.env.NEXT_PUBLIC_MERCHANT_TRANSACTION_KEY || '',
                        },
                        transactionRequest: {
                            transactionType: 'authCaptureTransaction',
                            amount: req.body?.dataPrice,
                        },
                        hostedPaymentSettings: {
                            setting: [
                                {
                                    settingName: 'hostedPaymentReturnOptions',
                                    settingValue: JSON.stringify({
                                        showReceipt: false,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentButtonOptions',
                                    settingValue: JSON.stringify({
                                        text: 'Pay',
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentStyleOptions',
                                    settingValue: JSON.stringify({
                                        bgColor: '008401',
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentPaymentOptions',
                                    settingValue: JSON.stringify({
                                        cardCodeRequired: false,
                                        showCreditCard: true,
                                        showBankAccount: false,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentSecurityOptions',
                                    settingValue: JSON.stringify({
                                        captcha: false,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentShippingAddressOptions',
                                    settingValue: JSON.stringify({
                                        show: false,
                                        required: false,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentBillingAddressOptions',
                                    settingValue: JSON.stringify({
                                        show: false,
                                        required: false,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentCustomerOptions',
                                    settingValue: JSON.stringify({
                                        showEmail: false,
                                        requiredEmail: false,
                                        addPaymentProfile: true,
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentOrderOptions',
                                    settingValue: JSON.stringify({
                                        show: true,
                                        merchantName: 'G and S Questions Inc.',
                                    }),
                                },
                                {
                                    settingName: 'hostedPaymentIFrameCommunicatorUrl',
                                    settingValue: JSON.stringify({
                                        url: 'yoursite/IFrameCommunicator.html',
                                    }),
                                },
                            ],
                        },
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const token = response.data.token;
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error fetching client token:', error);
            res.status(500).json({ error: 'Failed to fetch client token' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}