import { beforeAll, afterAll, it, expect } from 'vitest';
import { Pool } from 'pg';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';
import { buildApp } from '../src/app.js';
import { sha256 } from '../src/contracts.js';

const pool=new Pool({connectionString:process.env.TEST_DATABASE_URL,max:5});
beforeAll(()=>migrate(pool));afterAll(()=>pool.end());
it('stores resumable fragments but publishes only a complete verified original record with exact source coordinates',async()=>{
  const p=await createProject(pool,'large-original-record'),other=await createProject(pool,'isolated-fragments');
  const app=await buildApp({pool});await app.ready();
  const raw=Buffer.from(JSON.stringify({entry_type:'turn',user:{text:'大记录'},assistant:{text:'x'.repeat(2*1024*1024),tool_calls:[]}})+'\n');
  const base={source_id:'bot',stream_id:'large',record_offset:0,total_bytes:raw.length,record_hash:sha256(raw),origin:{path:'sessions/cli/2026-11-16/cli_large.jsonl',offset:0}};
  const send=(start:number,key=p.key,bytes=raw.subarray(start,Math.min(start+1024*1024,raw.length)))=>app.inject({method:'POST',url:'/v1/ingest/fragments',headers:{authorization:'Bearer '+key},payload:{...base,fragment_offset:start,raw_base64:bytes.toString('base64')}});
  try{
    const first=await send(0);expect(first.statusCode).toBe(200);expect(first.json().next_fragment_offset).toBe(1024*1024);
    expect((await pool.query('select count(*)::int n from raw_records where project_id=$1',[p.project_id])).rows[0].n).toBe(0);
    expect((await send(0)).json()).toEqual(first.json());
    expect((await send(0,p.key,Buffer.from('changed'))).statusCode).toBe(409);
    expect((await send(1024*1024,other.key)).statusCode).toBe(409);
    await send(1024*1024);const final=await send(2*1024*1024);expect(final.statusCode).toBe(200);expect(final.json()).toMatchObject({next_offset:raw.length,sha256:sha256(raw)});
    const stored=(await pool.query('select raw,metadata from raw_records where project_id=$1',[p.project_id])).rows;expect(stored).toHaveLength(1);expect(stored[0].raw.equals(raw)).toBe(true);expect(stored[0].metadata.origin).toEqual(base.origin);
    expect((await send(0)).json().next_offset).toBe(raw.length);
    expect((await pool.query('select count(*)::int n from ingest_fragments where project_id=$1',[p.project_id])).rows[0].n).toBe(0);
    expect((await pool.query('select count(*)::int n from events where project_id=$1',[p.project_id])).rows[0].n).toBe(2);
  }finally{await app.close();}
},60000);
