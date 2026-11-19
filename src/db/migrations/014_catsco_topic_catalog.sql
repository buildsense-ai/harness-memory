CREATE INDEX IF NOT EXISTS raw_records_session_lookup
  ON raw_records(project_id, (metadata->>'session_id'));

CREATE INDEX IF NOT EXISTS episode_events_event_lookup
  ON episode_events(event_id);

CREATE INDEX IF NOT EXISTS memory_documents_episode_lookup
  ON memory_documents(episode_id);
