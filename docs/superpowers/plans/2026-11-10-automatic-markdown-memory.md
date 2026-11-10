# 自动 Markdown 记忆链路实施计划

> 执行方式：当前 Codex 会话连续执行；用户 2026-11-10 明确要求完整自动链路在 Monday 部署验收。无需另建会话或子代理。

**Goal:** 原始日志上传完成后自动生成任务记忆，按 Key 搜索和引用回查。
**Architecture:** 在现有原文存储上接入固定 hybrid-allmsg-v1 提示词；原生 XiaoBa 消息逐条投影；完成快照进入 PostgreSQL 持久队列；任务预选完整轮次直接生成 Markdown，不调用旧 event 筛选器。按文档发布并机械附加 Episode 引用。
**Tech Stack:** TypeScript、Fastify、PostgreSQL、既有 DeepSeek 兼容模型客户端。
**Spec:** docs/superpowers/specs/2026-11-10-memory-search-source-api-design.md

## Global Constraints

- Key 与项目一对一；所有查询、引用必须限定 project_id。
- 搜索先按 memory_id 去重，再分页限 1–10；返回完整正文。
- 不建边；relations 固定 []；不增加 event 删除层。
- 先合并 main，再由现有 Actions 部署 Monday。
- 历史测试日志按字节上传，不将评测生成 wiki 当成新生成结果。

## Review Focus

- 原生消息包含中间助手文字和工具，不能仍只读取最终回复。
- 分批上传只在完整快照提交后处理；重复提交不重复运行。
- 重启后 queued/running 新链路可恢复，发布文档不会重复。
- 某个任务生成失败不发布半文档，其他已完成文档保留。
- 搜索与 Episode/event/raw 引用均无法跨 Key。

## Tasks

- [x] 1. 扩展 XiaoBa 原生 role 消息投影，测试中间 msg、工具、原文精确引用与旧格式兼容。
- [x] 2. 加 memory_documents 和快照队列迁移；接入冻结 Stage1/Stage2 提示词、max 思考、格式反馈重试；按 query 轮次预选，测试无工具 Stage1 与含工具 Stage2。
- [x] 3. 实现上传 complete 自动排队、状态查询、重启恢复、单任务文档事务发布；上传器自动调用 complete，测试幂等与失败场景。
- [x] 4. 实现 /v1/memories/search，测试跨段 AND、文档去重、最大10、分页、全文、跨 Key 及原文逐页一致。
- [ ] 5. 构建与真实 PostgreSQL 测试，review diff，更新 API 文档；push PR，CI 通过后合并，等待 Actions 部署。
- [ ] 6. 将此前 code/noncode 的原生消息日志原字节片段上传到 Monday 独立项目；等待自动两阶段完成；保存阶段一划分、完整文档、搜索响应、逐引用原文一致性结果与实际部署 SHA。

验证命令：npm test；npm run build；python -m unittest discover -s tests -p test_deploy.py。真实模型验收与 HTTP 测试在 Monday 已部署的 main 上执行，不直接改生产数据库伪造生成内容。
