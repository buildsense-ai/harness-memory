import type { FastifyInstance } from 'fastify';
import type { Pool, QueryResult } from 'pg';
import { assert, HttpError, ref } from './contracts.js';
import { isObject } from './extraction/output.js';
import { formatMemoryDocument } from './memories.js';
import { readReference } from './read.js';

const snippetLimit = 10;
const resultLimit = 30;
const snippetLength = 280;
const keywordLimit = 16;
const wikiIdPattern = /^mem_[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;

// The batch planner assigns one Bot source to the entire input snapshot.
// Checking the Episode's run keeps all three routes on the same scope.
const scopedWiki = `
  from memory_documents d
  join extraction_runs r on r.project_id=d.project_id and r.id=d.run_id
  join episodes ep on ep.project_id=d.project_id and ep.id=d.episode_id and ep.run_id=r.id
  where d.project_id=$1 and starts_with(r.source_id, 'bot:' || $2 || ':')`;

const fold = (text: string) => text.replace(/[A-Z]/g, c => c.toLowerCase());

function searchKeywords(body: unknown): string[] {
  assert(isObject(body) && Object.keys(body).every(key => key === 'keywords'), 'expected keywords');
  const { keywords } = body;
  assert(Array.isArray(keywords) && keywords.length >= 1, 'at least one keyword is required');
  const distinct = [...new Set(keywords.map((word: unknown) => {
    assert(typeof word === 'string' && word.trim().length > 0 && !word.includes('\0'), 'invalid keyword');
    return fold(word.trim());
  }))];
  assert(distinct.length <= keywordLimit, `expected at most ${keywordLimit} distinct keywords per search`);
  return distinct;
}

function matchSnippet(markdown: string, keywords: string[]) {
  const folded = fold(markdown);
  let best = { paragraph: markdown, first: folded.indexOf(keywords[0]), wordLength: [...keywords[0]].length, matches: 0 };
  const firstLineEnd = markdown.indexOf('\n');
  const body = firstLineEnd === -1 ? '' : markdown.slice(firstLineEnd + 1).trimStart();
  for (const paragraph of body.split(/\r?\n[ \t]*\r?\n/)) {
    const text = fold(paragraph);
    const hits = keywords.map(word => ({ word, at: text.indexOf(word) })).filter(hit => hit.at >= 0);
    if (hits.length <= best.matches) continue;
    const first = hits.reduce((left, hit) => hit.at < left.at ? hit : left);
    best = { paragraph, first: first.at, wordLength: [...first.word].length, matches: hits.length };
  }
  const chars = [...best.paragraph];
  if (chars.length <= snippetLength) return best.paragraph;
  const first = [...best.paragraph.slice(0, best.first)].length;
  const start = Math.max(0, first - Math.max(0, Math.min(64, snippetLength - best.wordLength)));
  const end = start + snippetLength;
  return (start > 0 ? '…' : '') + chars.slice(start, end).join('') + (end < chars.length ? '…' : '');
}

type SearchRow = { id: string; title: string; markdown: string; matched: string[] };

async function search(pool: Pool, project: string, bot: string, keywords: string[]) {
  const client = await pool.connect();
  let result: QueryResult<SearchRow>;
  let discardConnection = false;
  try {
    await client.query('BEGIN READ ONLY');
    await client.query("SET LOCAL statement_timeout = '10s'");
    result = await client.query<SearchRow>(`
      with wiki as (
        select d.id,d.markdown,d.created_at,
          btrim(split_part(d.markdown,chr(10),1), E' #\t\r') as title
        ${scopedWiki}
      )
      select wiki.id,wiki.markdown,left(wiki.title,240) as title,hit.matched
      from wiki
      cross join lateral (
        select array_agg(k.word order by k.position) as matched,
          count(*) filter (where strpos(translate(wiki.title,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),k.word)>0) as title_hits
        from unnest($3::text[]) with ordinality as k(word,position)
        where strpos(translate(wiki.markdown,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),k.word)>0
      ) hit
      where hit.matched is not null
      order by cardinality(hit.matched) desc,hit.title_hits desc,wiki.created_at desc,wiki.id
      limit $4`, [project, bot, keywords, resultLimit + 1]);
    await client.query('COMMIT');
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      discardConnection = true;
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === '57014') {
      throw new HttpError(504, 'Wiki search exceeded its database time limit');
    }
    throw error;
  } finally {
    client.release(discardConnection);
  }
  const { rows } = result;
  const items = rows.slice(0, resultLimit).map((row, rank) => {
    const item = {
      wiki_id: row.id,
      title: row.title,
      matched_keywords: row.matched,
      matched_keyword_count: row.matched.length,
    };
    return rank < snippetLimit ? { ...item, snippet: matchSnippet(row.markdown, row.matched) } : item;
  });
  return { retrieval_id: ref('ret'), items, has_more: rows.length > resultLimit };
}

async function findWiki(pool: Pool, project: string, bot: string, id: string) {
  assert(wikiIdPattern.test(id), 'invalid Wiki ID');
  const { rows: [wiki] } = await pool.query<{ id: string; markdown: string; episode_id: string }>(
    'select d.id,d.markdown,d.episode_id ' + scopedWiki + ' and d.id=$3',
    [project, bot, id],
  );
  assert(wiki, 'unknown Wiki', 404);
  return wiki;
}

export type IdentifyBot = (authorization: string) => Promise<string>;

export const identifyCatsCompanyBot: IdentifyBot = async authorization => {
  let response: Response;
  try {
    response = await fetch('https://app.catsco.cn/api/bot/identity', {
      headers: { authorization }, redirect: 'error', signal: AbortSignal.timeout(3500),
    });
  } catch {
    assert(false, 'Bot identity service unavailable', 503);
  }
  if (!response.ok) await response.body?.cancel();
  assert(response.status !== 401 && response.status !== 403, 'invalid Bot credential', 401);
  assert(response.ok, 'Bot identity service unavailable', 503);
  const identity: unknown = await response.json().catch(() => null);
  const uid = isObject(identity) ? identity.uid : undefined;
  assert(typeof uid === 'string' && /^[1-9][0-9]{0,18}$/.test(uid), 'invalid Bot identity response', 503);
  return uid;
};

export async function registerBotMemory(app: FastifyInstance, pool: Pool, project: string, identifyBot: IdentifyBot) {
  await app.register(async api => {
    api.decorateRequest('memoryBotUid', '');
    api.addHook('onRequest', async (request, reply) => {
      reply.header('Cache-Control', 'private, no-store');
      const authorization = request.headers.authorization;
      assert(authorization && /^ApiKey [^\s]{1,512}$/.test(authorization), 'Cats Company Bot credential required', 401);
      request.setDecorator('memoryBotUid', await identifyBot(authorization));
    });
    api.post('/search', { bodyLimit: 24 * 1024 }, async request =>
      search(pool, project, request.getDecorator<string>('memoryBotUid'), searchKeywords(request.body)));
    api.get<{ Params: { id: string } }>('/wikis/:id', async request => {
      const { memory_id: wiki_id, markdown, source_refs } = formatMemoryDocument(
        await findWiki(pool, project, request.getDecorator<string>('memoryBotUid'), request.params.id));
      return { wiki_id, markdown, source_refs };
    });
    api.post<{ Params: { id: string } }>('/wikis/:id/source', { bodyLimit: 4096 }, async request => {
      const body = request.body;
      assert(isObject(body) && Object.keys(body).every(key => ['ref', 'offset', 'limit'].includes(key)), 'expected Episode reference and pagination');
      const { ref: sourceRef, offset, limit } = body;
      assert(typeof sourceRef === 'string' && (offset === undefined || typeof offset === 'number') &&
        (limit === undefined || typeof limit === 'number'), 'invalid source request');
      const wiki = await findWiki(pool, project, request.getDecorator<string>('memoryBotUid'), request.params.id);
      assert(sourceRef === wiki.episode_id, 'unknown Wiki source', 404);
      return readReference(pool, project, { ref: wiki.episode_id, offset, limit });
    });
  }, { prefix: '/v1/bot-memory' });
}
