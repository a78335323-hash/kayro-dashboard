import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ lascia passare API, login e file statici
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // ✅ controlla cookie sessione
  const session = req.cookies.get("dash_session")?.value;

  // se non c'è sessione -> manda al login
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // ✅ proteggi tutto TRANNE api, statici e login
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
