import type { Pool } from "pg";
import { assert } from "./contracts.js";
import { eventFromRow } from "./read.js";
import { formatMemoryDocument } from "./memories.js";

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
  query: { source_id?: string; stream_id?: string; limit?: string | number; offset?: string | number },
) {
  const { limit, offset } = page(query);
  assert(query.source_id === undefined || (typeof query.source_id === "string" && query.source_id.length <= 256), "invalid source_id");
  assert(query.stream_id === undefined || (typeof query.stream_id === "string" && query.stream_id.length <= 256), "invalid stream_id");
  assert(query.stream_id === undefined || query.source_id !== undefined, "stream_id requires source_id");
  const result = await pool.query(
    `select x.id run_id,x.status,x.error,x.created_at,
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
       and ($2::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
         join events se on se.project_id=x.project_id and se.id=refs.event_ref
         join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
         where sr.source_id=$2 and ($3::text is null or sr.stream_id=$3)))
     order by x.created_at desc,x.id offset $4 limit $5`,
    [project, query.source_id ?? null, query.stream_id ?? null, offset, limit + 1],
  );
  const count = await pool.query(
    `select count(*)::int n from extraction_runs x where x.project_id=$1
      and ($2::text is null or exists(select 1 from jsonb_array_elements_text(x.input_refs) refs(event_ref)
        join events se on se.project_id=x.project_id and se.id=refs.event_ref
        join raw_records sr on sr.project_id=se.project_id and sr.id=se.raw_id
        where sr.source_id=$2 and ($3::text is null or sr.stream_id=$3)))`,
    [project, query.source_id ?? null, query.stream_id ?? null],
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
    return {
      thread_id: thread.thread_id,
      title: thread.title,
      desired_outcome: thread.desired_outcome,
      include_topics: thread.include_topics ?? [],
      exclude_topics: thread.exclude_topics ?? [],
      boundary_note: thread.boundary_note,
      query_assignments: memberAssignments,
      query_refs: memberAssignments.map((a: any) => String(a.query_ref)),
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

const runEventCtes = `with input as (
  select e.*,r.offset_bytes,r.metadata raw_metadata,i.seq
  from jsonb_array_elements_text($2::jsonb) with ordinality i(event_ref,seq)
  join events e on e.project_id=$1 and e.id=i.event_ref
  join raw_records r on r.project_id=e.project_id and r.id=e.raw_id
), query_rows as (
  select seq,id query_ref,raw_id,
    lag(raw_id) over(order by seq) previous_raw_id
  from input where kind='query'
), query_groups as (
  select *,sum(case when previous_raw_id is distinct from raw_id then 1 else 0 end)
    over(order by seq) group_id
  from query_rows
), input_groups as (
  select i.*,(select q.group_id from query_groups q where q.seq<=i.seq
    order by q.seq desc limit 1) group_id
  from input i
), selected_groups as (
  select distinct group_id from query_groups where query_ref=any($3::text[])
), candidates as (
  select i.* from input_groups i join selected_groups s on s.group_id=i.group_id
  where i.group_id is not null
)`;

export async function getWorkbenchRunEvents(
  pool: Pool,
  project: string,
  runId: string,
  query: { thread_id?: string; offset?: string | number; limit?: string | number },
) {
  const { limit, offset } = page(query);
  assert(query.thread_id === undefined || (typeof query.thread_id === "string" && query.thread_id.length > 0), "invalid thread_id");
  const run = (await pool.query(
    "select input_refs,task_partition from extraction_runs where project_id=$1 and id=$2",
    [project, runId],
  )).rows[0];
  assert(run, "unknown extraction", 404);
  let queryRefs: string[] = [];
  if (query.thread_id) {
    const thread = run.task_partition?.task_threads?.find((t: any) => t.thread_id === query.thread_id);
    assert(thread, "unknown task", 404);
    queryRefs = run.task_partition.query_assignments
      .filter((a: any) => a.thread_ids?.includes(query.thread_id))
      .map((a: any) => String(a.query_ref));
  }
  const queryParam = query.thread_id ? queryRefs : [];
  const ctes = query.thread_id ? runEventCtes : `with input as (
    select e.*,r.offset_bytes,r.metadata raw_metadata,i.seq
    from jsonb_array_elements_text($2::jsonb) with ordinality i(event_ref,seq)
    join events e on e.project_id=$1 and e.id=i.event_ref
    join raw_records r on r.project_id=e.project_id and r.id=e.raw_id
  ), candidates as (select * from input where $3::text[] is not null)`;
  const parameters = [project, JSON.stringify(run.input_refs), queryParam, offset, limit];
  const count = Number((await pool.query(`${ctes} select count(*)::int n from candidates`, parameters.slice(0, 3))).rows[0].n);
  const rows = await pool.query(`${ctes} select * from candidates order by seq offset $4 limit $5`, parameters);
  const events = rows.rows.map(eventFromRow);
  return {
    items: events,
    total: count,
    next_offset: offset + events.length < count ? offset + events.length : null,
  };
}

export async function getMemoryDocument(pool: Pool, project: string, id: string) {
  const row = (await pool.query(
    `select id,run_id,thread_id,episode_id,markdown from memory_documents where project_id=$1 and id=$2`,
    [project, id],
  )).rows[0];
  assert(row, "unknown memory", 404);
  return { ...formatMemoryDocument(row), run_id: row.run_id, thread_id: row.thread_id };
}
