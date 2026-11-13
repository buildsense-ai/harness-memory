import type { Pool } from "pg";
import { randomBytes } from "node:crypto";
import { ref, sha256, HttpError } from "../contracts.js";
export async function createProject(pool: Pool, name: string) {
  const key = randomBytes(32).toString("hex"),
    project_id = ref("prj");
  await pool.query("insert into projects(id,name,key_hash) values($1,$2,$3)", [
    project_id,
    name,
    sha256(key),
  ]);
  return { project_id, key };
}
export async function createProjectKey(pool: Pool, projectId: string) {
  const key = randomBytes(32).toString("hex");
  await pool.query("insert into project_keys(id,project_id,key_hash) values($1,$2,$3)", [
    ref("key"),
    projectId,
    sha256(key),
  ]);
  return { project_id: projectId, key };
}
export async function authenticateIdentity(pool: Pool, key: string) {
  const hash = sha256(key);
  const r = await pool.query(
    "select id project_id,id upload_key_id from projects where key_hash=$1 union all select project_id,id upload_key_id from project_keys where key_hash=$1 limit 1",
    [hash],
  );
  if (!r.rowCount) throw new HttpError(401, "invalid project key");
  return { project_id: r.rows[0].project_id as string, upload_key_id: r.rows[0].upload_key_id as string };
}

export async function authenticate(pool: Pool, key: string) {
  return (await authenticateIdentity(pool, key)).project_id;
}
