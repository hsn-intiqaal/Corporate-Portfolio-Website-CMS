# Corporate Portfolio Website & CMS

A bilingual (Arabic RTL / English LTR) corporate website with a secure content dashboard, built to the
*Corporate Portfolio Website & CMS* project proposal.

**Stack:** Next.js 16 · React 19 · TypeScript · Payload CMS 3 · PostgreSQL · Tailwind CSS 4

| Document | For |
|---|---|
| [docs/HOSTING.md](docs/HOSTING.md) | Hosting plan, costs, launch steps, backups, security checklist |
| [docs/EDITOR_GUIDE.md](docs/EDITOR_GUIDE.md) | Client editors and administrators |
| This README | Developers (technical handover) |

## Features

**Public website** (`/ar/...` and `/en/...`)
- Home, About, Services overview and detail pages, Projects overview (category filter) and detail pages, Contact,
  Request a quotation, legal pages, custom pages, branded 404
- Full RTL layout for Arabic with mirrored navigation and direction-aware icons, IBM Plex Sans Arabic + Inter,
  Western or Eastern Arabic numerals (setting), and a language switcher that keeps the visitor on the same page
- Pages are pre-rendered and cached, then refreshed on publish. Responsive WebP/AVIF images, lazy loading
- SEO: per-language title, description and social image; canonical; hreflang (`ar`, `en`, `x-default`); XML sitemap
  with alternates; robots.txt (blocks staging); Open Graph / X cards; structured data (Organization or LocalBusiness,
  Service, CreativeWork, BreadcrumbList, FAQPage); editable redirects
- Contact and quotation forms: server-side validation, honeypot, minimum fill time, DB-backed rate limit
  (5 per 10 min per hashed IP), Cloudflare Turnstile, private attachments (JPG/PNG/PDF, signature-checked,
  renamed), email notification that includes the visitor's language, and an unusual-volume alert
- **Blog / articles**: categories, authors, tags, reading time, table of contents with heading anchors, share buttons,
  author box, related articles and services, crawlable pagination (`/blog/page/2`), category pages, RSS per language
  (`/ar/feed.xml`, `/en/feed.xml`), BlogPosting + BreadcrumbList structured data, Open Graph article tags
- **Site search** (`/search`) over services, projects, articles and pages in the visitor's language (noindex),
  plus WebSite/SearchAction structured data
- **Newsletter** with double opt-in (confirmation email, unsubscribe link), footer signup and a section block, CSV export
- **Brochure / company-profile download** gated by a short form (creates a lead) with signed, expiring links;
  files are never publicly listable
- **CRM / automation webhook**: new leads and confirmed subscribers are POSTed as signed JSON (HubSpot, Zoho, Zapier, Make, n8n)
- **Third-party scripts** (live chat, tag manager, pixels) managed from the dashboard; consent-gated ones wait for cookie consent
- WhatsApp button, optional Google Analytics that loads only after cookie consent, web app manifest, image sitemap entries

**Dashboard** (`/admin`)
- Home panel: enquiries chart (last 6 months), **SEO health** list (published items missing an SEO title or description, per language), drafts, latest leads, shortcuts
- Articles, article categories and authors; downloadable documents; newsletter subscribers; rich text with tables
- Pages built from 18 section types (hero, text & image, service cards, project gallery, project highlight, statistics,
  testimonials, partners, FAQ, call to action, contact, rich text, latest articles, team, process steps, video,
  newsletter, brochure download): add, reorder, duplicate, hide, remove, with per-section background and spacing
- Services (drag to order), Projects (gallery, categories, facts), Media library (required alt text, focal point, auto sizes)
- Header and footer menus, which only link to published pages
- Branding and settings: logo, approved colour palettes, contacts, social, map, SEO defaults, translation rule, lead recipients
- Leads inbox: status, owner, internal notes, CSV export (formula-injection safe, UTF-8 BOM for Arabic in Excel)
- Drafts, autosave, preview on the real site, version history with restore, scheduled publishing
- Roles: Administrator / Editor. Editors cannot see leads, users or settings, cannot delete, and publish only if allowed
- Audit log of logins, publishing, deletions, user and settings changes
- Slug changes on published content create 301 redirects automatically
- Security: 8-hour sessions, 15-minute lockout after 5 failed logins, security headers

## Local development

Requirements: Node.js 22.12+, pnpm 10, PostgreSQL 15+.

```bash
pnpm install
cp .env.example .env            # set DATABASE_URL and PAYLOAD_SECRET
pnpm seed                       # demo content + admin@example.com / ChangeMe!2026 and editor@example.com
pnpm dev                        # http://localhost:3000 (site) and http://localhost:3000/admin
```
`pnpm seed --force` wipes content and reseeds (refused when `NODE_ENV=production`).
Demo content, names, figures and images are generated placeholders. Replace them with the client's approved content.

In development the database schema is pushed automatically. Production uses migrations:

```bash
pnpm migrate:create <name>      # after changing collections/fields; commit src/migrations/*
pnpm migrate                    # apply (runs automatically on Vercel builds and Docker start)
pnpm generate:types             # refresh src/payload-types.ts
pnpm generate:importmap         # after adding admin components
```

## Scripts

| Script | Does |
|---|---|
| `pnpm dev` / `build` / `start` | Next.js |
| `pnpm typecheck` | TypeScript |
| `pnpm seed` | Demo content |
| `pnpm test:smoke [url]` | Post-deploy checks (pages, SEO files, private data not exposed, headers) |
| `pnpm vercel-build` | `payload migrate && next build` |

## Project structure

```
src/
  app/(frontend)/[locale]/   public routes (home, [slug], services, projects, 404)
  app/(frontend)/next/       draft preview on / off
  app/(payload)/             Payload admin + REST API (generated structure)
  app/sitemap.ts, robots.ts  SEO files
  proxy.ts                   adds the language prefix (cookie, then Accept-Language, then Arabic)
  blocks/                    section definitions (CMS side)
  components/sections/       section designs (website side)
  components/site/           header, footer, media, links, rich text, notices
  components/forms/          contact / quotation form
  collections/, globals/     content model and access rules
  hooks/                     revalidation, audit log, publish guard, slug redirects, lead email
  lib/                       data loading, SEO, lead handling, formatting
  migrations/                database migrations
  seed/                      demo content
deploy/                      Docker Compose stack (app, Postgres, Caddy HTTPS, backups)
```

## Environment variables
See [.env.example](.env.example). Required: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`.
S3 storage is required on serverless hosting. SMTP and Turnstile are strongly recommended for production.

## Adding a section type (change request)
1. Add the block config in `src/blocks/index.ts` and include it in `sectionBlocks`.
2. Add the component in `src/components/sections/` and a `case` in `RenderSections.tsx`.
3. `pnpm generate:types && pnpm migrate:create add-<block>`.

## License
MIT for the custom code. Open-source dependencies keep their own licences.
