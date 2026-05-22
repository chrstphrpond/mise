import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const outlets = pgTable("outlets", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: text("owner_id").notNull(), // Clerk user id (or "demo")
  name: varchar("name", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  outletId: uuid("outlet_id")
    .notNull()
    .references(() => outlets.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 120 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  priceCents: integer("price_cents").notNull(),
  stock: integer("stock").notNull().default(0),
  modifiers: jsonb("modifiers")
    .$type<{ name: string; options: string[] }[]>()
    .default([]),
  active: integer("active").notNull().default(1), // 1 = active, 0 = 86'd
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  outletId: uuid("outlet_id")
    .notNull()
    .references(() => outlets.id, { onDelete: "cascade" }),
  items: jsonb("items")
    .$type<
      { menuItemId: string; name: string; qty: number; priceCents: number }[]
    >()
    .notNull(),
  totalCents: integer("total_cents").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // "open" | "preparing" | "ready" | "paid"
  channel: varchar("channel", { length: 20 }).notNull(), // "dine_in" | "takeaway" | "delivery"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Outlet = typeof outlets.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
export type NewOrder = typeof orders.$inferInsert;
