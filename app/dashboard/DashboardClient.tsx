"use client";

import { useMemo, useState } from "react";
import { itemsDaily, platformDaily, type Platform } from "./mock";

function formatDelta(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}`;
}

function getLatestDateForPlatform(p: Platform) {
  const dates = platformDaily
    .filter((x) => x.platform === p)
    .map((x) => x.date)
    .sort();
  return dates[dates.length - 1] ?? null;
}

function getPrevDateForPlatform(p: Platform, latest: string | null) {
  if (!latest) return null;
  const dates = platformDaily
    .filter((x) => x.platform === p)
    .map((x) => x.date)
    .sort();
  const idx = dates.lastIndexOf(latest);
  return idx > 0 ? dates[idx - 1] : null;
}

function getPlatformTotals(p: Platform) {
  const latest = getLatestDateForPlatform(p);
  const prev = getPrevDateForPlatform(p, latest);

  const latestRow = platformDaily.find((x) => x.platform === p && x.date === latest);
  const prevRow = platformDaily.find((x) => x.platform === p && x.date === prev);

  const followers = latestRow?.followers ?? null;
  const followersPrev = prevRow?.followers ?? null;

  const subs = latestRow?.subscribers ?? null;
  const subsPrev = prevRow?.subscribers ?? null;

  const monthlyListeners = latestRow?.monthlyListeners ?? null;
  const monthlyListenersPrev = prevRow?.monthlyListeners ?? null;

  return {
    latest,
    followers,
    followersDelta:
      followers !== null && followersPrev !== null ? followers - followersPrev : null,
    subs,
    subsDelta: subs !== null && subsPrev !== null ? subs - subsPrev : null,
    monthlyListeners,
    monthlyListenersDelta:
      monthlyListeners !== null && monthlyListenersPrev !== null
        ? monthlyListeners - monthlyListenersPrev
        : null,
  };
}

function getAllItemsForPlatform(p: Platform) {
  const rows = itemsDaily
    .filter((x) => x.platform === p)
    .slice()
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const byId = new Map<string, typeof rows>();
  for (const r of rows) {
    if (!byId.has(r.itemId)) byId.set(r.itemId, []);
    byId.get(r.itemId)!.push(r);
  }

  const out = [];
  for (const [itemId, list] of byId.entries()) {
    const latest = list[list.length - 1];
    const prev = list.length >= 2 ? list[list.length - 2] : null;
    const deltaTotal = prev ? latest.total - prev.total : null;

    out.push({
      platform: p,
      itemId,
      title: latest.title,
      latestDate: latest.date,
      total: latest.total,
      today: deltaTotal,
      likes: latest.likes ?? null,
      comments: latest.comments ?? null,
      shares: latest.shares ?? null,
    });
  }

  out.sort((a, b) => {
    if (a.latestDate !== b.latestDate) return a.latestDate < b.latestDate ? 1 : -1;
    return a.title.localeCompare(b.title);
  });

  return out;
}

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  spotify: "Spotify",
  youtube: "YouTube",
};

export default function DashboardClient() {
  const [tab, setTab] = useState<Platform>("spotify");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<
    "latestDate" | "title" | "total" | "today" | "likes" | "comments" | "shares"
  >("latestDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const ig = useMemo(() => getPlatformTotals("instagram"), []);
  const tt = useMemo(() => getPlatformTotals("tiktok"), []);
  const sp = useMemo(() => getPlatformTotals("spotify"), []);
  const yt = useMemo(() => getPlatformTotals("youtube"), []);

  const allItems = useMemo(() => getAllItemsForPlatform(tab), [tab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const arr = q ? allItems.filter((x) => x.title.toLowerCase().includes(q)) : allItems;

    const dirMul = sortDir === "asc" ? 1 : -1;

    arr.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (sortKey === "title" || sortKey === "latestDate") {
        return String(av).localeCompare(String(bv)) * dirMul;
      }
      return (Number(av) - Number(bv)) * dirMul;
    });

    return arr;
  }, [allItems, query, sortKey, sortDir]);

  function setSort(k: typeof sortKey) {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("desc");
    }
  }

  const card = (p: Platform) => {
    const t = p === "instagram" ? ig : p === "tiktok" ? tt : p === "spotify" ? sp : yt;

    const mainValue =
      p === "spotify"
        ? t.monthlyListeners
        : p === "youtube"
          ? t.subs
          : t.followers;

    const mainDelta =
      p === "spotify"
        ? t.monthlyListenersDelta
        : p === "youtube"
          ? t.subsDelta
          : t.followersDelta;

    const mainLabel =
      p === "spotify" ? "Ascoltatori mensili" : p === "youtube" ? "Iscritti" : "Follower";

    return (
      <button
        key={p}
        onClick={() => setTab(p)}
        className={[
          "rounded-2xl border px-4 py-4 text-left transition",
          tab === p ? "border-white/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
        ].join(" ")}
      >
        <div className="text-sm text-white/70">{PLATFORM_LABEL[p]}</div>
        <div className="mt-2 text-2xl font-semibold">
          {mainValue ?? "—"}
          {typeof mainDelta === "number" ? (
            <span
              className={[
                "ml-3 text-sm font-medium",
                mainDelta > 0 ? "text-green-400" : mainDelta < 0 ? "text-red-400" : "text-white/60",
              ].join(" ")}
            >
              {formatDelta(mainDelta)} oggi
            </span>
          ) : (
            <span className="ml-3 text-sm text-white/40">delta n/d</span>
          )}
        </div>
        <div className="mt-1 text-xs text-white/50">{mainLabel}</div>
        <div className="mt-3 text-xs text-white/40">Ultimo aggiornamento: {t.latest ?? "—"}</div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Kayro Dashboard</h1>
            <p className="mt-2 text-white/60">
              Andamenti giornalieri e contenuti (tutti). Quando colleghiamo le API, questi numeri
              diventano reali.
            </p>
          </div>
          <a
            href="/api/logout"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Esci
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {card("instagram")}
          {card("tiktok")}
          {card("spotify")}
          {card("youtube")}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70">
            Sezione: <span className="font-medium text-white">{PLATFORM_LABEL[tab]}</span>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca titolo (tutti i contenuti)…"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2 text-sm outline-none focus:border-white/40 sm:w-[320px]"
            />
            <div className="flex gap-2">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as any)}
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/40"
              >
                <option value="latestDate">Data</option>
                <option value="title">Titolo</option>
                <option value="today">Oggi (delta)</option>
                <option value="total">Totale</option>
                <option value="likes">Like</option>
                <option value="comments">Commenti</option>
                <option value="shares">Condivisioni</option>
              </select>
              <button
                onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm hover:bg-white/10"
              >
                {sortDir === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => setSort("title")} className="hover:text-white">
                      Titolo
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("today")} className="hover:text-white">
                      Oggi
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("total")} className="hover:text-white">
                      Totale
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("likes")} className="hover:text-white">
                      Like
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("comments")} className="hover:text-white">
                      Commenti
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("shares")} className="hover:text-white">
                      Condivisioni
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => setSort("latestDate")} className="hover:text-white">
                      Ultimo giorno
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-white/60" colSpan={8}>
                      Nessun contenuto trovato per questa piattaforma.
                      <div className="mt-2 text-xs text-white/40">
                        (È normale per IG/TikTok se non hai ancora postato / non abbiamo ancora
                        collegato i dati.)
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.itemId} className="border-t border-white/10">
                      <td className="px-4 py-3 font-medium">{r.title}</td>
                      <td className="px-4 py-3 text-white/60">{r.itemId}</td>

                      <td className="px-4 py-3 text-right">
                        {typeof r.today === "number" ? (
                          <span
                            className={
                              r.today > 0
                                ? "text-green-400"
                                : r.today < 0
                                  ? "text-red-400"
                                  : "text-white/60"
                            }
                          >
                            {formatDelta(r.today)}
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">{r.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        {r.likes ?? <span className="text-white/40">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.comments ?? <span className="text-white/40">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.shares ?? <span className="text-white/40">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-white/60">{r.latestDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <div>
              Contenuti mostrati: <span className="text-white/70">{filtered.length}</span>
            </div>
            <div className="text-white/40">Tip: usa la ricerca per trovare un video/brano specifico.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
