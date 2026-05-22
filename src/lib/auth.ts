import { cookies, headers } from "next/headers";
import { isLiveMode } from "./db/client";

export const DEMO_COOKIE = "mise_demo";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  demo: boolean;
}

const DEMO_USER: AppUser = {
  id: "demo",
  name: "Demo Operator",
  email: "demo@mise.app",
  demo: true,
};

export async function currentUser(): Promise<AppUser | null> {
  // In live mode, a real session takes precedence. If none exists, we still
  // allow the demo cookie path — but only when there is no Better Auth
  // session cookie at all. A stale demo cookie + real session must resolve
  // to the real user, never the sandbox.
  if (isLiveMode) {
    const { auth } = await import("./auth-server");
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });
    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name || session.user.email,
        email: session.user.email,
        demo: false,
      };
    }
    // If a Better Auth session cookie is present but the session is invalid
    // (expired / revoked), do not silently downgrade to demo — return null.
    const cookieHeader = h.get("cookie") ?? "";
    if (/(^|;\s*)better-auth\.session_token/.test(cookieHeader)) return null;
  }

  const store = await cookies();
  if (store.get(DEMO_COOKIE)?.value === "1") return DEMO_USER;
  return null;
}

export async function hasDemoCookie(): Promise<boolean> {
  const store = await cookies();
  return store.get(DEMO_COOKIE)?.value === "1";
}
