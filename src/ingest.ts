import type {Pool} from 'pg';import {isDeepStrictEqual} from 'node:util';
import {assert,ref,sha256,type UploadBatch,type IngestAck} from './contracts.js';import {projectRecord} from './adapters/index.js';
export async function ingestBatch(pool:Pool,projectId:string,b:UploadBatch):Promise<IngestAck>{
 assert(b&&typeof b.source_id==='string'&&b.source_id.length>0&&b.source_id.length<=256&&typeof b.stream_id==='string'&&b.stream_id.length>0&&b.stream_id.length<=256,'invalid source/stream');
 assert((b.harness==='xiaoba'||b.harness==='pi')&&Array.isArray(b.records)&&b.records.length>0&&b.records.length<=10000,'invalid batch');
 const c=await pool.connect();try{
  await c.query('BEGIN');await c.query('insert into streams(project_id,source_id,stream_id,harness) values($1,$2,$3,$4) on conflict do nothing',[projectId,b.source_id,b.stream_id,b.harness]);
  const s=(await c.query('select * from streams where project_id=$1 and source_id=$2 and stream_id=$3 for update',[projectId,b.source_id,b.stream_id])).rows[0];assert(s.harness===b.harness,'harness conflict',409);let next=Number(s.next_offset);const out:IngestAck['records']=[];let previousEnd:number|undefined;
  for(const r of b.records){
   assert(Number.isSafeInteger(r.offset)&&r.offset>=0&&typeof r.raw_base64==='string'&&r.raw_base64.length>0,'invalid record');
   const raw=Buffer.from(r.raw_base64,'base64');assert(raw.toString('base64')===r.raw_base64&&raw.at(-1)===10,'record must be complete base64 JSONL');
   assert(previousEnd===undefined||r.offset===previousEnd,'noncontiguous batch');previousEnd=r.offset+raw.length;assert(Number.isSafeInteger(previousEnd),'offset too large');
   const p=projectRecord(b.harness,raw),expected=p.events.map(({content,text,fidelity,...d})=>d);assert(isDeepStrictEqual(expected,r.events),'event descriptors do not match original');
   const old=(await c.query('select id,hash from raw_records where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes=$4',[projectId,b.source_id,b.stream_id,r.offset])).rows[0];
   let id:string;if(old){assert(old.hash===sha256(raw),'record content conflict',409);id=old.id}else{
    assert(r.offset===next,'offset conflict',409);id=ref('raw');await c.query('insert into raw_records(id,project_id,source_id,stream_id,offset_bytes,raw,hash,metadata) values($1,$2,$3,$4,$5,$6,$7,$8)',[id,projectId,b.source_id,b.stream_id,r.offset,raw,sha256(raw),JSON.stringify({native_id:p.native_id,parent_id:p.parent_id,timestamp:p.timestamp})]);
    for(const e of p.events){const {content,text,...meta}=e;await c.query('insert into events(id,project_id,raw_id,ordinal,kind,pointer,content_json,search_text,metadata) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',[ref('evt'),projectId,id,e.order,e.kind,e.pointer,JSON.stringify(content),text.replaceAll('\0','\uFFFD'),JSON.stringify(meta)])}
    next=r.offset+raw.length;
   }
   const es=await c.query('select id from events where project_id=$1 and raw_id=$2 order by ordinal',[projectId,id]);out.push({offset:r.offset,raw_ref:id,event_refs:es.rows.map(e=>e.id)});
  }
  await c.query('update streams set next_offset=$4 where project_id=$1 and source_id=$2 and stream_id=$3',[projectId,b.source_id,b.stream_id,next]);await c.query('COMMIT');return {next_offset:previousEnd!,records:out};
 }catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}
}
