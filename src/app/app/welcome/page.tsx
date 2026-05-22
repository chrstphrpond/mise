import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BlurTextEffect } from "@/components/ui/BlurTextEffect";
import { isLiveMode } from "@/lib/db/client";
import { currentUser, hasDemoCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { enterDemoAction } from "../actions";
import { Database, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "Try the demo",
};

export default async function WelcomePage() {
  if (await hasDemoCookie()) redirect("/app/today");
  if (isLiveMode) {
    const user = await currentUser();
    if (user && !user.demo) redirect("/app/today");
  }

  return (
    <div className="rounded-3xl bg-white ring-1 ring-line/70 shadow-[0_30px_80px_-30px_rgba(12,12,12,0.18)] p-8 md:p-12">
      <Eyebrow>Operator Dashboard · Demo</Eyebrow>
      <h1 className="mt-5 max-w-2xl text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
        <BlurTextEffect>A working slice of the Mise back office.</BlurTextEffect>
      </h1>
      <p className="mt-5 max-w-xl text-base md:text-lg text-ink-muted leading-relaxed">
        This is the same Mise you saw on the landing page — only now it is wired
        to a real menu, real orders, and real revenue queries. No signup. No
        credit card. Click below and you are in.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl">
        <Feature
          icon={<Zap className="size-4" />}
          title="Pre-seeded"
          body="One outlet, twelve menu items, eight orders across the last 24 hours."
        />
        <Feature
          icon={<Database className="size-4" />}
          title={isLiveMode ? "Neon Postgres" : "In-memory store"}
          body={
            isLiveMode
              ? "Live mode — data persists across requests via Drizzle + Neon."
              : "Resets when the server restarts. Set DATABASE_URL to switch to Neon."
          }
        />
        <Feature
          icon={<Lock className="size-4" />}
          title={isLiveMode ? "Demo or sign-in" : "Cookie auth"}
          body={
            isLiveMode
              ? "Try the sandbox cookie path, or sign in via magic link for a per-user outlet."
              : "A short-lived demo cookie scopes you to a sandbox outlet."
          }
        />
      </div>

      <form action={enterDemoAction} className="mt-10 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" size="lg">
          Enter demo
        </Button>
        {isLiveMode ? (
          <Button href="/app/sign-in" variant="secondary" size="lg">
            Or sign in with email
          </Button>
        ) : null}
        <Button href="/" variant="ghost" size="lg">
          Back to home
        </Button>
      </form>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-surface-cream p-4">
      <div className="flex items-center gap-2 text-primary-90">
        {icon}
        <p className="text-sm font-semibold text-ink-title">{title}</p>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
        {body}
      </p>
    </div>
  );
}
