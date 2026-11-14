import { searchMemories } from "./memories.js";
import { MemoryRunner } from "./extraction/memory-runner.js";
import Fastify from "fastify";
import type { Pool } from "pg";
import { assert } from "./contracts.js";
import { authenticateIdentity } from "./db/projects.js";
import { ingestBatch } from "./ingest.js";
import { readReference, readRaw } from "./read.js";
import { ExtractionRunner } from "./extraction/runner.js";
import type { ChatModel } from "./extraction/model.js";
import { searchEpisodes } from "./search.js";
import {
  listWorkbenchStreams,
  listWorkbenchSessions,
  listWorkbenchRuns,
  getWorkbenchGraph,
  getWorkbenchRunEvents,
  getMemoryDocument,
  listWorkbenchFilters,
} from "./workbench.js";
import { WORKBENCH_HTML, WORKBENCH_CSS, WORKBENCH_OVERRIDES_CSS, WORKBENCH_JS } from "./workbench-ui.js";
export async function buildApp({
  pool,
  model,
  budget = 65536,
  memoryBudget = 4 * 1024 * 1024,
  memoryRunConcurrency = 2,
}: {
  pool: Pool;
  model?: ChatModel;
  budget?: number;
  memoryBudget?: number;
  memoryRunConcurrency?: number;
}) {
  const app = Fastify({ bodyLimit: 4 * 1024 * 1024, logger: false });
  app.get("/workbench", async (_request, reply) => reply.type("text/html; charset=utf-8").send(WORKBENCH_HTML));
  app.get("/workbench.css", async (_request, reply) => reply.type("text/css; charset=utf-8").send(WORKBENCH_CSS));
  app.get("/workbench-overrides.css", async (_request, reply) => reply.type("text/css; charset=utf-8").send(WORKBENCH_OVERRIDES_CSS));
  app.get("/workbench.js", async (_request, reply) => reply.type("text/javascript; charset=utf-8").send(WORKBENCH_JS));
  const runner = new ExtractionRunner(pool, model, budget);
  const memory = new MemoryRunner(pool, model, memoryBudget, memoryRunConcurrency);
  app.addHook("onReady", async () => memory.initialize());
  app.addHook("onClose", async () => { await memory.close(); await runner.wait(); });
  app.setErrorHandler((error, _request, reply) => {
    const e = error as Error & { statusCode?: number };
    const status = e.statusCode ?? 500;
    reply
      .code(status)
      .send({ error: status < 500 ? e.message : "internal server error" });
  });
  app.get("/healthz", async () => {
    await pool.query("select 1");
    return { ok: true };
  });
  await app.register(
    async (api) => {
      api.decorateRequest("projectId", "");
      api.decorateRequest("uploadKeyId", "");
      api.addHook("onRequest", async (request) => {
        const a = request.headers.authorization;
        assert(
          typeof a === "string" && a.startsWith("Bearer "),
          "project key required",
          401,
        );
        const identity = await authenticateIdentity(pool, a.slice(7));
        (request as any).projectId = identity.project_id;
        (request as any).uploadKeyId = identity.upload_key_id;
      });
      api.post("/ingest/batches", async (r) =>
        ingestBatch(pool, (r as any).projectId, r.body as any, (r as any).uploadKeyId),
      );
      api.post("/ingest/complete", async (r) => {
        const request = r.body as any;
        assert(request && Number.isSafeInteger(request.end_offset) && request.end_offset > 0, "complete requires an acknowledged end_offset");
        return memory.enqueue((r as any).projectId, request);
      });
      api.post("/memories/search", async (r) => searchMemories(pool, (r as any).projectId, r.body as any));
      api.get("/workbench/streams", async (r) => listWorkbenchStreams(pool, (r as any).projectId, r.query as any));
      api.get("/workbench/filters", async (r) => listWorkbenchFilters(pool, (r as any).projectId, r.query as any));
      api.get("/workbench/sessions", async (r) => listWorkbenchSessions(pool, (r as any).projectId, r.query as any));
      api.get("/workbench/runs", async (r) => listWorkbenchRuns(pool, (r as any).projectId, r.query as any));
      api.get("/workbench/runs/:id/graph", async (r) => getWorkbenchGraph(pool, (r as any).projectId, (r.params as any).id, r.query as any));
      api.get("/workbench/runs/:id/events", async (r) => getWorkbenchRunEvents(pool, (r as any).projectId, (r.params as any).id, r.query as any));
      api.get("/memories/:id", async (r) => getMemoryDocument(pool, (r as any).projectId, (r.params as any).id));
      api.post("/read", async (r) =>
        readReference(pool, (r as any).projectId, r.body as any),
      );
      api.post("/extractions", async (r) =>
        model?.memory ? memory.enqueue((r as any).projectId, r.body as any) : runner.start((r as any).projectId, r.body as any),
      );
      api.get<{ Params: { id: string } }>("/extractions/:id", async (r) =>
        runner.get((r as any).projectId, r.params.id),
      );
      api.post("/episodes/search", async (r) =>
        searchEpisodes(pool, (r as any).projectId, r.body as any),
      );
      api.get<{ Params: { ref: string } }>("/raw/:ref", async (r, reply) => {
        const data = await readRaw(pool, (r as any).projectId, r.params.ref);
        return reply
          .type("application/octet-stream")
          .header("x-content-sha256", data.sha256)
          .header("x-source-path", data.origin?.path ?? "")
          .header("x-source-offset", data.origin ? String(data.origin.offset) : "")
          .send(data.bytes);
      });
    },
    { prefix: "/v1" },
  );
  return app;
}
