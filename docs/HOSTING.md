# Hosting Plan

This plan covers where the site runs, what each part costs, how to launch, and how it is kept safe
afterwards. All accounts (hosting, database, storage, email, domain) should be **created in the client's
name**, with the delivery team added as a collaborator (proposal §3A, §9).

> Prices below were gathered in October 2026 from third-party summaries and change often.
> Confirm on each provider's pricing page before quoting the client.

---

## 1. What needs hosting

The project is **one Next.js application** containing the public website, the `/admin` dashboard and the
API. It needs four services:

| Part | Purpose | Requirement |
|---|---|---|
| App server | Runs Next.js + Payload | Node.js 22.12+, a long-running or serverless runtime (static-only hosting cannot run the CMS) |
| PostgreSQL | Content, users, leads | PostgreSQL 15+ with daily backups |
| Object storage | Images and lead attachments | Any S3-compatible bucket (required on Vercel; optional on a VPS) |
| Email (SMTP) | Lead notifications | Transactional provider with SPF/DKIM on the client's domain |

Public pages are pre-rendered and cached. They are refreshed automatically when an editor publishes,
so the database is only queried on publish, in the dashboard and on form submissions. **Traffic does not
drive database cost.**

---

## 2. Recommended: Option A, managed (Vercel + Neon + Cloudflare R2)

This is the setup recommended in the proposal: no servers to patch, automatic HTTPS and CDN, and a
preview deployment for every change.

| Service | Provider | Plan | Approx. monthly cost |
|---|---|---|---|
| App hosting | **Vercel** | Pro (Hobby is non-commercial only) | ~$20 per seat, includes $20 usage credit |
| Database | **Neon** Postgres | Launch (usage-based, scale-to-zero) | ~$5–25 for a site this size; ~$80 if kept always-on |
| Media storage | **Cloudflare R2** | Pay as you go | $0–2 (10 GB free; no egress fees) |
| Email | **Resend** / Postmark / AWS SES | Free tier or entry plan | $0–20 |
| DNS + spam protection | **Cloudflare** | Free (DNS + Turnstile) | $0 |
| Uptime monitoring | Better Stack / UptimeRobot | Free tier | $0 |
| Error tracking (optional) | Sentry | Developer (free) | $0 |
| Domain | Any registrar | .com / .sa / .com.sa | ~$10–40 per year |
| **Total** | | | **≈ $25–70 / month** |

**Caveats**
- Vercel limits request bodies to 4.5 MB. Set `LEAD_UPLOAD_TOTAL_MB=4` so quotation attachments stay under it.
- Data is hosted in the providers' regions. Pick the nearest ones: Vercel `fra1`/`dxb1` and Neon
  Frankfurt for Gulf clients. If the client needs data **inside a specific country**, use Option C.
- Neon's Launch plan has no high availability. Upgrade to Scale if the client needs it.

### Step-by-step launch (Option A)
1. **Accounts in the client's name:** GitHub organisation, Vercel team (Pro), Neon, Cloudflare, Resend. Add the delivery team as members.
2. **Database:** create a Neon project in the closest region, then copy the *pooled* connection string into `DATABASE_URL`.
   Create a second Neon branch for **staging**.
3. **Storage:** in Cloudflare R2 create a bucket (e.g. `site-media`) and an API token with read/write on it. Connect a
   custom domain such as `media.example.com` to the bucket (this is the `S3_PUBLIC_URL`).
   Set `S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com` and `S3_REGION=auto`.
4. **Email:** verify the domain in Resend (add its SPF/DKIM DNS records) and use its SMTP settings
   (`smtp.resend.com`, port 465, user `resend`, password = API key).
5. **Spam protection:** create a Turnstile widget for the domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
6. **Vercel project:** import the GitHub repository. Framework is Next.js; the build command comes from `vercel.json`
   (`payload migrate && next build`, which applies database migrations on every deploy).
   Add every variable from `.env.example` for **Production** and **Preview** (preview points at the staging DB branch).
   Also set `CRON_SECRET` (used by the scheduled-publishing cron in `vercel.json`).
7. **First deploy**, then create the first administrator at `https://<domain>/admin` (the first account becomes Administrator).
   Optionally run `pnpm seed` once against **staging only** to load demo content.
8. **Domain:** add the domain in Vercel and set the DNS records in Cloudflare (DNS only, grey cloud, for the Vercel records).
   HTTPS is issued automatically. Redirect `www` to the main domain.
9. **Launch checks:** run `node scripts/smoke.mjs https://<domain>`, submit a test enquiry, verify Google Search Console
   (paste the code into *Branding & settings → SEO defaults*) and submit `https://<domain>/sitemap.xml`.

---

## 3. Fallback: Option B, self-managed server (Docker)

Use this when the client wants a fixed monthly bill, a dedicated server, or a specific data location
offered by a VPS provider. Everything is in `deploy/`.

| Service | Example | Approx. monthly cost |
|---|---|---|
| VPS, 2 vCPU / 4 GB RAM / 40 GB SSD | Hetzner CX23, DigitalOcean, AWS Lightsail, or a local provider | ~€5–25 |
| Off-site backups | Cloudflare R2 / Backblaze B2 | ~$0–2 |
| Email, DNS, Turnstile, monitoring | Same as Option A | $0–20 |
| **Total** | | **≈ $10–45 / month** |

The stack (`deploy/docker-compose.yml`) runs:
- **app**: the Next.js + Payload image; it applies migrations automatically on start
- **db**: PostgreSQL 17, data in a Docker volume
- **caddy**: reverse proxy with automatic Let's Encrypt HTTPS and `www` → apex redirect
- **backup**: nightly `pg_dump` plus a media archive into `./backups`, kept for 14 days

### Server setup (Ubuntu 24.04)
```bash
# 1. Harden the server: SSH keys only, firewall open only on 22/80/443, automatic security updates
sudo apt update && sudo apt install -y ufw unattended-upgrades
sudo ufw allow OpenSSH && sudo ufw allow 80,443/tcp && sudo ufw enable
# 2. Install Docker
curl -fsSL https://get.docker.com | sh
# 3. Deploy
git clone <repo> site && cd site
cp .env.example .env        # set DOMAIN, POSTGRES_PASSWORD, PAYLOAD_SECRET, SMTP_*, TURNSTILE_*
docker compose -f deploy/docker-compose.yml up -d --build
```
Point the domain's A/AAAA records at the server; Caddy obtains the certificate on first request.

**Updates:** `git pull && docker compose -f deploy/docker-compose.yml up -d --build` (migrations run on start).
**Off-site backups:** add an `rclone sync ./backups r2:site-backups` cron job on the host. A backup that
only lives on the same server is not a backup.
**Restore:** `sh deploy/restore.sh backups/db-<stamp>.dump`.

Responsibility for OS patching, monitoring and backups sits with whoever runs this server
(covered by the *Essential care* maintenance plan, proposal §11).

---

## 4. Option C: in-country data residency

If the client or its sector must keep data in a specific country (e.g. Saudi Arabia under PDPL or a
sector regulator), confirm this **before design approval** (proposal §7, §13). The application is
portable: it needs only Node.js, PostgreSQL and an S3-compatible bucket. So:

- run **Option B** on an in-country cloud or VPS, or
- use a hyperscaler region in that country (check current availability for AWS, Google Cloud, Oracle
  and Azure, and local providers such as STC Cloud) with its managed PostgreSQL and object storage.

A qualified legal adviser should confirm what has to stay in-country. That is usually personal data,
which here means the **leads** and **lead attachments**.

---

## 5. Environments and release flow

| Environment | Where | Data | Indexed by Google |
|---|---|---|---|
| Local | Developer machine | Local Postgres + `pnpm seed` | n/a |
| Staging | Vercel Preview / staging server (`SITE_ENV=staging`) | Separate DB branch | **No**: robots.txt blocks everything |
| Production | Vercel Production / production server | Production DB | Yes |

1. Work on a branch, open a pull request, and CI runs typecheck, migrations, schema-drift check, seed, build and smoke tests.
2. Vercel posts a preview URL on the pull request for review.
3. Merge to `main`, which deploys to production; migrations run before the new version goes live.
4. Rollback: *Instant Rollback* in Vercel (or redeploy the previous commit on a VPS). Restore the database only if a migration damaged data.

**Schema changes:** after changing collections or fields, run `pnpm migrate:create <name>` and commit the
file in `src/migrations`. CI fails if the schema and migrations disagree.

---

## 6. Backups and restore test

| What | Option A | Option B |
|---|---|---|
| Database | Neon point-in-time restore (history window depends on plan), plus a weekly `pg_dump` to R2 for an independent copy | Nightly `pg_dump`, synced off-site |
| Media | R2 bucket (enable object versioning or a lifecycle copy) | Nightly archive, synced off-site |
| Code | GitHub (client organisation) | GitHub |

**Before launch (acceptance criterion):** restore the latest backup into a fresh database, point a
staging deployment at it, log in and open a page and a lead. Record the date and result in the handover note.

---

## 7. Security checklist for launch

- [ ] `PAYLOAD_SECRET` is a fresh random 32+ byte value, different per environment
- [ ] Secrets live only in Vercel / server `.env`, never in the repository
- [ ] Seeded demo accounts removed and real admin passwords set (8-hour sessions; account locks for 15 minutes after 5 failed logins)
- [ ] Turnstile keys set and lead recipients configured in *Branding & settings → Leads & roles*
- [ ] SPF, DKIM and DMARC records for the sending domain
- [ ] HTTPS enforced; HSTS header active (already sent by the app)
- [ ] Database not publicly reachable (Option B: only on the Docker network; Option A: Neon IP allow-list if available)
- [ ] Uptime monitor on `/` and `/admin/login`, alerting the client's and team's email
- [ ] Backup restore test completed and recorded
- [ ] `node scripts/smoke.mjs https://<domain>` passes

---

## 8. Ongoing costs at a glance

| | Option A (managed) | Option B (VPS) |
|---|---|---|
| Monthly hosting | ≈ $25–70 | ≈ $10–45 |
| Server administration | None | Patching, monitoring, backups (maintenance plan) |
| Scaling | Automatic | Resize the VPS |
| Preview deployments | Built in | Manual / staging server |
| Data location | Provider region | Wherever the server is |
| Recommended when | Default choice | Fixed budget, dedicated server, or a residency requirement |
