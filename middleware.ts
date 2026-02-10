import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}
if (
  pathname.startsWith("/api") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/debug") ||
  pathname.startsWith("/_next") ||
  pathname.startsWith("/favicon.ico") ||
  pathname.startsWith("/login-1") ||
  pathname.startsWith("/login-2")
) {
  return NextResponse.next();
}
