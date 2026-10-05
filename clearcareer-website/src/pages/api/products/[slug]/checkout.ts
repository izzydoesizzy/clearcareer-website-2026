import type { APIRoute } from "astro";
import Stripe from "stripe";
import { PRODUCTS } from "../../../../data/product-config";

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const slug = params.slug;
  if (!slug || !PRODUCTS[slug]) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  const product = PRODUCTS[slug];

  if (product.tier === "free") {
    return new Response(
      JSON.stringify({ error: "Free products do not require checkout" }),
      { status: 400 }
    );
  }

  const stripeSecret = import.meta.env[product.stripePriceEnvVar.replace("PRICE_ID", "").replace(/STRIPE_/, "STRIPE_SECRET_KEY")] || import.meta.env.STRIPE_SECRET_KEY;
  const priceId = import.meta.env[product.stripePriceEnvVar];

  if (!stripeSecret || !priceId) {
    return new Response(
      JSON.stringify({ error: "Payment not configured for this product" }),
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { product: slug },
    return_url: `${new URL(request.url).origin}/products/${slug}/access/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
