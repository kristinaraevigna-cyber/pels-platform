"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/assessment";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-normal text-stone-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-stone-500 text-sm">
          Sign in to access your assessment
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
            className="w-full px-4 py-3 border border-clay-200 rounded-lg text-sm outline-none transition-colors focus:border-clay-300 focus:ring-1 focus:ring-clay-300/50"
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-clay-300 font-semibold hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
