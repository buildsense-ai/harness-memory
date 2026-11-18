CREATE TABLE IF NOT EXISTS ingest_fragments (
 project_id text NOT NULL REFERENCES projects(id), source_id text NOT NULL, stream_id text NOT NULL,
 record_offset bigint NOT NULL, fragment_offset bigint NOT NULL, total_bytes bigint NOT NULL,
 record_hash text NOT NULL, origin jsonb NOT NULL, raw bytea NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(project_id,source_id,stream_id,record_offset,fragment_offset)
);
