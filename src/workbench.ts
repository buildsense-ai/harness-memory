import type { Pool } from "pg";
import { assert } from "./contracts.js";
import { eventFromRow } from "./read.js";
import { formatMemoryDocument } from "./memories.js";
import { candidateEvents } from "./extraction/memory-runner.js";
import type { TaskPartition } from "./contracts.js";

// A recorded session survives daily file changes. Legacy sources explicitly fall back to stream identity.
const sessionIdentity = (alias: string) => `jsonb_build_array(${alias}.source_id,
  coalesce(nullif(${alias}.metadata->>'session_id',''),${alias}.stream_id),
  nullif(${alias}.metadata->>'session_id','') is null)::text`;

const runSessions = `select distinct ${sessionIdentity("sr")} session_key,sr.source_id,
  nullif(sr.metadata->>'session_id','') session_id,
  case when nullif(sr.metadata->>'session_id','') is null then sr.stream_id end stream_id
  from jsonb_array_elements_text(x.input_refs) refs(event_ref)
  join events se on se.project_id=x.project_id and se.id=refs.event_ref
  join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id`;

function validateFilters(query: { upload_key_id?: string; date_from?: string; date_to?: string }) {
  assert(query.upload_key_id === undefined || (typeof query.upload_key_id === "string" && query.upload_key_id.length <= 256), "invalid upload_key_id");
  const validDate = (value: string | undefined) => {
    if (value === undefined) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = Date.parse(`${value}T00:00:00Z`);
    return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value;
  };
  assert(validDate(query.date_from) && validDate(query.date_to), "invalid processing date");
  assert(!query.date_from || !query.date_to || query.date_from <= query.date_to, "date_from must be on or before date_to");
}

export async function listWorkbenchFilters(pool: Pool, project: string) {
  const result = await pool.query(`select r.upload_key_id,
      case when r.upload_key_id is null then '旧记录（未记录 Key）'
           when r.upload_key_id=$1 then '主项目 Key'
           else '上传 Key · '||left(r.upload_key_id,16) end label,
      array_agg(distinct s.harness order by s.harness) harnesses,
      array_agg(distinct r.source_id order by r.source_id) source_ids,
      count(*)::int record_count,min(r.received_at) first_received_at,max(r.received_at) last_received_at
    from raw_records r join streams s using(project_id,source_id,stream_id)
    where r.project_id=$1 group by r.upload_key_id
    order by min(r.received_at) desc nulls last,r.upload_key_id`, [project]);
  return { upload_keys: result.rows };
}

export async function listWorkbenchSessions(pool: Pool, project: string, query: { limit?: string | number; offset?: string | number; upload_key_id?: string; date_from?: string; date_to?: string }) {
  validateFilters(query);
  const { limit, offset } = page(query);
  const rows = await pool.query(`with sessions as (
    select ${sessionIdentity("r")} session_key,r.source_id,
      nullif(r.metadata->>'session_id','') session_id,
      case when nullif(r.metadata->>'session_id','') is null then r.stream_id end stream_id,
      array_agg(distinct s.harness) harnesses,count(distinct r.id)::int raw_record_count,
      min(r.received_at) first_received_at,max(r.received_at) last_received_at
    from raw_records r join streams s using(project_id,source_id,stream_id)
    where r.project_id=$1 and ($4::text is null or coalesce(r.upload_key_id,'__unattributed__')=$4) group by 1,2,3,4
  ) select filtered.*,count(*) over()::int total from sessions filtered
    where (($5::date is null and $6::date is null) or exists(
      select 1 from extraction_runs x where x.project_id=$1
        and ($5::date is null or x.created_at >= $5::date)
        and ($6::date is null or x.created_at < ($6::date + interval '1 day'))
        and exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
          join events e on e.project_id=x.project_id and e.id=refs.event_ref
          join raw_records source_record on source_record.project_id=e.project_id and source_record.id=e.raw_id
          where ${sessionIdentity("source_record")} = filtered.session_key
            and ($4::text is null or coalesce(source_record.upload_key_id,'__unattributed__')=$4))))
    order by last_received_at desc nulls last,session_key offset $2 limit $3`, [project, offset, limit + 1, query.upload_key_id ?? null, query.date_from ?? null, query.date_to ?? null]);
  return { items: rows.rows.slice(0, limit).map(({ total, ...row }) => row),
    next_offset: rows.rows.length > limit ? offset + limit : null };
}

function page(query: { limit?: string | number; offset?: string | number }) {
  const limit = Number(query.limit ?? 50);
  const offset = Number(query.offset ?? 0);
  assert(Number.isInteger(limit) && limit >= 1 && limit <= 100, "invalid limit");
  assert(Number.isSafeInteger(offset) && offset >= 0, "invalid offset");
  return { limit, offset };
}

export async function listWorkbenchStreams(
  pool: Pool,
  project: string,
  query: { limit?: string | number; offset?: string | number },
) {
  const { limit, offset } = page(query);
  const result = await pool.query(
    `with stream_page as (
       select project_id,source_id,stream_id,harness,next_offset,last_received_at
       from streams where project_id=$1
       order by last_received_at desc nulls last,source_id,stream_id
       offset $2 limit $3
     )
     select s.source_id,s.stream_id,s.harness,s.next_offset acknowledged_bytes,
      count(distinct r.id)::int raw_record_count,count(distinct e.id)::int event_count,
      min(r.received_at) first_received_at,coalesce(s.last_received_at,max(r.received_at)) last_received_at
     from stream_page s
     left join raw_records r on r.project_id=s.project_id and r.source_id=s.source_id and r.stream_id=s.stream_id
     left join events e on e.project_id=r.project_id and e.raw_id=r.id
     group by s.project_id,s.source_id,s.stream_id,s.harness,s.next_offset,s.last_received_at
     order by s.last_received_at desc nulls last,s.source_id,s.stream_id`,
    [project, offset, limit],
  );
  const total = Number((await pool.query("select count(*)::int n from streams where project_id=$1", [project])).rows[0].n);
  return {
    items: result.rows.map((row) => ({
      ...row,
      acknowledged_bytes: Number(row.acknowledged_bytes),
    })),
    total,
    next_offset: offset + limit < total ? offset + limit : null,
  };
}

export async function listWorkbenchRuns(
  pool: Pool,
  project: string,
  query: { source_id?: string; stream_id?: string; session_key?: string; upload_key_id?: string; date_from?: string; date_to?: string; limit?: string | number; offset?: string | number },
) {
  validateFilters(query);
  const { limit, offset } = page(query);
  assert(query.source_id === undefined || (typeof query.source_id === "string" && query.source_id.length <= 256), "invalid source_id");
  assert(query.stream_id === undefined || (typeof query.stream_id === "string" && query.stream_id.length <= 256), "invalid stream_id");
  assert(query.stream_id === undefined || query.source_id !== undefined, "stream_id requires source_id");
  assert(query.session_key === undefined || (typeof query.session_key === "string" && query.session_key.length <= 2048), "invalid session_key");
  const result = await pool.query(
    `select x.id run_id,x.status,x.error,x.created_at,
      coalesce((select jsonb_agg(to_jsonb(s) order by s.session_key) from (${runSessions}) s),'[]'::jsonb) sessions,
      jsonb_array_length(x.input_refs) input_event_count,
      case when x.task_partition is null then 0 else jsonb_array_length(x.task_partition->'task_threads') end task_count,
      (select count(*)::int from memory_documents d where d.project_id=x.project_id and d.run_id=x.id) published_memory_count,
      array(select distinct sr.source_id from jsonb_array_elements_text(x.input_refs) refs(event_ref)
        join events se on se.project_id=x.project_id and se.id=refs.event_ref
        join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
        order by sr.source_id) source_ids,
      array(select distinct sr.stream_id from jsonb_array_elements_text(x.input_refs) refs(event_ref)
        join events se on se.project_id=x.project_id and se.id=refs.event_ref
        join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
        order by sr.stream_id) stream_ids
     from extraction_runs x where x.project_id=$1
       and ($6::text is null or exists(select 1 from (${runSessions}) sm where sm.session_key=$6))
       and ($7::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
         join events se on se.project_id=x.project_id and se.id=refs.event_ref
         join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
         where coalesce(sr.upload_key_id,'__unattributed__')=$7))
       and ($8::date is null or x.created_at >= $8::date)
       and ($9::date is null or x.created_at < ($9::date + interval '1 day'))
       and ($2::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
         join events se on se.project_id=x.project_id and se.id=refs.event_ref
         join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
         where sr.source_id=$2 and ($3::text is null or sr.stream_id=$3)))
     order by x.created_at desc,x.id offset $4 limit $5`,
    [project, query.source_id ?? null, query.stream_id ?? null, offset, limit + 1, query.session_key ?? null, query.upload_key_id ?? null, query.date_from ?? null, query.date_to ?? null],
  );
  const count = await pool.query(
    `select count(*)::int n from extraction_runs x where x.project_id=$1
      and ($4::text is null or exists(select 1 from (${runSessions}) sm where sm.session_key=$4))
      and ($5::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
        join events se on se.project_id=x.project_id and se.id=refs.event_ref
        join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
        where coalesce(sr.upload_key_id,'__unattributed__')=$5))
      and ($6::date is null or x.created_at >= $6::date)
      and ($7::date is null or x.created_at < ($7::date + interval '1 day'))
      and ($2::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
        join events se on se.project_id=x.project_id and se.id=refs.event_ref
        join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
        where sr.source_id=$2 and ($3::text is null or sr.stream_id=$3)))`,
    [project, query.source_id ?? null, query.stream_id ?? null, query.session_key ?? null, query.upload_key_id ?? null, query.date_from ?? null, query.date_to ?? null],
  );
  return {
    items: result.rows.slice(0, limit).map((row) => ({
      ...row,
      input_event_count: Number(row.input_event_count),
      task_count: Number(row.task_count),
    })),
    total: Number(count.rows[0].n),
    next_offset: offset + limit < Number(count.rows[0].n) ? offset + limit : null,
  };
}

export async function getWorkbenchGraph(
  pool: Pool,
  project: string,
  runId: string,
  query: { offset?: string | number; limit?: string | number },
) {
  const { limit, offset } = page(query);
  const run = (await pool.query(
    `select id run_id,status,error,created_at,input_refs,task_partition,memory_request
     from extraction_runs where project_id=$1 and id=$2`,
    [project, runId],
  )).rows[0];
  assert(run, "unknown extraction", 404);
  const refs: string[] = run.input_refs;
  const sources = (await pool.query(
    `select distinct r.source_id,r.stream_id,s.harness from jsonb_array_elements_text($2::jsonb) refs(event_ref)
     join events e on e.project_id=$1 and e.id=refs.event_ref
     join raw_records r on r.project_id=e.project_id and r.id=e.raw_id
     join streams s on s.project_id=r.project_id and s.source_id=r.source_id and s.stream_id=r.stream_id
     order by r.source_id,r.stream_id`,
    [project, JSON.stringify(refs)],
  )).rows;
  const partition = run.task_partition;
  const threads = Array.isArray(partition?.task_threads) ? partition.task_threads : [];
  const assignments = Array.isArray(partition?.query_assignments) ? partition.query_assignments : [];
  const pageThreads = threads.slice(offset, offset + limit);
  const pageThreadIds = pageThreads.map((thread: any) => thread.thread_id);
  const assignedQueryRefs = assignments.filter((a: any) => a.thread_ids?.some((id: string) => pageThreadIds.includes(id))).map((a: any) => String(a.query_ref));
  const querySessions = (await pool.query(`select e.id query_ref,${sessionIdentity("r")} session_key,
      r.source_id,nullif(r.metadata->>'session_id','') session_id,
      case when nullif(r.metadata->>'session_id','') is null then r.stream_id end stream_id
    from events e join raw_records r on r.project_id=e.project_id and r.id=e.raw_id
    where e.project_id=$1 and e.id=any($2::text[])`, [project, assignedQueryRefs])).rows;
  const sessionsByQuery = new Map(querySessions.map(row => [row.query_ref, row]));
  const episodes = (await pool.query(
    `select ep.id episode_id,ep.thread_id,ep.goal,ep.task_thread,ep.chunk_id,
      count(ee.event_id)::int event_count,
      count(distinct ee.event_id) filter (where exists(
        select 1 from episode_events shared where shared.project_id=ep.project_id
          and shared.event_id=ee.event_id and shared.episode_id<>ep.id
          and exists(select 1 from episodes other where other.project_id=shared.project_id
            and other.id=shared.episode_id and other.run_id=ep.run_id)
      ))::int shared_event_count,
      (select d.id from memory_documents d where d.project_id=ep.project_id and d.episode_id=ep.id limit 1) memory_id
     from episodes ep left join episode_events ee on ee.project_id=ep.project_id and ee.episode_id=ep.id
     where ep.project_id=$1 and ep.run_id=$2 and ep.thread_id=any($3::text[])
     group by ep.project_id,ep.id
     order by ep.created_at,ep.id`,
    [project, runId, pageThreadIds],
  )).rows;
  const episodeByThread = new Map(episodes.filter((e) => e.thread_id).map((e) => [e.thread_id, e]));
  const items = pageThreads.map((thread: any) => {
    const memberAssignments = assignments.filter((a: any) => a.thread_ids?.includes(thread.thread_id));
    const episode = episodeByThread.get(thread.thread_id);
    const memberSessions = memberAssignments.map((a: any) => sessionsByQuery.get(String(a.query_ref))).filter(Boolean);
    return {
      thread_id: thread.thread_id,
      title: thread.title,
      desired_outcome: thread.desired_outcome,
      include_topics: thread.include_topics ?? [],
      exclude_topics: thread.exclude_topics ?? [],
      boundary_note: thread.boundary_note,
      query_assignments: memberAssignments,
      query_refs: memberAssignments.map((a: any) => String(a.query_ref)),
      sessions: [...new Map(memberSessions.map((session: any) => [session.session_key, session])).values()],
      episode: episode ?? null,
    };
  });
  return {
    run: {
      run_id: run.run_id,
      status: run.status,
      error: run.error,
      created_at: run.created_at,
      input_event_count: refs.length,
      source_count: sources.length,
      sources,
      sessions: (await pool.query(`select * from extraction_runs x cross join lateral (${runSessions}) session_data
        where x.project_id=$1 and x.id=$2 order by session_key`, [project, runId])).rows,
      partition_ready: Boolean(partition),
    },
    tasks: items.map((thread: any) => ({
      ...thread,
      selected_event_count: thread.episode?.event_count ?? null,
      shared_event_count: thread.episode?.shared_event_count ?? null,
    })),
    total_tasks: threads.length,
    next_offset: offset + items.length < threads.length ? offset + items.length : null,
  };
}

export async function getWorkbenchRunEvents(
  pool: Pool,
  project: string,
  runId: string,
  query: { thread_id?: string; context?: string; offset?: string | number; limit?: string | number },
) {
  const { limit, offset } = page(query);
  assert(query.thread_id === undefined || (typeof query.thread_id === "string" && query.thread_id.length > 0), "invalid thread_id");
  assert(query.context === undefined || query.context === "true", "invalid context");
  assert(query.context === undefined || query.thread_id !== undefined, "context requires thread_id");
  const run = (await pool.query(
    "select input_refs,task_partition from extraction_runs where project_id=$1 and id=$2", [project, runId],
  )).rows[0];
  assert(run, "unknown extraction", 404);
  const partition: TaskPartition | null = run.task_partition;
  let queryRefs: string[] = [];
  let episodeId: string | null = null;
  let selectionSource: "batch" | "published_episode" | "candidate_preview" = "batch";
  if (query.thread_id) {
    assert(partition?.task_threads.some(t => t.thread_id === query.thread_id), "unknown task", 404);
    queryRefs = (partition?.query_assignments ?? []).filter(a => a.thread_ids.includes(query.thread_id!)).map(a => a.query_ref);
    const episode = (await pool.query("select id from episodes where project_id=$1 and run_id=$2 and thread_id=$3", [project, runId, query.thread_id])).rows[0];
    if (query.context === "true" && episode) { episodeId = episode.id; selectionSource = "published_episode"; }
    else selectionSource = "candidate_preview";
  }
  const rows = (await pool.query(`with input as (
      select e.id,e.raw_id,e.kind,e.metadata->>'tool_call_id' tool_call_id,
        e.metadata->>'conversation_run_id' conversation_run_id,${sessionIdentity("r")} session_key,i.seq
      from jsonb_array_elements_text($2::jsonb) with ordinality i(event_ref,seq)
      join events e on e.project_id=$1 and e.id=i.event_ref
      join raw_records r on r.project_id=e.project_id and r.id=e.raw_id
    ), query_rows as (
      select seq,id query_ref,raw_id,conversation_run_id,
        lag(raw_id) over(order by seq) previous_raw_id,
        lag(conversation_run_id) over(order by seq) previous_conversation_run_id
      from input where kind='query'
    ), query_starts as (
      select *,case when conversation_run_id is not null or previous_conversation_run_id is not null
        or previous_raw_id is distinct from raw_id then 1 else 0 end starts_group
      from query_rows
    ), query_groups as (
      select *,sum(starts_group) over(order by seq) group_id from query_starts
    ), input_groups as (
      select i.*,q.group_id,q.conversation_run_id group_conversation_run_id
      from input i left join lateral (
        select group_id,conversation_run_id from query_groups where seq<=i.seq order by seq desc limit 1
      ) q on true
    ), candidate_refs as (
      select distinct i.id from input_groups i join query_groups q on q.group_id=i.group_id
      where q.query_ref=any($3::text[])
        and (i.conversation_run_id is null or i.conversation_run_id=q.conversation_run_id)
    ), selected_refs as (
      select event_id from episode_events where $4::text is not null and project_id=$1 and episode_id=$4
      union
      select id event_id from candidate_refs where $4::text is null
    ), visible as (
      select i.*,case when not $8::boolean then true else exists(select 1 from selected_refs s where s.event_id=i.id) end selected
      from input_groups i where $5::boolean or not $8::boolean or exists(select 1 from selected_refs s where s.event_id=i.id)
    ), page_rows as (
      select v.*,count(*) over()::int total,count(*) filter(where selected) over()::int selected_count
      from visible v order by seq offset $6 limit $7
    )
    select e.*,r.offset_bytes,r.metadata raw_metadata,p.seq,p.total,p.selected_count,p.selected,
      p.group_id source_group,r.source_id,r.stream_id,${sessionIdentity("r")} session_key,
      (select other.id from input other where other.id<>p.id and other.session_key=p.session_key and other.tool_call_id=e.metadata->>'tool_call_id'
        and other.kind<>e.kind and other.conversation_run_id is not distinct from p.conversation_run_id limit 1) tool_pair_ref,
      (not $8::boolean or exists(select 1 from selected_refs s where s.event_id=(select other.id from input other where other.id<>p.id and other.session_key=p.session_key
        and other.tool_call_id=e.metadata->>'tool_call_id' and other.kind<>e.kind
        and other.conversation_run_id is not distinct from p.conversation_run_id limit 1))) tool_pair_selected
    from page_rows p join events e on e.project_id=$1 and e.id=p.id
    join raw_records r on r.project_id=e.project_id and r.id=e.raw_id order by p.seq`,
    [project, JSON.stringify(run.input_refs), queryRefs, episodeId, query.context === "true", offset, limit, Boolean(query.thread_id)])).rows;
  const items = rows.map(row => ({ ...eventFromRow(row), source_index: Number(row.seq) - 1,
    source_group: row.source_group === null ? null : String(row.source_group),
    session_key: String(row.session_key), source_id: row.source_id, stream_id: row.stream_id,
    selected: row.selected, tool_pair_ref: row.tool_pair_ref, tool_pair_selected: row.tool_pair_selected }));
  return { items, total: Number(rows[0]?.total ?? 0), selected_count: Number(rows[0]?.selected_count ?? 0),
    selection_source: selectionSource, episode_id: episodeId,
    next_offset: offset + items.length < Number(rows[0]?.total ?? 0) ? offset + items.length : null };
}

export async function getMemoryDocument(pool: Pool, project: string, id: string) {
  const row = (await pool.query(
    `select id,run_id,thread_id,episode_id,markdown from memory_documents where project_id=$1 and id=$2`,
    [project, id],
  )).rows[0];
  assert(row, "unknown memory", 404);
  return { ...formatMemoryDocument(row), run_id: row.run_id, thread_id: row.thread_id };
}
