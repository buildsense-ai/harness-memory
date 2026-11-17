import { beforeAll, afterAll, it, expect, vi } from 'vitest';
import { Pool } from 'pg';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';
import { buildApp } from '../src/app.js';
import { ingestBatch } from '../src/ingest.js';
import { registerManifest, IngestionPlanner } from '../src/ingestion-planner.js';
import { MemoryRunner } from '../src/extraction/memory-runner.js';
import type { ChatModel } from '../src/extraction/model.js';
import type { StoredEvent } from '../src/contracts.js';

const pool = new Pool({connectionString:process.env.TEST_DATABASE_URL,max:8});
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
  const rows=runRows('cross'), first=records(rows.slice(0,5)), second=records(rows.slice(5),0,'sessions/cli/2026-11-17/cli_test.jsonl');
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
    expect((await pool.query('select logical_day from ingestion_episodes where project_id=$1',[p.project_id])).rows[0].logical_day).toBe('2026-11-16');
    await planner.plan();expect((await pool.query('select count(*)::int n from extraction_runs where project_id=$1',[p.project_id])).rows[0].n).toBe(1);
  }finally{await runner.close();}
});
it('overlaps Stage1 and Stage2, runs multiple documents at once and starts next Stage1 before earlier Wiki completes',async()=>{
  const p=await createProject(pool,'parallel-pipeline');
  let release:()=>void=()=>{};const gate=new Promise<void>(r=>{release=r;});
  let stage1=0,stage2=0,active=0,peak=0;
  const m:ChatModel={...model,partition:async events=>{stage1++;return model.partition(events);},memory:async()=>{stage2++;active++;peak=Math.max(peak,active);await gate;active--;return{markdown:'# 并行记录\n\n真实记录内容。'};}};
  const app=await buildApp({pool,model:m,pipeline:{stage1:2,stage2:4,total:4}});await app.ready();
  try{
    for(let i=0;i<5;i++){
      const rec=records([{entry_type:'turn',user:{text:'任务'+i},assistant:{text:'结果'+i,tool_calls:[]}}],0,`sessions/cli/2026-11-16/cli_parallel${i}.jsonl`);
      await ingestBatch(pool,p.project_id,{source_id:'parallel',stream_id:'s'+i,harness:'xiaoba',records:rec});
      await app.inject({method:'POST',url:'/v1/ingest/complete',headers:{authorization:'Bearer '+p.key},payload:{source_id:'parallel',stream_id:'s'+i,end_offset:Buffer.from(rec[0].raw_base64,'base64').length}});
    }
    await vi.waitFor(()=>{expect(stage2).toBeGreaterThanOrEqual(2);expect(stage1).toBeGreaterThanOrEqual(3);},{timeout:7000});
    expect(peak).toBeGreaterThanOrEqual(2);expect(peak).toBeLessThanOrEqual(4);
    release();await vi.waitFor(async()=>{expect((await pool.query("select count(*)::int n from extraction_runs where project_id=$1 and status='completed'",[p.project_id])).rows[0].n).toBe(5);},{timeout:7000});
  }finally{release();await app.close();}
});
