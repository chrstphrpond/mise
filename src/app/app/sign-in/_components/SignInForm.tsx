"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { signIn } from "@/lib/auth-client";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const result = await signIn.magicLink({
      email,
      callbackURL: "/app/today",
    });
    if (result.error) {
      setStatus({
        kind: "error",
        message: result.error.message ?? "Failed to send the link.",
      });
      return;
    }
    setStatus({ kind: "sent", email });
  }

  if (status.kind === "sent") {
    return (
      <div className="mt-8 rounded-2xl bg-surface-cream p-5 ring-1 ring-line/70">
        <p className="text-sm font-medium text-ink-title">Check your inbox.</p>
        <p className="mt-1 text-[13px] text-ink-muted">
          A sign-in link is on the way to{" "}
          <span className="font-medium text-ink">{status.email}</span>. The link
          expires in 5 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 max-w-md">
      <label htmlFor="email" className="text-[12px] uppercase tracking-wider text-ink-muted">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@restaurant.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
      <Button type="submit" variant="primary" size="lg" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </Button>
      {status.kind === "error" ? (
        <p className="text-[13px] text-red-600">{status.message}</p>
      ) : null}
    </form>
  );
}
