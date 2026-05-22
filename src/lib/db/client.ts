/**
 * DB client abstraction.
 *
 * - Demo mode (default, no env): operates on the in-memory `demoStore`.
 * - Live mode (DATABASE_URL set): wraps a Drizzle/Neon client.
 *
 * Both modes expose the same async query surface so route code stays identical.
 */

import {
  DEMO_OUTLET_ID_CONST,
  type DemoMenuItem,
  type DemoOrder,
  deleteMenuItem,
  insertMenuItem,
  insertOrder,
  listMenuItems,
  listOrders,
  updateMenuItem,
  updateOrderStatus,
} from "./demo-store";

export const isLiveMode = !!process.env.DATABASE_URL;

export type MenuItemRow = DemoMenuItem;
export type OrderRow = DemoOrder;

export interface DbClient {
  defaultOutletId(ownerId: string): Promise<string>;
  listMenu(outletId: string): Promise<MenuItemRow[]>;
  insertMenu(
    data: Omit<MenuItemRow, "id" | "createdAt">,
  ): Promise<MenuItemRow>;
  updateMenu(
    id: string,
    patch: Partial<Omit<MenuItemRow, "id" | "createdAt" | "outletId">>,
  ): Promise<MenuItemRow | null>;
  deleteMenu(id: string): Promise<boolean>;
  listOrders(outletId: string, limit?: number): Promise<OrderRow[]>;
  insertOrder(
    data: Omit<OrderRow, "id" | "createdAt">,
  ): Promise<OrderRow>;
  updateOrderStatus(
    id: string,
    status: OrderRow["status"],
  ): Promise<OrderRow | null>;
}

const demoClient: DbClient = {
  async defaultOutletId() {
    return DEMO_OUTLET_ID_CONST;
  },
  async listMenu(outletId) {
    return listMenuItems(outletId);
  },
  async insertMenu(data) {
    return insertMenuItem(data);
  },
  async updateMenu(id, patch) {
    return updateMenuItem(id, patch);
  },
  async deleteMenu(id) {
    return deleteMenuItem(id);
  },
  async listOrders(outletId, limit) {
    return listOrders(outletId, limit);
  },
  async insertOrder(data) {
    return insertOrder(data);
  },
  async updateOrderStatus(id, status) {
    return updateOrderStatus(id, status);
  },
};

// Live client is intentionally lazy-loaded. We only import Drizzle/Neon when
// real env vars are present so the demo build stays slim.
let _liveClient: DbClient | null = null;

async function getLiveClient(): Promise<DbClient> {
  if (_liveClient) return _liveClient;
  const { neon } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const { eq, desc, and } = await import("drizzle-orm");
  const { menuItems, orders, outlets } = await import("./schema");

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  _liveClient = {
    async defaultOutletId(ownerId) {
      const rows = await db
        .select()
        .from(outlets)
        .where(eq(outlets.ownerId, ownerId))
        .limit(1);
      if (rows[0]) return rows[0].id;
      const [created] = await db
        .insert(outlets)
        .values({ ownerId, name: "My Outlet" })
        .returning();
      return created.id;
    },
    async listMenu(outletId) {
      return db
        .select()
        .from(menuItems)
        .where(eq(menuItems.outletId, outletId));
    },
    async insertMenu(data) {
      const [row] = await db.insert(menuItems).values(data).returning();
      return row;
    },
    async updateMenu(id, patch) {
      const [row] = await db
        .update(menuItems)
        .set(patch)
        .where(eq(menuItems.id, id))
        .returning();
      return row ?? null;
    },
    async deleteMenu(id) {
      const rows = await db
        .delete(menuItems)
        .where(eq(menuItems.id, id))
        .returning();
      return rows.length > 0;
    },
    async listOrders(outletId, limit = 50) {
      return db
        .select()
        .from(orders)
        .where(eq(orders.outletId, outletId))
        .orderBy(desc(orders.createdAt))
        .limit(limit);
    },
    async insertOrder(data) {
      const [row] = await db.insert(orders).values(data).returning();
      return row;
    },
    async updateOrderStatus(id, status) {
      const [row] = await db
        .update(orders)
        .set({ status })
        .where(and(eq(orders.id, id)))
        .returning();
      return row ?? null;
    },
  };
  return _liveClient;
}

/**
 * Pick the DB client for a given user.
 *
 * - Demo-cookie users → the in-memory store, even when DATABASE_URL is set.
 *   The cookie path is always the "try it without an account" sandbox.
 * - Real signed-in users → the live Neon Postgres via Drizzle.
 * - Anonymous/no user → demo store (only reachable from public welcome page).
 */
export async function db(
  user?: { demo: boolean } | null,
): Promise<DbClient> {
  if (user && !user.demo && isLiveMode) return getLiveClient();
  return demoClient;
}
