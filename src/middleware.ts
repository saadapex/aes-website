import { NextRequest, NextResponse } from "next/server";

/**
 * Exposes the request pathname as an HTTP header so server components
 * (e.g. CanonicalTag) can read it without making pages dynamic unnecessarily.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
