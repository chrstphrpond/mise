"use client";

import { useTransition } from "react";
import { Sparkles } from "lucide-react";
import { simulateOrder } from "../actions";

export function SimulateOrderButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await simulateOrder();
        })
      }
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 h-11 text-sm font-medium hover:bg-primary-70 shadow-[0_8px_24px_-12px_rgba(162,123,92,0.6)] disabled:opacity-60"
    >
      <Sparkles className="size-4" />
      {isPending ? "Creating…" : "Simulate order"}
    </button>
  );
}
