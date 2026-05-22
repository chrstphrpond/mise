"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db/client";

const MenuItemSchema = z.object({
  name: z.string().min(1).max(120),
  category: z.string().min(1).max(60),
  priceDollars: z.coerce.number().nonnegative(),
  stock: z.coerce.number().int().nonnegative(),
  modifiers: z.string().optional().default(""),
  active: z.coerce.number().int().min(0).max(1).default(1),
});

function parseModifiers(raw: string): { name: string; options: string[] }[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  // "Milk: Full, Oat, Almond | Size: Reg, Large"
  return trimmed
    .split("|")
    .map((g) => {
      const [name, opts] = g.split(":");
      if (!name || !opts) return null;
      const options = opts
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      if (!options.length) return null;
      return { name: name.trim(), options };
    })
    .filter((x): x is { name: string; options: string[] } => x !== null);
}

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function createMenuItem(formData: FormData) {
  const user = await requireUser();
  const parsed = MenuItemSchema.parse({
    name: formData.get("name"),
    category: formData.get("category"),
    priceDollars: formData.get("priceDollars"),
    stock: formData.get("stock"),
    modifiers: formData.get("modifiers"),
    active: formData.get("active") ?? 1,
  });

  const client = await db(user);
  const outletId = await client.defaultOutletId(user.id);

  await client.insertMenu({
    outletId,
    name: parsed.name,
    category: parsed.category,
    priceCents: Math.round(parsed.priceDollars * 100),
    stock: parsed.stock,
    modifiers: parseModifiers(parsed.modifiers ?? ""),
    active: parsed.active,
  });

  revalidatePath("/app/menu");
  revalidatePath("/app/today");
}

export async function updateMenuItemAction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  const parsed = MenuItemSchema.partial().parse({
    name: formData.get("name") ?? undefined,
    category: formData.get("category") ?? undefined,
    priceDollars: formData.get("priceDollars") ?? undefined,
    stock: formData.get("stock") ?? undefined,
    modifiers: formData.get("modifiers") ?? undefined,
    active: formData.get("active") ?? undefined,
  });

  const patch: Record<string, unknown> = {};
  if (parsed.name !== undefined) patch.name = parsed.name;
  if (parsed.category !== undefined) patch.category = parsed.category;
  if (parsed.priceDollars !== undefined)
    patch.priceCents = Math.round(parsed.priceDollars * 100);
  if (parsed.stock !== undefined) patch.stock = parsed.stock;
  if (parsed.modifiers !== undefined)
    patch.modifiers = parseModifiers(parsed.modifiers);
  if (parsed.active !== undefined) patch.active = parsed.active;

  const client = await db(user);
  await client.updateMenu(id, patch);
  revalidatePath("/app/menu");
}

export async function toggle86Action(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const current = Number(formData.get("active") ?? 1);
  if (!id) throw new Error("Missing id");
  const client = await db(user);
  await client.updateMenu(id, { active: current === 1 ? 0 : 1 });
  revalidatePath("/app/menu");
}

export async function deleteMenuItemAction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  const client = await db(user);
  await client.deleteMenu(id);
  revalidatePath("/app/menu");
}
