// In-memory demo store. Singleton across server requests; resets on cold start.
// Keep the same shape as the Drizzle row types so callers can swap freely.

import type { MenuItem, Order, Outlet } from "./schema";

type OrderItem = {
  menuItemId: string;
  name: string;
  qty: number;
  priceCents: number;
};

// Demo-mode rows use string ids (not real uuids), but the shape matches the
// Drizzle inferred types closely enough for our query surface.
export type DemoOutlet = Outlet;
export type DemoMenuItem = MenuItem;
export type DemoOrder = Order;

interface Store {
  outlets: DemoOutlet[];
  menuItems: DemoMenuItem[];
  orders: DemoOrder[];
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function minutesAgo(min: number) {
  return new Date(Date.now() - min * 60_000);
}

const DEMO_OWNER_ID = "demo";
const DEMO_OUTLET_ID = "outlet_brewsmith";

function seed(): Store {
  const outlet: DemoOutlet = {
    id: DEMO_OUTLET_ID,
    ownerId: DEMO_OWNER_ID,
    name: "Brewsmith Coffee — Demo",
    createdAt: new Date(),
  };

  const items: DemoMenuItem[] = [
    // Coffee & Beverages
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Cappuccino",
      category: "Coffee & Beverages",
      priceCents: 400,
      stock: 180,
      modifiers: [{ name: "Milk", options: ["Full", "Oat", "Almond", "Soy"] }],
      active: 1,
      createdAt: minutesAgo(60 * 48),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Iced Mocha",
      category: "Coffee & Beverages",
      priceCents: 550,
      stock: 120,
      modifiers: [{ name: "Size", options: ["Regular", "Large"] }],
      active: 1,
      createdAt: minutesAgo(60 * 48),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Ristretto Bianco",
      category: "Coffee & Beverages",
      priceCents: 450,
      stock: 90,
      modifiers: [],
      active: 1,
      createdAt: minutesAgo(60 * 47),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Iced Creamy Latte",
      category: "Coffee & Beverages",
      priceCents: 500,
      stock: 240,
      modifiers: [{ name: "Milk", options: ["Full", "Oat", "Almond"] }],
      active: 1,
      createdAt: minutesAgo(60 * 47),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Orange Juice",
      category: "Coffee & Beverages",
      priceCents: 400,
      stock: 520,
      modifiers: [],
      active: 1,
      createdAt: minutesAgo(60 * 46),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Earl Grey",
      category: "Coffee & Beverages",
      priceCents: 350,
      stock: 200,
      modifiers: [{ name: "Add-on", options: ["Lemon", "Honey"] }],
      active: 1,
      createdAt: minutesAgo(60 * 46),
    },
    // Snacks
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Butter Croissant",
      category: "Snacks",
      priceCents: 450,
      stock: 36,
      modifiers: [],
      active: 1,
      createdAt: minutesAgo(60 * 24),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Almond Biscotti",
      category: "Snacks",
      priceCents: 300,
      stock: 48,
      modifiers: [],
      active: 1,
      createdAt: minutesAgo(60 * 24),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Banana Bread",
      category: "Snacks",
      priceCents: 550,
      stock: 18,
      modifiers: [{ name: "Warm it up?", options: ["Yes", "No"] }],
      active: 1,
      createdAt: minutesAgo(60 * 22),
    },
    // Food
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "French Toast & Sugar",
      category: "Food",
      priceCents: 850,
      stock: 22,
      modifiers: [{ name: "Side", options: ["Bacon", "Berries", "Maple"] }],
      active: 1,
      createdAt: minutesAgo(60 * 20),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Avocado Smash",
      category: "Food",
      priceCents: 1450,
      stock: 14,
      modifiers: [{ name: "Add", options: ["Egg", "Feta", "Bacon"] }],
      active: 1,
      createdAt: minutesAgo(60 * 18),
    },
    {
      id: uid("mi"),
      outletId: outlet.id,
      name: "Mushroom Bruschetta",
      category: "Food",
      priceCents: 1650,
      stock: 0,
      modifiers: [],
      active: 0, // 86'd — out of stock
      createdAt: minutesAgo(60 * 16),
    },
  ];

  // Pick handy refs for seeded orders.
  const byName = (n: string) => items.find((i) => i.name === n)!;
  const cappuccino = byName("Cappuccino");
  const icedMocha = byName("Iced Mocha");
  const croissant = byName("Butter Croissant");
  const latte = byName("Iced Creamy Latte");
  const orange = byName("Orange Juice");
  const french = byName("French Toast & Sugar");
  const avo = byName("Avocado Smash");
  const earl = byName("Earl Grey");

  function mkOrder(
    list: { item: DemoMenuItem; qty: number }[],
    channel: DemoOrder["channel"],
    status: DemoOrder["status"],
    ageMin: number,
  ): DemoOrder {
    const orderItems: OrderItem[] = list.map(({ item, qty }) => ({
      menuItemId: item.id,
      name: item.name,
      qty,
      priceCents: item.priceCents,
    }));
    const totalCents = orderItems.reduce(
      (s, x) => s + x.priceCents * x.qty,
      0,
    );
    return {
      id: uid("ord"),
      outletId: outlet.id,
      items: orderItems,
      totalCents,
      status,
      channel,
      createdAt: minutesAgo(ageMin),
    };
  }

  const ordersSeed: DemoOrder[] = [
    mkOrder(
      [
        { item: cappuccino, qty: 2 },
        { item: croissant, qty: 1 },
      ],
      "dine_in",
      "paid",
      18 * 60 + 12,
    ),
    mkOrder(
      [
        { item: icedMocha, qty: 1 },
        { item: french, qty: 1 },
      ],
      "takeaway",
      "paid",
      14 * 60 + 5,
    ),
    mkOrder([{ item: avo, qty: 1 }], "dine_in", "paid", 9 * 60 + 30),
    mkOrder(
      [
        { item: latte, qty: 2 },
        { item: croissant, qty: 2 },
      ],
      "delivery",
      "paid",
      5 * 60 + 44,
    ),
    mkOrder(
      [
        { item: cappuccino, qty: 1 },
        { item: orange, qty: 1 },
      ],
      "dine_in",
      "ready",
      22,
    ),
    mkOrder([{ item: french, qty: 1 }], "takeaway", "preparing", 14),
    mkOrder(
      [
        { item: earl, qty: 3 },
        { item: croissant, qty: 1 },
      ],
      "delivery",
      "preparing",
      7,
    ),
    mkOrder([{ item: icedMocha, qty: 2 }], "takeaway", "open", 2),
  ];

  return { outlets: [outlet], menuItems: items, orders: ordersSeed };
}

// Singleton — survives across hot-module reloads in dev too.
declare global {
  var __miseDemoStore: Store | undefined;
}

export const demoStore: Store =
  globalThis.__miseDemoStore ?? (globalThis.__miseDemoStore = seed());

export const DEMO_OUTLET_ID_CONST = DEMO_OUTLET_ID;
export const DEMO_OWNER_ID_CONST = DEMO_OWNER_ID;

// Mutation helpers used by server actions.

export function listMenuItems(outletId: string): DemoMenuItem[] {
  return demoStore.menuItems
    .filter((m) => m.outletId === outletId)
    .sort((a, b) => {
      if (a.category === b.category) return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category);
    });
}

export function insertMenuItem(
  data: Omit<DemoMenuItem, "id" | "createdAt">,
): DemoMenuItem {
  const row: DemoMenuItem = {
    ...data,
    id: uid("mi"),
    createdAt: new Date(),
  };
  demoStore.menuItems.push(row);
  return row;
}

export function updateMenuItem(
  id: string,
  patch: Partial<Omit<DemoMenuItem, "id" | "createdAt" | "outletId">>,
): DemoMenuItem | null {
  const idx = demoStore.menuItems.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  demoStore.menuItems[idx] = { ...demoStore.menuItems[idx], ...patch };
  return demoStore.menuItems[idx];
}

export function deleteMenuItem(id: string): boolean {
  const before = demoStore.menuItems.length;
  demoStore.menuItems = demoStore.menuItems.filter((m) => m.id !== id);
  return demoStore.menuItems.length < before;
}

export function listOrders(outletId: string, limit = 50): DemoOrder[] {
  return demoStore.orders
    .filter((o) => o.outletId === outletId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function insertOrder(
  data: Omit<DemoOrder, "id" | "createdAt">,
): DemoOrder {
  const row: DemoOrder = {
    ...data,
    id: uid("ord"),
    createdAt: new Date(),
  };
  demoStore.orders.unshift(row);
  return row;
}

export function updateOrderStatus(
  id: string,
  status: DemoOrder["status"],
): DemoOrder | null {
  const idx = demoStore.orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  demoStore.orders[idx] = { ...demoStore.orders[idx], status };
  return demoStore.orders[idx];
}
