import { createHash, timingSafeEqual } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import { assert, sha256 } from './contracts.js';
import { isObject } from './extraction/output.js';

type Scope = { bot: string; topics: string[] | null };
export type CatscoSourceBindings = Record<string, string | Record<string, string>>;
const memoryId = /^mem_[\da-f-]{36}$/i;
const maxTopics = 4096;
const botUidPattern = /^[1-9][0-9]{0,18}$/;

function isTopic(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (/^grp_[1-9][0-9]{0,18}$/.test(value)) return true;
  const parts = /^p2p_([1-9][0-9]{0,18})_([1-9][0-9]{0,18})$/.exec(value);
  return parts !== null && BigInt(parts[1]) < BigInt(parts[2]);
}

export function parseCatscoSourceBindings(input: string | undefined): CatscoSourceBindings {
  if (!input) return {};
  const bindings: unknown = JSON.parse(input);
  assert(isObject(bindings), 'invalid Cats Company source bindings');
  function isCutoff(cutoff: unknown): cutoff is string {
    return typeof cutoff === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/.test(cutoff) &&
      Number.isFinite(Date.parse(cutoff));
  }
  return Object.fromEntries(Object.entries(bindings).map(([source, binding]) => {
    assert(/^bot:[1-9][0-9]{0,18}:[A-Za-z0-9_-]{1,160}$/.test(source), 'invalid Cats Company source');
    if (isCutoff(binding)) return [source, binding];
    assert(isObject(binding), 'invalid Cats Company source binding');
    const topicCutoffs = Object.fromEntries(Object.entries(binding).map(([topic, cutoff]) => {
      assert(isTopic(topic) && isCutoff(cutoff), 'invalid Cats Company topic binding');
      return [topic, cutoff];
    }));
    return [source, topicCutoffs];
  }));
}

function topicSessions(topics: string[], bot: string): string[] {
  return topics.flatMap(topic => topic.startsWith('grp_') ? [topic, 'cc_group:' + topic] :
    [topic, 'session:v2:catscompany:p2p:' + topic].flatMap(session =>
      [session, session + ':agent:' + bot, session + ':agent:usr' + bot]));
}

function parseScope(value: unknown): Scope {
  assert(isObject(value) && typeof value.bot_uid === 'string' && botUidPattern.test(value.bot_uid),
    'invalid bot scope');
  if (value.kind === 'owner') {
    assert(value.topic_ids === undefined, 'owner scope cannot contain topics');
    return { bot: value.bot_uid, topics: null };
  }
  assert(value.kind === 'topics' && Array.isArray(value.topic_ids) &&
    value.topic_ids.length <= maxTopics && value.topic_ids.every(isTopic), 'invalid topic scope');
  return { bot: value.bot_uid, topics: [...new Set<string>(value.topic_ids)].sort() };
}

function sourceTopic(row: 'raw' | 'batch_raw') {
  const session = row + ".metadata->>'session_id'";
  const direct = `substring(${session} from
    '^(?:session:v2:catscompany:p2p:)?(p2p_[1-9][0-9]{0,18}_[1-9][0-9]{0,18})(?::agent:(?:usr)?' || $2 || ')?$')`;
  return `coalesce(substring(${session} from '^(?:cc_group:)?(grp_[1-9][0-9]{0,18})$'),
    case when $2 = any(string_to_array(${direct}, '_')) then ${direct} end)`;
}

// The Episode supplies display provenance. For members, the existing intake
// batch also has to be attributable in full. Both read endpoints use this scope.
const readableRun = `
    (coalesce(run.source_id, '') not like 'bot:%' or run.source_id like 'bot:' || $2 || ':%')
    and ($3::text[] is null or (
      ($4::jsonb ->> run.source_id) is not null
      and (
        select count(*) > 0 and bool_and(
          batch_raw.source_id is not distinct from run.source_id
          and coalesce(${sourceTopic('batch_raw')} = any($3), false)
          and coalesce(batch_raw.received_at <= (case jsonb_typeof($4::jsonb -> run.source_id)
            when 'string' then $4::jsonb ->> run.source_id
            when 'object' then $4::jsonb -> run.source_id ->> ${sourceTopic('batch_raw')}
          end)::timestamptz, false))
        from ingestion_episodes intake
        cross join lateral jsonb_array_elements_text(intake.raw_ids) input(id)
        left join raw_records batch_raw on (batch_raw.project_id, batch_raw.id) = (intake.project_id, input.id)
        where (intake.project_id, intake.source_id, intake.run_id, intake.session_key) =
          (run.project_id, run.source_id, run.id, run.session_key)
      )
    ))`;

const readableDocuments = `
  from memory_documents d
  join extraction_runs run on (run.project_id, run.id) = (d.project_id, d.run_id)
  cross join lateral (
    select array_agg(distinct coalesce(${sourceTopic('raw')},
        'source:' || md5(jsonb_build_array(raw.source_id, coalesce(raw.metadata->>'session_id', raw.stream_id))::text))) conversation_ids,
      bool_and(case when split_part(raw.source_id, ':', 1) = 'bot'
        then split_part(raw.source_id, ':', 2) = $2
          and coalesce(raw.metadata->>'bot_id', $2) in ($2, 'usr' || $2)
        else coalesce(raw.metadata->>'bot_id', '') in ($2, 'usr' || $2) end) belongs_to_bot
    from (
      select distinct e.raw_id
      from episode_events ee
      join events e on (e.project_id, e.id) = (ee.project_id, ee.event_id)
      where ee.project_id = d.project_id and ee.episode_id = d.episode_id
    ) evidence
    join raw_records raw on (raw.project_id, raw.id) = (d.project_id, evidence.raw_id)
  ) origin
  where d.project_id = $1
    and ${readableRun}
    and origin.belongs_to_bot
    and ($3::text[] is null or origin.conversation_ids <@ $3)`;

// Published Wiki documents have immutable bodies and unique IDs.
function documentRevision(id: string): string {
  return sha256('catsco-wiki-v1:' + id);
}

function cursorScope(scope: Scope, topic: string | null): string {
  return createHash('sha256').update(JSON.stringify([scope.bot, scope.topics, topic])).digest('hex');
}

function readCursor(value: unknown, scopeKey: string): [string | null, string | null] {
  if (value === undefined) return [null, null];
  assert(typeof value === 'string' && /^[A-Za-z0-9_-]{1,512}$/.test(value), 'invalid catalog cursor');
  let data: unknown;
  try { data = JSON.parse(Buffer.from(value, 'base64url').toString()); } catch { /* rejected below */ }
  assert(Array.isArray(data) && data.length === 3 && data[0] === scopeKey &&
    typeof data[1] === 'string' && Number.isFinite(Date.parse(data[1])) &&
    typeof data[2] === 'string' && memoryId.test(data[2]), 'invalid catalog cursor');
  return [data[1], data[2]];
}

function cacheVersions(header: string | undefined): string[] {
  if (!header) return [];
  return header.split(',').flatMap(part => {
    const match = /^(?:W\/)?"([a-f0-9]{64})"$/.exec(part.trim());
    return match ? [match[1]] : [];
  });
}

export function registerCatscoMemory(
  app: FastifyInstance, pool: Pool, project: string, token: string, bindings: CatscoSourceBindings,
) {
  const expected = createHash('sha256').update('Bearer ' + token).digest();
  const verify = async ({ headers }: { headers: { authorization?: string } }) => {
    const actual = createHash('sha256').update(headers.authorization ?? '').digest();
    assert(timingSafeEqual(expected, actual), 'service authorization required', 401);
  };
  const verifiedSources = JSON.stringify(bindings);
  app.post('/internal/catsco/memory/catalog', { onRequest: verify, bodyLimit: 256 * 1024 }, async request => {
    const body = request.body;
    assert(isObject(body), 'invalid catalog request');
    const scope = parseScope(body.scope);
    const topic = body.topic_id;
    assert(topic === undefined || isTopic(topic), 'invalid topic_id');
    assert(topic === undefined || scope.topics === null || scope.topics.includes(topic), 'wiki not found', 404);
    const limit = body.limit ?? 150;
    assert(typeof limit === 'number' && Number.isInteger(limit) && limit >= 1 && limit <= 200, 'invalid catalog limit');
    const scopeKey = cursorScope(scope, topic ?? null);
    const [date, id] = readCursor(body.cursor, scopeKey);
    const topics = topic === undefined ? scope.topics : [topic];
    if (topics?.length === 0) return { items: [], next_cursor: null };
    const matchingEpisodes = topics === null ? '' : `
      with matching_episodes as materialized (
        select distinct ee.episode_id
        from raw_records raw
        join events e on (e.project_id, e.raw_id) = (raw.project_id, raw.id)
        join episode_events ee on (ee.project_id, ee.event_id) = (e.project_id, e.id)
        where raw.project_id = $1 and raw.metadata->>'session_id' = any($9::text[])
      ),`;
    const { rows } = await pool.query(`
      ${matchingEpisodes || 'with'} page as materialized (
        select d.id, d.created_at, origin.conversation_ids
        ${readableDocuments}
          ${topics === null ? '' : 'and d.episode_id in (select episode_id from matching_episodes)'}
          and ($5::text is null or origin.conversation_ids @> array[$5])
          and ($6::timestamptz is null or (d.created_at, d.id) < ($6, $7))
        order by d.created_at desc, d.id desc limit $8
      )
      select page.id, page.conversation_ids,
        coalesce(nullif(left(btrim(substring(d.markdown from '^# +([^\\r\\n]+)')), 240), ''), '未命名记忆') title,
        to_char(page.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') created_at
      from page join memory_documents d on d.id = page.id
      order by page.created_at desc, page.id desc`,
    [project, scope.bot, scope.topics, verifiedSources, topic ?? null, date, id, limit + 1,
      ...(topics === null ? [] : [topicSessions(topics, scope.bot)])]);
    const page = rows.slice(0, limit);
    const last = page.at(-1);
    const next = rows.length > limit && last
      ? Buffer.from(JSON.stringify([scopeKey, last.created_at, last.id])).toString('base64url') : null;
    return {
      items: page.map(item => ({ ...item, revision: documentRevision(item.id) })),
      next_cursor: next,
    };
  });
  app.post('/internal/catsco/memory/wiki', { onRequest: verify, bodyLimit: 256 * 1024 }, async (request, reply) => {
    const body = request.body;
    assert(isObject(body) && typeof body.id === 'string' && memoryId.test(body.id), 'wiki not found', 404);
    const scope = parseScope(body.scope);
    const revision = documentRevision(body.id);
    const unchanged = cacheVersions(request.headers['if-none-match']).includes(revision);
    const { rows: [row] } = await pool.query(`
      select d.id, d.episode_id, case when not $6::boolean then d.markdown end markdown
      ${readableDocuments} and d.id = $5`,
    [project, scope.bot, scope.topics, verifiedSources, body.id, unchanged]);
    assert(row, 'wiki not found', 404);
    reply.header('ETag', '"' + revision + '"');
    if (unchanged) return reply.code(304).send();
    return { id: row.id, markdown: row.markdown, source_refs: [row.episode_id], revision };
  });
}
