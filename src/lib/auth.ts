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
  if (isLiveMode) {
    const { auth } = await import("./auth-server");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name || session.user.email,
        email: session.user.email,
        demo: false,
      };
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
