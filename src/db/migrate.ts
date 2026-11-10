import type { Pool } from "pg";
import { readFile } from "node:fs/promises";
export async function migrate(pool: Pool) {
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    await c.query("select pg_advisory_xact_lock(846016)");
    await c.query(await readFile("src/db/migrations/001_initial.sql", "utf8"));
    await c.query(await readFile("src/db/migrations/002_task_threads.sql", "utf8"));
    await c.query(await readFile("src/db/migrations/003_memory_documents.sql", "utf8"));
    await c.query("COMMIT");
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
  }
}
