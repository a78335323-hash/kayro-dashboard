import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url), 302);
  res.cookies.set("dash_session", "", { path: "/", maxAge: 0 });
  return res;
}
