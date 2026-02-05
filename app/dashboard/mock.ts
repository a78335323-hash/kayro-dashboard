export type Platform = "instagram" | "tiktok" | "spotify" | "youtube";

export type DailyPlatformSnapshot = {
  date: string;
  platform: Platform;
  followers?: number;
  subscribers?: number;
  monthlyListeners?: number;
};

export type DailyItemSnapshot = {
  date: string;
  platform: Platform;
  itemId: string;
  title: string;
  total: number; // plays o views totali
  likes?: number;
  comments?: number;
  shares?: number;
};

export const platformDaily: DailyPlatformSnapshot[] = [
  { date: "2026-02-03", platform: "instagram", followers: 1200 },
  { date: "2026-02-04", platform: "instagram", followers: 1210 },
  { date: "2026-02-05", platform: "instagram", followers: 1222 },

  { date: "2026-02-03", platform: "tiktok", followers: 800 },
  { date: "2026-02-04", platform: "tiktok", followers: 820 },
  { date: "2026-02-05", platform: "tiktok", followers: 835 },

  { date: "2026-02-03", platform: "spotify", monthlyListeners: 950 },
  { date: "2026-02-04", platform: "spotify", monthlyListeners: 980 },
  { date: "2026-02-05", platform: "spotify", monthlyListeners: 1020 },

  { date: "2026-02-03", platform: "youtube", subscribers: 300 },
  { date: "2026-02-04", platform: "youtube", subscribers: 310 },
  { date: "2026-02-05", platform: "youtube", subscribers: 320 },
];

export const itemsDaily: DailyItemSnapshot[] = [
  // Spotify (brani)
  { date: "2026-02-04", platform: "spotify", itemId: "s1", title: "Brano 1", total: 12000 },
  { date: "2026-02-05", platform: "spotify", itemId: "s1", title: "Brano 1", total: 12034 },

  { date: "2026-02-04", platform: "spotify", itemId: "s2", title: "Brano 2", total: 8000 },
  { date: "2026-02-05", platform: "spotify", itemId: "s2", title: "Brano 2", total: 8021 },

  // YouTube (video)
  { date: "2026-02-04", platform: "youtube", itemId: "y1", title: "Video 1", total: 44000 },
  { date: "2026-02-05", platform: "youtube", itemId: "y1", title: "Video 1", total: 44210 },
];
