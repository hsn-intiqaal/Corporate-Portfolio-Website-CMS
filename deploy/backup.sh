#!/bin/sh
# Nightly PostgreSQL dump (+ local uploads: media, brochures, lead attachments), keeping BACKUP_KEEP_DAYS days.
# Copy /backups off the server too (e.g. rclone to Cloudflare R2 / S3) - see docs/HOSTING.md.
set -eu
STAMP=$(date -u +%Y%m%d-%H%M%S)
pg_dump -h db -U cms -d cms --format=custom --no-owner > "/backups/db-$STAMP.dump"
for d in media documents lead-files; do
  if [ -d "/$d" ] && [ "$(ls -A "/$d" 2>/dev/null)" ]; then tar -czf "/backups/$d-$STAMP.tar.gz" -C "/$d" .; fi
done
find /backups -type f -mtime +"${BACKUP_KEEP_DAYS:-14}" -delete
echo "Backup $STAMP complete"
