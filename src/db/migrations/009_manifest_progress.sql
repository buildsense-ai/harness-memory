ALTER TABLE ingestion_manifests ADD COLUMN IF NOT EXISTS indexed_offsets jsonb;
