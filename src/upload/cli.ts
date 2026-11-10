import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";
import { uploadOnce } from "./client.js";
import type { UploadConfig } from "./state.js";
import { assert, HttpError } from "../contracts.js";
const { values: v } = parseArgs({
  options: {
    harness: { type: "string" },
    file: { type: "string" },
    state: { type: "string" },
    config: { type: "string" },
    watch: { type: "boolean", default: false },
  },
});
assert(
  (v.harness === "xiaoba" || v.harness === "pi") &&
    v.file &&
    v.state &&
    v.config,
  "usage: upload --config PRIVATE.json --harness xiaoba|pi --file PATH --state PATH [--watch]",
);
const { url, key, process: processMemory = true, leaf_id } = JSON.parse(await readFile(v.config, "utf8"));
assert(
  typeof url === "string" && typeof key === "string",
  "config requires url/key",
);
const config: UploadConfig = { url, key, harness: v.harness, file: v.file, process: processMemory, leaf_id };
let stopped = false;
for (const s of ["SIGTERM", "SIGINT"])
  process.on(s, () => {
    stopped = true;
  });
do {
  try {
    console.log(JSON.stringify(await uploadOnce(config, v.state)));
  } catch (e) {
    console.error(e instanceof Error ? e.message : "upload failed");
    const retryable =
      e instanceof TypeError ||
      (e instanceof Error && ["TimeoutError", "AbortError"].includes(e.name));
    if (!v.watch || !retryable || e instanceof HttpError) {
      process.exitCode = 1;
      break;
    }
  }
  if (!v.watch || stopped) break;
  await setTimeout(30000);
} while (!stopped);
