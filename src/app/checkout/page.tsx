"use client"

import React from "react";
import {
    AcceptHosted,
    FormComponent,
    FormContainer
} from "react-authorize-net";

type ResponseType = Record<string, any>; // Adjust this based on the actual shape of the response if you have more details
type ErrorType = Record<string, any>; // Adjust this as well based on the error structure

export default function CheckoutPage() {

    const clientKey: string = "5n89FY2Wdn";
    const apiLoginId: string = "3UrVG248Y3d2VAk5";

    const onSuccessHandler = (response: ResponseType): void => {
        console.log("response", response);
    };

    const onErrorHandler = (error: ErrorType): void => {
        console.log("error", error);
    };

    return (
        <div className="App">
            <FormContainer
                environment="production"
                onError={onErrorHandler}
                onSuccess={onSuccessHandler}
                amount={0.01}
                component={FormComponent}
                clientKey={clientKey}
                apiLoginId={apiLoginId}
            />
        </div>
    );
};