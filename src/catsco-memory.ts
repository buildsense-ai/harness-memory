import { createHash, timingSafeEqual } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import { assert, sha256 } from './contracts.js';
import { isObject } from './extraction/output.js';

const memoryId = /^mem_[\da-f-]{36}$/i;
const uid = /^[1-9][0-9]{0,18}$/;

function botFromSource(source: string | null): string | null {
  return /^bot:([1-9][0-9]{0,18}):/.exec(source ?? '')?.[1] ?? null;
}

function topicFor(session: string | null, bot: string): string | null {
  if (!session) return null;
  const group = /^(?:cc_group:)?(grp_[1-9][0-9]{0,18})$/.exec(session);
  if (group) return group[1];
  const direct = /^(?:session:v2:catscompany:p2p:)?p2p_([1-9][0-9]{0,18})_([1-9][0-9]{0,18})(?::agent:(?:usr)?([1-9][0-9]{0,18}))?$/.exec(session);
  if (!direct) return null;
  const [, first, second, agent] = direct;
  return (first === bot || second === bot) && BigInt(first) < BigInt(second) && (!agent || agent === bot)
    ? `p2p_${first}_${second}` : null;
}

type Origin = { source: string | null; bot: string | null; session: string | null };
type CatalogRow = { id: string; title: string; created_at: string; source_id: string | null; origins: Origin[] };

function catalogItem(row: CatalogRow) {
  const bots = new Set<string>();
  const runBot = botFromSource(row.source_id);
  if (runBot) bots.add(runBot);
  for (const origin of row.origins) {
    const declared = botFromSource(origin.source);
    if (declared) bots.add(declared);
    const recorded = origin.bot?.replace(/^usr/, '');
    if (recorded && uid.test(recorded)) bots.add(recorded);
  }
  if (bots.size !== 1) return [];
  const [bot] = bots;
  const topics = new Set(row.origins.map(origin => topicFor(origin.session, bot)));
  const [topic] = topics;
  return [{ id: row.id, bot_uid: bot, topic_id: topics.size === 1 ? topic : null,
    title: row.title, created_at: row.created_at, revision: documentRevision(row.id) }];
}

// Find one page of Wiki IDs first. Resolve the source scope once per run in
// that page using the input that was visible to Stage 1.
const catalogSQL = `
  with page as materialized (
    select id, run_id, created_at from memory_documents
    where project_id = $1 and ($2::timestamptz is null or created_at < $2 or (created_at = $2 and id > $3))
    order by created_at desc, id limit $4
  ), provenance as materialized (
    select run.id, run.source_id, coalesce(origins.items, '[]'::jsonb) origins
    from (select distinct run_id from page) run_ids
    join extraction_runs run on run.project_id = $1 and run.id = run_ids.run_id
    cross join lateral (
      select jsonb_agg(distinct jsonb_build_object(
        'source', raw.source_id, 'bot', raw.metadata->>'bot_id', 'session', raw.metadata->>'session_id')) items
      from (
        select distinct e.raw_id
        from jsonb_array_elements_text(run.input_refs) input(id)
        left join events e on e.project_id = run.project_id and e.id = input.id
      ) input
      left join raw_records raw on raw.project_id = run.project_id and raw.id = input.raw_id
    ) origins
  )
  select page.id, provenance.source_id, provenance.origins,
    coalesce(nullif(left(btrim(substring(d.markdown from '^# +([^\\r\\n]+)')), 240), ''), '未命名记忆') title,
    to_char(page.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') created_at
  from page join provenance on provenance.id = page.run_id
  join memory_documents d on d.id = page.id
  order by page.created_at desc, page.id`;

function documentRevision(id: string): string {
  return sha256('catsco-wiki-v1:' + id);
}

function readCursor(value: unknown): [string | null, string | null] {
  if (value === undefined) return [null, null];
  assert(typeof value === 'string' && /^[A-Za-z0-9_-]{1,512}$/.test(value), 'invalid catalog cursor');
  let data: unknown;
  try { data = JSON.parse(Buffer.from(value, 'base64url').toString()); } catch { /* rejected below */ }
  assert(Array.isArray(data) && data.length === 2 && typeof data[0] === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(data[0]) && Number.isFinite(Date.parse(data[0])) &&
    typeof data[1] === 'string' && memoryId.test(data[1]), 'invalid catalog cursor');
  return [data[0], data[1]];
}

function cacheVersions(header: string | undefined): string[] {
  if (!header) return [];
  return header.split(',').flatMap(part => {
    const match = /^(?:W\/)?"([a-f0-9]{64})"$/.exec(part.trim());
    return match ? [match[1]] : [];
  });
}

export function registerCatscoMemory(app: FastifyInstance, pool: Pool, project: string, token: string) {
  const expected = createHash('sha256').update('Bearer ' + token).digest();
  const verify = async ({ headers }: { headers: { authorization?: string } }) => {
    const actual = createHash('sha256').update(headers.authorization ?? '').digest();
    assert(timingSafeEqual(expected, actual), 'service authorization required', 401);
  };
  app.post('/internal/catsco/memory/catalog', { onRequest: verify, bodyLimit: 4096 }, async request => {
    const body = request.body;
    assert(isObject(body) && Object.keys(body).every(key => key === 'cursor' || key === 'limit'), 'invalid catalog request');
    const limit = body.limit === undefined ? 200 : body.limit;
    assert(typeof limit === 'number' && Number.isInteger(limit) && limit >= 1 && limit <= 200, 'invalid catalog limit');
    const [date, id] = readCursor(body.cursor);
    const { rows } = await pool.query<CatalogRow>(catalogSQL, [project, date, id, limit + 1]);
    const page = rows.slice(0, limit);
    const last = page.at(-1);
    const next = rows.length > limit && last
      ? Buffer.from(JSON.stringify([last.created_at, last.id])).toString('base64url') : null;
    return { items: page.flatMap(catalogItem), next_cursor: next };
  });
  app.post('/internal/catsco/memory/wiki', { onRequest: verify, bodyLimit: 4096 }, async (request, reply) => {
    const body = request.body;
    assert(isObject(body) && Object.keys(body).every(key => key === 'id'), 'invalid Wiki request');
    assert(typeof body.id === 'string' && memoryId.test(body.id), 'wiki not found', 404);
    const revision = documentRevision(body.id);
    const unchanged = cacheVersions(request.headers['if-none-match']).includes(revision);
    const { rows: [row] } = await pool.query(`
      select id, episode_id, case when not $3::boolean then markdown end markdown
      from memory_documents where project_id = $1 and id = $2`, [project, body.id, unchanged]);
    assert(row, 'wiki not found', 404);
    reply.header('ETag', '"' + revision + '"');
    if (unchanged) return reply.code(304).send();
    return { id: row.id, markdown: row.markdown, source_refs: [row.episode_id], revision };
  });
}
