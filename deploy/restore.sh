#!/bin/sh
# Restore a database dump into the running stack.
#   sh deploy/restore.sh backups/db-YYYYMMDD-HHMMSS.dump
# WARNING: replaces the current database contents.
set -eu
FILE=${1:?usage: restore.sh <dump-file>}
docker compose -f deploy/docker-compose.yml exec -T db sh -c 'pg_restore -U cms -d cms --clean --if-exists --no-owner' < "$FILE"
echo "Restored $FILE - restart the app: docker compose -f deploy/docker-compose.yml restart app"
