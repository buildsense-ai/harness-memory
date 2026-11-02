# Harness Memory v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking. 本任务按用户指示在当前 Codex 会话推进；本计划已由用户确认，当前会话实现；按执行技能要求完成一次独立最终审查。

**Goal:** 跑通 XiaoBa/Pi 原文上传、手动 Goal Episode 提取、测试搜索和按引用读取，在 Monday 完成真实验收。

**Architecture:** 一个 TypeScript 服务进程，一个上传 CLI，两个共用格式适配器。PostgreSQL 保存不可变原始字节、事件与提取结果；模型仅选择事件引用。先实现不依赖模型的原文链路，再实现两步提取和二分，最后部署。

**Tech Stack:** Node.js 20.20+、TypeScript、Fastify、pg；开发校验使用 Vitest、tsx 和 tsc。无需 Docker、Redis、图数据库或独立 worker。

**Spec:** `docs/superpowers/specs/2026-11-02-harness-memory-v1-design.md`，2026-11-02 精简版，用户回复“开始实现”后作为已确认范围。

## Global Constraints

- TypeScript、Node.js 20.20+、PostgreSQL 16+。
- 一个服务进程，一个连接器 CLI，两种适配器。
- 每批请求 body 上限 4 MiB，包含传输编码开销。
- 加 --watch 时每 30 秒读取新增完整 JSONL 记录。
- 提取先手动触发，同一时间最多一个 run；忙时返回 409。
- 模型请求超时默认 120 秒，失败手动重跑。
- 读取事件列表每页默认 20 条、最大 50 条。
- 搜索默认 top K=10、最大 50，每条最多 3 个原文片段，每片段最多 400 字符。
- 不改现有 XiaoBa 版本、不重启已有 bot。
- 不增加自动提取、复杂上传恢复、Skill/Wiki、缓存复用或账号网页。

## Review Focus

1. UTF-8 中文、CRLF 和日志末尾半条记录：raw 字节不能被解析/重新序列化悄悄改变；Task 1/3/4 测试。
2. 服务器已经提交但客户端未收到 ACK：重传必须得到原来的引用，且不能跳过下一条记录；Task 2/4 测试。
3. 同一 stream 的冲突正文和跨项目引用：冲突拒绝、已存内容不覆盖、其他项目不可读；Task 2/3 测试。
4. Pi 分支与工具配对跨二分点：不能把另一分支混入，也不能把一个不可分调用组静默截掉；Task 1/5 测试。
5. 模型结构错误、输入超长及进程中断：失败不发布半份 episode，不损坏原文；Task 5/6 测试。

## 文件与交付位置

当前设计仓库：`D:/codex_workspace/harness-memory-design`。实施启动时改目录名为 `D:/codex_workspace/harness-memory`，保留 Git 历史；若目标已存在则停止核对，不覆盖。创建公开 `buildsense-ai/harness-memory`（不可用时按规格使用 harness-memory-service），将现有规格和本计划一起推送。最终部署目录 `/opt/harness-memory`。

```text
src/contracts.ts                 请求、引用、事件和提取类型
src/adapters/{index,xiaoba,pi}.ts  原生记录到事件描述、Pi 路径解析
src/db/{pool,migrate,projects}.ts 数据库连接、迁移、项目 Key
src/db/migrations/001_initial.sql
src/ingest.ts                    原文事务接收、去重与冲突
src/read.ts                      事件/episode/raw 读取
src/upload/{records,state,client}.ts 原始行、偏移状态、批次发送
src/upload/cli.ts                文件上传及 --watch
src/extraction/{snapshot,chunk,model,runner}.ts
src/search.ts                    仅供验证的子串搜索
src/{app,server,admin}.ts         HTTP 路由、启动、管理命令
tests/{adapters,ingest,read,upload,extraction,search,api}.test.ts
tests/fixtures/{xiaoba,pi}.jsonl  只用合成数据
scripts/smoke.ts                 部署后端到端核验
deploy/harness-memory.service    单服务 systemd 模板
README.md / docs/api.md / docs/deployment.md
```

## 共同协议决策

- 上传 body：`{source_id,stream_id,harness,records:[{offset,raw_base64,events}]}`。offset 是原文件字节偏移，raw_base64 包含原始换行。events 是适配器给出的 `{kind,pointer,order,tool_call_id?}`；服务端使用同一适配器校验并从 raw 解析正文，不信任第二份正文。Pi 的 native_id/parent_id 从原始记录提取。
- ACK：`{next_offset,records:[{offset,raw_ref,event_refs}]}`。记录偏移必须连续；source/stream 与项目共同构成流身份。同偏移同 hash 返回原引用，不同 hash 返回 409；整批事务成功才 ACK。
- 引用：`raw_<uuid>`、`evt_<uuid>`、`ep_<uuid>`、`run_<uuid>`。不把模型或用户提交的任意引用当成授权。
- 事件：`StoredEvent={ref,raw_ref,kind,content,text,order,tool_call_id?,native_id?,parent_id?,fidelity}`。content 为原字段 JSON 值，text 为检索/模型输入视图；读取同时返回来源 pointer，raw 下载用于字节核对。
- 提取 body：`{source_id,stream_id,start_offset?,end_offset?,leaf_id?}`，范围为半开字节区间，边界须是已上传完整记录边界。先将事件引用列表存入 run，后续上传不改变输入。Pi 先取 leaf 祖先路径再应用范围。
- 读取 body：`{ref,offset?:0,limit?:20}`。event 单条返回；episode 返回目标、总事件数、事件页和 next_offset。raw 路由直接返回字节与 SHA-256 响应头。
- 搜索 body：`{keywords:string[],operator?:'AND'|'OR',limit?:10}`。限制 1–16 个非空关键词，每个最多 256 字符；正文按 ASCII 大小写折叠匹配，SQL 使用参数，不解释 `%`、`_` 或正则。
- 模型配置：`MODEL_BASE_URL`（完整 /v1 前缀）、`MODEL_API_KEY`、`MODEL_NAME`、`MODEL_INPUT_BUDGET`（请求 UTF-8 字节预算，默认 65536）、`MODEL_MAX_OUTPUT_TOKENS`（默认 4096）。字节预算是保守工程限额，不声称精确 tokenizer；指令和 goal 也计入。provider 明确报上下文超限时继续二分，其他错误不二分。
- 默认服务仅监听 `127.0.0.1:8460`；启动/部署前核实空闲，必要时通过 PORT 改值。管理与连接器使用配置文件/环境变量，不通过命令行参数输出 Key。

### Task 1: 建立可运行项目与两种日志适配

**Files:** package.json、package-lock.json、tsconfig.json、.gitignore、.env.example、src/contracts.ts、src/adapters/*.ts、tests/adapters.test.ts、tests/fixtures/*.jsonl。

**Interfaces:** `projectRecord(harness: Harness, raw: Buffer): ProjectedRecord`；`selectPiPath(records: NativeRecord[], leafId?: string): NativeRecord[]`。ProjectedRecord 含 metadata 和事件 pointer 列表，不改原始 Buffer。Harness 为 xiaoba/pi。

- [x] 创建并推送代码仓库，保留设计历史；建立 npm scripts：build、test、start、upload、admin、smoke。只安装上述必要运行/开发依赖。
- [x] 编写 adapters 测试：中文 CRLF 原始 Buffer hash 不变；XiaoBa query/text/call/result pointer 可还原字段并标记 turn_aggregate；Pi message、toolCall、toolResult 分离；两个 leaf 未指定时报错，指定后排除另一支；未知格式明确失败，不能伪造事件。
- [x] 运行 `npm test -- tests/adapters.test.ts`，确认缺失模块/接口导致失败。
- [x] 实现两个纯适配器和 Pi 祖先路径检查；保留控制记录，缺失父节点/重复 native ID 明确报错。服务与 CLI 共享这份代码。
- [x] 重跑该测试与 `npm run build`，均通过；提交 `feat: add immutable log projections for xiaoba and pi`。

### Task 2: PostgreSQL 项目身份与原文接收

**Files:** src/db/pool.ts、migrate.ts、projects.ts、migrations/001_initial.sql、src/ingest.ts、src/admin.ts、tests/ingest.test.ts。

**Interfaces:** `createProject(pool,name):Promise<{project_id,key}>`；`authenticate(pool,key):Promise<Project>`；`ingestBatch(pool,projectId,batch):Promise<IngestAck>`。测试读取 TEST_DATABASE_URL，未配置集成测试应明确失败或单独列出未运行，不伪装已通过。

- [x] 建立独立测试数据库；若 Monday PostgreSQL 尚未初始化，检查 5432/现有集群后使用安装好的 PostgreSQL 16 建立独立 harness-memory 集群和角色，仅 loopback。通过 SSH 隧道访问测试库，不安装进产品工作目录。
- [x] 写 ingest 测试：同一条重发两次 raw/event 数量不变且引用相同；同偏移改正文 409；批次第二条错误时第一条也不提交；Key hash 存储且错误 Key 拒绝；source_id 相同的两个项目数据独立。
- [x] 运行 `npm test -- tests/ingest.test.ts`，确认失败。
- [x] 创建 projects、streams、raw_records、events、extraction_runs、episodes、episode_events 表；原文 bytea 和 hash 不更新。来源唯一键/外键明确带 project_id；stream 行事务锁串行化接收水位；同事务写原文和事件。run 固定 refs 列表存 jsonb，episode 仅持目标与引用关系。
- [x] 实现 migrate 与 project-create 管理命令，项目 Key 使用 32 字节随机数且只保存 SHA-256；成功/失败不打印数据库连接串。所有测试通过后提交 `feat: persist project-scoped source records atomically`。

### Task 3: 正式原文读取接口

**Files:** src/read.ts、src/app.ts、src/server.ts、tests/read.test.ts、tests/api.test.ts。

**Interfaces:** `readReference(pool,projectId,{ref,offset,limit}):Promise<ReadResult>`；`readRaw(pool,projectId,ref):Promise<{bytes,sha256}>`；`buildApp({pool,model?}):Promise<FastifyInstance>`。

- [x] 写测试：event 正文与原字段相等；raw 含中文/CRLF 且字节 hash 相等；episode 21 个成员分页 20+1，无遗漏/重复；默认/最大页长 20/50；外项目和未知引用都是 404。
- [x] 运行 read/api 测试，确认失败。
- [x] 实现 POST /v1/ingest/batches、POST /v1/read、GET /v1/raw/:ref 和 /healthz；全数据路由统一鉴权，bodyLimit=4194304。将读取正文直接取自原始数据，禁止模型参与。校验引用类型和 offset/limit，limit 大于 50 返回 400。
- [x] 运行 `npm test -- tests/read.test.ts tests/api.test.ts` 与 build，确认通过；提交 `feat: expose exact project-scoped source reads`。

### Task 4: 最小文件上传 CLI

**Files:** src/upload/records.ts、state.ts、client.ts、cli.ts、tests/upload.test.ts。

**Interfaces:** `readCompleteRecords(file,offset,maxBodyBytes):AsyncIterable<UploadBatch>`；`uploadOnce(config,statePath):Promise<UploadProgress>`；CLI `upload --harness xiaoba|pi --file PATH --state PATH [--watch]`。URL/Key 从本地配置读取，source_id/stream_id 在首次 state 中生成并稳定复用。

- [x] 写临时文件/HTTP stub 测试：半条不发，补上后才发；中文按字节 offset；收到 ACK 才原子写 state；断网 state 不变；服务器已提交但 ACK 丢失后重发得到原引用；单条 body 超 4 MiB 停在该条；文件缩短失败。
- [x] 运行 `npm test -- tests/upload.test.ts`，确认失败。
- [x] 实现读行与批次编码，按实际 JSON body 字节数限制；校验 state 的 endpoint/project 身份指纹、harness、文件与 stream，防止误复用偏移。--watch 每 30000ms 重读，网络错误下次再试，401/403/409/413 停止。没有 spool 或分片逻辑。
- [x] 重跑 upload 测试并用两种合成文件连接真实测试 API 上传、raw 读回；提交 `feat: add a minimal acknowledged log uploader`。

### Task 5: 两步模型选择与最小二分

**Files:** src/extraction/snapshot.ts、chunk.ts、model.ts、runner.ts、tests/extraction.test.ts。

**Interfaces:** `snapshotEvents(pool,projectId,request):Promise<StoredEvent[]>`；`ChatModel.discover(events):Promise<Goal[]>`；`ChatModel.select(goal,events):Promise<string[]>`；`extractEpisodes(events,model,budget):Promise<EpisodeDraft[]>`。Goal 为 `{description:string}`；draft 为 `{goal,event_refs,chunk_id}`，不能包含替代原文。provider 输出分别为 `{goals:Goal[]}` 和 `{event_refs:string[]}`。

- [x] 写假模型单元测试：一次 discover+逐 goal select；非法外部 event_ref 拒绝；选择去重/恢复顺序/补齐调用结果；强制二分后两半事件均进入处理；工具组不切断；不可分单事件过大报错；普通 500 不二分；明确 context-length 错误才二分；另一 Pi leaf 不入输入。
- [x] 运行 `npm test -- tests/extraction.test.ts`，确认失败。
- [x] 实现完整事件/工具组之间选最接近中点的边界，递归二分，无 overlap 和跨块目标合并。每个请求实际输入（指令+goal+事件）都算预算；若选择阶段因 goal 增加而超预算，对该块重新二分处理，不能只截断输入。
- [x] 实现 fetch 到 /chat/completions、120000ms 超时、JSON 返回校验及错误分类；输入正文作为数据，不赋予其指令优先级。配置缺失返回明确错误，绝不伪造模型结果。测试通过提交 `feat: select goal episodes from immutable event references`。

### Task 6: 手动运行与测试搜索

**Files:** src/extraction/runner.ts、src/search.ts、src/app.ts、src/server.ts、tests/search.test.ts、tests/api.test.ts。

**Interfaces:** `startExtraction(projectId,request):Promise<{run_id}>`；`getExtraction(pool,projectId,id):Promise<RunResult>`；`searchEpisodes(pool,projectId,request):Promise<SearchResult[]>`。

- [x] 测试全局一次一个 run、并发第二次 409；输入列表创建后上传新记录不影响当前 run；模型失败不发布任何该 run 的 episode；启动将遗留 running 标为 interrupted，原文仍可读；手动重跑不覆盖已有 ep 引用。
- [x] 测试中文/ASCII、AND/OR、跨事件 AND 不成立、字面 `%`/`_`、同 episode 合并、top K 默认 10/上限 50、片段 3×400 字符、只搜索已完成 run、跨项目不可见。运行 search/api 测试确认失败。
- [x] 实现 POST /v1/extractions、GET /v1/extractions/:id、POST /v1/episodes/search。全局 busy 标志在异步创建前占用，finally 释放；进程内后台执行，成功一次事务发布结果。搜索用参数化 position/strpos 与 ASCII 折叠，不执行 shell、不引入模型排名。
- [x] 跑全测试及 build；创建合成 episode 后完成搜索→引用→原文链路；提交 `feat: expose manual extraction and diagnostic keyword search`。

### Task 7: Monday 部署与真实验收

**Files:** deploy/harness-memory.service、scripts/smoke.ts、README.md、docs/api.md、docs/deployment.md、docs/acceptance-2026-11-02.md。

**Interfaces:** `npm run smoke -- --config LOCAL_CONFIG --file FILE --harness TYPE` 输出引用、run 状态、hash 校验和质量观察；不输出 Key、模型密钥或真实正文。

- [x] 写 smoke 验收脚本：上传→raw hash 对比→手动提取→读取所有 episode 页→验证引用来自输入→搜索一个已选事件中的唯一短语。模型模拟只用于测试，真实验收必须单独标记实际 provider/model。
- [x] 执行本地全套 `npm test`、`npm run build`，检查 Git diff 与公开文件，无真实日志/密钥；提交并推送可部署 SHA。
- [x] Monday 建独立应用用户、/opt/harness-memory 和 /etc/harness-memory 配置、数据库角色。私有读取已授权的模型配置或从环境配置，不在工具输出中展示。若接口不可用，继续完成非模型验收并明确报告，不宣布端到端完成。
- [x] 备份新服务数据库，安装锁定依赖并 build，配置一个 systemd 单元绑定 loopback 8460（确认空闲）；通过 SSH 隧道访问。部署不替换旧应用、不重启 bot、不打开匿名公网入口。
- [x] 两种合成日志各跑一次真实模型提取，再用一个已授权真实日志的小范围验收。人工检查 goals、遗漏/误选与工具配对，记录二分限制；结果不含真实正文或凭证。重启新服务并验证已保存引用仍可读取、未完成 run 可见 interrupted。
- [x] README 记录开通项目、上传/--watch、手动提取、搜索/读取和已知限制；部署文档记录备份/停服/回滚命令及准确版本。提交 `docs: record Monday deployment and source-read acceptance` 并推送。

## 计划自检与执行交接

- 已按规格逐项映射到 Task 1–7；没有自动提取、上传分片、账号网页或新 worker。
- 事件引用、上传 ACK、Pi 路径、字节预算、API 名称在各任务间一致；真实模型质量与确定性数据完整性分别验收。
- 进度按上述复选框更新。每项先验证失败再实现再验证通过；实现后检查原文不可变、项目隔离和失败不假成功三条底线。
- 用户已指定在本 Codex 会话开发；不再要求重新选择 Codex/Pi。书面计划仍需按 Superpowers 工作流审阅后开始产品代码；没有授权自动派发子 agent。
- 本机未安装 executing-plans 技能文件，已定位并读取其官方公开来源 `https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md`。计划通过后按其当前会话执行流程工作，执行前完整读取正文及实际需要的引用文件，不要求用户另做安装选择。

