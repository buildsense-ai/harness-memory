import { readFile } from 'node:fs/promises';
import { Ajv } from 'ajv';
import { createPool } from '../src/db/pool.js';
import { projectRecord } from '../src/adapters/index.js';
import { workbenchMetadata, type WorkbenchCatalog } from '../src/workbench-metadata.js';
import { assert } from '../src/contracts.js';

const [project, catalogFile] = process.argv.slice(2);
assert(project, 'usage: tsx scripts/workbench-metadata.ts PROJECT_ID [CATALOG_JSON]');
const pool = createPool();
try {
  assert((await pool.query('select id from projects where id=$1', [project])).rowCount, 'unknown project');
  let updated = 0;
  for (;;) {
    const rows = (await pool.query(`select r.id,r.raw,s.harness from raw_records r join streams s using(project_id,source_id,stream_id)
      where r.project_id=$1 and r.metadata->>'workbench_metadata_version' is distinct from '1' order by r.id limit 200`, [project])).rows;
    if (!rows.length) break;
    const updates = rows.map(row => ({ id: row.id, metadata: workbenchMetadata(row.raw, projectRecord(row.harness, row.raw)) }));
    await pool.query(`update raw_records r set metadata=r.metadata||u.metadata from jsonb_to_recordset($2::jsonb) u(id text,metadata jsonb)
      where r.project_id=$1 and r.id=u.id`, [project, JSON.stringify(updates)]);
    updated += rows.length;
  }
  if (catalogFile) {
    const value: unknown = JSON.parse(await readFile(catalogFile, 'utf8'));
    const stringSchema = { type: 'string', maxLength: 512 };
    const validate = new Ajv().compile<WorkbenchCatalog>({ type: 'object', required: ['bots'], additionalProperties: false,
      properties: { bots: { type: 'object', additionalProperties: { type: 'object', required: ['name', 'sessions'], additionalProperties: false,
        properties: { name: stringSchema, sessions: { type: 'object', additionalProperties: stringSchema } } } } } });
    assert(validate(value), 'invalid workbench catalog: ' + JSON.stringify(validate.errors));
    await pool.query(`insert into workbench_catalog(project_id,data) values($1,$2) on conflict(project_id)
      do update set data=excluded.data,updated_at=now()`, [project, JSON.stringify(value)]);
  }
  console.log(JSON.stringify({ updated_records: updated, catalog_imported: Boolean(catalogFile) }));
} finally { await pool.end(); }
