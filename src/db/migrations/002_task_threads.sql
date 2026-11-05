ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS task_partition jsonb;
ALTER TABLE episodes ADD COLUMN IF NOT EXISTS thread_id text;
ALTER TABLE episodes ADD COLUMN IF NOT EXISTS task_thread jsonb;
ALTER TABLE episodes ADD COLUMN IF NOT EXISTS evidence_coverage jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS episodes_thread_idx
  ON episodes(project_id, run_id, thread_id);
