import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

interface Props {
  publishableKey: string;
}

export default function LayoffKitCheckout({ publishableKey }: Props) {
  const stripePromise = loadStripe(publishableKey);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/layoff-kit/checkout", { method: "POST" });
    const data = await res.json();
    if (data.error) {
      console.error("Checkout error:", data.error);
      return "";
    }
    return data.clientSecret;
  }, []);

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
