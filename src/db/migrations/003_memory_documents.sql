ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS memory_request jsonb;
ALTER TABLE extraction_runs ADD COLUMN IF NOT EXISTS input_signature text;
CREATE UNIQUE INDEX IF NOT EXISTS memory_snapshot_unique ON extraction_runs(project_id,input_signature) WHERE input_signature IS NOT NULL;
CREATE TABLE IF NOT EXISTS memory_documents (
 id text PRIMARY KEY, project_id text NOT NULL, run_id text NOT NULL, thread_id text NOT NULL,
 episode_id text NOT NULL, markdown text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(project_id,run_id,thread_id),
 FOREIGN KEY(project_id,run_id) REFERENCES extraction_runs(project_id,id),
 FOREIGN KEY(project_id,episode_id) REFERENCES episodes(project_id,id)
);
CREATE INDEX IF NOT EXISTS memory_documents_project ON memory_documents(project_id,created_at DESC,id);
