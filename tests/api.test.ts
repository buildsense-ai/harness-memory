import { beforeAll, afterAll, it, expect } from "vitest";
import { Pool } from "pg";
import { buildApp } from "../src/app.js";
import { createProject } from "../src/db/projects.js";
import { migrate } from "../src/db/migrate.js";
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
let app: any, key: string;
beforeAll(async () => {
  await migrate(pool);
  key = (await createProject(pool, "api")).key;
  app = await buildApp({ pool });
});
afterAll(async () => {
  await app?.close();
  await pool.end();
});
it("requires project authorization on all data routes", async () => {
  expect(
    (
      await app.inject({
        method: "POST",
        url: "/v1/read",
        payload: { ref: "evt_unknown" },
      })
    ).statusCode,
  ).toBe(401);
  expect(
    (
      await app.inject({
        method: "POST",
        url: "/v1/read",
        headers: { authorization: "Bearer " + key },
        payload: { ref: "evt_unknown" },
      })
    ).statusCode,
  ).toBe(404);
});
it("enforces the encoded request body limit", async () => {
  const r = await app.inject({
    method: "POST",
    url: "/v1/ingest/batches",
    headers: { authorization: "Bearer " + key },
    payload: { padding: "x".repeat(4 * 1024 * 1024) },
  });
  expect(r.statusCode).toBe(413);
});
