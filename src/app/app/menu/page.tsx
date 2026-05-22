import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { formatCents } from "../_lib/format";
import { AddItemDialog } from "./_components/AddItemDialog";
import { ItemActions } from "./_components/ItemActions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Menu" };

export default async function MenuPage() {
  const user = await currentUser();
  if (!user) redirect("/app/welcome");

  const client = await db(user);
  const outletId = await client.defaultOutletId(user.id);
  const items = await client.listMenu(outletId);

  const byCategory = items.reduce<Record<string, typeof items>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  const categoryOrder = Object.keys(byCategory).sort();

  const allCategories = Array.from(new Set(items.map((i) => i.category))).sort();

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">Menu management</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-medium tracking-tight">
            {items.length} items
          </h1>
        </div>
        <AddItemDialog categories={allCategories} />
      </header>

      {categoryOrder.length === 0 ? (
        <div className="rounded-3xl bg-white ring-1 ring-line/70 p-10 text-center">
          <p className="text-sm text-ink-muted">No menu items yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {categoryOrder.map((cat) => (
            <section
              key={cat}
              className="rounded-3xl bg-white ring-1 ring-line/70 overflow-hidden"
            >
              <header className="flex items-center justify-between px-6 py-4 bg-surface-cream/60">
                <h2 className="text-sm font-semibold text-ink-title">{cat}</h2>
                <span className="text-xs text-ink-muted">
                  {byCategory[cat].length} items
                </span>
              </header>
              <ul className="divide-y divide-line/70">
                {byCategory[cat].map((item) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-6 py-3.5 text-sm"
                  >
                    <div className="min-w-0">
                      <p
                        className={
                          "font-medium truncate " +
                          (item.active === 0 ? "text-ink-muted line-through" : "text-ink-title")
                        }
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-muted">
                        Stock: {item.stock}
                        {item.modifiers && item.modifiers.length
                          ? ` · ${item.modifiers.length} mod group${item.modifiers.length > 1 ? "s" : ""}`
                          : ""}
                      </p>
                    </div>
                    <span className="tabular-nums text-ink-title font-medium">
                      {formatCents(item.priceCents)}
                    </span>
                    <ItemActions
                      id={item.id}
                      active={item.active}
                      name={item.name}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
