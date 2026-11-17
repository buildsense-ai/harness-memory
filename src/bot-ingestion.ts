import { randomBytes } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import { assert, sha256, type UploadBatch } from './contracts.js';
import { isObject } from './extraction/output.js';
import { ingestBatch } from './ingest.js';
import { ingestFragment } from './record-fragments.js';
import { registerManifest } from './ingestion/manifests.js';
import { botUid, type UploadBot } from './ingestion/bot-identity.js';

/** UID declares provenance. These upload routes intentionally do not authenticate callers. */
export async function registerBotIngestion(app: FastifyInstance, pool: Pool, project: string) {
  app.get('/v1/bot-ingest/config', async () => ({ dataset_id: process.env.MEMORY_DATASET_ID ?? 'bot-memory-v1' }));
  const resolve = async (uid: unknown, body: unknown) => {
    assert(isObject(body), 'invalid upload');
    const bot: UploadBot = { uid: botUid(uid) };
    if (body.bot_name !== undefined) {
      assert(typeof body.bot_name === 'string' && body.bot_name.trim().length > 0 && body.bot_name.length <= 512, 'invalid bot name');
      bot.name = body.bot_name.trim();
    }
    assert(body.dataset_id === (process.env.MEMORY_DATASET_ID ?? 'bot-memory-v1'), 'memory dataset mismatch', 409);
    assert(typeof body.source_id === 'string' && /^[A-Za-z0-9_-]{1,160}$/.test(body.source_id), 'invalid bot source');
    await pool.query('insert into projects(id,name,key_hash) values($1,$2,$3) on conflict(id) do nothing',
      [project, 'Bot memory uploads', sha256(randomBytes(32))]);
    await pool.query(`insert into ingestion_bots(project_id,bot_uid,name) values($1,$2,$3)
      on conflict(project_id,bot_uid) do update set name=coalesce(excluded.name,ingestion_bots.name),updated_at=now()`,
    [project, bot.uid, bot.name ?? null]);
    return { bot, body: { ...body, source_id: 'bot:' + bot.uid + ':' + body.source_id } };
  };
  app.post<{ Params: { uid: string } }>('/v1/bots/:uid/ingest/manifests', async request => {
    const upload = await resolve(request.params.uid, request.body);
    return registerManifest(pool, project, upload.body);
  });
  app.post<{ Params: { uid: string }; Body: UploadBatch }>('/v1/bots/:uid/ingest/batches', async request => {
    const upload = await resolve(request.params.uid, request.body);
    return ingestBatch(pool, project, { ...request.body, source_id: upload.body.source_id }, undefined, upload.bot);
  });
  app.post<{ Params: { uid: string } }>('/v1/bots/:uid/ingest/fragments', async request => {
    const upload = await resolve(request.params.uid, request.body);
    return ingestFragment(pool, project, upload.body, undefined, upload.bot);
  });
}
