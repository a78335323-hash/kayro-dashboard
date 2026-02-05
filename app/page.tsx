import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-white/70">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      {sub ? <div className="mt-1 text-xs text-white/60">{sub}</div> : null}
    </div>
  );
}

export default function Home() {
  const session = cookies().get("dash_session")?.value;
  if (session !== "ok") redirect("/login");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Kayro Dashboard</h1>
            <p className="mt-1 text-sm text-white/70">
              ✅ Online • layout responsive (telefono / tablet / pc)
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/api/logout"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Logout
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="YouTube • Views (oggi)" value="—" sub="in arrivo" />
          <StatCard title="Spotify • Streams (oggi)" value="—" sub="in arrivo" />
          <StatCard title="TikTok • Views (oggi)" value="—" sub="in arrivo" />
          <StatCard title="Instagram • Follower" value="—" sub="in arrivo" />
        </div>

        {/* Section */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold">Aggiornamenti giornalieri</h2>
          <p className="mt-1 text-sm text-white/70">
            Qui metteremo grafico + storico. La pagina è già pronta per adattarsi su mobile.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm text-white/70">Ultimo update</div>
              <div className="mt-2 text-base">—</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm text-white/70">Prossimo update</div>
              <div className="mt-2 text-base">—</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm text-white/70">Stato</div>
              <div className="mt-2 text-base">OK</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
