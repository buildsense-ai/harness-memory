import type { Pool } from 'pg';
import { MemoryRunner } from './extraction/memory-runner.js';
import { configuredBudget, type RequestBudget } from './extraction/budget.js';
import type { ChatModel } from './extraction/model.js';
import { indexManifests } from './ingestion/manifests.js';
import { planBatches } from './ingestion/batches.js';
import type { SessionScope } from './ingestion/episodes.js';

export class IngestionPlanner {
  private timer?: ReturnType<typeof setInterval>;
  private active?: Promise<void>;
  private stopped = false;
  private sourceCursor = ['', '', '', ''];
  constructor(private pool: Pool, private runner: MemoryRunner, private model?: ChatModel, private budget: RequestBudget = configuredBudget(), private idleMs = 600000) {}
  start() { this.timer = setInterval(() => this.kick(), 2000); this.timer.unref(); this.kick(); }
  private kick() {
    if (this.active || this.stopped || !this.model?.memory) return;
    this.active = this.plan().catch(error => console.error('Ingestion planning failed', error instanceof Error ? error.message : 'unknown')).finally(() => { this.active = undefined; });
  }
  async close() { this.stopped = true; if (this.timer) clearInterval(this.timer); await this.active; }
  async plan(now = Date.now()) {
    const c = await this.pool.connect();
    let locked = false;
    try {
      locked = (await c.query('select pg_try_advisory_lock(846018) locked')).rows[0].locked;
      if (!locked) return;
      await indexManifests(c);
      if (!this.model?.memory) return;
      const sources = (await c.query<SessionScope>(`with candidates as (
        select distinct project_id,source_id,session_key,lane from ingestion_episodes where status='ready' and ended_at<=$1
      ) select * from candidates order by (project_id,source_id,session_key,lane)<=($2,$3,$4,$5),project_id,source_id,session_key,lane limit 100`,
      [new Date(now - this.idleMs), ...this.sourceCursor])).rows;
      for (const scope of sources) {
        this.sourceCursor = [scope.project_id, scope.source_id, scope.session_key, scope.lane];
        await planBatches(c, scope, this.runner, this.model, this.budget, now, this.idleMs);
      }
    } finally {
      if (locked) await c.query('select pg_advisory_unlock(846018)');
      c.release();
    }
  }
}
