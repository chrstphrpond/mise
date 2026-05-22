import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | null = null;

function init(): Db {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is required. Set it via Doppler (mise/dev or mise/prd) or .env.local.",
    );
  }
  _db = drizzle(neon(url), { schema });
  return _db;
}

// Lazy proxy: the connection is only constructed on first property access.
// This keeps the module import cheap and lets `next build` succeed without
// DATABASE_URL — only runtime requests that actually query the DB will
// trigger init.
export const db = new Proxy({} as Db, {
  get(_target, prop) {
    return (init() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
