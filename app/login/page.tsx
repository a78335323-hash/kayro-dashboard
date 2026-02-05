"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Password errata");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* IMMAGINE GRANDE IN ALTO */}
      <img
        src="/login-1.jpg"
        alt="cover"
        className="w-full h-64 object-cover"
      />

      {/* CONTENUTO */}
      <div className="flex flex-col items-center px-6 -mt-16">
        {/* IMMAGINE TONDA */}
        <img
          src="/login-2.jpg"
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-black object-cover"
        />

        {/* TITOLO */}
        <h1 className="mt-4 text-2xl font-semibold">Kayro Dashboard</h1>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mt-6 flex flex-col gap-4"
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-white"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            {loading ? "Attendi..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
