#!/usr/bin/env bash
set -euo pipefail

for name in TIMEWEB_HOST TIMEWEB_USER TIMEWEB_PORT TIMEWEB_PATH TIMEWEB_SSH_KEY TIMEWEB_KNOWN_HOSTS; do
  if [[ -z "${!name:-}" ]]; then
    printf '::error::Missing GitHub Actions setting: %s. See docs/TIMEWEB.md.\n' "$name"
    exit 1
  fi
done

# Only a named site directory is accepted; never an account or system root.
[[ "$TIMEWEB_HOST" =~ ^[A-Za-z0-9][A-Za-z0-9.-]*$ ]] || { echo 'Invalid SSH host'; exit 1; }
[[ "$TIMEWEB_USER" =~ ^[A-Za-z0-9_][A-Za-z0-9_.-]*$ ]] || { echo 'Invalid SSH user'; exit 1; }
[[ "$TIMEWEB_PORT" =~ ^[0-9]{1,5}$ ]] && ((10#$TIMEWEB_PORT > 0 && 10#$TIMEWEB_PORT < 65536)) || { echo 'Invalid SSH port'; exit 1; }
[[ "$TIMEWEB_PATH" =~ ^(/[A-Za-z0-9_.-]+){4,}/?$ ]] || { echo 'Use the full absolute path of the site directory'; exit 1; }
[[ ! "$TIMEWEB_PATH/" =~ /\.\.?/ ]] || { echo 'Relative path segments are not allowed'; exit 1; }
[[ -f out/index.html && -f out/en/index.html && -d out/_next ]] || { echo 'Static export is incomplete'; exit 1; }

umask 077
ssh_dir=$(mktemp -d "${RUNNER_TEMP:-/tmp}/timeweb-ssh.XXXXXX")
trap 'rm -f "$ssh_dir/key" "$ssh_dir/known_hosts" "$ssh_dir/config"; rmdir "$ssh_dir"' EXIT
printf '%s\n' "$TIMEWEB_SSH_KEY" | tr -d '\r' > "$ssh_dir/key"
printf '%s\n' "$TIMEWEB_KNOWN_HOSTS" | tr -d '\r' > "$ssh_dir/known_hosts"
cat > "$ssh_dir/config" <<CONFIG
Host timeweb-deploy
  HostName $TIMEWEB_HOST
  User $TIMEWEB_USER
  Port $TIMEWEB_PORT
  IdentityFile "$ssh_dir/key"
  UserKnownHostsFile "$ssh_dir/known_hosts"
  StrictHostKeyChecking yes
  IdentitiesOnly yes
  BatchMode yes
  ConnectTimeout 20
CONFIG

ssh -F "$ssh_dir/config" timeweb-deploy "test -d '$TIMEWEB_PATH' && test -w '$TIMEWEB_PATH'"
# No --delete: a deployment must not remove hosting files or certificate data.
# Upload versioned assets before documents which reference them.
rsync -rlptz --delay-updates --chmod=D755,F644 --exclude='*.html' \
  -e "ssh -F \"$ssh_dir/config\"" out/ "timeweb-deploy:${TIMEWEB_PATH%/}/"
rsync -rlptz --delay-updates --chmod=D755,F644 --include='*/' --include='*.html' --exclude='*' \
  -e "ssh -F \"$ssh_dir/config\"" out/ "timeweb-deploy:${TIMEWEB_PATH%/}/"
echo 'Static site uploaded. Check / and /en/ on the hosting domain.'
