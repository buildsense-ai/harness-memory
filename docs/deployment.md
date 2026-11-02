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
