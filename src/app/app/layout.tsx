import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { isLiveMode } from "@/lib/db/client";
import { signOutAction } from "./actions";
import { AppNav } from "./_components/AppNav";

export const metadata: Metadata = {
  title: "Operator Dashboard",
  description:
    "Mise operator dashboard — live orders, menu, and today's revenue.",
  robots: { index: false, follow: false },
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-surface-cream">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-0 px-3 py-3 md:flex-row md:px-5 md:py-5">
        <aside className="md:sticky md:top-5 md:h-[calc(100vh-2.5rem)] md:w-64 shrink-0">
          <div className="flex h-full flex-col rounded-3xl bg-white ring-1 ring-line/70 shadow-[0_20px_60px_-30px_rgba(12,12,12,0.18)] p-5">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-display text-lg font-medium tracking-tight">
                  Mise
                </span>
              </Link>
              {!isLiveMode ? (
                <span className="rounded-full bg-primary-10 px-2 py-0.5 text-[10px] font-medium text-primary-90">
                  Demo
                </span>
              ) : null}
            </div>

            {user ? (
              <div className="mt-5 rounded-2xl bg-surface-cream p-3">
                <p className="text-[11px] uppercase tracking-wider text-ink-muted">
                  Signed in as
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink-title">
                  {user.name}
                </p>
                <p className="text-xs text-ink-muted truncate">{user.email}</p>
              </div>
            ) : null}

            <AppNav />

            <div className="mt-auto pt-4">
              {user ? (
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-surface-cream py-2 text-sm text-ink-muted ring-1 ring-line hover:bg-surface-muted hover:text-ink"
                  >
                    Sign out
                  </button>
                </form>
              ) : null}
              <p className="mt-3 text-[10px] text-ink-muted leading-relaxed">
                {isLiveMode
                  ? "Connected to live Postgres."
                  : "Data is in-memory and resets when the server restarts."}
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 md:pl-5 mt-3 md:mt-0">{children}</main>
      </div>
    </div>
  );
}
