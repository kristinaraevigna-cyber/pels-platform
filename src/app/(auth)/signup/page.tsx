"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!signUpData.user) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // If promo code was entered, validate it
    if (promoCode.trim()) {
      const res = await fetch("/api/access-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      if (res.ok) {
        router.push("/assessment");
        router.refresh();
        return;
      }

      const data = await res.json();
      setError(data.error || "Invalid promo code. You can still pay to access.");
      setLoading(false);
      return;
    }

    // No promo code — redirect to payment
    router.push("/payment");
    router.refresh();
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-normal text-stone-800 mb-2">
          Create Your Account
        </h1>
        <p className="text-stone-500 text-sm">
          Sign up to take the PELS assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-clay-200 rounded-lg text-sm outline-none transition-colors focus:border-clay-300 focus:ring-1 focus:ring-clay-300/50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-clay-200 rounded-lg text-sm outline-none transition-colors focus:border-clay-300 focus:ring-1 focus:ring-clay-300/50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Promo Code{" "}
            <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code for free access"
            className="w-full px-4 py-3 border border-clay-200 rounded-lg text-sm outline-none transition-colors focus:border-clay-300 focus:ring-1 focus:ring-clay-300/50 placeholder:text-stone-300"
          />
        </div>

        {error && (
          <p className="text-red-700 text-sm bg-red-50 px-4 py-2.5 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-clay-500 text-white rounded-lg text-sm font-semibold transition-colors hover:bg-clay-600 disabled:bg-clay-200 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-stone-500">
        Already have an account?{" "}
        <a href="/login" className="text-clay-300 font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </>
  );
}
