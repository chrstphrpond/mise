import { NextResponse, type NextRequest } from "next/server";

const DEMO_COOKIE = "mise_demo";
const PUBLIC_APP_ROUTES = new Set(["/app/welcome", "/app/sign-in"]);

function isAppRoute(pathname: string) {
  return pathname === "/app" || pathname.startsWith("/app/");
}

function hasBetterAuthSession(req: NextRequest) {
  // Better Auth sets a cookie whose name starts with `better-auth.session_token`.
  // We don't validate the token here — that's auth-server's job. We only check
  // for its presence so the gate doesn't bounce an authenticated user back to
  // welcome.
  for (const c of req.cookies.getAll()) {
    if (c.name.startsWith("better-auth.session_token") && c.value) return true;
  }
  return false;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isAppRoute(pathname)) return NextResponse.next();
  if (PUBLIC_APP_ROUTES.has(pathname)) return NextResponse.next();

  const hasDemo = req.cookies.get(DEMO_COOKIE)?.value === "1";
  if (hasDemo || hasBetterAuthSession(req)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/app/welcome";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/app/:path*"],
};
