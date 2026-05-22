import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { formatCents, channelLabel } from "../_lib/format";

export const dynamic = "force-dynamic";

export const metadata = { title: "Today" };

export default async function TodayPage() {
  const user = await currentUser();
  if (!user) redirect("/app/welcome");

  const client = await db();
  const outletId = await client.defaultOutletId(user.id);
  const orders = await client.listOrders(outletId, 200);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todays = orders.filter((o) => o.createdAt >= startOfToday);
  const paidToday = todays.filter((o) => o.status === "paid");

  const revenueCents = paidToday.reduce((s, o) => s + o.totalCents, 0);
  const orderCount = todays.length;
  const avgTicketCents = paidToday.length
    ? Math.round(revenueCents / paidToday.length)
    : 0;

  const channelTotals = todays.reduce<Record<string, number>>((acc, o) => {
    acc[o.channel] = (acc[o.channel] ?? 0) + 1;
    return acc;
  }, {});
  const totalForBreakdown = orderCount || 1;
  const channels = (["dine_in", "takeaway", "delivery"] as const).map((c) => ({
    key: c,
    label: channelLabel(c),
    count: channelTotals[c] ?? 0,
    pct: Math.round(((channelTotals[c] ?? 0) / totalForBreakdown) * 100),
  }));

  const recent = orders.slice(0, 10);

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">Good morning, {user.name}.</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-medium tracking-tight">
            Today
          </h1>
        </div>
        <p className="text-xs text-ink-muted hidden md:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Today's revenue" value={formatCents(revenueCents)} sub={`${paidToday.length} paid orders`} accent />
        <Stat label="Orders" value={String(orderCount)} sub="All channels" />
        <Stat label="Average ticket" value={formatCents(avgTicketCents)} sub="Paid orders only" />
      </section>

      <section className="rounded-3xl bg-white ring-1 ring-line/70 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium tracking-tight text-ink-title">
            Channel mix
          </h2>
          <p className="text-xs text-ink-muted">{orderCount} orders today</p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {channels.map((c) => (
            <div key={c.key} className="flex flex-col gap-2">
              <div className="flex items-end gap-1 h-24">
                <div
                  className="flex-1 rounded-md bg-primary"
                  style={{ height: `${Math.max(8, c.pct)}%` }}
                />
                <div
                  className="flex-1 rounded-md bg-primary-20"
                  style={{ height: `${Math.max(4, c.pct * 0.65)}%` }}
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-ink-title">{c.pct}%</p>
                <p className="text-xs text-ink-muted">
                  {c.label} · {c.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white ring-1 ring-line/70 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium tracking-tight text-ink-title">
            Recent orders
          </h2>
          <a href="/app/orders" className="text-xs text-primary-90 hover:underline">
            View all →
          </a>
        </div>
        <div className="mt-4 divide-y divide-line/70">
          {recent.length === 0 ? (
            <p className="text-sm text-ink-muted py-6">No orders yet.</p>
          ) : (
            recent.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[11px] text-ink-muted">
                    #{o.id.slice(-6)}
                  </span>
                  <ChannelPill channel={o.channel} />
                  <span className="text-ink-muted truncate">
                    {(o.items as { qty: number }[]).reduce(
                      (s, x) => s + x.qty,
                      0,
                    )}{" "}
                    items
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={o.status} />
                  <span className="tabular-nums font-medium">
                    {formatCents(o.totalCents)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-3xl p-6 ring-1 " +
        (accent
          ? "bg-primary text-white ring-primary/40 shadow-[0_20px_60px_-30px_rgba(162,123,92,0.55)]"
          : "bg-white text-ink-title ring-line/70")
      }
    >
      <p className={"text-xs " + (accent ? "text-primary-10/80" : "text-ink-muted")}>
        {label}
      </p>
      <p className="mt-2 text-3xl md:text-4xl font-display font-medium tracking-tight tabular-nums">
        {value}
      </p>
      {sub ? (
        <p className={"mt-1 text-xs " + (accent ? "text-primary-10/70" : "text-ink-muted")}>
          {sub}
        </p>
      ) : null}
    </div>
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
