import { it, expect, afterEach } from "vitest";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { uploadOnce } from "../src/upload/client.js";
const dirs: string[] = [];
afterEach(async () => {
  for (const d of dirs.splice(0)) await rm(d, { recursive: true, force: true });
});
async function setup() {
  const d = await mkdtemp(join(tmpdir(), "hm-"));
  dirs.push(d);
  const file = join(d, "log"),
    state = join(d, "state");
  const raw = Buffer.from(
    JSON.stringify({
      user: { text: "中文" },
      assistant: { text: "ok", tool_calls: [] },
    }) + "\n",
  );
  return {
    file,
    state,
    raw,
    config: {
      url: "http://127.0.0.1:1",
      key: "test",
      harness: "xiaoba" as const,
      file,
    },
  };
}
it("uploads only complete lines and advances state only on ACK", async () => {
  const s = await setup();
  await writeFile(s.file, s.raw.subarray(0, -1));
  let calls = 0;
  const send: any = async (_url: any, init: any) => {
    calls++;
    const b = JSON.parse(init.body);
    return new Response(
      JSON.stringify({
        next_offset:
          b.records.at(-1).offset +
          Buffer.from(b.records.at(-1).raw_base64, "base64").length,
        records: [],
      }),
    );
  };
  await uploadOnce(s.config, s.state, send);
  expect(calls).toBe(0);
  await writeFile(s.file, s.raw);
  await uploadOnce(s.config, s.state, send);
  expect(JSON.parse(await readFile(s.state, "utf8")).file_offset).toBe(s.raw.length);
  expect(calls).toBe(1);
});
it("retains offset after a lost ACK and resends the same source identity", async () => {
  const s = await setup();
  await writeFile(s.file, s.raw);
  let body: any;
  await expect(
    uploadOnce(s.config, s.state, (async (_u: any, i: any) => {
      body = JSON.parse(i.body);
      throw Error("network");
    }) as any),
  ).rejects.toThrow();
  expect(JSON.parse(await readFile(s.state, "utf8")).file_offset).toBe(0);
  await uploadOnce(s.config, s.state, (async (_u: any, i: any) => {
    expect(JSON.parse(i.body)).toEqual(body);
    return new Response(
      JSON.stringify({ next_offset: s.raw.length, records: [] }),
    );
  }) as any);
  await writeFile(s.file, "");
  await expect(uploadOnce(s.config, s.state)).rejects.toThrow(/shortened/);
});
it("rejects oversized records without skipping them", async () => {
  const s = await setup();
  await writeFile(
    s.file,
    JSON.stringify({
      user: { text: "x".repeat(4 * 1024 * 1024) },
      assistant: { text: "", tool_calls: [] },
    }) + "\n",
  );
  await expect(uploadOnce(s.config, s.state)).rejects.toThrow(/too large/);
  expect(JSON.parse(await readFile(s.state, "utf8")).file_offset).toBe(0);
});
it("rejects reusing state for a different endpoint or key", async () => {
  const s = await setup();
  await writeFile(s.file, "");
  await uploadOnce(s.config, s.state);
  await expect(
    uploadOnce({ ...s.config, key: "other" }, s.state),
  ).rejects.toThrow(/state/);
});

it("migrates the prior single-offset state format without losing its cursor", async () => {
  const s = await setup();
  const { sha256 } = await import("../src/contracts.js");
  const fingerprint = sha256(JSON.stringify([
    s.config.url.replace(/\/$/, ""), sha256(s.config.key), s.config.harness, (await import("node:path")).resolve(s.config.file),
  ]));
  await writeFile(s.state, JSON.stringify({ fingerprint, source_id: "src_old", stream_id: "stream_old", offset: 21, processed_offset: 14 }));
  await writeFile(s.file, Buffer.alloc(21));
  await uploadOnce(s.config, s.state, async () => { throw Error("should not upload an empty file"); });
  expect(JSON.parse(await readFile(s.state, "utf8"))).toMatchObject({ file_offset: 21, stream_offset: 21, processed_offset: 14 });
});

it("acknowledges the valid prefix before stopping at an oversized record", async () => {
  const s = await setup();
  await writeFile(
    s.file,
    Buffer.concat([s.raw, Buffer.from("x".repeat(4 * 1024 * 1024 + 1) + "\n")]),
  );
  let calls = 0;
  await expect(
    uploadOnce(s.config, s.state, (async (_u: any, i: any) => {
      calls++;
      const b = JSON.parse(i.body);
      expect(b.records).toHaveLength(1);
      return new Response(
        JSON.stringify({ next_offset: s.raw.length, records: [] }),
      );
    }) as any),
  ).rejects.toThrow(/too large/);
  expect(calls).toBe(1);
  expect(JSON.parse(await readFile(s.state, "utf8")).file_offset).toBe(s.raw.length);
});

it("automatically submits a complete acknowledged log snapshot once and retries a lost processing ACK",async()=>{
  const s=await setup();await writeFile(s.file,s.raw);let completeCalls=0;let fail=true;
  const send:any=async(url:string,init:any)=>{
    const body=JSON.parse(init.body);
    if(url.endsWith("/complete")){completeCalls++;expect(body.start_offset).toBe(0);expect(body.end_offset).toBe(s.raw.length);if(fail)throw Error("lost complete ACK");return Response.json({run_id:"run-fixed",status:"queued"});}
    return Response.json({next_offset:s.raw.length,records:[]});
  };
  await expect(uploadOnce({...s.config,process:true},s.state,send)).rejects.toThrow(/lost/);
  expect(JSON.parse(await readFile(s.state,"utf8")).file_offset).toBe(s.raw.length);
  fail=false;expect((await uploadOnce({...s.config,process:true},s.state,send)).run_id).toBe("run-fixed");
  await uploadOnce({...s.config,process:true},s.state,send);expect(completeCalls).toBe(2);
});

it("keeps source-file and server-stream offsets distinct and sends immutable origins", async () => {
  const s = await setup();
  const baseline = Buffer.from(JSON.stringify({ entry_type: "runtime", message: "already present" }) + "\n");
  const delta = s.raw;
  await writeFile(s.file, Buffer.concat([baseline, delta]));
  const originPath = "sessions/catscompany/2026-11-10/session.jsonl";
  const out = await uploadOnce({ ...s.config, originPath, startOffset: baseline.length }, s.state, (async (_u: any, i: any) => {
    const b = JSON.parse(i.body), record = b.records[0];
    expect(record.offset).toBe(0);
    expect(record.origin).toEqual({ path: originPath, offset: baseline.length });
    expect(record.events).toBeUndefined();
    return Response.json({ next_offset: delta.length, records: [] });
  }) as any);
  expect(out.file_offset).toBe(baseline.length + delta.length);
  expect(out.next_offset).toBe(delta.length);
  expect(JSON.parse(await readFile(s.state, "utf8"))).toMatchObject({ file_offset: baseline.length + delta.length, stream_offset: delta.length });
});

it("requires source coordinates when starting from a non-zero local offset", async () => {
  const s = await setup();
  await expect(uploadOnce({ ...s.config, startOffset: 42 }, s.state, async () => {
    throw Error("must reject before sending");
  })).rejects.toThrow(/origin path required/);
});

it("processes only the newly uploaded stream range and accepts eventless logs", async () => {
  const s = await setup();
  const rawRuntime = Buffer.from(JSON.stringify({ entry_type: "runtime", timestamp: "2026-11-10T00:00:00Z", session_id: "s", session_type: "catscompany", level: "info", message: "runtime" }) + "\n");
  await writeFile(s.file, rawRuntime);
  let complete: any;
  const send: any = async (url: string, init: any) => {
    const body = JSON.parse(init.body);
    if (url.endsWith("/complete")) { complete = body; return Response.json({ status: "skipped", reason: "no_normalized_events" }); }
    return Response.json({ next_offset: rawRuntime.length, records: [] });
  };
  const out = await uploadOnce({ ...s.config, originPath: "sessions/catscompany/2026-11-10/s.jsonl", process: true }, s.state, send);
  expect(complete).toMatchObject({ start_offset: 0, end_offset: rawRuntime.length });
  expect(out.processed_offset).toBe(rawRuntime.length);

  const next = Buffer.from(JSON.stringify({ entry_type: "turn", user: { text: "q" }, assistant: { text: "a", tool_calls: [] } }) + "\n");
  await writeFile(s.file, Buffer.concat([rawRuntime, next]));
  const calls: any[] = [];
  const deltaSend: any = async (url: string, init: any) => {
    const body = JSON.parse(init.body);
    if (url.endsWith("/complete")) { calls.push(body); return Response.json({ run_id: "run-delta", status: "queued" }); }
    return Response.json({ next_offset: rawRuntime.length + next.length, records: [] });
  };
  await uploadOnce({ ...s.config, originPath: "sessions/catscompany/2026-11-10/s.jsonl", process: true }, s.state, deltaSend);
  expect(calls).toEqual([{ source_id: expect.any(String), stream_id: expect.any(String), start_offset: rawRuntime.length, end_offset: rawRuntime.length + next.length }]);
});
