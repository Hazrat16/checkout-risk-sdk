import { useEffect, useState } from "react";

const getRiskJsSDKUrl = () => {
  if (process.env.REACT_APP_ENVIRONMENT === "prod") {
    return "https://risk.checkout.com/cdn/risk/1/risk.js";
  } else {
    return "https://risk.sandbox.checkout.com/cdn/risk/1/risk.js";
  }
};

const useCheckoutRiskSDK = (publicKey) => {
  const [risk, setRisk] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const riskJsSDKUrl = getRiskJsSDKUrl();

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "risk-js";
    script.src = riskJsSDKUrl;
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
      if (window.Risk) {
        const riskInstance = window.Risk.init(publicKey);
        setRisk(riskInstance);
      } else {
        console.error("Risk.js not loaded");
      }
    };

    script.onerror = () => {
      console.error("Failed to load Risk.js script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [publicKey]);

  return { risk, isScriptLoaded };
};

export default useCheckoutRiskSDK;
