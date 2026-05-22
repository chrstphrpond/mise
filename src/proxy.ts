import { NextResponse, type NextRequest } from "next/server";

const DEMO_COOKIE = "mise_demo";

function isAppRoute(pathname: string) {
  return pathname === "/app" || pathname.startsWith("/app/");
}

function isWelcomeRoute(pathname: string) {
  return pathname === "/app/welcome";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isAppRoute(pathname)) return NextResponse.next();
  if (isWelcomeRoute(pathname)) return NextResponse.next();

  // Live mode: defer to Clerk's middleware if the env is provisioned. We don't
  // hard-import @clerk/nextjs so the demo build stays minimal.
  // When CLERK_SECRET_KEY is present in deployment, swap this proxy for
  //   import { clerkMiddleware } from "@clerk/nextjs/server"
  //   export default clerkMiddleware(...)
  if (process.env.CLERK_SECRET_KEY) {
    // Fall through — in a real live-mode deployment, replace this file.
    return NextResponse.next();
  }

  const hasDemo = req.cookies.get(DEMO_COOKIE)?.value === "1";
  if (!hasDemo) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/welcome";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
