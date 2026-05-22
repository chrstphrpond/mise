"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { channelLabel, formatCents, timeAgo } from "../../_lib/format";
import { setOrderStatus } from "../actions";

type OrderItem = {
  menuItemId: string;
  name: string;
  qty: number;
  priceCents: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  totalCents: number;
  status: string;
  channel: string;
  createdAt: Date | string;
};

const STATUS_FLOW: Record<string, string | null> = {
  open: "preparing",
  preparing: "ready",
  ready: "paid",
  paid: null,
};

const NEXT_LABEL: Record<string, string> = {
  open: "Start preparing",
  preparing: "Mark ready",
  ready: "Mark paid",
};

export function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const createdAt =
    typeof order.createdAt === "string"
      ? new Date(order.createdAt)
      : order.createdAt;

  const nextStatus = STATUS_FLOW[order.status];
  const itemCount = order.items.reduce((s, x) => s + x.qty, 0);

  function advance() {
    if (!nextStatus) return;
    const fd = new FormData();
    fd.set("id", order.id);
    fd.set("status", nextStatus);
    startTransition(async () => {
      await setOrderStatus(fd);
    });
  }

  return (
    <article
      className={
        "rounded-2xl bg-white ring-1 transition-shadow " +
        (expanded ? "ring-primary/30 shadow-md" : "ring-line/70 hover:shadow-sm")
      }
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`order-${order.id}-details`}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-ink-muted">
              #{order.id.slice(-6)}
            </span>
            <ChannelPill channel={order.channel} />
            <StatusPill status={order.status} />
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="text-sm text-ink-muted">
              {itemCount} item{itemCount === 1 ? "" : "s"} ·{" "}
              {timeAgo(createdAt)}
            </p>
            <p className="tabular-nums font-medium text-ink-title">
              {formatCents(order.totalCents)}
            </p>
          </div>
        </div>
        <ChevronDown
          className={
            "size-4 mt-1 text-ink-muted transition-transform shrink-0 " +
            (expanded ? "rotate-180" : "")
          }
        />
      </button>

      {expanded ? (
        <div id={`order-${order.id}-details`} className="px-4 pb-4 pt-1 border-t border-line/70">
          <ul className="mt-3 space-y-1.5">
            {order.items.map((it, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-ink-title">
                  <span className="text-ink-muted mr-2">×{it.qty}</span>
                  {it.name}
                </span>
                <span className="tabular-nums text-ink-muted">
                  {formatCents(it.priceCents * it.qty)}
                </span>
              </li>
            ))}
          </ul>
          {nextStatus ? (
            <button
              type="button"
              onClick={advance}
              disabled={isPending}
              className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-primary text-white py-2 text-sm font-medium hover:bg-primary-70 disabled:opacity-60"
            >
              {isPending ? "Updating…" : NEXT_LABEL[order.status]}
            </button>
          ) : (
            <p className="mt-4 text-center text-xs text-ink-muted">
              Order closed.
            </p>
          )}
        </div>
      ) : null}
    </article>
  );
}

function ChannelPill({ channel }: { channel: string }) {
  const styles: Record<string, string> = {
    dine_in: "bg-secondary/10 text-secondary",
    takeaway: "bg-primary/15 text-primary-90",
    delivery: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={
        "rounded-full px-2 py-0.5 text-[10px] font-medium " +
        (styles[channel] ?? "bg-surface-muted text-ink-muted")
      }
    >
      {channelLabel(channel)}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: "bg-amber-50 text-amber-700",
    preparing: "bg-blue-50 text-blue-700",
    ready: "bg-emerald-50 text-emerald-700",
    paid: "bg-surface-muted text-ink-muted",
  };
  return (
    <span
      className={
        "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize " +
        (styles[status] ?? "bg-surface-muted text-ink-muted")
      }
    >
      {status}
    </span>
  );
}
