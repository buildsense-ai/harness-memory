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
  expect(JSON.parse(await readFile(s.state, "utf8")).offset).toBe(s.raw.length);
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
  expect(JSON.parse(await readFile(s.state, "utf8")).offset).toBe(0);
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
  expect(JSON.parse(await readFile(s.state, "utf8")).offset).toBe(0);
});
it("rejects reusing state for a different endpoint or key", async () => {
  const s = await setup();
  await writeFile(s.file, "");
  await uploadOnce(s.config, s.state);
  await expect(
    uploadOnce({ ...s.config, key: "other" }, s.state),
  ).rejects.toThrow(/state/);
});
