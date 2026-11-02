import {createReadStream} from 'node:fs';import {assert} from '../contracts.js';
export async function* readCompleteRecords(file:string,offset:number,maxBytes=4*1024*1024):AsyncGenerator<{offset:number;raw:Buffer}>{
 let pending=Buffer.alloc(0),position=offset;
 for await(const chunk of createReadStream(file,{start:offset})){pending=Buffer.concat([pending,chunk]);let n:number;while((n=pending.indexOf(10))>=0){const raw=pending.subarray(0,n+1);assert(raw.length<=maxBytes,'record too large');yield {offset:position,raw:Buffer.from(raw)};position+=raw.length;pending=pending.subarray(n+1)}assert(pending.length<=maxBytes,'record too large')}
}
