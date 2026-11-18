CREATE TABLE IF NOT EXISTS ingestion_bots (
  project_id text NOT NULL REFERENCES projects(id), bot_uid text NOT NULL,
  name text, updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(project_id,bot_uid)
);
