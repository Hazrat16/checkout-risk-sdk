### Checkout Risk SDK Hook

## Description

This hook provides an easy-to-use interface for integrating the Checkout.com Risk SDK into your React application. It helps generate a `deviceSessionId` for fraud detection and risk assessment. The `deviceSessionId` can be used to analyze device and session data, helping you identify and mitigate potential fraud.

## Features

**Dynamic SDK Loading**: Automatically loads the Risk SDK from the appropriate environment (production or sandbox).
**State Management**: Manages the state of the Risk instance and script loading status.
**Fraud Detection**: Facilitates the collection of risk data to help detect fraudulent activities.
**Easy Integration**: Seamlessly integrates with your existing React application.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i checkout-risk-sdk
```

## Usage

# Example

```sh
import React, { useEffect, useState } from 'react';
import useCheckoutRiskSDK from 'checkout-risk-sdk';

const YourComponent = () => {
  const [deviceSessionId, setDeviceSessionId] = useState<string | null>(null);
  const { risk, isScriptLoaded } = useCheckoutRiskSDK(process.env.REACT_APP_CHECKOUT_PAYMENT_PUBLIC_KEY);

  useEffect(() => {
    const fetchDeviceSessionId = async () => {
      if (isScriptLoaded && risk) {
        try {
          const id = await risk.publishRiskData();
          setDeviceSessionId(id);
        } catch (error) {
          console.error('Error fetching deviceSessionId:', error);
        }
      }
    };

    fetchDeviceSessionId();
  }, [risk, isScriptLoaded]);

  return (
    <div>
      <p>Device Session ID: {deviceSessionId}</p>
      {/* Your component code */}
    </div>
  );
};

export default YourComponent;

```

Now pass the `deviceSession` where you needed.

## How It Works

**Environment Detection**: The hook detects the environment (production or sandbox) and loads the appropriate Risk SDK URL.
**Script Loading**: It dynamically loads the Risk SDK script into the document.
**Risk Instance Initialization**: Once the script is loaded, the hook initializes the Risk instance using the provided public key.
**Data Publishing**: The publishRiskData method from the Risk instance is used to obtain the deviceSessionId, which can then be used for further processing or storage.

## Configuration

# Environment Variables

**REACT_APP_ENVIRONMENT**: Set this to "prod" or "sandbox" to determine which Risk SDK URL to load.
**REACT_APP_CHECKOUT_PAYMENT_PUBLIC_KEY**: Your public key for initializing the Risk SDK.

## Error Handling

The hook provides basic error handling for script loading and initialization. In case of an error, appropriate messages are logged to the console.

## License

MIT
