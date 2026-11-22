import { randomBytes } from 'node:crypto';
import type { Pool } from 'pg';
import { assert, sha256 } from '../contracts.js';

export const defaultBotProject = 'prj_bot_uploads';

export async function issueBotMemoryKey(pool: Pool, project: string, bot: string) {
  const token = 'bmr_' + randomBytes(32).toString('hex');
  await pool.query(
    `insert into bot_memory_keys(project_id,bot_uid,key_hash) values($1,$2,$3)
     on conflict(project_id,bot_uid) do update set key_hash=excluded.key_hash`,
    [project, bot, sha256(token)],
  );
  return { bot_uid: bot, token };
}

export async function revokeBotMemoryKey(pool: Pool, project: string, bot: string) {
  await pool.query('delete from bot_memory_keys where project_id=$1 and bot_uid=$2', [project, bot]);
}

export async function authenticateBotMemory(pool: Pool, project: string, authorization: string | undefined) {
  const token = /^Bearer (bmr_[0-9a-f]{64})$/.exec(authorization ?? '')?.[1];
  assert(token, 'Bot memory read token required', 401);
  const { rows: [identity] } = await pool.query<{ bot_uid: string }>(
    'select bot_uid from bot_memory_keys where project_id=$1 and key_hash=$2',
    [project, sha256(token)],
  );
  assert(identity, 'invalid Bot memory read token', 401);
  return identity.bot_uid;
}
