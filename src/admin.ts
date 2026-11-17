import { createPool } from "./db/pool.js";
import { migrate } from "./db/migrate.js";
import { createProject, createProjectKey } from "./db/projects.js";
import { assert } from './contracts.js';
const pool = createPool();
try {
  await migrate(pool);
  const [cmd, name] = process.argv.slice(2);
  if (cmd === "project-create" && name)
    console.log(JSON.stringify(await createProject(pool, name)));
  else if (cmd === "project-key-create" && name)
    console.log(JSON.stringify(await createProjectKey(pool, name)));
  else if (cmd === 'dataset-clear' && name) {
    assert(process.argv.includes('--workers-stopped'), 'Stop the service and all old uploaders before clearing data; pass --workers-stopped');
    assert(process.argv.includes('--confirm=' + name), 'Explicit --confirm=PROJECT_ID required');
    const c = await pool.connect();
    try {
      await c.query('begin');
      assert((await c.query('select pg_try_advisory_xact_lock(846017) locked')).rows[0].locked, 'memory worker is still running');
      assert((await c.query('select pg_try_advisory_xact_lock(846018) locked')).rows[0].locked, 'ingestion planner is still running');
      assert((await c.query('select 1 from projects where id=$1', [name])).rowCount, 'unknown project');
      for (const table of ['episode_events','memory_documents','memory_tasks','episodes','ingestion_episodes','ingestion_manifests','extraction_runs','events','ingest_fragments','ingest_receipts','raw_records','streams']) await c.query(`delete from ${table} where project_id=$1`, [name]);
      await c.query('commit');
      console.log(JSON.stringify({ project_id: name, status: 'cleared', retained: ['project', 'api keys', 'bot source logs'], next: 'Set a new MEMORY_DATASET_ID on the server and MONDAY_MEMORY_DATASET on uploader; archive local monday-memory-state.json before enabling the new uploader.' }));
    } catch (error) { await c.query('rollback'); throw error; } finally { c.release(); }
  }
  else if (cmd !== "migrate")
    throw Error("usage: admin migrate | project-create NAME | project-key-create PROJECT_ID | dataset-clear PROJECT_ID --workers-stopped --confirm=PROJECT_ID");
} finally {
  await pool.end();
}
