import type { Pool, PoolClient } from 'pg';
import { assert, ref, sha256, type StoredEvent, type TaskPartition, type TaskThread, type QueryAssignment } from '../contracts.js';
import { eventFromRow, eventSelect } from '../read.js';
import { snapshotEvents, type ExtractionRequest } from './snapshot.js';
import { validatePartition, type ChatModel } from './model.js';
import { validateMemoryDocument } from './memory-output.js';
import { candidateEvents } from './candidates.js';
import { configuredBudget, hardInput, pack, type RequestBudget } from './budget.js';
export { candidateEvents, candidateGroups } from './candidates.js';

interface RunRow {
  id: string; project_id: string; input_refs: string[]; task_partition: TaskPartition | null;
  lane: string; source_id: string | null; session_key: string | null;
}
interface TaskRow {
  id: string; project_id: string; run_id: string; thread_id: string; part_index: number; part_count: number;
  task_thread: TaskThread; assignments: QueryAssignment[]; input_refs: string[];
}
type TaskPlan = Omit<TaskRow, 'id' | 'project_id' | 'run_id'> & { deferred: boolean };
export interface PipelineConfig { stage1: number; stage2: number; total: number; highWater: number }
export class MemoryRunner {
  private active = new Map<string, { stage: 'stage1' | 'stage2'; promise: Promise<void> }>();
  private timer?: ReturnType<typeof setInterval>;
  private polling?: Promise<void>;
  private closed = false;
  private lock?: PoolClient;
  private cursor = new Map<string, string>();
  private readonly config: PipelineConfig;
  private readonly tokens: RequestBudget;
  constructor(private pool: Pool, private model: ChatModel | undefined, _legacyByteBudget = 4194304, stage1 = 2, config?: Partial<PipelineConfig>, tokens?: RequestBudget) {
    this.config = { stage1, stage2: 6, total: 6, highWater: 1000, ...config };
    this.tokens = tokens ?? configuredBudget();
    assert(Object.values(this.config).every(n => Number.isSafeInteger(n) && n > 0), 'invalid pipeline concurrency');
    assert(this.config.stage1 <= this.config.total && this.config.stage2 <= this.config.total && this.config.total <= 64, 'invalid global concurrency');
  }
  async initialize() {
    if (!this.model?.memory) return;
    this.timer = setInterval(() => this.kick(), 1000); this.timer.unref();
    this.kick();
  }
  async enqueue(p: string, request: ExtractionRequest & { retry?: boolean }) {
    assert(this.model?.memory, 'Markdown memory model not configured', 503);
    const events = await snapshotEvents(this.pool, p, request);
    if (!events.length) return { status: 'skipped', reason: 'no_normalized_events' };
    const result = await this.enqueueEvents(p, events.map(e => e.ref), request, { source: request.source_id });
    if (request.retry) return this.retry(p, result.run_id);
    this.kick(); return result;
  }
  async retry(p: string, id: string) {
    assert(this.model?.memory, 'Markdown memory model not configured', 503);
    const c = await this.pool.connect();
    try {
      await c.query('begin');
      const run = (await c.query<{ status: string; stage1_complete: boolean }>('select status,stage1_complete from extraction_runs where project_id=$1 and id=$2 and memory_request is not null for update', [p,id])).rows[0];
      assert(run, 'unknown memory run', 404);
      let status = run.status;
      if (status === 'failed' || status === 'partial') {
        const failed = await c.query("update memory_tasks set status='queued',error=null where project_id=$1 and run_id=$2 and status='failed'", [p,id]);
        if (!run.stage1_complete || failed.rowCount) {
          status = run.stage1_complete ? 'running' : 'queued';
          await c.query('update extraction_runs set status=$3,error=null where project_id=$1 and id=$2', [p,id,status]);
          await c.query("update ingestion_episodes set status='queued' where project_id=$1 and run_id=$2", [p,id]);
        }
      }
      await c.query('commit'); this.kick(); return { run_id: id, status };
    } catch (e) { await c.query('rollback'); throw e; } finally { c.release(); }
  }
  async enqueueEvents(p: string, refs: string[], request: unknown, meta: { lane?: string; source?: string; session?: string }, c: Pool | PoolClient = this.pool) {
    const result = await c.query<{ id: string; status: string }>(
      "insert into extraction_runs(id,project_id,status,input_refs,memory_request,input_signature,lane,source_id,session_key) values($1,$2,'queued',$3,$4,$5,$6,$7,$8) on conflict(project_id,input_signature) where input_signature is not null do update set input_signature=excluded.input_signature returning id,status",
      [ref('run'), p, JSON.stringify(refs), JSON.stringify(request), sha256(JSON.stringify(refs)), meta.lane ?? 'incremental', meta.source, meta.session]);
    const row = result.rows[0]; return { run_id: row.id, status: row.status };
  }
  private kick() {
    if (this.closed || this.polling || !this.model?.memory) return;
    this.polling = this.fill().catch(error => console.error('Memory pipeline poll failed', error instanceof Error ? error.message : 'unknown')).finally(() => { this.polling = undefined; });
  }
  private async acquireLock() {
    if (this.lock) return true;
    const c = await this.pool.connect();
    if (!(await c.query('select pg_try_advisory_lock(846017) locked')).rows[0].locked) { c.release(); return false; }
    this.lock = c;
    await c.query("update memory_tasks set status='queued' where status='running'");
    await c.query("update extraction_runs set status='queued' where memory_request is not null and status='running'");
    await c.query("update memory_tasks t set status='queued' where t.status='completed' and exists(select 1 from extraction_runs r where r.id=t.run_id and r.status='queued') and not exists(select 1 from memory_documents d where d.project_id=t.project_id and d.run_id=t.run_id and d.thread_id=t.thread_id and d.part_index=t.part_index)");
    await c.query("update extraction_runs r set status='running' where r.stage1_complete and r.status='queued' and exists(select 1 from memory_tasks t where t.run_id=r.id and t.status in ('queued','running'))");
    const finished = (await c.query<{ id: string }>("select id from extraction_runs r where memory_request is not null and stage1_complete and status in ('queued','running') and not exists(select 1 from memory_tasks t where t.run_id=r.id and t.status in ('queued','running'))")).rows;
    for (const run of finished) await this.summarize(run.id);
    return true;
  }
  private count(stage: string) { return [...this.active.values()].filter(x => x.stage === stage).length; }
  private async claim(stage: 'stage1' | 'stage2'): Promise<RunRow | TaskRow | undefined> {
    if (!this.lock) return;
    const isFirst = stage === 'stage1';
    const query = isFirst
      ? "select distinct on(r.lane,r.project_id,coalesce(r.source_id,'')) r.id,r.project_id,r.lane,coalesce(r.source_id,'') source_id from extraction_runs r where r.memory_request is not null and r.status='queued' and not r.stage1_complete order by r.lane,r.project_id,coalesce(r.source_id,''),r.created_at,r.id"
      : "select distinct on(r.lane,t.project_id,coalesce(r.source_id,'')) t.id,t.project_id,r.lane,coalesce(r.source_id,'') source_id from memory_tasks t join extraction_runs r on r.id=t.run_id where t.status='queued' and r.stage1_complete order by r.lane,t.project_id,coalesce(r.source_id,''),t.created_at,t.id";
    const candidates = (await this.lock.query<{ id: string; project_id: string; lane: string; source_id: string }>(query)).rows;
    if (!candidates.length) return;
    const lastLane = this.cursor.get(stage + ':lane');
    const preferred = candidates.find(x => x.lane !== lastLane)?.lane ?? candidates[0].lane;
    const inLane = candidates.filter(x => x.lane === preferred);
    const origin = (x: typeof candidates[number]) => x.project_id + ':' + x.source_id;
    const lastSource = this.cursor.get(stage + ':' + preferred);
    const nextSource = [...new Set(inLane.map(origin))].sort().find(x => x > (lastSource ?? '')) ?? origin(inLane[0]);
    const selected = inLane.find(x => origin(x) === nextSource)!;
    this.cursor.set(stage + ':lane', selected.lane); this.cursor.set(stage + ':' + preferred, nextSource);
    if (isFirst) return (await this.lock.query<RunRow>("update extraction_runs set status='running',error=null where id=$1 and status='queued' returning *", [selected.id])).rows[0];
    return (await this.lock.query<TaskRow>("update memory_tasks set status='running',error=null where id=$1 and status='queued' returning *", [selected.id])).rows[0];
  }
  private async fill() {
    if (!await this.acquireLock()) return;
    const backlog = Number((await this.pool.query("select count(*) n from memory_tasks t join extraction_runs r on r.id=t.run_id where r.stage1_complete and t.status in ('queued','running')")).rows[0].n);
    while (!this.closed && this.active.size < this.config.total) {
      let claimed = false;
      const order: ('stage1' | 'stage2')[] = this.count('stage1') < this.config.stage1 && backlog < this.config.highWater ? ['stage1', 'stage2'] : ['stage2'];
      for (const stage of order) {
        if (this.count(stage) >= this.config[stage]) continue;
        const job = await this.claim(stage); if (!job) continue;
        const promise = ('task_thread' in job ? this.generate(job) : this.partition(job)).finally(() => {
          this.active.delete(job.id); queueMicrotask(() => this.kick());
        });
        this.active.set(job.id, { stage, promise }); claimed = true; break;
      }
      if (!claimed) break;
    }
  }
  private async events(p: string, refs: string[], dialogue = false) {
    const rows = (await this.pool.query(eventSelect + " where e.project_id=$1 and e.id=any($2::text[])" + (dialogue ? " and e.kind in ('query','message')" : ''), [p, refs])).rows;
    const map = new Map(rows.map(r => [r.id, eventFromRow(r)]));
    return refs.flatMap(r => { const event = map.get(r); return event ? [event] : []; });
  }
  private cost(stage: 'stage1' | 'stage2', events: StoredEvent[], thread?: TaskThread, assignments?: QueryAssignment[]) {
    return this.model?.inputTokens?.(stage, events, thread, assignments) ?? this.tokens.count(JSON.stringify(events)) + 8192;
  }
  private async partition(run: RunRow) {
    try {
      const dialogue = await this.events(run.project_id, run.input_refs, true);
      assert(this.cost('stage1', dialogue) <= hardInput(this.tokens), 'deferred_oversize:stage1');
      const partition = run.task_partition ?? await this.model!.partition(dialogue);
      validatePartition(partition, dialogue); assert(partition.relations.length === 0, 'relations disabled');
      await this.pool.query('update extraction_runs set task_partition=$2 where id=$1', [run.id, JSON.stringify(partition)]);
      // Descriptors avoid materializing every tool result before selecting a task.
      const descriptors = (await this.pool.query(eventSelect.replace('e.*', "e.id,e.raw_id,e.ordinal,e.kind,e.pointer,'null' content_json,'' search_text,e.metadata") + ' where e.project_id=$1 and e.id=any($2::text[])', [run.project_id, run.input_refs])).rows;
      const byId = new Map(descriptors.map(r => [r.id, eventFromRow(r)]));
      const skeleton = run.input_refs.map(id => { const e = byId.get(id); assert(e, 'snapshot event missing'); return e; });
      const plans: TaskPlan[] = [];
      for (const thread of partition.task_threads) {
        const assignments = partition.query_assignments.filter(a => a.thread_ids.includes(thread.thread_id));
        const selected = candidateEvents(skeleton, assignments.map(a => a.query_ref));
        const groups: StoredEvent[][] = [];
        for (const e of selected) {
          const previous = groups.at(-1);
          if (!previous || (e.conversation_run_id ? e.conversation_run_id !== previous[0].conversation_run_id : e.kind === 'query' && e.raw_ref !== previous[0].raw_ref)) groups.push([e]);
          else previous.push(e);
        }
        const units: { refs: string[]; tokens: number }[] = [];
        const overhead = this.cost('stage2', [], thread, []);
        for (const group of groups) {
          const events = await this.events(run.project_id, group.map(e => e.ref));
          const refs = new Set(events.map(e => e.ref));
          const a = assignments.filter(x => refs.has(x.query_ref));
          units.push({ refs: events.map(e => e.ref), tokens: this.cost('stage2', events, thread, a) });
        }
        // Sum full per-unit request costs conservatively; exact request is checked again before dispatch.
        const limit = Math.min(this.tokens.stage2, hardInput(this.tokens));
        const parts = pack(units, u => overhead + u.reduce((n, x) => n + Math.max(0, x.tokens - overhead) + 8, 0), limit, 0);
        const scopedThread = (index: number): TaskThread => parts.length > 1 ? { ...thread, boundary_note: thread.boundary_note + `\n本次仅含该任务的第 ${index + 1}/${parts.length} 段来源。只记录给定材料，不依据整体任务补写其他段结果。` } : thread;
        // Validate the real final payload, including scoped instructions. Only an indivisible
        // runtime Episode may be deferred; repeat after splitting because part counts changed.
        for (let changed = true; changed;) {
          changed = false;
          for (let index = 0; index < parts.length; index++) {
            const part = parts[index], refs = part.flatMap(x => x.refs), set = new Set(refs);
            const events = await this.events(run.project_id, refs);
            if (this.cost('stage2', events, scopedThread(index), assignments.filter(a => set.has(a.query_ref))) > limit && part.length > 1) {
              const middle = Math.ceil(part.length / 2);
              parts.splice(index, 1, part.slice(0, middle), part.slice(middle)); changed = true; break;
            }
          }
        }
        for (const [index, part] of parts.entries()) {
          const refs = part.flatMap(x => x.refs), set = new Set(refs);
          const scoped = scopedThread(index), localAssignments = assignments.filter(a => set.has(a.query_ref));
          const deferred = this.cost('stage2', await this.events(run.project_id, refs), scoped, localAssignments) > limit;
          plans.push({ thread_id: thread.thread_id, part_index: index, part_count: parts.length, task_thread: scoped, assignments: localAssignments, input_refs: refs, deferred });
        }
      }
      const c = await this.pool.connect();
      try {
        await c.query('begin');
        // Unpublished plans cannot run. Replace any interrupted older partial plan atomically.
        await c.query('delete from memory_tasks where run_id=$1', [run.id]);
        for (const plan of plans) await c.query("insert into memory_tasks(id,project_id,run_id,thread_id,part_index,part_count,task_thread,assignments,input_refs,status,error) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
          [ref('job'), run.project_id, run.id, plan.thread_id, plan.part_index, plan.part_count, JSON.stringify(plan.task_thread), JSON.stringify(plan.assignments), JSON.stringify(plan.input_refs), plan.deferred ? 'deferred_oversize' : 'queued', plan.deferred ? 'deferred_oversize:stage2:single_episode' : null]);
        await c.query("update extraction_runs set status='running',stage1_complete=true where id=$1", [run.id]);
        await c.query('commit');
      } catch (e) { await c.query('rollback'); throw e; } finally { c.release(); }
      await this.summarize(run.id);
    } catch (e) { await this.pool.query("update extraction_runs set status='failed',error=$2 where id=$1", [run.id, message(e)]); }
  }
  private async generate(task: TaskRow) {
    try {
      if ((await this.pool.query('select 1 from memory_documents where project_id=$1 and run_id=$2 and thread_id=$3 and part_index=$4', [task.project_id, task.run_id, task.thread_id, task.part_index])).rowCount) {
        await this.pool.query("update memory_tasks set status='completed',error=null where id=$1", [task.id]);
        await this.summarize(task.run_id); return;
      }
      const events = await this.events(task.project_id, task.input_refs);
      assert(events.length === task.input_refs.length, 'snapshot event missing');
      assert(this.cost('stage2', events, task.task_thread, task.assignments) <= Math.min(this.tokens.stage2, hardInput(this.tokens)), 'deferred_oversize:stage2');
      const output = await this.model!.memory!(task.task_thread, task.assignments, events);
      const { markdown } = validateMemoryDocument(output);
      const c = await this.pool.connect();
      try {
        await c.query('begin');
        const exists = (await c.query('select 1 from memory_documents where project_id=$1 and run_id=$2 and thread_id=$3 and part_index=$4', [task.project_id, task.run_id, task.thread_id, task.part_index])).rowCount;
        if (!exists) {
          const ep = ref('ep');
          await c.query("insert into episodes(id,project_id,run_id,goal,chunk_id,thread_id,task_thread) values($1,$2,$3,$4,$5,$6,$7)", [ep, task.project_id, task.run_id, JSON.stringify({ description: task.task_thread.desired_outcome }), 'part-' + task.part_index, task.thread_id, JSON.stringify(task.task_thread)]);
          for (const [i, e] of events.entries()) await c.query('insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)', [task.project_id, ep, e.ref, i]);
          await c.query('insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown,part_index) values($1,$2,$3,$4,$5,$6,$7)', [ref('mem'), task.project_id, task.run_id, task.thread_id, ep, markdown.trim(), task.part_index]);
        }
        await c.query("update memory_tasks set status='completed',error=null where id=$1", [task.id]);
        await c.query('commit');
      } catch (e) { await c.query('rollback'); throw e; } finally { c.release(); }
    } catch (e) {
      await this.pool.query('update memory_tasks set status=$2,error=$3 where id=$1', [task.id, message(e).startsWith('deferred_oversize') ? 'deferred_oversize' : 'failed', message(e)]);
    }
    await this.summarize(task.run_id);
  }
  private async summarize(id: string) {
    const states = (await this.pool.query<{ status: string }>('select status from memory_tasks where run_id=$1', [id])).rows.map(x => x.status);
    if (states.some(s => s === 'queued' || s === 'running')) return;
    const errors = (await this.pool.query<{ error: string; thread_id: string; part_index: number }>('select error,thread_id,part_index from memory_tasks where run_id=$1 and error is not null', [id])).rows.map(x => x.thread_id + '/part-' + x.part_index + ': ' + x.error);
    const status = states.some(s => s !== 'completed') ? states.includes('completed') ? 'partial' : 'failed' : 'completed';
    await this.pool.query('update extraction_runs set status=$2,error=$3 where id=$1', [id, status, errors.length ? errors.join('; ').slice(0, 4000) : null]);
    await this.pool.query('update ingestion_episodes set status=$2 where run_id=$1', [id, status]);
  }
  async wait() {
    do { await this.polling; await Promise.all([...this.active.values()].map(x => x.promise)); } while (this.polling || this.active.size);
  }
  async close() {
    this.closed = true; if (this.timer) clearInterval(this.timer);
    await this.wait();
    if (this.lock) { await this.lock.query('select pg_advisory_unlock(846017)'); this.lock.release(); this.lock = undefined; }
  }
}
const message = (e: unknown) => (e instanceof Error ? e.message : 'memory processing failed').slice(0, 4000);
