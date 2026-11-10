import type { Pool } from "pg";
import { assert, ref, sha256, type StoredEvent, type TaskPartition } from "../contracts.js";
import { eventFromRow, eventSelect } from "../read.js";
import { snapshotEvents, type ExtractionRequest } from "./snapshot.js";
import { validatePartition, type ChatModel } from "./model.js";
import { validateMemoryDocument } from "./memory-output.js";

/** Select whole original query turns mechanically. No second event-pruning model. */
export function candidateEvents(events: StoredEvent[], queryRefs: string[]): StoredEvent[] {
  const groups = new Map<string, StoredEvent[]>(), owner = new Map<string, string>();
  let current: string | undefined, queryRaw: string | undefined;
  for (const event of events) {
    if (event.kind === "query") {
      if (queryRaw !== event.raw_ref) { current = event.ref; queryRaw = event.raw_ref; groups.set(current, []); }
      owner.set(event.ref, current!);
    }
    if (current) groups.get(current)!.push(event);
  }
  const selected = new Set(queryRefs.map(q => { assert(owner.has(q), "unknown candidate query"); return owner.get(q)!; }));
  const refs = new Set([...selected].flatMap(q => groups.get(q)!.map(e => e.ref)));
  return events.filter(e => refs.has(e.ref));
}

export class MemoryRunner {
  private active: Promise<void> | undefined;
  private timer: ReturnType<typeof setInterval> | undefined;
  private closed = false;
  constructor(private pool: Pool, private model: ChatModel | undefined, private budget = 4 * 1024 * 1024) { assert(Number.isSafeInteger(budget) && budget > 0, "invalid memory budget"); }
  async initialize() {
    if (!this.model?.memory) return;
    // Recover only while holding the same session lock as the worker; do not steal live work.
    const c = await this.pool.connect();
    try {
      if ((await c.query("select pg_try_advisory_lock(846017) locked")).rows[0].locked) {
        try { await c.query("update extraction_runs set status='queued' where memory_request is not null and status='running'"); }
        finally { await c.query("select pg_advisory_unlock(846017)"); }
      }
    } finally { c.release(); }
    this.timer = setInterval(() => this.kick(), 2000); this.timer.unref(); this.kick();
  }
  private checkBudget(value: unknown) { assert(Buffer.byteLength(JSON.stringify(value)) <= this.budget, "memory input exceeds configured byte budget", 413); }
  async enqueue(p: string, request: ExtractionRequest & { retry?: boolean }) {
    assert(this.model?.memory, "Markdown memory model not configured", 503);
    const events = await snapshotEvents(this.pool, p, request);
    this.checkBudget(events.map(({ kind, text, ref }) => ({ kind, text, ref })));
    const signature = sha256(JSON.stringify(events.map(e => e.ref))), id = ref("run");
    const row = (await this.pool.query("insert into extraction_runs(id,project_id,status,input_refs,memory_request,input_signature) values($1,$2,'queued',$3,$4,$5) on conflict(project_id,input_signature) where input_signature is not null do update set input_signature=excluded.input_signature returning id,status", [id,p,JSON.stringify(events.map(e => e.ref)),JSON.stringify(request),signature])).rows[0];
    if (request.retry === true && ["failed", "partial"].includes(row.status)) {
      const resumed = await this.pool.query("update extraction_runs set status='queued',error=null where project_id=$1 and id=$2 and status in ('failed','partial') returning status",[p,row.id]);
      if (resumed.rowCount) row.status = "queued";
    }
    this.kick();
    return { run_id: row.id, status: row.status };
  }
  private kick() {
    if (this.closed || this.active || !this.model?.memory) return;
    this.active = this.drain().catch(() => { console.error("Memory queue worker failed; queued work will be retried"); }).finally(() => { this.active = undefined; });
  }
  private async drain() {
    const c = await this.pool.connect(); let locked = false;
    try {
      locked = (await c.query("select pg_try_advisory_lock(846017) locked")).rows[0].locked;
      if (!locked) return;
      while (!this.closed) {
        const run = (await c.query("update extraction_runs set status='running',error=null where id=(select id from extraction_runs where memory_request is not null and status='queued' order by created_at,id limit 1) returning *")).rows[0];
        if (!run) break;
        await this.execute(run);
      }
    } finally { if (locked) await c.query("select pg_advisory_unlock(846017)"); c.release(); }
  }
  private async execute(run: any) {
    const p = run.project_id, id = run.id;
    try {
      const rows = (await this.pool.query(eventSelect + " where e.project_id=$1 and e.id=any($2::text[])", [p,run.input_refs])).rows;
      const map = new Map(rows.map(r => [r.id,eventFromRow(r)]));
      const events: StoredEvent[] = run.input_refs.map((r: string) => { assert(map.has(r), "snapshot event missing"); return map.get(r)!; });
      const dialogue = events.filter(e => e.kind === "query" || e.kind === "message");
      const partition: TaskPartition = run.task_partition ?? await this.model!.partition(dialogue);
      validatePartition(partition, dialogue); assert(partition.relations.length === 0, "relations disabled");
      await this.pool.query("update extraction_runs set task_partition=$3 where project_id=$1 and id=$2", [p,id,JSON.stringify(partition)]);
      const errors: string[] = [], pending = [...partition.task_threads];
      const worker = async () => {
        while (pending.length) {
          const thread = pending.shift()!;
          try {
            if ((await this.pool.query("select 1 from memory_documents where project_id=$1 and run_id=$2 and thread_id=$3",[p,id,thread.thread_id])).rowCount) continue;
            const assignments = partition.query_assignments.filter(a => a.thread_ids.includes(thread.thread_id));
            const candidates = candidateEvents(events, assignments.map(a => a.query_ref));
            assert(candidates.length > 0, "empty candidate"); this.checkBudget(candidates);
            const result = await this.model!.memory!(thread,assignments,candidates);
            const { markdown } = validateMemoryDocument(result);
            const c = await this.pool.connect(), ep = ref("ep"), memory = ref("mem");
            try {
              await c.query("begin");
              await c.query("insert into episodes(id,project_id,run_id,goal,chunk_id,thread_id,task_thread) values($1,$2,$3,$4,'whole-turns',$5,$6)",[ep,p,id,JSON.stringify({description:thread.desired_outcome}),thread.thread_id,JSON.stringify(thread)]);
              for (const [i,event] of candidates.entries()) await c.query("insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)",[p,ep,event.ref,i]);
              await c.query("insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown) values($1,$2,$3,$4,$5,$6)",[memory,p,id,thread.thread_id,ep,markdown.trim()]);
              await c.query("commit");
            } catch(e) { await c.query("rollback"); throw e; } finally { c.release(); }
          } catch(e) { errors.push(thread.thread_id + ": " + (e instanceof Error ? e.message : "memory generation failed")); }
        }
      };
      await Promise.all(Array.from({length:Math.min(3,pending.length)},worker));
      const count = Number((await this.pool.query("select count(*) n from memory_documents where project_id=$1 and run_id=$2",[p,id])).rows[0].n);
      await this.pool.query("update extraction_runs set status=$3,error=$4 where project_id=$1 and id=$2",[p,id,errors.length ? (count ? "partial" : "failed") : "completed",errors.length ? errors.join("; ").slice(0,4000) : null]);
    } catch(e) {
      await this.pool.query("update extraction_runs set status='failed',error=$3 where project_id=$1 and id=$2",[p,id,(e instanceof Error ? e.message : "processing failed").slice(0,4000)]);
    }
  }
  async wait() { while (this.active) await this.active; }
  async close() { this.closed = true; if(this.timer) clearInterval(this.timer); await this.wait(); }
}
