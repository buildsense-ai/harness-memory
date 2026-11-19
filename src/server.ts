import { createPool } from "./db/pool.js";
import { migrate } from "./db/migrate.js";
import { buildApp } from "./app.js";
import { configuredModel } from "./extraction/model.js";
import { defaultPipelineConfig } from "./extraction/memory-runner.js";
const pool = createPool();
await migrate(pool);
await pool.query(
  "update extraction_runs set status='interrupted',error='service restarted; rerun manually' where status='running' and memory_request is null",
);
const app = await buildApp({
  pool,
  model: configuredModel(),
  botUploadProject: process.env.MEMORY_BOT_PROJECT_ID,
  catscoRead: process.env.MEMORY_CATSCO_READ_TOKEN ? {
    token: process.env.MEMORY_CATSCO_READ_TOKEN,
  } : undefined,
  budget: Number(process.env.MODEL_INPUT_BUDGET ?? 65536),
  pipeline: {
    stage1: Number(process.env.MEMORY_STAGE1_CONCURRENCY ?? defaultPipelineConfig.stage1),
    stage2: Number(process.env.MEMORY_STAGE2_CONCURRENCY ?? defaultPipelineConfig.stage2),
    total: Number(process.env.MEMORY_MODEL_CONCURRENCY ?? defaultPipelineConfig.total),
    highWater: Number(process.env.MEMORY_STAGE2_HIGH_WATER ?? defaultPipelineConfig.highWater),
  },
});
await app.listen({
  host: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 8460),
});
console.log("Harness Memory listening");
for (const signal of ["SIGTERM", "SIGINT"])
  process.once(signal, async () => {
    await app.close();
    await pool.end();
    process.exit(0);
  });
