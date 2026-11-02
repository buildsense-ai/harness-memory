"""Initialize only this application's PostgreSQL database; run as root on Monday."""
import os, pathlib, secrets, subprocess
os.environ['LC_ALL'] = 'C.UTF-8'
def run(args, **kw):
    return subprocess.run(args, check=True, text=True, capture_output=True, **kw)
clusters = run(['pg_lsclusters','--no-header']).stdout
if not any(line.split()[1] == 'harnessmemory' for line in clusters.splitlines()):
    run(['pg_createcluster','16','harnessmemory','--port','5432','--start'])
config = pathlib.Path('/etc/harness-memory')
config.mkdir(mode=0o700, exist_ok=True)
env = config / 'service.env'
if env.exists():
    print('Existing configuration retained; no credentials changed')
else:
    password = secrets.token_hex(32)
    sql = "CREATE ROLE harness_memory LOGIN PASSWORD '%s';" % password
    run(['runuser','-u','postgres','--','psql','-X','-p','5432','-v','ON_ERROR_STOP=1'], input=sql)
    for name in ['harness_memory','harness_memory_test']:
        run(['runuser','-u','postgres','--','createdb','-p','5432','-O','harness_memory',name])
    env.write_text('DATABASE_URL=postgresql://harness_memory:'+password+'@127.0.0.1:5432/harness_memory\nHOST=127.0.0.1\nPORT=8460\n')
    os.chmod(env,0o600)
    print('Dedicated production/test databases initialized; credentials saved privately')
