# Monday deployment

One service, one database, loopback access. Do not modify or restart the existing XiaoBa runtime.

1. With PostgreSQL 16 installed and 5432 free, run `deploy/bootstrap-db.py` as root. This creates only the `harnessmemory` cluster, the `harness_memory` role, production/test databases and private `/etc/harness-memory/service.env`. The name deliberately has no dash because PostgreSQL's systemd template expands it as a path. Existing credentials are retained on rerun.
2. Install this repository at `/opt/harness-memory`, run `npm ci` and `npm run build`, create system user/group `harness-memory`.
3. Set `/etc/harness-memory` to root:harness-memory 0750 and service.env to root:harness-memory 0640. Add model settings privately. The service user needs database access but no source-log filesystem access.
4. Copy `deploy/harness-memory.service` into `/etc/systemd/system/`, run `systemctl daemon-reload` and `systemctl enable --now harness-memory`. Confirm `curl http://127.0.0.1:8460/healthz` and `systemctl status harness-memory`.
5. Create projects with `node --env-file=/etc/harness-memory/service.env dist/src/admin.js project-create NAME`. Save the Key privately, not in service logs or shell arguments. Run upload commands separately with the appropriate log permissions.

Remote access uses `ssh -N -L 8460:127.0.0.1:8460 monday`; no new public listener is required.

Before updates, create a private dump with the service credentials or as postgres:

```sh
runuser -u postgres -- pg_dump -p 5432 -Fc harness_memory > /var/lib/harness-memory/backup.dump
chmod 600 /var/lib/harness-memory/backup.dump
```

Keep the installed Git SHA in the acceptance report. To stop, `systemctl stop harness-memory`. To roll back code, stop this service, check out the previously recorded SHA in `/opt/harness-memory`, run `npm ci && npm run build`, then start this service. Initial schema creation is additive; a future incompatible migration needs its own backup/restore procedure.

On restart, unfinished extraction runs become interrupted; raw records and published references remain available. No automatic database backups/retention service is installed in v0.1.

## Merge-first continuous deployment

`.github/workflows/ci-deploy.yml` runs all TypeScript tests against a fresh PostgreSQL 16 database, builds on Node 20.20.2, and tests the deployment decision logic. PRs never deploy. A passing main push deploys its exact SHA; workflow_dispatch on main can retry a failed deployment. Runs are serialized without canceling an in-progress release.

One-time host setup: create `harness-memory-deploy`, with home `/var/lib/harness-memory-deploy` and a shell for SSH forced commands; grant access only to its repository and releases directory. Install `deploy/deploy_main.py` as root-owned `/usr/local/libexec/harness-memory-deploy`, mode 0755. Its sole permitted sudo invocation is that program with a literal `deploy <40-character lowercase SHA>` argument. The script independently validates the argument and requires SHA equality with fetched public origin/main.

Use a dedicated SSH Key, with authorized_keys `restrict,command="sudo -n /usr/local/libexec/harness-memory-deploy \"$SSH_ORIGINAL_COMMAND\""`; no forwarding, TTY, arbitrary shell, or generic root SSH Key. Configure GitHub secrets `MONDAY_DEPLOY_KEY`, `MONDAY_DEPLOY_HOST`, `MONDAY_KNOWN_HOSTS`; obtain host keys via the existing trusted SSH connection, not an unauthenticated scan. The Actions environment is named `monday`.

Configure the service WorkingDirectory as `/opt/harness-memory-current` (an atomic symlink initially pointing to the existing installation). The deployer fetches public main as the non-root deploy user, prepares a separate immutable SHA directory, runs npm ci/build without root, creates a private database dump, switches the symlink, restarts only this service and checks health. Build failure does not switch; restart/health failure restores the previous code directory. Database migrations must remain backward compatible: code rollback does not automatically restore the database.

`/var/lib/harness-memory/deployed-sha` records the last successful exact main SHA. Release directories and private dumps are retained for rollback; this small deployment addition does not implement retention/garbage collection.
