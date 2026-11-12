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
  const partition=vi.fn(async (input:any[])=>{const queries=input.filter(e=>e.kind==="query");return {task_threads:queries.map((_,i)=>thread(i+1)),query_assignments:queries.map((e,i)=>({query_ref:e.ref,thread_ids:["T"+(i+1)],role:"origin" as const})),relations:[]};});
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
it("normalizes an ordered XiaoBa turn through upload, partition, memory generation and source read",async()=>{
  const s=await setup(),record={entry_type:"turn",turn:9,timestamp:"2026-11-12T00:00:00Z",messages:[
    {role:"user",content:"部署后只上传新增日志"},
    {role:"assistant",content:"先读取完整 JSONL 行"},
    {role:"assistant",content:null,tool_calls:[{id:"ordered-call",type:"function",function:{name:"read_file",arguments:'{"path":"logs.jsonl"}'}}]},
    {role:"tool",tool_call_id:"ordered-call",content:"增量游标已确认"},
    {role:"assistant",content:"本批次处理完成"},
  ]};
  const raw=Buffer.from(JSON.stringify(record)+"\n"),body={source_id:"ordered-source",stream_id:"ordered-stream",harness:"xiaoba",records:[{offset:0,raw_base64:raw.toString("base64"),origin:{path:"sessions/catscompany/2026-11-12/session.jsonl",offset:1200}}]};
  expect((await s.post("/v1/ingest/batches",body)).statusCode).toBe(200);
  const complete=(await s.post("/v1/ingest/complete",{source_id:body.source_id,stream_id:body.stream_id,end_offset:raw.length})).json();
  let status:any;
  await vi.waitFor(async()=>{status=(await s.app.inject({method:"GET",url:"/v1/extractions/"+complete.run_id,headers:{authorization:"Bearer "+s.p.key}})).json();expect(["completed","partial","failed"]).toContain(status.status);},{timeout:7000,interval:20});
  expect(status.status).toBe("completed");
  expect(s.partition.mock.calls[0][0].map((event:any)=>event.kind)).toEqual(["query","message","message"]);
  expect(s.partition.mock.calls[0][0].map((event:any)=>event.text)).toContain("本批次处理完成");
  const candidate=s.memory.mock.calls[0][2];
  expect(candidate.map((event:any)=>event.kind)).toEqual(["query","message","tool_call","tool_result","message"]);
  expect(candidate[2].tool_call_id).toBe(candidate[3].tool_call_id);
  const episode=(await s.post("/v1/read",{ref:status.documents[0].source_refs[0]})).json();
  expect(episode.events.map((event:any)=>event.content)).toEqual(candidate.map((event:any)=>event.content));
  expect(episode.events.every((event:any)=>event.origin?.offset===1200)).toBe(true);
  const original=await s.app.inject({method:"GET",url:"/v1/raw/"+episode.events[0].raw_ref,headers:{authorization:"Bearer "+s.p.key}});
  expect(original.rawPayload).toEqual(raw);
});
it("processes new transcript rows once per source event, groups pending with its run, and suppresses its compatible summary",async()=>{
  const partition=vi.fn(async(input:any[])=>{
      const queries=input.filter(e=>e.kind==="query");
      return {task_threads:[thread(1)],query_assignments:queries.map((e:any,i:number)=>({query_ref:e.ref,thread_ids:["T1"],role:i===0?"origin":"continuation" as const})),relations:[]};
  });
  const s=await setup({partition});
  const base={entry_type:"transcript",schema_version:1,stream_id:"logger-7",session_id:"s",timestamp:"2026-11-12T10:00:00Z"};
  const run="episode:1:abc";
  const rows=[
    {...base,event_id:"logger-7:1",seq:1,event:{type:"input_received",input_id:"root-id",text:"ROOT_TASK"}},
    {...base,event_id:"logger-7:2",seq:2,run_id:run,event:{type:"run_started"}},
    {...base,event_id:"logger-7:3",seq:3,run_id:run,event:{type:"input_consumed",input_ids:["root-id"],kind:"root",text:"ROOT_TASK"}},
    {...base,event_id:"logger-7:4",seq:4,run_id:run,event:{type:"assistant_message",text:"先读取文件",phase:"tool_prelude",model_call:1}},
    {...base,event_id:"logger-7:5",seq:5,run_id:run,event:{type:"tool_started",call_id:"pair-1",name:"read_file",arguments:'{"path":"a.ts"}'}},
    {...base,event_id:"logger-7:6",seq:6,event:{type:"input_received",input_id:"pending-id",text:"PENDING_TASK"}},
    {...base,event_id:"logger-7:7",seq:7,run_id:run,event:{type:"tool_finished",call_id:"pair-1",name:"read_file",result:"完整源码",duration_ms:2}},
    {...base,event_id:"logger-7:8",seq:8,run_id:run,event:{type:"input_consumed",input_ids:["pending-id"],kind:"pending",text:"PENDING_TASK"}},
    {...base,event_id:"logger-7:9",seq:9,run_id:run,event:{type:"runtime_observation",source:"memory_branch",text:"此前决定保留兼容接口"}},
    {...base,event_id:"logger-7:10",seq:10,run_id:run,event:{type:"assistant_message",text:"已按追加要求完成",phase:"reply",model_call:2}},
    {entry_type:"turn",turn:1,run_id:run,timestamp:base.timestamp,session_id:"s",session_type:"cli",user:{text:"ROOT_TASK"},assistant:{text:"已按追加要求完成",tool_calls:[{id:"pair-1",name:"read_file",arguments:{path:"a.ts"},result:"完整源码"}]},tokens:{prompt:1,completion:1}},
    {...base,event_id:"logger-7:11",seq:11,run_id:run,event:{type:"run_finished",status:"completed"}},
  ];
  const body=batch(rows),upload=await s.post("/v1/ingest/batches",body);expect(upload.statusCode).toBe(200);
  const complete=(await s.post("/v1/ingest/complete",{source_id:body.source_id,stream_id:body.stream_id,end_offset:upload.json().next_offset})).json();
  let status:any;
  await vi.waitFor(async()=>{status=(await s.app.inject({method:"GET",url:"/v1/extractions/"+complete.run_id,headers:{authorization:"Bearer "+s.p.key}})).json();expect(["completed","partial","failed"]).toContain(status.status);},{timeout:7000,interval:20});
  expect(status.status).toBe("completed");
  const dialogue=partition.mock.calls[0][0];
  expect(dialogue.map((e:any)=>e.kind)).toEqual(["query","message","query","message","message"]);
  expect(dialogue.map((e:any)=>e.text)).toEqual(["ROOT_TASK","先读取文件","PENDING_TASK","此前决定保留兼容接口","已按追加要求完成"]);
  expect(dialogue[2]).toMatchObject({input_kind:"pending"});
  expect(dialogue[3]).toMatchObject({source:"memory_branch"});
  const candidates=s.memory.mock.calls.find((call:any[])=>call[0].thread_id==="T1")![2];
  expect(candidates.map((e:any)=>e.kind)).toEqual(["query","message","tool_call","tool_result","query","message","message"]);
  expect(candidates.filter((e:any)=>e.kind==="query").map((e:any)=>e.input_kind)).toEqual(["root","pending"]);
  expect(candidates.find((e:any)=>e.kind==="tool_call").tool_call_id).toBe(candidates.find((e:any)=>e.kind==="tool_result").tool_call_id);
  expect(candidates.some((e:any)=>e.text.includes("已按追加要求完成"))).toBe(true);
  expect(candidates.some((e:any)=>e.text.includes("ROOT_TASK")&&e.raw_ref===candidates[0].raw_ref&&e.kind==="query")).toBe(true);
  const queryEvent=candidates.find((e:any)=>e.kind==="query"&&e.input_kind==="root");
  const original=await s.app.inject({method:"GET",url:"/v1/raw/"+queryEvent.raw_ref,headers:{authorization:"Bearer "+s.p.key}});
  expect(JSON.parse(original.rawPayload.toString("utf8")).event).toMatchObject({type:"input_consumed",kind:"root",text:"ROOT_TASK"});
});
it("defers a run split across upload windows, then processes the complete original run once it closes",async()=>{
  const s=await setup();
  const base={entry_type:"transcript",schema_version:1,stream_id:"logger-long",session_id:"s-long",timestamp:"2026-11-12T10:00:00Z"};
  const run="episode:1:long";
  const rows=[
    {...base,event_id:"logger-long:1",seq:1,event:{type:"input_received",input_id:"root-long",text:"长任务根输入"}},
    {...base,event_id:"logger-long:2",seq:2,run_id:run,event:{type:"run_started"}},
    {...base,event_id:"logger-long:3",seq:3,run_id:run,event:{type:"input_consumed",input_ids:["root-long"],kind:"root",text:"长任务根输入"}},
    {...base,event_id:"logger-long:4",seq:4,run_id:run,event:{type:"assistant_message",text:"中间实现过程",phase:"tool_prelude",model_call:1}},
    {...base,event_id:"logger-long:5",seq:5,run_id:run,event:{type:"tool_started",call_id:"long-call",name:"shell",arguments:'{"cmd":"test"}'}},
    {...base,event_id:"logger-long:6",seq:6,run_id:run,event:{type:"tool_finished",call_id:"long-call",name:"shell",result:"关键结果",duration_ms:12}},
    {...base,event_id:"logger-long:7",seq:7,run_id:run,event:{type:"assistant_message",text:"最终完成结果",phase:"reply",model_call:2}},
    {entry_type:"turn",turn:1,run_id:run,timestamp:base.timestamp,session_id:"s-long",session_type:"cli",user:{text:"长任务根输入"},assistant:{text:"最终完成结果",tool_calls:[{id:"long-call",name:"shell",arguments:{cmd:"test"},result:"关键结果"}]},tokens:{prompt:1,completion:1}},
    {...base,event_id:"logger-long:8",seq:8,run_id:run,event:{type:"run_finished",status:"completed"}},
  ];
  let offset=0;
  const body={source_id:"long-source",stream_id:"long-stream",harness:"xiaoba",records:rows.map((row:any)=>{const raw=Buffer.from(JSON.stringify(row)+"\n"),start=offset;offset+=raw.length;return {offset:start,raw_base64:raw.toString("base64"),origin:{path:"sessions/cli/2026-11-12/long.jsonl",offset:start}};})};
  const firstBatch={...body,records:body.records.slice(0,5)};
  const firstUpload=await s.post("/v1/ingest/batches",firstBatch);expect(firstUpload.statusCode).toBe(200);
  const firstEnd=firstUpload.json().next_offset;
  const deferred=await s.post("/v1/ingest/complete",{source_id:body.source_id,stream_id:body.stream_id,start_offset:0,end_offset:firstEnd});
  expect(deferred.json()).toEqual({status:"skipped",reason:"no_normalized_events"});
  expect(s.partition).not.toHaveBeenCalled();
  const secondBatch={...body,records:body.records.slice(5)};
  const secondUpload=await s.post("/v1/ingest/batches",secondBatch);expect(secondUpload.statusCode).toBe(200);
  const completed=(await s.post("/v1/ingest/complete",{source_id:body.source_id,stream_id:body.stream_id,start_offset:firstEnd,end_offset:secondUpload.json().next_offset})).json();
  let status:any;
  await vi.waitFor(async()=>{status=(await s.app.inject({method:"GET",url:"/v1/extractions/"+completed.run_id,headers:{authorization:"Bearer "+s.p.key}})).json();expect(["completed","partial","failed"]).toContain(status.status);},{timeout:7000,interval:20});
  expect(status.status).toBe("completed");
  expect(s.partition.mock.calls[0][0].map((e:any)=>e.text)).toEqual(["长任务根输入","中间实现过程","最终完成结果"]);
  const candidates=s.memory.mock.calls[0][2];
  expect(candidates.map((e:any)=>e.kind)).toEqual(["query","message","tool_call","tool_result","message"]);
  expect(candidates.map((e:any)=>e.text).join(" ")).toContain("关键结果");
  expect(s.partition).toHaveBeenCalledTimes(1);
});
it("processes complete native turns automatically and reads exactly the generated candidate",async()=>{
  const s=await setup(),x=await uploadAndComplete(s);
  expect(x.status.status).toBe("completed");expect(x.status.documents).toHaveLength(2);expect(s.select).not.toHaveBeenCalled();
  const nativeCandidates=s.memory.mock.calls.find((call:any[])=>call[0].thread_id==="T1")![2];
  expect(s.partition.mock.calls[0][0].map(e=>e.kind)).toEqual(["query","message","message","query","message"]);
  expect(s.partition.mock.calls[0][0].map(e=>e.text)).toContain("先检查实际错误");
  expect(nativeCandidates.map((e:any)=>e.kind)).toEqual(["query","message","tool_call","tool_result","message"]);
  const search=await s.post("/v1/memories/search",{keywords:["上传ABC","路径DEF"]});expect(search.statusCode).toBe(200);expect(search.json().items).toHaveLength(2);
  const doc=search.json().items.find((d:any)=>d.markdown.startsWith("# 任务1")),ep=doc.source_refs[0];expect(doc.markdown).toContain("episode_id: `"+ep+"`");
  let offset:number|null=0;const events:any[]=[];
  while(offset!==null){const r=(await s.post("/v1/read",{ref:ep,offset,limit:2})).json();events.push(...r.events);offset=r.next_offset;}
  expect(events.map(e=>e.ref)).toEqual(x.ack.records.slice(0,4).flatMap((r:any)=>r.event_refs));
  expect(events.map(e=>e.content)).toEqual(nativeCandidates.map((e:any)=>e.content));
  const raw=await s.app.inject({method:"GET",url:"/v1/raw/"+events[0].raw_ref,headers:{authorization:"Bearer "+s.p.key}});
  expect(raw.rawPayload.equals(Buffer.from(x.body.records[0].raw_base64,"base64"))).toBe(true);
  const again=(await s.post("/v1/ingest/complete",x.complete)).json();expect(again.run_id).toBe(x.run);expect(s.partition).toHaveBeenCalledTimes(1);expect(s.memory).toHaveBeenCalledTimes(2);
});
it("processes only the acknowledged incremental range and keeps source-file coordinates",async()=>{
  const s=await setup(),messages=[
    {role:"user",content:"第一段旧请求"},{role:"assistant",content:"第一段回答"},
    {role:"user",content:"第二段新请求"},{role:"assistant",content:"第二段回答"},
  ];
  let offset=0;
  const records=messages.map((message,index)=>{
    const raw=Buffer.from(JSON.stringify(message)+"\n"),remoteOffset=offset;offset+=raw.length;
    return {offset:remoteOffset,raw_base64:raw.toString("base64"),origin:{path:"sessions/catscompany/2026-11-11/session.jsonl",offset:5000+remoteOffset}};
  });
  const upload=await s.post("/v1/ingest/batches",{source_id:"incremental-source",stream_id:"incremental-stream",harness:"xiaoba",records});
  expect(upload.statusCode).toBe(200);
  const endFirst=records[1].offset+Buffer.from(records[1].raw_base64,"base64").length;
  const first=(await s.post("/v1/ingest/complete",{source_id:"incremental-source",stream_id:"incremental-stream",start_offset:0,end_offset:endFirst})).json();
  const second=(await s.post("/v1/ingest/complete",{source_id:"incremental-source",stream_id:"incremental-stream",start_offset:endFirst,end_offset:offset})).json();
  expect(first.run_id).not.toBe(second.run_id);
  const readStatus=async(runId:string)=>{
    let value:any;
    await vi.waitFor(async()=>{value=(await s.app.inject({method:"GET",url:"/v1/extractions/"+runId,headers:{authorization:"Bearer "+s.p.key}})).json();expect(["completed","partial","failed"]).toContain(value.status);},{timeout:7000,interval:20});
    return value;
  };
  const [a,b]=await Promise.all([readStatus(first.run_id),readStatus(second.run_id)]);
  expect(a.documents,JSON.stringify(a)).toHaveLength(1);expect(b.documents,JSON.stringify(b)).toHaveLength(1);
  const firstEpisode=(await s.post("/v1/read",{ref:a.documents[0].source_refs[0]})).json();
  const secondEpisode=(await s.post("/v1/read",{ref:b.documents[0].source_refs[0]})).json();
  expect(firstEpisode.events.map((e:any)=>e.text).join(" ")).not.toContain("第二段新请求");
  expect(secondEpisode.events.map((e:any)=>e.text).join(" ")).toContain("第二段新请求");
  expect(secondEpisode.events[0].offset).toBe(records[2].offset);
  expect(secondEpisode.events[0].origin).toEqual({path:"sessions/catscompany/2026-11-11/session.jsonl",offset:5000+records[2].offset});
  const raw=await s.app.inject({method:"GET",url:"/v1/raw/"+secondEpisode.events[0].raw_ref,headers:{authorization:"Bearer "+s.p.key}});
  expect(raw.rawPayload.equals(Buffer.from(records[2].raw_base64,"base64"))).toBe(true);
  expect(raw.headers["x-source-path"]).toBe("sessions/catscompany/2026-11-11/session.jsonl");
  expect(raw.headers["x-source-offset"]).toBe(String(5000+records[2].offset));
});
it("acknowledges an uploaded range with no normalized events without queueing a model run",async()=>{
  const s=await setup(),raw=Buffer.from(JSON.stringify({entry_type:"runtime",timestamp:"2026-11-11T00:00:00Z",level:"info",message:"heartbeat"})+"\n");
  const upload=await s.post("/v1/ingest/batches",{source_id:"empty-source",stream_id:"empty-stream",harness:"xiaoba",records:[{offset:0,raw_base64:raw.toString("base64"),origin:{path:"sessions/catscompany/2026-11-11/runtime.jsonl",offset:0}}]});
  expect(upload.statusCode).toBe(200);
  const result=await s.post("/v1/ingest/complete",{source_id:"empty-source",stream_id:"empty-stream",start_offset:0,end_offset:raw.length});
  expect(result.statusCode).toBe(200);expect(result.json()).toEqual({status:"skipped",reason:"no_normalized_events"});
  expect(s.partition).not.toHaveBeenCalled();expect(s.memory).not.toHaveBeenCalled();
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
