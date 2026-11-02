import type {Pool} from 'pg';import {assert,type StoredEvent} from '../contracts.js';import {selectPiPath} from '../adapters/index.js';import {eventSelect,eventFromRow} from '../read.js';
export interface ExtractionRequest {source_id:string;stream_id:string;start_offset?:number;end_offset?:number;leaf_id?:string}
export async function snapshotEvents(pool:Pool,p:string,req:ExtractionRequest):Promise<StoredEvent[]>{
 assert(req&&typeof req.source_id==='string'&&typeof req.stream_id==='string','source_id/stream_id required');
 const s=(await pool.query('select * from streams where project_id=$1 and source_id=$2 and stream_id=$3',[p,req.source_id,req.stream_id])).rows[0];assert(s,'unknown stream',404);const start=req.start_offset??0,end=req.end_offset??Number(s.next_offset);
 assert(Number.isSafeInteger(start)&&Number.isSafeInteger(end)&&start>=0&&end>start&&end<=Number(s.next_offset),'invalid snapshot range');
 const records=(await pool.query('select id,offset_bytes,metadata from raw_records where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes<=$4 order by offset_bytes',[p,req.source_id,req.stream_id,end])).rows.map(r=>({...r,...r.metadata}));
 const boundaries=new Set([0,Number(s.next_offset),...records.map(r=>Number(r.offset_bytes))]);assert(boundaries.has(start)&&boundaries.has(end),'range must use record boundaries');
 const eligible=records.filter(r=>Number(r.offset_bytes)<end);const path=s.harness==='pi'?selectPiPath(eligible,req.leaf_id):eligible;const rawIds=path.filter(r=>Number(r.offset_bytes)>=start).map(r=>r.id);
 const rows=await pool.query(eventSelect+' where e.project_id=$1 and r.id=any($2::text[]) order by r.offset_bytes,e.ordinal',[p,rawIds]);const events=rows.rows.map(eventFromRow);assert(events.length,'snapshot has no message events');return events;
}
