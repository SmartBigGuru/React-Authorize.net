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

    const clientKey: string = "8LqpS52cU3n";
    const apiLoginId: string = "39V93VMKjj823bc5";

    const onSuccessHandler = (response: ResponseType): void => {
        console.log("response", response);
    };

    const onErrorHandler = (error: ErrorType): void => {
        console.log("error", error);
    };

    return (
        <div className="App">
            <FormContainer
                environment="sandbox"
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