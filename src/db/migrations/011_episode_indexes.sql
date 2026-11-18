CREATE INDEX IF NOT EXISTS raw_conversation_run ON raw_records(project_id,source_id,(metadata->>'conversation_run_id'))
  WHERE metadata->>'record_type'='transcript';
CREATE INDEX IF NOT EXISTS raw_transcript_sequence ON raw_records(project_id,source_id,(metadata->>'transcript_stream_id'),(metadata->>'session_id'),((metadata->>'transcript_sequence')::bigint))
  WHERE metadata->>'record_type'='transcript';
CREATE INDEX IF NOT EXISTS raw_transcript_run ON raw_records(project_id,source_id,(metadata->>'session_id'),(metadata->>'run_id'))
  WHERE metadata->>'record_type'='transcript';
