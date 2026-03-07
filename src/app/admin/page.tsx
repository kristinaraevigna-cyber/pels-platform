"use client";

import { useState } from "react";
import Image from "next/image";

interface AccessCode {
  id: string;
  code: string;
  is_active: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const storedPassword = authenticated ? password : "";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthenticated(true);
    // Verify the password by making a zero-count request
    try {
      const res = await fetch("/api/access-codes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, count: 0 }),
      });
      if (!res.ok) {
        setAuthenticated(false);
        setError("Invalid admin password");
      }
    } catch {
      setError("Failed to verify password");
    }
  }

  async function generateCodes() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/access-codes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: storedPassword, count }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate codes");
        if (res.status === 401) setAuthenticated(false);
      } else {
        setCodes((prev) => [...(data.codes || []), ...prev]);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-clay-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-xl shadow-lg shadow-stone-200/50 px-10 py-12 max-w-sm w-full">
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
    <div className="min-h-screen bg-clay-50 p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-800 mb-2">
          Access Code Management
        </h1>
        <p className="text-stone-500 mb-10">
          Generate and manage promo codes for academic access.
        </p>

        {/* Generate section */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800 mb-5">
            Generate New Codes
          </h2>

          <div className="flex items-end gap-3">
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
                className="w-24 px-3 py-2.5 border border-clay-200 rounded-lg text-sm outline-none focus:border-clay-300"
              />
            </div>
            <button
              onClick={generateCodes}
              disabled={loading}
              className="px-6 py-2.5 bg-clay-300 text-white rounded-lg text-sm font-semibold hover:bg-clay-400 disabled:bg-clay-200 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {error && (
            <p className="text-red-700 text-sm bg-red-50 px-4 py-2.5 rounded-lg mt-4">
              {error}
            </p>
          )}
        </div>

        {/* Codes list */}
        {codes.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-800 mb-5">
              Generated Codes ({codes.length})
            </h2>
            <div className="space-y-2">
              {codes.map((c) => (
                <div
                  key={c.id}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg text-sm ${
                    c.used_by ? "bg-stone-100" : "bg-green-50"
                  }`}
                >
                  <code className="font-mono font-semibold text-stone-800">
                    {c.code}
                  </code>
                  <span className="text-stone-500 text-xs">
                    {c.used_by ? "Used" : "Available"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
