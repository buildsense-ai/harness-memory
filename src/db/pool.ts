import { Pool } from "pg";
export function createPool() {
  if (!process.env.DATABASE_URL) throw Error("DATABASE_URL required");
  const max = Number(process.env.DATABASE_POOL_MAX ?? 5);
  if (!Number.isSafeInteger(max) || max < 3 || max > 100) throw Error('invalid DATABASE_POOL_MAX');
  return new Pool({ connectionString: process.env.DATABASE_URL, max });
}
