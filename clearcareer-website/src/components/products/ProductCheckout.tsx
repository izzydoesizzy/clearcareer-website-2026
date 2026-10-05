"use client";

import { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface ProductCheckoutProps {
  productSlug: string;
  publishableKey: string;
}

export default function ProductCheckout({
  productSlug,
  publishableKey,
}: ProductCheckoutProps) {
  const stripePromise = loadStripe(publishableKey);

  const fetchClientSecret = useCallback(() => {
    return fetch(`/api/products/${productSlug}/checkout`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [productSlug]);

  return (
    <div id="checkout" className="mx-auto max-w-xl">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
