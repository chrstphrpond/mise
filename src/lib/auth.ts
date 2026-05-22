/**
 * Auth abstraction.
 *
 * - Demo mode: returns a synthetic user when the `mise_demo` cookie is set.
 * - Live mode: would call `auth()` / `currentUser()` from `@clerk/nextjs/server`
 *   (lazy-imported so the demo build doesn't require the Clerk dep).
 *
 * To switch: install `@clerk/nextjs`, set CLERK_SECRET_KEY +
 * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, and the live branch will activate.
 */

import { cookies } from "next/headers";
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
  if (isLiveMode) {
    try {
      // Lazy import — only required when running in live mode. The variable
      // indirection prevents the bundler from trying to resolve `@clerk/nextjs`
      // statically when it isn't installed (demo mode default).
      const clerkPkg = "@clerk/nextjs/server";
      const mod = (await import(/* webpackIgnore: true */ clerkPkg).catch(
        () => null,
      )) as { currentUser: () => Promise<unknown> } | null;
      if (!mod) return null;
      const u = (await mod.currentUser()) as
        | {
            id: string;
            firstName?: string | null;
            lastName?: string | null;
            emailAddresses?: { emailAddress: string }[];
          }
        | null;
      if (!u) return null;
      return {
        id: u.id,
        name: [u.firstName, u.lastName].filter(Boolean).join(" ") || "Operator",
        email: u.emailAddresses?.[0]?.emailAddress ?? "",
        demo: false,
      };
    } catch {
      return null;
    }
  }

  const store = await cookies();
  if (store.get(DEMO_COOKIE)?.value === "1") return DEMO_USER;
  return null;
}

export async function hasDemoCookie(): Promise<boolean> {
  const store = await cookies();
  return store.get(DEMO_COOKIE)?.value === "1";
}
