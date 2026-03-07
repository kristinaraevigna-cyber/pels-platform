"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [cohortLabel, setCohortLabel] = useState("");
  const [expiresInDays, setExpiresInDays] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const storedPassword = authenticated ? password : "";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/access-codes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, count: 0 }),
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setError("Invalid admin password");
      }
    } catch {
      setError("Failed to verify password");
    }
  }

  async function generateCodes() {
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const res = await fetch("/api/access-codes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: storedPassword,
          count,
          cohortLabel: cohortLabel.trim() || undefined,
          expiresInDays: expiresInDays || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate codes");
        if (res.status === 401) setAuthenticated(false);
      } else {
        setCodes(data.codes || []);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  async function copyAllCodes() {
    const text = codes.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-clay-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-xl shadow-lg shadow-stone-200/50 px-6 sm:px-10 py-10 sm:py-12 max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <Image
              src="/PEL 2.png"
              alt="Positively Energizing Leadership"
              width={240}
              height={90}
              style={{ objectFit: "contain", maxWidth: "220px", mixBlendMode: "multiply" }}
            />
          </div>
          <h1 className="font-serif text-2xl text-center text-stone-800 mb-2">
            Admin Access
          </h1>
          <p className="text-stone-500 text-sm text-center mb-6">
            Enter admin password to manage access codes
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              className="w-full px-4 py-3 border border-clay-200 rounded-lg text-sm outline-none focus:border-clay-300"
            />
            {error && (
              <p className="text-red-700 text-sm bg-red-50 px-4 py-2.5 rounded-lg">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-clay-500 text-white rounded-lg text-sm font-semibold hover:bg-clay-600"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clay-50 px-4 sm:px-6 py-8 sm:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 mb-2">
          Access Code Management
        </h1>
        <p className="text-stone-500 mb-8 sm:mb-10">
          Generate secure, hashed access codes for academic cohorts.
        </p>

        {/* Generate section */}
        <div className="bg-white rounded-xl p-5 sm:p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800 mb-5">
            Generate New Codes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Number of codes
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min={1}
                max={100}
                className="w-full px-3 py-2.5 border border-clay-200 rounded-lg text-sm outline-none focus:border-clay-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Cohort label{" "}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={cohortLabel}
                onChange={(e) => setCohortLabel(e.target.value)}
                placeholder="e.g. Spring 2026 MBA"
                className="w-full px-3 py-2.5 border border-clay-200 rounded-lg text-sm outline-none focus:border-clay-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Expires in (days){" "}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                value={expiresInDays}
                onChange={(e) =>
                  setExpiresInDays(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                min={1}
                max={365}
                placeholder="No expiry"
                className="w-full px-3 py-2.5 border border-clay-200 rounded-lg text-sm outline-none focus:border-clay-300"
              />
            </div>
          </div>

          <button
            onClick={generateCodes}
            disabled={loading}
            className="px-6 py-2.5 bg-clay-300 text-white rounded-lg text-sm font-semibold hover:bg-clay-400 disabled:bg-clay-200 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Codes"}
          </button>

          {error && (
            <p className="text-red-700 text-sm bg-red-50 px-4 py-2.5 rounded-lg mt-4">
              {error}
            </p>
          )}
        </div>

        {/* Generated codes display */}
        {codes.length > 0 && (
          <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-stone-800">
                Generated Codes ({codes.length})
              </h2>
              <button
                onClick={copyAllCodes}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-200"
              >
                {copied ? "Copied!" : "Copy All"}
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
              <p className="text-amber-800 text-xs font-medium">
                Save these codes now. They are only displayed once and cannot be recovered.
              </p>
            </div>

            <div className="space-y-2">
              {codes.map((code, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-3 rounded-lg text-sm bg-green-50"
                >
                  <code className="font-mono font-semibold text-stone-800">
                    {code}
                  </code>
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(code);
                    }}
                    className="text-stone-400 hover:text-stone-600 text-xs"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
