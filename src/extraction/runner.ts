import type { Pool } from "pg";
import { assert, ref, type StoredEvent } from "../contracts.js";
import { snapshotEvents, type ExtractionRequest } from "./snapshot.js";
import { extractEpisodes, type ChatModel } from "./model.js";
export class ExtractionRunner {
  private busy = false;
  private active: Promise<void> = Promise.resolve();
  constructor(
    private pool: Pool,
    private model: ChatModel | undefined,
    private budget: number,
  ) {
    assert(Number.isSafeInteger(budget) && budget > 0, "invalid model budget");
  }
  async interrupt() {
    await this.pool.query(
      "update extraction_runs set status='interrupted',error='service restarted; rerun manually' where status='running'",
    );
  }
  async start(p: string, request: ExtractionRequest) {
    assert(this.model, "model not configured", 503);
    assert(!this.busy, "extraction busy", 409);
    this.busy = true;
    try {
      const events = await snapshotEvents(this.pool, p, request),
        id = ref("run");
      await this.pool.query(
        "insert into extraction_runs(id,project_id,status,input_refs) values($1,$2,'running',$3)",
        [id, p, JSON.stringify(events.map((e) => e.ref))],
      );
      this.active = this.execute(p, id, events).finally(() => {
        this.busy = false;
      });
      return { run_id: id };
    } catch (e) {
      this.busy = false;
      throw e;
    }
  }
  private async execute(p: string, id: string, events: StoredEvent[]) {
    try {
      const result = await extractEpisodes(events, this.model!, this.budget),
        c = await this.pool.connect();
      try {
        await c.query("BEGIN");
        await c.query(
          "update extraction_runs set task_partition=$3 where id=$1 and project_id=$2",
          [id, p, JSON.stringify(result.partition)],
        );
        for (const d of result.episodes) {
          const ep = ref("ep");
          await c.query(
            "insert into episodes(id,project_id,run_id,goal,chunk_id,missing_pair_refs,thread_id,task_thread,evidence_coverage) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
            [
              ep,
              p,
              id,
              JSON.stringify({ description: d.thread.desired_outcome }),
              d.chunk_id,
              JSON.stringify(d.missing_pair_refs),
              d.thread.thread_id,
              JSON.stringify(d.thread),
              JSON.stringify(d.evidence_coverage),
            ],
          );
          for (const [i, event] of d.event_refs.entries())
            await c.query(
              "insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)",
              [p, ep, event, i],
            );
        }
        await c.query(
          "update extraction_runs set status='completed' where id=$1 and project_id=$2",
          [id, p],
        );
        await c.query("COMMIT");
      } catch (e) {
        await c.query("ROLLBACK");
        throw e;
      } finally {
        c.release();
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "extraction failed";
      await this.pool
        .query(
          "update extraction_runs set status='failed',error=$3 where id=$1 and project_id=$2",
          [id, p, message.slice(0, 300)],
        )
        .catch(() => {
          console.error("Could not persist extraction failure");
        });
    }
  }
  async get(p: string, id: string) {
    const r = (
      await this.pool.query(
        "select id,status,error,input_refs,task_partition,created_at from extraction_runs where project_id=$1 and id=$2",
        [p, id],
      )
    ).rows[0];
    assert(r, "unknown extraction", 404);
    const eps = await this.pool.query(
        "select id episode_ref,goal,thread_id,task_thread,evidence_coverage,chunk_id,missing_pair_refs from episodes where project_id=$1 and run_id=$2 order by id",
      [p, id],
    );
    return { ...r, episodes: eps.rows };
  }
  async wait() {
    await this.active;
  }
}
