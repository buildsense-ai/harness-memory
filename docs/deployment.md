# Monday deployment

One service and one database on Monday. The workbench and API are served by that memory system; the browser is only a client. Do not modify or restart the existing XiaoBa runtime.

1. With PostgreSQL 16 installed and 5432 free, run `deploy/bootstrap-db.py` as root. This creates only the `harnessmemory` cluster, the `harness_memory` role, production/test databases and private `/etc/harness-memory/service.env`. The name deliberately has no dash because PostgreSQL's systemd template expands it as a path. Existing credentials are retained on rerun.
2. Install this repository at `/opt/harness-memory`, run `npm ci` and `npm run build`, create system user/group `harness-memory`.
3. Set `/etc/harness-memory` to root:harness-memory 0750 and service.env to root:harness-memory 0640. Add model settings privately. The service user needs database access but no source-log filesystem access.
4. Copy `deploy/harness-memory.service` into `/etc/systemd/system/`, run `systemctl daemon-reload` and `systemctl enable --now harness-memory`. Confirm `curl http://127.0.0.1:8460/healthz` and `systemctl status harness-memory`.
5. Create projects with `node --env-file=/etc/harness-memory/service.env dist/src/admin.js project-create NAME`. Save the Key privately, not in service logs or shell arguments. Run upload commands separately with the appropriate log permissions.

6. Point a DNS name to Monday, obtain a trusted TLS certificate using the host's existing certificate workflow, and add `deploy/nginx-memory-workbench.conf.example` to the active Nginx configuration with the real hostname and certificate paths. Validate with `nginx -t`, then reload Nginx. Open TCP 443 on the server firewall; keep TCP 8460 private to the host. The app serves both `/workbench` and `/v1` on the same origin. The public URL is `https://<hostname>/workbench`.

The browser sends the project Key as a Bearer credential, so the public entry must use HTTPS. Do not expose port 8460 directly over plain HTTP. Confirm both `curl https://<hostname>/healthz` and `https://<hostname>/workbench` from a client outside Monday's network.

Before updates, create a private dump with the service credentials or as postgres:

```sh
runuser -u postgres -- pg_dump -p 5432 -Fc harness_memory > /var/lib/harness-memory/backup.dump
chmod 600 /var/lib/harness-memory/backup.dump
```

Keep the installed Git SHA in the acceptance report. To stop, `systemctl stop harness-memory`. To roll back code, stop this service, check out the previously recorded SHA in `/opt/harness-memory`, run `npm ci && npm run build`, then start this service. Initial schema creation is additive; a future incompatible migration needs its own backup/restore procedure.

On restart, unfinished extraction runs become interrupted; raw records and published references remain available. No automatic database backups/retention service is installed in v0.1.

## Merge-first continuous deployment

`.github/workflows/ci-deploy.yml` runs all TypeScript tests against a fresh PostgreSQL 16 database, builds on Node 20.20.2, and tests the deployment decision logic. PRs never deploy. A passing main push deploys its exact SHA; workflow_dispatch on main can retry a failed deployment. Runs are serialized without canceling an in-progress release. This deploys the app to Monday; Nginx remains the separately configured public HTTPS ingress.

One-time host setup: create `harness-memory-deploy`, with home `/var/lib/harness-memory-deploy` and a shell for SSH forced commands; grant access only to its repository and releases directory. Install `deploy/deploy_main.py` as root-owned `/usr/local/libexec/harness-memory-deploy`, mode 0755. Its sole permitted sudo invocation is that program with a literal `deploy <40-character lowercase SHA>` argument. The script independently validates the argument and requires SHA equality with fetched public origin/main.

The service user must also be able to traverse the release path. On Monday the deploy home is `harness-memory-deploy:harness-memory` mode 0750, release directories are 0755, and `.ssh` remains owner-only 0700 with authorized_keys 0600. Check readability as the service user before the first deployment. Install the Python entrypoint with LF line endings (for example from canonical Git blob bytes); CRLF breaks its Linux shebang. The Actions private key must have no passphrase because this workflow has no interactive key-unlock step; verify this explicitly rather than relying on shell empty-argument handling.

Use a dedicated SSH Key, with authorized_keys `restrict,command="sudo -n /usr/local/libexec/harness-memory-deploy \"$SSH_ORIGINAL_COMMAND\""`; no forwarding, TTY, arbitrary shell, or generic root SSH Key. Configure GitHub secrets `MONDAY_DEPLOY_KEY`, `MONDAY_DEPLOY_HOST`, `MONDAY_KNOWN_HOSTS`; obtain host keys via the existing trusted SSH connection, not an unauthenticated scan. The Actions environment is named `monday`.

Configure the service WorkingDirectory as `/opt/harness-memory-current` (an atomic symlink initially pointing to the existing installation). The deployer fetches public main as the non-root deploy user, prepares a separate immutable SHA directory, runs npm ci/build without root, creates a private database dump, switches the symlink, restarts only this service and checks health. Build failure does not switch; restart/health failure restores the previous code directory. Database migrations must remain backward compatible: code rollback does not automatically restore the database.

`/var/lib/harness-memory/deployed-sha` records the last successful exact main SHA. Release directories and private dumps are retained for rollback; this small deployment addition does not implement retention/garbage collection.

## Verified deployment and real-log acceptance (2026-11-02)

Main `9d65c71449a4931b816b3649374678307214e860` was deployed successfully by Actions run `41444460663` after all 30 TypeScript tests, the PostgreSQL integration tests, build and four deployment tests passed. A release-directory permission failure during setup exercised code rollback; the old service recovered. After correcting host permissions, the same tested SHA passed deployment and health checks.

One complete Saturday log snapshot (175,786 bytes, 309 native records) was uploaded into a separate project. Goal extraction produced five episodes, each selecting the same eight unique conversation events. This validates mechanics, not goal-selection precision. All eight event references and their two underlying raw turn records were checked after deployment against the uploaded byte slices. Literal searches returned five episodes for a present keyword and zero for an absent keyword; AND/OR controls behaved as expected. A foreign project's key could not read the event (404). Re-upload using the existing state sent zero records and reported zero pending bytes.

No directory-wide collector or historical backfill was enabled on Saturday. Private source logs, model responses, project keys and real goal text remain outside this public repository.
