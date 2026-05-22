import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { SimulateOrderButton } from "./_components/SimulateOrderButton";
import { OrderCard } from "./_components/OrderCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) redirect("/app/welcome");

  const client = await db();
  const outletId = await client.defaultOutletId(user.id);
  const orders = await client.listOrders(outletId, 50);

  const openCount = orders.filter((o) => o.status !== "paid").length;

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">
            {openCount} open · {orders.length} total
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl font-medium tracking-tight">
            Orders
          </h1>
        </div>
        <SimulateOrderButton />
      </header>

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white ring-1 ring-line/70 p-10 text-center">
          <p className="text-sm text-ink-muted">No orders yet. Simulate one.</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}
