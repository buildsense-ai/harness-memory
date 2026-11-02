import { Pool } from "pg";
export function createPool() {
  if (!process.env.DATABASE_URL) throw Error("DATABASE_URL required");
  return new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
}
