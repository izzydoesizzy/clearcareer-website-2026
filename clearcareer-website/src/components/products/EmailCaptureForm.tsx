"use client";

import { useState } from "react";

interface EmailCaptureFormProps {
  productSlug: string;
  productName: string;
  ctaText?: string;
}

export default function EmailCaptureForm({
  productSlug,
  productName,
  ctaText = "Get Free Access",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: productSlug }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">You're in.</p>
        <p className="mt-2 text-green-700">
          Check your email for access to {productName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : ctaText}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="text-center text-xs text-gray-500">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
