import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lascia passare login e api
  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Cookie di sessione
  const session = req.cookies.get("dash_session")?.value;

  // Se non c’è sessione → manda a /login
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
