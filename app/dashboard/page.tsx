export default function DashboardPage() {
  const today = new Date();
  const lastUpdate = today.toLocaleString("it-IT");

  // ✅ MOCK DATA (poi li colleghiamo alle API)
  const kpis = [
    { name: "Instagram", value: "+12", label: "follower oggi", sub: "Totale: 1.245" },
    { name: "TikTok", value: "+340", label: "views oggi", sub: "Totale: 98.120" },
    { name: "Spotify", value: "+57", label: "ascolti oggi", sub: "Listener: 1.020" },
    { name: "YouTube", value: "+89", label: "views oggi", sub: "Iscritti: 320" },
  ];

  const songs = [
    { title: "Brano 1", today: 24, total: 12034, trend: "+8%" },
    { title: "Brano 2", today: 11, total: 8021, trend: "-2%" },
    { title: "Brano 3", today: 46, total: 19022, trend: "+12%" },
  ];

  const videos = [
    { title: "Video 1", today: 120, total: 44210, trend: "+5%" },
    { title: "Video 2", today: 58, total: 12003, trend: "+1%" },
    { title: "Video 3", today: 310, total: 88920, trend: "+15%" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Ultimo aggiornamento: {lastUpdate}</p>
        </div>

        <div className="flex gap-2">
          <a
            href="/api/logout"
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition text-sm"
          >
            Esci
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition text-sm font-medium"
          >
            Aggiorna
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <section className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div
            key={k.name}
            className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-zinc-400">{k.name}</p>
              <span className="text-xs text-zinc-500">oggi</span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-semibold">{k.value}</div>
              <div className="text-sm text-zinc-300 mt-1">{k.label}</div>
              <div className="text-xs text-zinc-500 mt-2">{k.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* GRAFICI (placeholder) */}
      <section className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Andamento (ultimi 7 giorni)</h2>
            <span className="text-xs text-zinc-500">mock</span>
          </div>
          <div className="mt-4 h-48 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
            Qui mettiamo il grafico (Spotify/YouTube)
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Andamento (ultimi 30 giorni)</h2>
            <span className="text-xs text-zinc-500">mock</span>
          </div>
          <div className="mt-4 h-48 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
            Qui mettiamo il grafico (IG/TikTok)
          </div>
        </div>
      </section>

      {/* TABELLE */}
      <section className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 overflow-hidden">
          <h2 className="font-semibold">Canzoni</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2">Titolo</th>
                  <th className="text-right py-2">Oggi</th>
                  <th className="text-right py-2">Totale</th>
                  <th className="text-right py-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((s) => (
                  <tr key={s.title} className="border-b border-zinc-900">
                    <td className="py-3">{s.title}</td>
                    <td className="py-3 text-right">{s.today}</td>
                    <td className="py-3 text-right">{s.total.toLocaleString("it-IT")}</td>
                    <td className="py-3 text-right text-zinc-300">{s.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 overflow-hidden">
          <h2 className="font-semibold">Video</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2">Titolo</th>
                  <th className="text-right py-2">Oggi</th>
                  <th className="text-right py-2">Totale</th>
                  <th className="text-right py-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => (
                  <tr key={v.title} className="border-b border-zinc-900">
                    <td className="py-3">{v.title}</td>
                    <td className="py-3 text-right">{v.today}</td>
                    <td className="py-3 text-right">{v.total.toLocaleString("it-IT")}</td>
                    <td className="py-3 text-right text-zinc-300">{v.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="max-w-6xl mx-auto mt-6 text-xs text-zinc-500">
        Nota: questi sono dati finti. Dopo colleghiamo le API di TikTok/Instagram/Spotify/YouTube e li rendiamo reali + aggiornamento giornaliero.
      </p>
    </main>
  );
}
