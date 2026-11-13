ALTER TABLE raw_records ADD COLUMN IF NOT EXISTS upload_key_id text;
CREATE INDEX IF NOT EXISTS raw_records_upload_key_idx
  ON raw_records(project_id, upload_key_id, received_at DESC);
