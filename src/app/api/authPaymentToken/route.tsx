import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    console.log("Received the request");
    const { dataPrice } = await req.json();
    console.log(dataPrice)

    const apiUrl = 'https://api2.authorize.net/xml/v1/request.api';
    const merchantName = '5n89FY2Wdn';
    const transactionKey = '3UrVG248Y3d2VAk5';

    try {
        console.log(process.env.NEXT_PUBLIC_AUTHORIZENET_TOKEN_API_URL)
        const response = await axios.post(
            apiUrl || '',
            {
                getHostedPaymentPageRequest: {
                    merchantAuthentication: {
                        name: merchantName || '',
                        transactionKey: transactionKey || '',
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
                                    url: 'public/IFrameCommunicator.html',
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
        console.log(response)
        return NextResponse.json({
            message: 'Profile updated successfully',
            data: token, // Include rows if needed
        });
    } catch (error) {
        console.error('Error fetching client token:', error);
        return NextResponse.json({
            message: 'Error fetching client token:',
        }, { status: 500 });
    }

}