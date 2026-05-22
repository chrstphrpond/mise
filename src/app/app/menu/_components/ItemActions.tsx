"use client";

import { useState, useTransition } from "react";
import { Trash2, Power } from "lucide-react";
import { deleteMenuItemAction, toggle86Action } from "../actions";

export function ItemActions({
  id,
  active,
  name,
}: {
  id: string;
  active: number;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function toggle() {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("active", String(active));
    startTransition(async () => {
      await toggle86Action(fd);
    });
  }

  function destroy() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await deleteMenuItemAction(fd);
    });
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        aria-label={active === 1 ? `86 ${name}` : `Un-86 ${name}`}
        title={active === 1 ? "86 item" : "Un-86 item"}
        className={
          "inline-flex items-center justify-center size-8 rounded-full transition-colors " +
          (active === 1
            ? "text-ink-muted hover:bg-surface-cream hover:text-amber-700"
            : "text-amber-700 bg-amber-50 hover:bg-amber-100")
        }
      >
        <Power className="size-4" />
      </button>
      <button
        type="button"
        onClick={destroy}
        disabled={isPending}
        aria-label={`Delete ${name}`}
        title={confirming ? "Click again to confirm" : "Delete"}
        className={
          "inline-flex items-center justify-center size-8 rounded-full transition-colors " +
          (confirming
            ? "text-white bg-red-600 hover:bg-red-700"
            : "text-ink-muted hover:bg-surface-cream hover:text-red-700")
        }
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
