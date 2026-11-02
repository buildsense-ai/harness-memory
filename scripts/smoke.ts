import { parseArgs } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { setTimeout } from "node:timers/promises";
import { uploadOnce } from "../src/upload/client.js";
import { assert, sha256, type Harness } from "../src/contracts.js";
const { values: v } = parseArgs({
  options: {
    config: { type: "string" },
    file: { type: "string" },
    harness: { type: "string" },
    state: { type: "string" },
    report: { type: "string" },
  },
});
assert(
  v.config && v.file && (v.harness === "xiaoba" || v.harness === "pi"),
  "smoke --config PRIVATE.json --file FILE --harness xiaoba|pi [--state FILE] [--report PRIVATE.json]",
);
const config = JSON.parse(await readFile(v.config, "utf8"));
const headers = {
  authorization: "Bearer " + config.key,
  "content-type": "application/json",
};
async function request(path: string, body?: unknown) {
  const r = await fetch(config.url + path, {
    method: body === undefined ? "GET" : "POST",
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw Error(path + ": HTTP " + r.status + " " + data.error);
  return data;
}
const progress = await uploadOnce(
  { ...config, harness: v.harness as Harness, file: v.file },
  v.state ?? v.file + ".state.local.json",
);
const started = await request("/v1/extractions", {
  source_id: progress.source_id,
  stream_id: progress.stream_id,
});
let run: any;
const until = Date.now() + 10 * 60 * 1000;
do {
  run = await request("/v1/extractions/" + started.run_id);
  if (run.status !== "running") break;
  assert(Date.now() < until, "smoke run timed out");
  await setTimeout(1000);
} while (true);
assert(run.status === "completed", "extraction failed: " + run.error);
assert(run.episodes.length > 0, "no episodes selected");
const input = new Set(run.input_refs);
let verified = 0;
const rawCache = new Map<string, Buffer>(),
  reports = [];
for (const ep of run.episodes) {
  let offset = 0;
  const selected = [];
  do {
    const page = await request("/v1/read", { ref: ep.episode_ref, offset });
    for (const e of page.events) {
      assert(input.has(e.ref), "episode has invalid reference");
      const single = await request("/v1/read", { ref: e.ref });
      assert(
        JSON.stringify(single.event.content) === JSON.stringify(e.content),
        "event read mismatch",
      );
      if (!rawCache.has(e.raw_ref)) {
        const rawResp = await fetch(config.url + "/v1/raw/" + e.raw_ref, {
          headers,
        });
        assert(rawResp.ok, "raw read failed");
        const raw = Buffer.from(await rawResp.arrayBuffer());
        assert(
          sha256(raw) === rawResp.headers.get("x-content-sha256"),
          "raw hash mismatch",
        );
        rawCache.set(e.raw_ref, raw);
      }
      selected.push(e);
      verified++;
    }
    offset = page.next_offset ?? -1;
  } while (offset !== -1);
  reports.push({ goal: ep.goal, events: selected });
}
// Verify original byte slices, rather than trusting the server's own hash alone.
const source = await readFile(v.file);
for (const report of reports)
  for (const e of report.events) {
    const raw = rawCache.get(e.raw_ref)!;
    assert(
      source.subarray(e.offset, e.offset + raw.length).equals(raw),
      "server raw differs from uploaded file",
    );
  }
const query = reports
  .flatMap((x) => x.events)
  .map((e) => e.text)
  .find((t) => t.trim().length > 0);
assert(query, "no searchable text");
const keyword = [...query].slice(0, 24).join("");
const hits = await request("/v1/episodes/search", { keywords: [keyword] });
assert(hits.length > 0, "selected source text not searchable");
if (v.report)
  await writeFile(v.report, JSON.stringify({ run, reports }, null, 2), {
    mode: 0o600,
  });
console.log(
  JSON.stringify({
    ok: true,
    harness: v.harness,
    uploaded_records: progress.uploaded_records,
    source_id: progress.source_id,
    stream_id: progress.stream_id,
    run_id: run.id,
    episodes: run.episodes.length,
    verified_events: verified,
    verified_raw_records: rawCache.size,
    search_hits: hits.length,
  }),
);
