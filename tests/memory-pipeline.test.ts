import { beforeAll, afterAll, afterEach, it, expect, vi } from "vitest";
import { Pool } from "pg";
import { buildApp } from "../src/app.js";
import { createProject } from "../src/db/projects.js";
import { migrate } from "../src/db/migrate.js";
import { projectRecord } from "../src/adapters/index.js";
import { MemoryRunner } from "../src/extraction/memory-runner.js";
import { ref } from "../src/contracts.js";
import type { ChatModel } from "../src/extraction/model.js";

vi.setConfig({ testTimeout: 20000, hookTimeout: 20000 });
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
const apps: any[] = [];
beforeAll(() => migrate(pool));
afterEach(async () => { for(const app of apps.splice(0)) await app.close(); });
afterAll(async () => { await pool.end(); });
const thread = (n: number) => ({ thread_id: "T"+n, title:"任务"+n, desired_outcome:"完成任务"+n, include_topics:[], exclude_topics:[], boundary_note:"独立目标" });
function fixture() {
  return [
    { role:"user", content:"修复上传服务" },
    { role:"assistant", content:"先检查实际错误", tool_calls:[{id:"c1",type:"function",function:{name:"shell",arguments:'{"cmd":"check"}'}}] },
    { role:"tool",tool_call_id:"c1",content:"检查显示端口8460正常" },
    { role:"assistant",content:"上传路径已核对" },
    { role:"user",content:"另外记录耳机建议" },
    { role:"assistant",content:"当时建议保留地铁需求" },
  ];
}
function batch(messages: any[]) {
  let offset=0;
  return {source_id:"same-source",stream_id:"same-stream",harness:"xiaoba",records:messages.map(m=>{
    const raw=Buffer.from(JSON.stringify(m)+"\n"),start=offset;offset+=raw.length;
    return {offset:start,raw_base64:raw.toString("base64"),events:projectRecord("xiaoba",raw).events.map(({content,text,fidelity,...d})=>d)};
  })};
}
async function setup(overrides: Partial<ChatModel> = {}) {
  const p=await createProject(pool,"memory-integration"), other=await createProject(pool,"memory-other");
  const partition=vi.fn(async (input:any[])=>({task_threads:[thread(1),thread(2)],query_assignments:input.filter(e=>e.kind==="query").map((e,i)=>({query_ref:e.ref,thread_ids:["T"+(i+1)],role:"origin" as const})),relations:[]}));
  const memory=vi.fn(async(t:any)=>({markdown:"# "+t.title+"\n\n## 背景\n上传ABC\n\n## 发生了什么\n路径DEF\n"}));
  const select=vi.fn(async()=>{throw Error("legacy selector must never run");});
  const model: ChatModel={partition,memory,select,...overrides};
  const app=await buildApp({pool,model});apps.push(app);await app.ready();
  const post=async(url:string,payload:any,key=p.key)=>(await app.inject({method:"POST",url,headers:{authorization:"Bearer "+key},payload}));
  return {p,other,partition,memory,select,model,app,post};
}
async function uploadAndComplete(s: Awaited<ReturnType<typeof setup>>) {
  const body=batch(fixture()), upload=await s.post("/v1/ingest/batches",body);expect(upload.statusCode).toBe(200);
  const ack=upload.json(), complete={source_id:body.source_id,stream_id:body.stream_id,end_offset:ack.next_offset};
  const r=await s.post("/v1/ingest/complete",complete);expect(r.statusCode).toBe(200);
  const run=r.json().run_id;
  let status:any;
  await vi.waitFor(async()=>{status=(await s.app.inject({method:"GET",url:"/v1/extractions/"+run,headers:{authorization:"Bearer "+s.p.key}})).json();expect(["completed","partial","failed"]).toContain(status.status);},{timeout:7000,interval:20});
  return {body,ack,complete,run,status};
}
it("processes complete native turns automatically and reads exactly the generated candidate",async()=>{
  const s=await setup(),x=await uploadAndComplete(s);
  expect(x.status.status).toBe("completed");expect(x.status.documents).toHaveLength(2);expect(s.select).not.toHaveBeenCalled();
  expect(s.partition.mock.calls[0][0].map(e=>e.kind)).toEqual(["query","message","message","query","message"]);
  expect(s.partition.mock.calls[0][0].map(e=>e.text)).toContain("先检查实际错误");
  expect(s.memory.mock.calls[0][2].map((e:any)=>e.kind)).toEqual(["query","message","tool_call","tool_result","message"]);
  const search=await s.post("/v1/memories/search",{keywords:["上传ABC","路径DEF"]});expect(search.statusCode).toBe(200);expect(search.json().items).toHaveLength(2);
  const doc=search.json().items.find((d:any)=>d.markdown.startsWith("# 任务1")),ep=doc.source_refs[0];expect(doc.markdown).toContain("episode_id: `"+ep+"`");
  let offset:number|null=0;const events:any[]=[];
  while(offset!==null){const r=(await s.post("/v1/read",{ref:ep,offset,limit:2})).json();events.push(...r.events);offset=r.next_offset;}
  expect(events.map(e=>e.ref)).toEqual(x.ack.records.slice(0,4).flatMap((r:any)=>r.event_refs));
  expect(events.map(e=>e.content)).toEqual(s.memory.mock.calls[0][2].map((e:any)=>e.content));
  const raw=await s.app.inject({method:"GET",url:"/v1/raw/"+events[0].raw_ref,headers:{authorization:"Bearer "+s.p.key}});
  expect(raw.rawPayload.equals(Buffer.from(x.body.records[0].raw_base64,"base64"))).toBe(true);
  const again=(await s.post("/v1/ingest/complete",x.complete)).json();expect(again.run_id).toBe(x.run);expect(s.partition).toHaveBeenCalledTimes(1);expect(s.memory).toHaveBeenCalledTimes(2);
});
it("deduplicates document matches before the ten-document cap and paginates the full set",async()=>{
  const s=await setup(),x=await uploadAndComplete(s),ep=x.status.documents[0].source_refs[0];
  for(let i=0;i<12;i++)await pool.query("insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown) values($1,$2,$3,$4,$5,$6)",[ref("mem"),s.p.project_id,x.run,"seed"+i,ep,"# doc"+i+"\n\nUniQUeTOKEN "+"dedupmark ".repeat(20)+"\n\notherparagraph"]);
  const first=(await s.post("/v1/memories/search",{keywords:["uniquetoken","dedupmark","otherparagraph"]})).json();expect(first.items).toHaveLength(10);expect(new Set(first.items.map((d:any)=>d.memory_id)).size).toBe(10);expect(first.next_offset).toBe(10);
  const second=(await s.post("/v1/memories/search",{keywords:["uniquetoken"],offset:first.next_offset})).json();expect(second.items).toHaveLength(2);expect(second.next_offset).toBeNull();expect(new Set([...first.items,...second.items].map(d=>d.memory_id)).size).toBe(12);
  expect((await s.post("/v1/memories/search",{keywords:["uniquetoken"],limit:11})).statusCode).toBe(400);
  expect(first.items[0].markdown).toContain("otherparagraph");
  expect((await s.post("/v1/memories/search",{keywords:[ep]})).json().items).toEqual([]);
});
it("requires a Key and never exposes another Key's documents, episode, event or raw",async()=>{
  const s=await setup(),x=await uploadAndComplete(s),ep=x.status.documents[0].source_refs[0];
  expect((await s.post("/v1/memories/search",{keywords:["上传ABC"],project_id:s.p.project_id},s.other.key)).json().items).toEqual([]);
  for(const r of [ep,x.ack.records[0].event_refs[0]])expect((await s.post("/v1/read",{ref:r,project_id:s.p.project_id},s.other.key)).statusCode).toBe(404);
  expect((await s.app.inject({method:"GET",url:"/v1/raw/"+x.ack.records[0].raw_ref,headers:{authorization:"Bearer "+s.other.key}})).statusCode).toBe(404);
  for(const url of ["/v1/memories/search","/v1/ingest/complete"])expect((await s.app.inject({method:"POST",url,payload:{}})).statusCode).toBe(401);
  expect((await s.post("/v1/ingest/complete",x.complete,s.other.key)).statusCode).toBe(404);
});
it("publishes successful threads but rejects a malformed document instead of storing partial output",async()=>{
  const s=await setup({memory:async t=>({markdown:t.thread_id==="T2"?"# no body":"# valid\n\n原文记录保持完整。"})}),x=await uploadAndComplete(s);
  expect(x.status.status).toBe("partial");expect(x.status.documents).toHaveLength(1);expect(x.status.error).toContain("T2");
  expect((await s.post("/v1/memories/search",{keywords:["no body"]})).json().items).toEqual([]);
  const originalId=x.status.documents[0].memory_id;
  s.model.memory=async t=>({markdown:"# "+t.title+"\n\n完整历史记录。"});
  const retry=(await s.post("/v1/ingest/complete",{...x.complete,retry:true})).json();expect(retry.run_id).toBe(x.run);
  await vi.waitFor(async()=>{const r=(await s.app.inject({method:"GET",url:"/v1/extractions/"+x.run,headers:{authorization:"Bearer "+s.p.key}})).json();expect(r.status).toBe("completed");expect(r.documents).toHaveLength(2);expect(r.documents.some((d:any)=>d.memory_id===originalId)).toBe(true);},{timeout:7000,interval:20});
  expect(s.partition).toHaveBeenCalledTimes(1);
});
it("recovers a queued snapshot after restart, reuses the saved partition and published documents",async()=>{
  const s=await setup(),x=await uploadAndComplete(s);await s.app.close();
  await pool.query("delete from memory_documents where project_id=$1 and run_id=$2 and thread_id='T2'",[s.p.project_id,x.run]);
  await pool.query("update extraction_runs set status='running' where id=$1",[x.run]);
  const model={...s.model,partition:vi.fn(async()=>{throw Error("must reuse saved partition");})};
  const runner=new MemoryRunner(pool,model);await runner.initialize();await runner.wait();await runner.close();
  expect((await pool.query("select status from extraction_runs where id=$1",[x.run])).rows[0].status).toBe("completed");
  expect(Number((await pool.query("select count(*) n from memory_documents where run_id=$1",[x.run])).rows[0].n)).toBe(2);expect(model.partition).not.toHaveBeenCalled();
});
