# Public upload ingress

Public and internal upload use the same Bot ingress routes, project, dataset, raw records, ACKs and processing queues. Nginx terminates HTTPS and forwards only the upload routes to the existing application on `127.0.0.1:8460`. No second receiver or database is introduced. Upload remains keyless by Bot UID; the UID is declared provenance, not authentication. Read, search and workbench authorization remain separate.

The default client endpoints are `https://memory.catsco.cn:18443` and `https://memory.catsco.cc:18443`. Both A records point to Monday `121.11.233.41`. TCP 18443 is allowed by Monday's additional `Monday-Memory-Ingress` security group; retain its original security group. Port 8460 remains on loopback. The existing internal HTTP ingress can remain active alongside public HTTPS.

## Install

1. Obtain a publicly trusted certificate covering both exact names. The example expects a SAN certificate at `/etc/letsencrypt/live/memory.catsco/`. With inbound 80/443 unavailable, use DNS-01, not HTTP-01. Private keys stay on the receiver. Arrange DNS automation or a documented manual renewal before expiry; one-time TXT records do not provide automatic renewal.
2. Install `deploy/nginx-memory-upload.conf.example` as `/etc/nginx/sites-available/memory-upload`, and link it into `sites-enabled` only after the certificate exists. Validate using `nginx -t`, then reload Nginx. The example accepts encoded requests up to 4 MiB, above the client's 3 MiB transport limit. Fragmented large records use the same endpoint and receiver assembly rules as internal uploads.
3. From an external device, use normal certificate verification to request `/v1/bot-ingest/config` through each domain. Both must match the internal dataset. Confirm `/v1/memories/search`, `/v1/read` and `/workbench` are not exposed by this upload-only virtual host.
4. Test manifest registration, an original-log upload, its ACK, duplicate replay, later appends and large-record fragments. Confirm raw byte fidelity and ordinary queue admission on the same backend. An upload ACK still means source acceptance, not Wiki completion.

Do not change `MEMORY_DATASET_ID` or clear client/server progress for this ingress change. XiaoBa PR 651 preserves the independent local ledger when its endpoint changes, checking the receiver dataset first. Existing installations with an explicit internal URL keep that override until intentionally migrated.

## Optional Bot memory reads

To enable the three authenticated Bot memory routes over HTTPS, install `deploy/nginx-memory-bot-read.conf.example` as `/etc/nginx/snippets/memory-bot-read.conf` and add the matching include to the HTTPS server block. Validate with `nginx -t` before reloading. See [Bot memory API](api.md#bot-memory-for-branch).

## Fallback

The client tries `.cc` on connection/timeouts or HTTP 502/503/504 and verifies its dataset before sending original bytes. Identical source IDs, stream IDs, manifests and offsets reach the same backend, so the existing replay handling applies. HTTP request errors, 429, malformed responses and dataset mismatches stop that operation. TLS verification remains enabled on every connection. There is no HTTP fallback and no duplicate queue per domain.

## Rollback

Remove only the `memory-upload` enabled-site symlink, run `nginx -t` and reload. Keep the existing internal listener, data and processing service. Reverting a client to its known internal URL with the same dataset retains its ledger; do not restart from offset zero.
