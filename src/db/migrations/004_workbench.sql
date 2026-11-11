ALTER TABLE raw_records ADD COLUMN IF NOT EXISTS received_at timestamptz;
ALTER TABLE streams ADD COLUMN IF NOT EXISTS last_received_at timestamptz;
CREATE INDEX IF NOT EXISTS raw_records_received_idx
  ON raw_records(project_id, source_id, stream_id, received_at DESC);
