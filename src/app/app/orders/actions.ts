"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db/client";

const StatusSchema = z.enum(["open", "preparing", "ready", "paid"]);
const ChannelSchema = z.enum(["dine_in", "takeaway", "delivery"]);

async function requireUserId() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user.id;
}

export async function setOrderStatus(formData: FormData) {
  await requireUserId();
  const id = String(formData.get("id") ?? "");
  const status = StatusSchema.parse(formData.get("status"));
  if (!id) throw new Error("Missing id");
  const client = await db();
  await client.updateOrderStatus(id, status);
  revalidatePath("/app/orders");
  revalidatePath("/app/today");
}

export async function simulateOrder() {
  const userId = await requireUserId();
  const client = await db();
  const outletId = await client.defaultOutletId(userId);
  const menu = await client.listMenu(outletId);
  const active = menu.filter((m) => m.active === 1 && m.stock > 0);
  if (active.length === 0) throw new Error("No active items to order");

  // Pick 2-3 random items.
  const count = 2 + Math.floor(Math.random() * 2);
  const picked: typeof active = [];
  const pool = [...active];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }

  const items = picked.map((m) => {
    const qty = 1 + Math.floor(Math.random() * 2);
    return {
      menuItemId: m.id,
      name: m.name,
      qty,
      priceCents: m.priceCents,
    };
  });
  const totalCents = items.reduce((s, x) => s + x.qty * x.priceCents, 0);

  const channels = ChannelSchema.options;
  const channel = channels[Math.floor(Math.random() * channels.length)];

  await client.insertOrder({
    outletId,
    items,
    totalCents,
    status: "open",
    channel,
  });

  revalidatePath("/app/orders");
  revalidatePath("/app/today");
}
