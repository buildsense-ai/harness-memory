import { beforeAll, afterAll, it, expect, vi } from 'vitest';
import { Pool } from 'pg';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';
import { buildApp } from '../src/app.js';
import { ingestBatch } from '../src/ingest.js';
import { IngestionPlanner } from '../src/ingestion-planner.js';
import { registerManifest } from '../src/ingestion/manifests.js';
import { MemoryRunner } from '../src/extraction/memory-runner.js';
import type { ChatModel } from '../src/extraction/model.js';
import type { StoredEvent } from '../src/contracts.js';
import type { RequestBudget } from '../src/extraction/budget.js';

const pool = new Pool({connectionString:process.env.TEST_DATABASE_URL,max:8});
vi.setConfig({testTimeout:60000,hookTimeout:60000});
beforeAll(()=>migrate(pool));afterAll(()=>pool.end());
const thread={thread_id:'T1',title:'记录本批工作',desired_outcome:'记录执行与结果',include_topics:[],exclude_topics:[],boundary_note:'本次候选'};
const model: ChatModel={partition:async events=>({task_threads:[thread],query_assignments:events.filter(e=>e.kind==='query').map(e=>({query_ref:e.ref,thread_ids:['T1'],role:'origin'})),relations:[]}),memory:async()=>({markdown:'# 本批工作\n\n## 背景\n原文中的任务。\n\n## 发生了什么\n实际执行内容。'}),select:async()=>{throw Error('unused');}};
function records(rows: unknown[], start=0, file='sessions/cli/2026-11-16/cli_test.jsonl') {
  return rows.map(row=>{const raw=Buffer.from(JSON.stringify(row)+'\n'),offset=start;start+=raw.length;return{offset,raw_base64:raw.toString('base64'),origin:{path:file,offset}};});
}
function runRows(id:string, at='2026-11-16T18:50:00Z') {
  const base={entry_type:'transcript',schema_version:1,session_id:'test-session',stream_id:'native-'+id,run_id:id,session_type:'cli',timestamp:at};
  return [
    {...base,seq:1,event_id:id+':1',event:{type:'run_started'}},
    {...base,seq:2,event_id:id+':2',event:{type:'input_consumed',kind:'root',input_ids:[id],text:'记录'+id}},
    {...base,seq:3,event_id:id+':3',event:{type:'input_consumed',kind:'pending',input_ids:[id+'p'],text:'补充约束'}},
    {...base,seq:4,event_id:id+':4',event:{type:'assistant_message',text:'中间过程',phase:'tool_prelude',model_call:1}},
    {...base,seq:5,event_id:id+':5',event:{type:'tool_started',call_id:'c',name:'shell',arguments:'{}'}},
    {...base,seq:6,event_id:id+':6',event:{type:'tool_finished',call_id:'c',name:'shell',result:'检查结果'}},
    {...base,seq:7,event_id:id+':7',event:{type:'assistant_message',text:'最终结果',phase:'reply',model_call:2}},
    {...base,timestamp:'2026-11-16T19:30:00Z',seq:8,event_id:id+':8',event:{type:'run_finished',status:'completed'}},
  ];
}
it('stores partial and cross-file runs, later processes one complete Episode with pending, all msgs and tool pair',async()=>{
  const p=await createProject(pool,'cross-file-planner');
  const seen:StoredEvent[][]=[];const m={...model,memory:async(_t:unknown,_a:unknown,events:StoredEvent[])=>{if(events.some(e=>e.text==='记录cross'))seen.push(events);return{markdown:'# 原文记录\n\n完整记录。'};}};
  const runner=new MemoryRunner(pool,m);const planner=new IngestionPlanner(pool,runner,m);
  const rows=runRows('cross'), first=records([{entry_type:'runtime',timestamp:'2026-11-16T18:49:00Z',message:'运行状态，不参与语义组批'},...rows.slice(0,5)]), second=records(rows.slice(5),0,'sessions/cli/2026-11-17/cli_test.jsonl');
  try{
    await registerManifest(pool,p.project_id,{source_id:'bot',manifest_id:'first',session_key:'cli/cli_test.jsonl',lane:'backfill',files:[{stream_id:'s1',end_offset:first.reduce((n,r)=>n+Buffer.from(r.raw_base64,'base64').length,0),path:first[0].origin.path}]});
    await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'s1',harness:'xiaoba',records:first});await planner.plan();
    expect((await pool.query('select status from ingestion_episodes where project_id=$1',[p.project_id])).rows[0].status).toBe('awaiting_material');
    await registerManifest(pool,p.project_id,{source_id:'bot',manifest_id:'second',session_key:'cli/cli_test.jsonl',lane:'incremental',files:[{stream_id:'s2',end_offset:second.reduce((n,r)=>n+Buffer.from(r.raw_base64,'base64').length,0),path:second[0].origin.path}]});
    await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'s2',harness:'xiaoba',records:second});await planner.plan();
    await runner.initialize();
    await vi.waitFor(async()=>{expect((await pool.query('select status from extraction_runs where project_id=$1',[p.project_id])).rows[0].status).toBe('completed');},{timeout:7000});
    expect(seen).toHaveLength(1);expect(seen[0].filter(e=>e.kind==='query')).toHaveLength(2);
    expect(seen[0].map(e=>e.kind)).toEqual(['query','query','message','tool_call','tool_result','message']);
    expect((await pool.query('select count(*)::int n from raw_records where project_id=$1',[p.project_id])).rows[0].n).toBe(9);
    expect((await pool.query('select logical_day from ingestion_episodes where project_id=$1',[p.project_id])).rows[0].logical_day).toBe('2026-11-16');
    await planner.plan();expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1',[p.project_id])).rows[0].n).toBe(1);
  }finally{await runner.close();}
});
it('overlaps Stage1 and Stage2, runs multiple documents at once and starts next Stage1 before earlier Wiki completes',async()=>{
  const p=await createProject(pool,'parallel-pipeline');
  let release:()=>void=()=>{};const gate=new Promise<void>(r=>{release=r;});
  let releasePartitions:()=>void=()=>{};const partitionGate=new Promise<void>(r=>{releasePartitions=r;});
  let stage1=0,stage2=0,active=0,peak=0,activePartitions=0,peakPartitions=0;
  const m:ChatModel={...model,partition:async events=>{stage1++;activePartitions++;peakPartitions=Math.max(peakPartitions,activePartitions);await partitionGate;activePartitions--;return model.partition(events);},memory:async()=>{stage2++;active++;peak=Math.max(peak,active);await gate;active--;return{markdown:'# 并行记录\n\n真实记录内容。'};}};
  const app=await buildApp({pool,model:m,pipeline:{stage1:2,stage2:4,total:4}});await app.ready();
  try{
    for(let i=0;i<5;i++){
      const rec=records([{entry_type:'turn',user:{text:'任务'+i},assistant:{text:'结果'+i,tool_calls:[]}}],0,`sessions/cli/2026-11-16/cli_parallel${i}.jsonl`);
      await ingestBatch(pool,p.project_id,{source_id:'parallel',stream_id:'s'+i,harness:'xiaoba',records:rec});
      await app.inject({method:'POST',url:'/v1/ingest/complete',headers:{authorization:'Bearer '+p.key},payload:{source_id:'parallel',stream_id:'s'+i,end_offset:Buffer.from(rec[0].raw_base64,'base64').length}});
    }
    await vi.waitFor(()=>expect(activePartitions).toBe(2),{timeout:7000});
    expect(peakPartitions).toBe(2);expect(stage2).toBe(0);
    releasePartitions();
    await vi.waitFor(()=>{expect(stage2).toBeGreaterThanOrEqual(2);expect(stage1).toBeGreaterThanOrEqual(3);},{timeout:7000});
    expect(peak).toBeGreaterThanOrEqual(2);expect(peak).toBeLessThanOrEqual(4);
    release();await vi.waitFor(async()=>{expect((await pool.query("select count(*)::int n from extraction_runs where project_id=$1 and status='completed'",[p.project_id])).rows[0].n).toBe(5);},{timeout:7000});
  }finally{releasePartitions();release();await app.close();}
});

it('rebuilds an unpublished partial plan and splits the exact scoped Stage2 payload at whole Episodes',async()=>{
  const p=await createProject(pool,'plan-recovery-budget');
  const calls:StoredEvent[][]=[];let partitions=0;
  const m:ChatModel={...model,partition:async e=>{partitions++;return model.partition(e);},
    inputTokens:(stage,e,t)=>stage==='stage1'?10:e.filter(x=>x.kind==='query').length*40+(t?.boundary_note.includes('本次仅含')?25:0),
    memory:async(_t,_a,e)=>{calls.push(e);return{markdown:'# 分段记录\n\n本段的实际内容。'};}};
  const budget:RequestBudget={count:s=>s.length,context:10000,output:100,margin:100,stage1:1000,stage2:100,method:'test-exact'};
  const runner=new MemoryRunner(pool,m,undefined,budget);
  try{
    const rec=records([0,1,2].map(i=>({entry_type:'turn',user:{text:'恢复任务'+i},assistant:{text:'结果'+i,tool_calls:[]}})),0,'sessions/cli/2026-11-16/cli_recover.jsonl');
    const ack=await ingestBatch(pool,p.project_id,{source_id:'recover',stream_id:'s',harness:'xiaoba',records:rec});
    const refs=ack.records.flatMap(r=>r.event_refs);
    const run=await runner.enqueueEvents(p.project_id,refs,{},{});
    const queries=(await pool.query("select id from events where project_id=$1 and kind='query' order by id",[p.project_id])).rows;
    const assignments=queries.map(q=>({query_ref:q.id,thread_ids:['T1'],role:'origin'}));
    await pool.query('update extraction_runs set task_partition=$2 where id=$1',[run.run_id,JSON.stringify({task_threads:[thread],query_assignments:assignments,relations:[]})]);
    await pool.query("insert into memory_tasks(id,project_id,run_id,thread_id,part_index,part_count,task_thread,assignments,input_refs) values($1,$2,$3,'T1',0,2,$4,$5,$6)",['partial-'+p.project_id,p.project_id,run.run_id,JSON.stringify(thread),JSON.stringify(assignments),JSON.stringify(refs.slice(0,2))]);
    await runner.initialize();
    await vi.waitFor(async()=>expect((await pool.query('select status from extraction_runs where id=$1',[run.run_id])).rows[0].status).toBe('completed'),{timeout:7000});
    expect(partitions).toBe(0);expect(calls).toHaveLength(3);
    expect(calls.every(e=>e.filter(x=>x.kind==='query').length===1)).toBe(true);
    expect(calls.flat().map(e=>e.ref).sort()).toEqual([...refs].sort());
    expect((await pool.query('select part_count from memory_tasks where run_id=$1',[run.run_id])).rows.map(r=>r.part_count)).toEqual([3,3,3]);
  }finally{await runner.close();}
});

it('processes complete files and closed earlier days while a same-session historical file is blocked',async()=>{
  const p=await createProject(pool,'blocked-history-range');
  const runner=new MemoryRunner(pool,model),planner=new IngestionPlanner(pool,runner,model);
  const turn=(text:string,timestamp:string)=>({entry_type:'turn',timestamp,user:{text},assistant:{text:'回复',tool_calls:[]}});
  const a=records([turn('前一天','2026-11-15T23:00:00Z'),turn('未收齐当天','2026-11-16T23:00:00Z'),turn('当天剩余','2026-11-16T23:10:00Z')],0,'sessions/cli/2026-11-15/cli_blocked.jsonl');
  const b=records([turn('完整文件','2026-11-17T23:00:00Z')],0,'sessions/cli/2026-11-17/cli_blocked.jsonl');
  const size=(r:typeof a)=>r.reduce((n,x)=>n+Buffer.from(x.raw_base64,'base64').length,0);
  await registerManifest(pool,p.project_id,{source_id:'bot',manifest_id:'all',session_key:'cli/cli_blocked.jsonl',lane:'backfill',files:[{stream_id:'a',end_offset:size(a),path:a[0].origin.path},{stream_id:'b',end_offset:size(b),path:b[0].origin.path}]});
  await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'a',harness:'xiaoba',records:a.slice(0,2)});
  await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'b',harness:'xiaoba',records:b});
  await planner.plan(Date.parse('2026-11-20T00:00:00Z'));
  const rows=(await pool.query('select logical_day,status from ingestion_episodes where project_id=$1 order by logical_day',[p.project_id])).rows;
  expect(rows.map(r=>r.status)).toEqual(['queued','ready','queued']);
  expect((await pool.query('select status from ingestion_manifests where project_id=$1',[p.project_id])).rows[0].status).toBe('waiting');
  await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'a',harness:'xiaoba',records:a.slice(2)});
  await planner.plan(Date.parse('2026-11-20T00:00:00Z'));
  expect((await pool.query("select count(*)::int n from ingestion_episodes where project_id=$1 and status='queued'",[p.project_id])).rows[0].n).toBe(4);
  expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1',[p.project_id])).rows[0].n).toBe(3);
  try{
    await runner.initialize();
    await vi.waitFor(async()=>expect((await pool.query("select count(*)::int n from extraction_runs where project_id=$1 and status='completed'",[p.project_id])).rows[0].n).toBe(3),{timeout:7000});
  }finally{await runner.close();}
});

it('rotates past one hundred blocked sessions so later complete sessions are still planned',async()=>{
  const p=await createProject(pool,'planner-fairness');
  const runner=new MemoryRunner(pool,model),planner=new IngestionPlanner(pool,runner,model);
  const rec=records([{entry_type:'turn',timestamp:'2026-11-16T12:00:00Z',user:{text:'正常就绪'},assistant:{text:'完整结果',tool_calls:[]}}],0,'sessions/cli/2026-11-16/cli_zready.jsonl');
  const ack=await ingestBatch(pool,p.project_id,{source_id:'bot',stream_id:'s',harness:'xiaoba',records:rec});
  const rawId=ack.records[0].raw_ref;
  await pool.query(`insert into raw_records(id,project_id,source_id,stream_id,offset_bytes,raw,hash,metadata)
    select $2||'-blocked-'||i,$1,'bot','s',10000+i,raw,hash,jsonb_set(metadata,'{origin}',jsonb_build_object('path','sessions/cli/2026-11-16/cli_blocked'||i||'.jsonl','offset',0)) from raw_records cross join generate_series(1,100) i where id=$2`,[p.project_id,rawId]);
  await pool.query(`insert into ingestion_episodes(project_id,source_id,episode_key,session_key,lane,logical_day,started_at,ended_at,raw_ids,status)
    select $1,'bot','blocked-'||i,'cli/cli_blocked'||i||'.jsonl','backfill','2026-11-16','2026-11-16T12:00:00Z','2026-11-16T12:00:00Z',jsonb_build_array($2||'-blocked-'||i),'ready' from generate_series(1,100) i`,[p.project_id,rawId]);
  await pool.query(`insert into ingestion_manifests(project_id,source_id,manifest_id,session_key,lane,files,indexed_offsets)
    select $1,'bot','blocked-'||i,'cli/cli_blocked'||i||'.jsonl','backfill',jsonb_build_array(jsonb_build_object('path','sessions/cli/2026-11-16/cli_blocked'||i||'.jsonl','stream_id','absent-'||i,'end_offset',999)),jsonb_build_object() from generate_series(1,100) i`,[p.project_id]);
  await registerManifest(pool,p.project_id,{source_id:'bot',manifest_id:'ready',session_key:'cli/cli_zready.jsonl',lane:'backfill',files:[{stream_id:'s',end_offset:Buffer.from(rec[0].raw_base64,'base64').length,path:rec[0].origin.path}]});
  try{
    await planner.plan();await planner.plan();
    expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1',[p.project_id])).rows[0].n).toBe(1);
    await runner.initialize();await vi.waitFor(async()=>expect((await pool.query('select status from extraction_runs where project_id=$1',[p.project_id])).rows[0].status).toBe('completed'),{timeout:7000});
  }finally{
    await runner.close();
    await pool.query("update ingestion_episodes set status='awaiting_material' where project_id=$1 and status='ready'",[p.project_id]);
  }
},60000);


it('keeps indexed Episodes durable when batch publication fails and retries without duplicate work', async () => {
  const project = await createProject(pool, 'planner-publication-recovery');
  const runner = new MemoryRunner(pool, model);
  const planner = new IngestionPlanner(pool, runner, model);
  const raw = records(runRows('publication'));
  const end = raw.reduce((n, r) => n + Buffer.from(r.raw_base64, 'base64').length, 0);
  await registerManifest(pool, project.project_id, {
    source_id: 'bot', manifest_id: 'one', session_key: 'cli/cli_test.jsonl', lane: 'backfill',
    files: [{ stream_id: 'one', end_offset: end, path: raw[0].origin.path }],
  });
  await ingestBatch(pool, project.project_id, { source_id: 'bot', stream_id: 'one', harness: 'xiaoba', records: raw });
  const enqueue = vi.spyOn(runner, 'enqueueEvents').mockRejectedValueOnce(new Error('publication interrupted'));
  try {
    await expect(planner.plan()).rejects.toThrow('publication interrupted');
    expect((await pool.query('select status from ingestion_manifests where project_id=$1', [project.project_id])).rows[0].status).toBe('indexed');
    expect((await pool.query('select status,run_id from ingestion_episodes where project_id=$1', [project.project_id])).rows[0]).toMatchObject({ status: 'ready', run_id: null });
    expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1', [project.project_id])).rows[0].n).toBe(0);
    enqueue.mockRestore();
    await planner.plan();
    await planner.plan();
    expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1', [project.project_id])).rows[0].n).toBe(1);
    expect((await pool.query('select status from ingestion_episodes where project_id=$1', [project.project_id])).rows[0].status).toBe('queued');
    await runner.initialize();
    await vi.waitFor(async () => expect((await pool.query('select status from extraction_runs where project_id=$1', [project.project_id])).rows[0].status).toBe('completed'), { timeout: 7000 });
  } finally {
    enqueue.mockRestore();
    await runner.close();
  }
});

it('revisits an unfinished native run when a runless transcript receipt fills its sequence gap', async () => {
  const project = await createProject(pool, 'runless-sequence-gap');
  const runner = new MemoryRunner(pool, model);
  const planner = new IngestionPlanner(pool, runner, model);
  const rows = runRows('gap');
  const first = records(rows.filter((_, i) => i !== 3));
  const end = first.reduce((n, r) => n + Buffer.from(r.raw_base64, 'base64').length, 0);
  const base = rows[3];
  const second = records([{ ...base, run_id: undefined, event: { type: 'input_received', input_id: 'next', text: 'pending receipt' } }], end);
  const manifest = (id: string, offset: number) => ({
    source_id: 'bot', manifest_id: id, session_key: 'cli/cli_test.jsonl', lane: 'incremental',
    files: [{ stream_id: 'one', end_offset: offset, path: first[0].origin.path }],
  });
  try {
    await registerManifest(pool, project.project_id, manifest('first', end));
    await ingestBatch(pool, project.project_id, { source_id: 'bot', stream_id: 'one', harness: 'xiaoba', records: first });
    await planner.plan();
    expect((await pool.query('select status,error from ingestion_episodes where project_id=$1', [project.project_id])).rows[0]).toMatchObject({ status: 'awaiting_material', error: 'awaiting_sequence_gap' });
    await registerManifest(pool, project.project_id, manifest('second', end + Buffer.from(second[0].raw_base64, 'base64').length));
    await ingestBatch(pool, project.project_id, { source_id: 'bot', stream_id: 'one', harness: 'xiaoba', records: second });
    await planner.plan();
    expect((await pool.query('select status,error from ingestion_episodes where project_id=$1', [project.project_id])).rows[0]).toMatchObject({ status: 'queued', error: null });
    expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1', [project.project_id])).rows[0].n).toBe(1);
    await runner.initialize();
    await vi.waitFor(async () => expect((await pool.query('select status from extraction_runs where project_id=$1', [project.project_id])).rows[0].status).toBe('completed'), { timeout: 7000 });
  } finally {
    await runner.close();
  }
});
