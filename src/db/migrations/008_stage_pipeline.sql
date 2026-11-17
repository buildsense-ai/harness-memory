ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS lane text NOT NULL DEFAULT 'incremental';
ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS source_id text;
ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS session_key text;
ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS stage1_complete boolean NOT NULL DEFAULT false;
ALTER TABLE memory_documents DROP CONSTRAINT IF EXISTS memory_documents_project_id_run_id_thread_id_key;
ALTER TABLE memory_documents ADD COLUMN IF NOT EXISTS part_index integer NOT NULL DEFAULT 0;
CREATE UNIQUE INDEX IF NOT EXISTS memory_document_part ON memory_documents(project_id,run_id,thread_id,part_index);
CREATE TABLE IF NOT EXISTS memory_tasks (
 id text PRIMARY KEY, project_id text NOT NULL, run_id text NOT NULL, thread_id text NOT NULL,
 part_index integer NOT NULL, part_count integer NOT NULL, task_thread jsonb NOT NULL,
 assignments jsonb NOT NULL, input_refs jsonb NOT NULL,
 status text NOT NULL DEFAULT 'queued', error text, created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(project_id,run_id,thread_id,part_index),
 FOREIGN KEY(project_id,run_id) REFERENCES extraction_runs(project_id,id)
);
CREATE INDEX IF NOT EXISTS memory_tasks_pending ON memory_tasks(status,created_at);
CREATE TABLE IF NOT EXISTS ingestion_manifests (
 project_id text NOT NULL REFERENCES projects(id), source_id text NOT NULL, manifest_id text NOT NULL,
 session_key text NOT NULL, lane text NOT NULL CHECK(lane IN ('backfill','incremental')),
 files jsonb NOT NULL, status text NOT NULL DEFAULT 'waiting', error text,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(project_id,source_id,manifest_id)
);
CREATE TABLE IF NOT EXISTS ingestion_episodes (
 project_id text NOT NULL REFERENCES projects(id), source_id text NOT NULL, episode_key text NOT NULL,
 session_key text NOT NULL, lane text NOT NULL, logical_day text NOT NULL,
 started_at text, ended_at timestamptz, raw_ids jsonb NOT NULL,
 status text NOT NULL DEFAULT 'ready', run_id text, error text,
 PRIMARY KEY(project_id,source_id,episode_key)
);
CREATE INDEX IF NOT EXISTS ingestion_episodes_pending ON ingestion_episodes(status,ended_at);
CREATE INDEX IF NOT EXISTS raw_session_origin ON raw_records(project_id,source_id,(metadata->'origin'->>'path'));
CREATE INDEX IF NOT EXISTS manifests_pending ON ingestion_manifests(status,created_at);
CREATE TABLE IF NOT EXISTS ingest_receipts (
 project_id text NOT NULL,source_id text NOT NULL,stream_id text NOT NULL,offset_bytes bigint NOT NULL,
 raw_id text NOT NULL, length_bytes bigint NOT NULL, hash text NOT NULL, origin jsonb NOT NULL,
 PRIMARY KEY(project_id,source_id,stream_id,offset_bytes),
 FOREIGN KEY(project_id,raw_id) REFERENCES raw_records(project_id,id)
);
