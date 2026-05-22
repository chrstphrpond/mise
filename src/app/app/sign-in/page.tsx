import { redirect } from "next/navigation";
import { isLiveMode } from "@/lib/db/client";
import { currentUser } from "@/lib/auth";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BlurTextEffect } from "@/components/ui/BlurTextEffect";
import { SignInForm } from "./_components/SignInForm";

export const metadata = {
  title: "Sign in",
};

export default async function SignInPage() {
  if (!isLiveMode) redirect("/app/welcome");
  const user = await currentUser();
  if (user && !user.demo) redirect("/app/today");

  return (
    <div className="rounded-3xl bg-white ring-1 ring-line/70 shadow-[0_30px_80px_-30px_rgba(12,12,12,0.18)] p-8 md:p-12 max-w-xl">
      <Eyebrow>Operator Dashboard · Sign in</Eyebrow>
      <h1 className="mt-5 text-3xl md:text-4xl font-medium tracking-tight leading-[1.05]">
        <BlurTextEffect>Drop your email. Land in your back office.</BlurTextEffect>
      </h1>
      <p className="mt-5 text-base text-ink-muted leading-relaxed">
        We&apos;ll email you a one-tap sign-in link. No password, no signup
        form. The link expires in 5 minutes.
      </p>

      <SignInForm />

      <p className="mt-6 text-[12px] leading-relaxed text-ink-muted">
        Just here to see the dashboard?{" "}
        <a href="/app/welcome" className="underline underline-offset-2 hover:text-ink">
          Use the demo cookie instead
        </a>
        .
      </p>
    </div>
  );
}
