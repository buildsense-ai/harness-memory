# Markdown 记忆搜索与原文回查

状态：接口规格，已纳入 2026-11-10 用户补充约束；不是已上线接口说明。

## 目的和边界

用户或 agent 用关键词搜索项目内已生成的 Markdown 历史记忆，获得完整命中文档，再通过文末引用确定性读取服务器保存的原始上下文。记忆可以记录实现、讨论、建议或事件，不要求成为可执行 Skill。

本版不建立关系边，不做 hop、向量搜索、模型重排、跨任务合并或遗忘。沿用项目 API Key，不新增账号平台或权限体系。

## 已核查的现状

- 所有 `/v1` 接口要求 `Authorization: Bearer PROJECT_KEY`。Key 决定项目；source_id、stream_id、客户端提供的名字均不授予访问权。
- 项目通过管理员 CLI 创建；数据库只保存 Key 的 SHA-256。当前没有自助注册 HTTP API，也没有读写 Key 分权、速率限制或项目配额。
- 上传接口是 `POST /v1/ingest/batches`，目前只接收 XiaoBa / Pi 的适配记录；请求 JSON 上限 4 MiB，单批 1–10000 条完整 JSONL 记录。相同位置相同字节幂等，字节冲突返回 409。
- `POST /v1/episodes/search` 搜的是原始 event 文本，不是 Markdown；AND 目前要求关键词出现在同一 event。
- `POST /v1/read` 已支持 Episode 分页读取；`GET /v1/raw/:ref` 返回上传原字节和 SHA-256。
- 选定的新版 Markdown 生成路线仍在评测流程中；正式服务没有 Markdown 文档表或搜索接口，不能把旧 Episode 搜索当作新接口的演示。
- 2026-11-10 Monday 实测：healthz 返回 200；不带 Key 的上传和 read 均返回 401。服务当前仅监听 loopback，并非公网匿名上传服务。

## 数据流与发布要求

```text
日志 → 不可变 raw/event
        ↓
Stage 1：按全部可获得的 public query/message 划任务、预选轮次
        ↓
每任务预选完整上下文 → 固定 Episode 成员（含工具记录）
        ↓
Stage 2：生成并校验 Markdown → 程序附加 Episode 引用 → 发布记忆
        ↓
关键词搜索 → 完整 Markdown + source_refs → /v1/read → 原上下文
```

沿用已选定的 hybrid-allmsg-v1 内容方案和 max 思考配置，本规格不重新设计生成提示词。产品接入时必须明确取消关系生成、接通直接 Markdown 路线，不能仍调用旧 event 筛选流程。

输入完整性不得隐瞒：Pi 原生消息日志能提供顺序消息；现有 XiaoBa 聚合日志只含最终 assistant 文本，不能凭空还原中间消息。接入全 msg 时须保存可追溯的完整原始来源，不能把可能被覆盖的 session 文件直接视作永久原文日志。

新增一张 `memory_documents` 表，保存项目、文档 ID、run_id、thread_id、已校验正文、创建时间和来源 Episode。每次 run 的每个 thread 最多一份文档；同一 run 的重复写入不得重复发布。不同 run 的独立生成记录先作为不同记忆保留，不增加版本择优算法。

Episode 的成员先确定并保持不变。生成结果必须通过现有 Markdown/schema 校验；失败不发布残缺正文。文档与其来源绑定在同一个数据库事务中发布。按单文档发布，其他 thread 的失败不阻塞已成功文档；搜索只读取已发布文档，不依赖整个 run 全部成功。沿用现有状态查询披露失败，后续自动处理调度另行接入，不能以“上传成功”冒充“记忆生成成功”。

`source_refs` 由程序生成，不接受模型任意填写。当前每份文档引用该任务预选上下文的一个服务器 Episode ID。评测目录里的临时候选 ID 不得直接当作生产引用。

## 接口一：搜索完整 Markdown

新增 `POST /v1/memories/search`。以下均为契约示意，不是真实生成结果或已可调用响应。

```json
{"keywords":["上传","API Key"],"operator":"AND","offset":0,"limit":10}
```

- 鉴权和范围：必须携带上传时使用的 Bearer Key，只搜索该 Key 上传原文所生成的已发布记忆，包含同 Key 的不同 harness/source/session。当前数据库每个项目只有一个 Key，因此按 project_id 隔离与按 Key 隔离等价；本版保持此一对一关系，不允许通过新增同项目其他 Key 意外扩大访问范围。分页不代表只搜索最近若干篇。
- 匹配：标题与自然正文上的字面子串；AND 表示每个词都出现在同一份文档中，可以位于不同段落；OR 表示任一个词命中。ASCII 忽略大小写，中文原样匹配。不是正则或语义搜索。
- 机械附加的 source_refs 不参与关键词匹配，原始工具日志不会隐式加入搜索范围。
- keywords 为 1–16 个非空字符串，每词最多 256 Unicode codepoints；operator 默认 AND；limit 默认 10，范围 1–10，超过 10 返回 400；offset 默认 0，为非负安全整数。不增加搜索语言。
- 先在当前 Key 的授权范围内匹配，再按 memory_id 去重，最后排序、分页、应用 limit。一个文档即使命中多个关键词或多处正文也只占一个名额；不能先截取 10 个片段再去重。此处是同一文档的去重，不做不同文档的语义合并。分页偏移和 next_offset 都以去重后的文档为单位。
- 按发布时间倒序、文档 ID 固定次序排列。此顺序不代表语义相关性。offset 分页不承诺并发新增文档时的固定快照，首版不增加搜索快照服务。
- 返回完整文档，不用 snippet 替代正文，不静默截断。文档很多时用文档级分页控制返回数量。

```json
{
  "items": [
    {
      "memory_id": "mem_UUID",
      "markdown": "# 示例任务记忆\n\n此处为完整已存正文。\n\n## source_refs\n- episode_id: `ep_UUID`\n",
      "source_refs": ["ep_UUID"]
    }
  ],
  "next_offset": null
}
```

`markdown` 包含程序附加的引用区，`source_refs` 提供同一引用的机器可读形式；两者必须来自相同数据库绑定，不二次解析模型文字猜引用。无结果返回空 items。多取一条判断是否有下一页，不要求计算总命中数。

旧 `/v1/episodes/search` 标记为废弃，不纳入新记忆搜索链路、客户端默认调用或本版功能扩展。现有路由可暂留以避免破坏旧客户端，仍要求原有 Key 隔离；不作为新搜索失败后的自动回退。是否重新适配或移除留待后续判断。

## 接口二：按引用读取原上下文

复用现有 `POST /v1/read`，不增加另一个生成式原文定位接口。

```json
{"ref":"ep_UUID","offset":0,"limit":20}
```

现有响应包含 ref、任务元数据、total_events、events、next_offset；events 按 Episode 成员顺序返回保存的 query/message/tool_call/tool_result，每条包含 content、raw_ref、pointer、offset 和 fidelity。limit 默认 20、最大 50。按 next_offset 继续读，直到 null；单个 event 内容不截断。

这里返回该任务引用的预选上下文，不自动扩大为整场会话，也不生成摘要或再判断相关性。一个 Episode 可以包含不连续的原始轮次，但内部保留原始顺序。引用不是逐句事实核验的承诺。

原文内容保持上传时记录的字段值，不受 Markdown 再生成影响。需要精确源文件字节时，用事件的 raw_ref 调 `GET /v1/raw/:ref`，校验返回的 SHA-256。缺失的原日志内容不能由读取接口补造。

已有 Episode 回查契约保留；新发布记忆必须保证其引用的 Episode 就是 Stage 2 实际接收的完整候选，不是旧流程二次删减后的 event 子集。

## 鉴权与错误

上传、搜索、回查共享同一个 Bearer Key，并保持 Key 与项目一对一。搜索只能访问该 Key 上传内容生成的记忆；Episode/event/raw 回查只能访问该 Key 上传的原文。所有读取必须在数据库查询中限定授权范围，不能先跨 Key 查询再在返回阶段过滤。无效/缺失 Key 返回 401；未知或其他 Key 的引用返回 404，不能凭引用、source_id、stream_id 或请求体伪造的 project_id 越权。参数错误返回 400；上传体超限返回 413，原数据冲突返回 409。不宣称有尚未实现的细粒度权限或流量控制。

## 验收条件

1. 无 Key、错 Key 不能上传、搜索或回查；Key A 与 Key B 上传相同关键词、使用相同 source/stream 名也互不可见。B 直接提交 A 的 Episode、event、raw 引用均返回 404，伪造 project_id 无效。
2. AND 可以跨一份 Markdown 的不同段落命中，不能把两个不同文档的关键词拼成一次命中；OR、字面特殊字符与大小写遵循契约。
3. 搜索涵盖该 Key 上传内容生成的全部已发布文档；同文档多处命中只返回一次。构造前 10 个命中片段来自同一文档、另有足量其他命中文档的情况，仍能返回 10 份不同文档，证明去重发生在 limit 之前。limit=11 返回 400；分页以去重后的文档计数，正文完整返回，未发布结果不可见。
4. 返回的 Markdown 引用与 source_refs 一致；逐页 read 拼接后与 Stage 2 固定候选的原始 event 内容、顺序完全一致。
5. raw_ref 返回字节与上传 SHA-256 一致；新增日志或再次生成 Markdown 不移动旧引用。
6. 格式失败不发布半份记忆；同一 run/thread 重复执行不产生重复发布。用真实 PostgreSQL 集成测试验证，不只 mock SQL。
7. 最终拿一组真实长会话完成上传、生成、关键词命中、全文返回和原文回查演示；保留真实请求响应供用户查看。合并通过后再按现有发布链部署 Monday。
