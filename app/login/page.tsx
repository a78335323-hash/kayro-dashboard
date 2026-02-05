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
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-zinc-900" />
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.12]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 items-center">
          {/* Left: branding + images */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Kayro Dashboard
            </h1>
            <p className="text-white/70">
              Accesso privato. Una password per sbloccare.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                {/* Metti la tua immagine in public/login-1.jpg */}
                <img
                  src="/login-1.jpg"
                  alt="Login 1"
                  className="h-40 w-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                {/* Metti la tua immagine in public/login-2.jpg */}
                <img
                  src="/login-2.jpg"
                  alt="Login 2"
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs text-white/50">
              (Se non vedi le immagini: controlla che siano in <code>public/</code> e
              si chiamino <code>login-1.jpg</code> e <code>login-2.jpg</code>)
            </p>
          </div>

          {/* Right: login card */}
          <div className="md:justify-self-end w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
              <h2 className="text-xl font-medium">Login</h2>
              <p className="text-sm text-white/60 mt-1">
                Inserisci la password per entrare.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-white/80">Password</label>
                  <input
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-white text-black font-medium py-3 disabled:opacity-60"
                >
                  {loading ? "Accesso..." : "Entra"}
                </button>

                <a
                  href="/api/logout"
                  className="block text-center text-xs text-white/50 hover:text-white/80"
                >
                  Esci
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
