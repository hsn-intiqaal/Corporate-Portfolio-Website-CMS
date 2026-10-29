import type { Payload, TypedUser } from 'payload'
import Link from 'next/link'
import React from 'react'
import { auditSeo } from '@/seo/audit'

type Props = { payload: Payload; user?: TypedUser | null; i18n?: { language?: string } }

const icons: Record<string, React.ReactNode> = {
  inbox: (
    <path d="M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />,
  pen: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z" />,
  tools: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  ),
  building: <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M2 22h20M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="7.5" r="1" />
      <circle cx="6.5" cy="12.5" r="1" />
      <path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.4H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" />
    </>
  ),
  text: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
}

const Icon = ({ name }: { name: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {icons[name]}
  </svg>
)

/** Home panel of the dashboard: enquiries, content status, SEO health and shortcuts. Responsive (see custom.scss). */
export async function DashboardPanel({ payload, user, i18n }: Props) {
  // Follows the dashboard language chosen by the user (header language button).
  const ar = i18n?.language === 'ar'
  const tr = (en: string, arabic: string) => (ar ? arabic : en)
  const collectionName = (slug: string) =>
    ({ pages: tr('Page', 'صفحة'), services: tr('Service', 'خدمة'), projects: tr('Project', 'مشروع'), articles: tr('Article', 'مقال') })[
      slug
    ] ?? slug
  const isAdmin = Boolean((user as { roles?: string[] } | null)?.roles?.includes('admin'))
  const draft = { _status: { equals: 'draft' as const } }
  const count = (collection: 'pages' | 'services' | 'projects' | 'articles', where?: object) =>
    payload.count({ collection, where: where as never }).then((r) => r.totalDocs)

  const [newLeads, openLeads, drafts, totals, latestLeads, subscribers, months, seo] = await Promise.all([
    isAdmin ? payload.count({ collection: 'leads', where: { status: { equals: 'new' } } }).then((r) => r.totalDocs) : null,
    isAdmin ? payload.count({ collection: 'leads', where: { status: { equals: 'in-progress' } } }).then((r) => r.totalDocs) : null,
    Promise.all((['pages', 'services', 'projects', 'articles'] as const).map((c) => count(c, draft))),
    Promise.all((['pages', 'services', 'projects', 'articles'] as const).map((c) => count(c))),
    isAdmin ? payload.find({ collection: 'leads', limit: 6, sort: '-createdAt', depth: 0 }) : null,
    isAdmin ? payload.count({ collection: 'subscribers', where: { status: { equals: 'confirmed' } } }).then((r) => r.totalDocs) : null,
    isAdmin ? leadsByMonth(payload, ar ? 'ar' : 'en-GB') : null,
    seoOverview(payload),
  ])
  const draftTotal = drafts.reduce((a, b) => a + b, 0)

  const kpis = [
    ...(isAdmin
      ? [
          {
            label: tr('New enquiries', 'طلبات جديدة'),
            value: newLeads ?? 0,
            href: '/admin/collections/leads?where[status][equals]=new',
            icon: 'inbox',
            tone: (newLeads ?? 0) > 0 ? 'alert' : '',
          },
          {
            label: tr('In progress', 'قيد المتابعة'),
            value: openLeads ?? 0,
            href: '/admin/collections/leads?where[status][equals]=in-progress',
            icon: 'clock',
            tone: '',
          },
        ]
      : []),
    {
      label: tr('Drafts waiting', 'مسودات بانتظار النشر'),
      value: draftTotal,
      href: '/admin/collections/pages?where[_status][equals]=draft',
      icon: 'pen',
      tone: draftTotal > 0 ? 'warn' : '',
    },
    { label: tr('Articles', 'المقالات'), value: totals[3], href: '/admin/collections/articles', icon: 'file', tone: '' },
    { label: tr('Services', 'الخدمات'), value: totals[1], href: '/admin/collections/services', icon: 'tools', tone: '' },
    { label: tr('Projects', 'المشاريع'), value: totals[2], href: '/admin/collections/projects', icon: 'building', tone: '' },
    ...(subscribers !== null
      ? [{ label: tr('Subscribers', 'المشتركون'), value: subscribers, href: '/admin/collections/subscribers', icon: 'mail', tone: '' }]
      : []),
  ]

  const actions = [
    { label: tr('New article', 'مقال جديد'), href: '/admin/collections/articles/create', icon: 'pen' },
    { label: tr('New page', 'صفحة جديدة'), href: '/admin/collections/pages/create', icon: 'file' },
    { label: tr('New project', 'مشروع جديد'), href: '/admin/collections/projects/create', icon: 'building' },
    { label: tr('New service', 'خدمة جديدة'), href: '/admin/collections/services/create', icon: 'tools' },
    { label: tr('Upload images', 'رفع صور'), href: '/admin/collections/media/create', icon: 'image' },
    { label: tr('Menus', 'القوائم'), href: '/admin/globals/header', icon: 'menu' },
    { label: tr('Site texts', 'نصوص الموقع'), href: '/admin/globals/site-texts-general', icon: 'text' },
    ...(isAdmin ? [{ label: tr('Design', 'التصميم'), href: '/admin/globals/settings', icon: 'palette' }] : []),
  ]

  const status = (s: string) =>
    ({ new: tr('New', 'جديد'), 'in-progress': tr('In progress', 'قيد المتابعة'), closed: tr('Closed', 'مغلق') })[s] ?? s
  const leadType = (t: string) =>
    t === 'quote' ? tr('Quotation', 'عرض سعر') : t === 'brochure' ? tr('Brochure', 'بروشور') : tr('Contact', 'تواصل')
  const scoreTone = seo.score >= 80 ? 'good' : seo.score >= 50 ? 'warn' : 'bad'
  const name = user && 'name' in user && user.name ? String(user.name) : ''
  const today = new Date().toLocaleDateString(ar ? 'ar-u-nu-latn' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="cms-dash">
      <header className="cms-dash__head">
        <div>
          <p className="cms-dash__date">{today}</p>
          <h2 className="cms-dash__title">
            {tr('Welcome', 'أهلاً')}
            {name ? `${tr(',', '،')} ${name}` : ''}
          </h2>
        </div>
        <a className="cms-dash__site" href="/" target="_blank" rel="noreferrer">
          <Icon name="globe" /> {tr('View website', 'عرض الموقع')}
        </a>
      </header>

      <section className="cms-kpis" aria-label={tr('Overview', 'نظرة عامة')}>
        {kpis.map((k) => (
          <Link key={k.label} href={k.href} className={`cms-kpi ${k.tone ? `cms-kpi--${k.tone}` : ''}`}>
            <span className="cms-kpi__icon">
              <Icon name={k.icon} />
            </span>
            <span className="cms-kpi__value">{k.value}</span>
            <span className="cms-kpi__label">{k.label}</span>
          </Link>
        ))}
      </section>

      <section className="cms-actions" aria-label={tr('Quick actions', 'إجراءات سريعة')}>
        {actions.map((a) => (
          <Link key={a.label} href={a.href} className="cms-action">
            <Icon name={a.icon} />
            <span>{a.label}</span>
          </Link>
        ))}
      </section>

      <div className="cms-grid">
        <section className="cms-card">
          <div className="cms-card__head">
            <h3>{tr('Search engine health', 'جاهزية محركات البحث')}</h3>
            <span className={`cms-score cms-score--${scoreTone}`}>{seo.score}%</span>
          </div>
          <div className="cms-progress" role="progressbar" aria-valuenow={seo.score} aria-valuemin={0} aria-valuemax={100}>
            <span className={`cms-progress__bar cms-progress__bar--${scoreTone}`} style={{ width: `${seo.score}%` }} />
          </div>
          <p className="cms-muted">
            {tr(
              `${seo.total} published items checked in both languages: titles, descriptions, sharing images and noindex.`,
              `تم فحص ${seo.total} عنصراً منشوراً باللغتين: العناوين والأوصاف وصور المشاركة وإعدادات الفهرسة.`,
            )}
          </p>
          {seo.items.length > 0 ? (
            <ul className="cms-issues">
              {seo.items.slice(0, 8).map((i) => (
                <li key={`${i.collection}-${i.id}-${i.locale}`}>
                  <Link href={`/admin/collections/${i.collection}/${i.id}?locale=${i.locale}`}>{i.title}</Link>
                  <span className="cms-muted">
                    {collectionName(i.collection)} · {i.locale.toUpperCase()} · {ar ? i.topIssue.ar : i.topIssue.en}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cms-ok">✓ {tr('No SEO issues found.', 'لا توجد مشاكل SEO.')}</p>
          )}
          <div className="cms-links">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer">
              sitemap.xml
            </a>
            <a href="/robots.txt" target="_blank" rel="noreferrer">
              robots.txt
            </a>
            <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">
              Google Search Console
            </a>
            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">
              {tr('Rich results test', 'اختبار النتائج المنسقة')}
            </a>
          </div>
        </section>

        {months && (
          <section className="cms-card">
            <div className="cms-card__head">
              <h3>{tr('Enquiries – last 6 months', 'الطلبات – آخر 6 أشهر')}</h3>
              <span className="cms-muted">{months.reduce((n, m) => n + m.total, 0)}</span>
            </div>
            <div className="cms-chart" role="img" aria-label={months.map((m) => `${m.label}: ${m.total}`).join(', ')}>
              {months.map((m) => {
                const max = Math.max(1, ...months.map((x) => x.total))
                return (
                  <div
                    key={m.label}
                    className="cms-chart__col"
                    title={`${tr('Quotations', 'عروض أسعار')} ${m.quote} · ${tr('Contact', 'تواصل')} ${m.contact} · ${tr('Brochure', 'بروشور')} ${m.brochure}`}
                  >
                    <span className="cms-chart__value">{m.total}</span>
                    <span className="cms-chart__bar" style={{ height: `${Math.round((m.total / max) * 100)}%` }} />
                    <span className="cms-chart__label">{m.label}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {latestLeads && latestLeads.docs.length > 0 && (
        <section className="cms-card">
          <div className="cms-card__head">
            <h3>{tr('Latest enquiries', 'أحدث الطلبات')}</h3>
            <Link href="/admin/collections/leads">{tr('All enquiries', 'كل الطلبات')}</Link>
          </div>
          <ul className="cms-leads">
            {latestLeads.docs.map((lead) => (
              <li key={lead.id}>
                <Link href={`/admin/collections/leads/${lead.id}`} className="cms-leads__name">
                  {lead.name}
                </Link>
                <span className="cms-chip">{leadType(lead.type)}</span>
                <span className={`cms-chip cms-chip--${lead.status}`}>{status(lead.status)}</span>
                <span className="cms-muted">{lead.locale?.toUpperCase()}</span>
                <time className="cms-muted" dateTime={lead.createdAt}>
                  {new Date(lead.createdAt).toLocaleString(ar ? 'ar-u-nu-latn' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

async function leadsByMonth(payload: Payload, dateLocale: string) {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + i, 1)))
  return Promise.all(
    months.map(async (start) => {
      const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1))
      const range = { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }
      const count = (type?: string) =>
        payload
          .count({ collection: 'leads', where: type ? { and: [...range.and, { type: { equals: type } }] } : range })
          .then((r) => r.totalDocs)
      const [total, quote, contact, brochure] = await Promise.all([count(), count('quote'), count('contact'), count('brochure')])
      return { label: start.toLocaleDateString(dateLocale, { month: 'short', timeZone: 'UTC' }), total, quote, contact, brochure }
    }),
  )
}

/** Runs the SEO audit on every published item in both languages; returns the average score and the weakest items. */
async function seoOverview(payload: Payload) {
  const items: { collection: string; id: number; title: string; locale: string; score: number; topIssue: { en: string; ar: string } }[] = []
  let sum = 0
  let total = 0
  for (const collection of ['pages', 'services', 'projects', 'articles'] as const) {
    for (const locale of ['ar', 'en'] as const) {
      const res = await payload.find({
        collection,
        where: { and: [{ _status: { equals: 'published' } }, { archived: { not_equals: true } }] },
        locale,
        fallbackLocale: false,
        limit: 500,
        depth: 0,
        select: { title: true, slug: true, meta: { title: true, description: true, image: true, noIndex: true } } as never,
      })
      for (const d of res.docs as unknown as {
        id: number
        title?: string
        slug?: string
        meta?: { title?: string; description?: string; image?: unknown; noIndex?: boolean }
      }[]) {
        const { checks, score } = auditSeo({
          title: d.title,
          metaTitle: d.meta?.title,
          metaDescription: d.meta?.description,
          slug: d.slug,
          hasImage: Boolean(d.meta?.image),
          noIndex: d.meta?.noIndex,
        })
        sum += score
        total += 1
        const worst = checks.find((c) => c.status === 'bad') ?? checks.find((c) => c.status === 'warn' && c.id !== 'keyword-missing')
        if (worst)
          items.push({ collection, id: d.id, title: d.title || `#${d.id}`, locale, score, topIssue: { en: worst.en, ar: worst.ar } })
      }
    }
  }
  items.sort((a, b) => a.score - b.score)
  return { score: total ? Math.round(sum / total) : 100, total, items }
}
