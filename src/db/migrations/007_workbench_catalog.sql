CREATE TABLE IF NOT EXISTS workbench_catalog (
  project_id text PRIMARY KEY REFERENCES projects(id),
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
