import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const password = String(body?.password ?? "");

  const correct = process.env.DASH_PASSWORD;

  if (!correct) {
    return NextResponse.json(
      { ok: false, error: "DASH_PASSWORD non impostata su Vercel" },
      { status: 500 }
    );
  }

  if (password !== correct) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // cookie sessione
  res.cookies.set("dash_session", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 giorni
  });

  return res;
}
