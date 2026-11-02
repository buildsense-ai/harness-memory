import Fastify from 'fastify';import type {Pool} from 'pg';import {HttpError,assert} from './contracts.js';import {authenticate} from './db/projects.js';import {ingestBatch} from './ingest.js';import {readReference,readRaw} from './read.js';
export async function buildApp({pool}:{pool:Pool}){
 const app=Fastify({bodyLimit:4*1024*1024,logger:false});
 app.setErrorHandler((error,_request,reply)=>{const e=error as Error&{statusCode?:number};const status=e.statusCode??500;reply.code(status).send({error:status<500?e.message:'internal server error'})});
 app.get('/healthz',async()=>{await pool.query('select 1');return {ok:true}});
 await app.register(async api=>{
  api.decorateRequest('projectId','');
  api.addHook('onRequest',async request=>{const a=request.headers.authorization;assert(typeof a==='string'&&a.startsWith('Bearer '),'project key required',401);(request as any).projectId=await authenticate(pool,a.slice(7))});
  api.post('/ingest/batches',async r=>ingestBatch(pool,(r as any).projectId,r.body as any));
  api.post('/read',async r=>readReference(pool,(r as any).projectId,r.body as any));
  api.get<{Params:{ref:string}}>('/raw/:ref',async(r,reply)=>{const data=await readRaw(pool,(r as any).projectId,r.params.ref);return reply.type('application/octet-stream').header('x-content-sha256',data.sha256).send(data.bytes)});
 },{prefix:'/v1'});
 return app;
}
