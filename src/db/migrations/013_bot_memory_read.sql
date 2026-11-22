CREATE TABLE IF NOT EXISTS bot_memory_keys (
  project_id text NOT NULL REFERENCES projects(id),
  bot_uid text NOT NULL CHECK (bot_uid ~ '^[1-9][0-9]{0,18}$'),
  key_hash text UNIQUE NOT NULL,
  PRIMARY KEY (project_id, bot_uid)
);

CREATE TABLE IF NOT EXISTS bot_memory_retrievals (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  bot_uid text NOT NULL,
  wiki_ids text[] NOT NULL CHECK (cardinality(wiki_ids) <= 30),
  created_at timestamptz NOT NULL DEFAULT now()
);
