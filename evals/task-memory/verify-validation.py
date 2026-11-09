import hashlib
import json
import os
from collections import Counter
from pathlib import Path

ROOT = Path(os.environ.get('EVAL_WORKSPACE', Path(__file__).resolve().parent))


def read(p):
    return json.loads(p.read_text(encoding='utf-8'))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def pointer(obj, value):
    for part in value.split('/')[1:]:
        part = part.replace('~1', '/').replace('~0', '~')
        obj = obj[int(part)] if isinstance(obj, list) else obj[part]
    return obj


results = {}
for label in ['code', 'noncode']:
    directory = ROOT / label
    raw = (ROOT / (label + '.raw.jsonl')).read_bytes()
    snapshot = read(directory / 'snapshot.json')
    partition = read(directory / 'stage1-output.json')
    calls = read(directory / 'stage1-calls.json')
    events = snapshot['events']
    checks = {}
    checks['source_sha256'] = digest(raw) == snapshot['sha256']
    records = {}
    offset = 0
    for line in raw.splitlines(keepends=True):
        if line.strip():
            records[offset] = json.loads(line)
        offset += len(line)
    resolved = []
    for event in events:
        value = pointer(records[event['offset']], event['pointer'])
        if event['kind'] == 'tool_call':
            value = {key: value[key] for key in event['fields']}
        expected_text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, separators=(',', ':'))
        resolved.append(value == event['content'] and expected_text == event['text'])
    checks['all_events_equal_original_pointer_content_and_text'] = all(resolved)
    queries = [event for event in events if event['kind'] == 'query']
    ordinal = {event['ref']: n + 1 for n, event in enumerate(queries)}
    checks['all_queries_assigned_exactly_once_record'] = Counter(a['query_ref'] for a in partition['query_assignments']) == Counter(ordinal.keys())
    dialogue = json.loads(calls[0]['request']['messages'][-1]['content'])['dialogue_events']
    checks['stage1_input_only_complete_query_and_message'] = (
        [(d['ref'], d['kind'], d['text']) for d in dialogue] ==
        [(e['ref'], e['kind'], e['text']) for e in events if e['kind'] in ['query', 'message']]
    )
    (directory / 'stage1-system-prompt.txt').write_text(calls[0]['request']['messages'][0]['content'], encoding='utf-8')
    threads = []
    memberships = Counter()
    for thread in partition['task_threads']:
        tid = thread['thread_id']
        current = directory / tid
        episode = read(current / 'episode.json')
        payload = read(current / 'generation-input.json')
        generation = read(current / 'generation-calls.json')
        model = read(current / 'model-output.json')
        memory = (current / 'memory.md').read_text(encoding='utf-8')
        assignments = [a for a in partition['query_assignments'] if tid in a['thread_ids']]
        refs = {a['query_ref'] for a in assignments}
        raw_refs = {q['raw_ref'] for q in queries if q['ref'] in refs}
        expected = [e for e in events if e['raw_ref'] in raw_refs]
        expected_view = [{key: e[key] for key in ['ref', 'kind', 'timestamp', 'tool_call_id', 'text'] if key in e} for e in expected]
        thread_checks = {
            'candidate_exact_complete_assigned_turns': payload['candidate_events'] == expected_view,
            'manifest_exact_candidate_refs': episode['event_refs'] == [e['ref'] for e in expected],
            'manifest_sha256': episode['source_snapshot_sha256'] == snapshot['sha256'],
            'local_manifest_not_claimed_server_registered': episode['server_registered'] is False,
            'request_contains_exact_saved_input': json.loads(generation[0]['request']['messages'][-1]['content']) == payload,
            'markdown_is_unmodified_model_body_plus_episode_reference': memory == model['markdown'].strip() + '\n\n## source_refs\n- episode_id: `' + episode['episode_id'] + '`\n',
        }
        response = generation[-1]['response']['choices'][0]['message']
        submitted = next(c for c in response['tool_calls'] if c['function']['name'] == 'submit_memory_document')
        thread_checks['saved_output_equals_raw_model_tool_arguments'] = json.loads(submitted['function']['arguments']) == model
        tool_calls = Counter((e['raw_ref'], e['tool_call_id']) for e in expected if e['kind'] == 'tool_call')
        tool_results = Counter((e['raw_ref'], e['tool_call_id']) for e in expected if e['kind'] == 'tool_result')
        thread_checks['all_tools_paired_with_results'] = tool_calls == tool_results
        memberships.update(e['ref'] for e in expected)
        (current / 'system-prompt.txt').write_text(generation[0]['request']['messages'][0]['content'], encoding='utf-8')
        threads.append({
            'thread_id': tid, 'title': thread['title'],
            'source_query_ordinals': [ordinal[a['query_ref']] for a in assignments],
            'assembled_episode_count': 1, 'candidate_events': len(expected),
            'tool_calls': sum(tool_calls.values()), 'input_tokens': generation[0]['response']['usage']['prompt_tokens'],
            'generation_attempts': len(generation), 'checks': thread_checks,
            'model_body_sha256': digest(model['markdown'].encode('utf-8')),
            'document_sha256': digest(memory.encode('utf-8')),
        })
    checks['all_source_events_covered'] = set(memberships) == {e['ref'] for e in events}
    checks['relations_refs_resolve'] = all(r in {e['ref'] for e in events} for relation in partition['relations'] for r in relation['evidence_refs'])
    results[label] = {
        'source_sha256': snapshot['sha256'], 'native_log_bytes': len(raw),
        'native_records': len(records), 'event_kinds': dict(Counter(e['kind'] for e in events)),
        'query_count': len(queries), 'stage1_input_events': len(dialogue), 'stage1_attempts': len(calls),
        'coverage_unique_events': len(memberships),
        'shared_unique_events': sum(n > 1 for n in memberships.values()),
        'extra_memberships': sum(n - 1 for n in memberships.values()),
        'uncovered_refs': [e['ref'] for e in events if e['ref'] not in memberships],
        'checks': checks, 'threads': threads,
    }
    results[label]['all_mechanical_checks_pass'] = all(checks.values()) and all(all(t['checks'].values()) for t in threads)

(ROOT / 'verification.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
for label, value in results.items():
    print(label, 'mechanical_pass=', value['all_mechanical_checks_pass'], 'events=', value['coverage_unique_events'], 'shared=', value['shared_unique_events'])
    for thread in value['threads']:
        print(' ', thread['thread_id'], 'queries=', thread['source_query_ordinals'], 'events=', thread['candidate_events'], 'prompt_tokens=', thread['input_tokens'])
if not all(value['all_mechanical_checks_pass'] for value in results.values()):
    raise SystemExit('Mechanical validation failed; inspect verification.json')
