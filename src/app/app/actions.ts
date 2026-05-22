"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_COOKIE } from "@/lib/auth";
import { isLiveMode } from "@/lib/db/client";

export async function enterDemoAction() {
  const store = await cookies();
  store.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/app/today");
}

export async function signOutAction() {
  const store = await cookies();
  store.delete(DEMO_COOKIE);
  if (isLiveMode) {
    const { auth } = await import("@/lib/auth-server");
    await auth.api.signOut({ headers: await headers() });
  }
  redirect("/app/welcome");
}
