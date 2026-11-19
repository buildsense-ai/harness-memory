CREATE INDEX IF NOT EXISTS ingestion_episodes_read_run
  ON ingestion_episodes(project_id, source_id, run_id, session_key)
  WHERE run_id IS NOT NULL;
