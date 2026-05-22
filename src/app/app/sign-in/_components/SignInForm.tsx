"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { signIn } from "@/lib/auth-client";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string; sentAt: number }
  | { kind: "error"; message: string };

const RESEND_COOLDOWN_SEC = 30;

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function send(emailToSend: string) {
    setStatus({ kind: "sending" });
    const result = await signIn.magicLink({
      email: emailToSend,
      callbackURL: "/app/today",
    });
    if (result.error) {
      setStatus({
        kind: "error",
        message: result.error.message ?? "Failed to send the link.",
      });
      return;
    }
    setStatus({ kind: "sent", email: emailToSend, sentAt: Date.now() });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await send(email);
  }

  if (status.kind === "sent") {
    return (
      <InboxState
        email={status.email}
        sentAt={status.sentAt}
        onEdit={() => setStatus({ kind: "idle" })}
        onResend={() => send(status.email)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 max-w-md">
      <label
        htmlFor="email"
        className="text-[12px] uppercase tracking-wider text-ink-muted"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        autoFocus
        placeholder="you@restaurant.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40"
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status.kind === "sending"}
      >
        {status.kind === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </Button>
      {status.kind === "error" ? (
        <p role="alert" className="text-[13px] text-red-600">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

function InboxState({
  email,
  sentAt,
  onEdit,
  onResend,
}: {
  email: string;
  sentAt: number;
  onEdit: () => void;
  onResend: () => Promise<void>;
}) {
  const [now, setNow] = useState(() => Date.now());
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(
    0,
    Math.ceil((sentAt + RESEND_COOLDOWN_SEC * 1000 - now) / 1000),
  );
  const canResend = remaining === 0 && !resending;

  async function handleResend() {
    setResending(true);
    await onResend();
    setResending(false);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-8 rounded-2xl bg-surface-cream p-5 ring-1 ring-line/70 max-w-md"
    >
      <p className="text-sm font-medium text-ink-title">Check your inbox.</p>
      <p className="mt-1 text-[13px] text-ink-muted leading-relaxed">
        A sign-in link is on the way to{" "}
        <span className="font-medium text-ink">{email}</span>. The link expires
        in 5 minutes.
      </p>
      <p className="mt-2 text-[12px] text-ink-muted/90">
        Don&apos;t see it? Check your spam folder.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
        <a
          href="mailto:"
          className="font-medium text-ink underline underline-offset-2 hover:text-primary-90"
        >
          Open mail app →
        </a>
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="font-medium text-ink underline underline-offset-2 hover:text-primary-90 disabled:text-ink-muted disabled:no-underline disabled:cursor-not-allowed"
        >
          {resending
            ? "Resending…"
            : canResend
              ? "Resend link"
              : `Resend in ${remaining}s`}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="font-medium text-ink-muted underline underline-offset-2 hover:text-ink"
        >
          Wrong email?
        </button>
      </div>
    </div>
  );
}
