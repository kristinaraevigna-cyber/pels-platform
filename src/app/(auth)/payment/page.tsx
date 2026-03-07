"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-normal text-stone-800 mb-2">
          Access the Assessment
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Complete your one-time payment to unlock the PELS assessment and
          receive your personalized leadership report.
        </p>
      </div>

      <div className="bg-clay-50 rounded-lg p-5 mb-6 border-l-4 border-clay-300">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-stone-800">PELS Assessment</span>
          <span className="font-serif text-2xl font-semibold text-clay-500">
            $29
          </span>
        </div>
        <ul className="text-sm text-stone-500 space-y-1.5 list-disc pl-4">
          <li>18-item validated leadership assessment</li>
          <li>Personalized leadership energy report</li>
          <li>One-time payment — lifetime access</li>
        </ul>
      </div>

      {error && (
        <p className="text-red-700 text-sm bg-red-50 px-4 py-2.5 rounded-lg mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-3.5 bg-clay-300 text-white rounded-lg text-sm font-semibold transition-colors hover:bg-clay-400 disabled:bg-clay-200 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting to checkout..." : "Proceed to Payment"}
      </button>

      <p className="text-center mt-5 text-xs text-stone-400">
        Secure payment powered by Stripe
      </p>
    </>
  );
}
