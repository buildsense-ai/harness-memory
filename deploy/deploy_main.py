#!/usr/bin/env python3
"""Root-owned forced-command entrypoint; accepts only current public main SHA."""
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
import urllib.request

REPOSITORY = 'https://github.com/buildsense-ai/harness-memory.git'
HOME = Path('/var/lib/harness-memory-deploy')
REPO = HOME / 'repository'
CURRENT = Path('/opt/harness-memory-current')
RELEASES = HOME / 'releases'

def parse_command(command):
    match = re.fullmatch(r'deploy ([0-9a-f]{40})', command)
    if not match: raise ValueError('expected deploy followed by a full lowercase commit SHA')
    return match.group(1)

def release(sha, main_sha, build, activate, restore, healthy):
    if sha != main_sha: raise ValueError('refusing a commit other than current origin/main')
    build()
    try:
        activate()
        if not healthy(): raise RuntimeError('new release failed healthcheck')
    except Exception:
        restore()
        raise

def run(args, user=False, **kw):
    if user: args = ['runuser','-u','harness-memory-deploy','--'] + args
    return subprocess.run(args, check=True, text=True, **kw)

def switch(target):
    temporary = CURRENT.with_name(CURRENT.name + '.next')
    temporary.unlink(missing_ok=True)
    temporary.symlink_to(target)
    os.replace(temporary, CURRENT)
    run(['systemctl','restart','harness-memory'])

def health():
    for _ in range(30):
        try:
            with urllib.request.urlopen('http://127.0.0.1:8460/healthz',timeout=2) as response:
                if json.load(response).get('ok'): return True
        except Exception: pass
        time.sleep(1)
    return False

def main():
    import fcntl  # Deployment is Linux-only; pure validation tests also run on Windows.
    sha = parse_command(sys.argv[1] if len(sys.argv)==2 else '')
    with open('/var/lock/harness-memory-deploy.lock','w') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        if not REPO.exists(): run(['git','clone','--no-checkout',REPOSITORY,str(REPO)],user=True)
        run(['git','-C',str(REPO),'fetch','--no-tags','origin','main'],user=True)
        latest = run(['git','-C',str(REPO),'rev-parse','FETCH_HEAD'],user=True,capture_output=True).stdout.strip()
        target = RELEASES / sha
        previous = CURRENT.resolve() if CURRENT.is_symlink() else Path('/opt/harness-memory')
        def build():
            if not target.exists(): run(['git','-C',str(REPO),'worktree','add','--detach',str(target),sha],user=True)
            run(['npm','ci','--no-audit','--no-fund'],user=True,cwd=target)
            run(['npm','run','build'],user=True,cwd=target)
            # Back up production immediately before switching. No credentials in arguments.
            backup = Path('/var/lib/harness-memory') / ('before-deploy-' + sha + '.dump')
            with open(backup,'wb') as output:
                os.chmod(backup,0o600)
                subprocess.run(['runuser','-u','postgres','--','pg_dump','-p','5432','-Fc','harness_memory'],stdout=output,check=True)
        release(sha,latest,build,lambda:switch(target),lambda:switch(previous),health)
        Path('/var/lib/harness-memory/deployed-sha').write_text(sha+'\n')
        print('DEPLOYED '+sha)

if __name__=='__main__': main()
