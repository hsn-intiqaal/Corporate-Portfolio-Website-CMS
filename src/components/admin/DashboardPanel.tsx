import type { Payload, TypedUser } from 'payload'
import React from 'react'

type Props = { payload: Payload; user?: TypedUser | null; i18n?: { language?: string } }

const card: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 8,
  padding: '16px 18px',
  background: 'var(--theme-elevation-0)',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
}

/** Home panel of the dashboard: new enquiries, drafts and shortcuts to common tasks. */
export async function DashboardPanel({ payload, user, i18n }: Props) {
  // Follows the dashboard language chosen by the user.
  const ar = i18n?.language === 'ar'
  const tr = (en: string, arabic: string) => (ar ? arabic : en)
  const collectionName = (slug: string) =>
    ({ pages: tr('Page', 'صفحة'), services: tr('Service', 'خدمة'), projects: tr('Project', 'مشروع'), articles: tr('Article', 'مقال') })[
      slug
    ] ?? slug
  const isAdmin = Boolean((user as { roles?: string[] } | null)?.roles?.includes('admin'))
  const draft = { _status: { equals: 'draft' as const } }
  const [newLeads, openLeads, draftPages, draftServices, draftProjects, services, projects, latestLeads] = await Promise.all([
    isAdmin ? payload.count({ collection: 'leads', where: { status: { equals: 'new' } } }) : null,
    isAdmin ? payload.count({ collection: 'leads', where: { status: { equals: 'in-progress' } } }) : null,
    payload.count({ collection: 'pages', where: draft }),
    payload.count({ collection: 'services', where: draft }),
    payload.count({ collection: 'projects', where: draft }),
    payload.count({ collection: 'services' }),
    payload.count({ collection: 'projects' }),
    isAdmin ? payload.find({ collection: 'leads', limit: 5, sort: '-createdAt', depth: 0 }) : null,
  ])

  const [draftArticles, articles, subscribers, months, seoIssues] = await Promise.all([
    payload.count({ collection: 'articles', where: draft }),
    payload.count({ collection: 'articles' }),
    isAdmin ? payload.count({ collection: 'subscribers', where: { status: { equals: 'confirmed' } } }) : null,
    isAdmin ? leadsByMonth(payload, ar ? 'ar' : 'en-GB') : null,
    seoHealth(payload),
  ])

  const stats = [
    ...(isAdmin
      ? [
          {
            label: tr('New enquiries', 'طلبات جديدة'),
            value: newLeads?.totalDocs ?? 0,
            href: '/admin/collections/leads?where[status][equals]=new',
            highlight: (newLeads?.totalDocs ?? 0) > 0,
          },
          {
            label: tr('Enquiries in progress', 'طلبات قيد المتابعة'),
            value: openLeads?.totalDocs ?? 0,
            href: '/admin/collections/leads?where[status][equals]=in-progress',
          },
        ]
      : []),
    { label: tr('Draft pages', 'صفحات مسودة'), value: draftPages.totalDocs, href: '/admin/collections/pages?where[_status][equals]=draft' },
    {
      label: tr('Draft services', 'خدمات مسودة'),
      value: draftServices.totalDocs,
      href: '/admin/collections/services?where[_status][equals]=draft',
    },
    {
      label: tr('Draft projects', 'مشاريع مسودة'),
      value: draftProjects.totalDocs,
      href: '/admin/collections/projects?where[_status][equals]=draft',
    },
    {
      label: tr('Draft articles', 'مقالات مسودة'),
      value: draftArticles.totalDocs,
      href: '/admin/collections/articles?where[_status][equals]=draft',
    },
    { label: tr('Articles', 'المقالات'), value: articles.totalDocs, href: '/admin/collections/articles' },
    ...(subscribers
      ? [{ label: tr('Newsletter subscribers', 'مشتركو النشرة'), value: subscribers.totalDocs, href: '/admin/collections/subscribers' }]
      : []),
    { label: tr('Services', 'الخدمات'), value: services.totalDocs, href: '/admin/collections/services' },
    { label: tr('Projects', 'المشاريع'), value: projects.totalDocs, href: '/admin/collections/projects' },
  ]

  const shortcuts = [
    { label: tr('+ New article', '+ مقال جديد'), href: '/admin/collections/articles/create' },
    { label: tr('+ New page', '+ صفحة جديدة'), href: '/admin/collections/pages/create' },
    { label: tr('+ New project', '+ مشروع جديد'), href: '/admin/collections/projects/create' },
    { label: tr('+ New service', '+ خدمة جديدة'), href: '/admin/collections/services/create' },
    { label: tr('Upload images', 'رفع صور'), href: '/admin/collections/media/create' },
    { label: tr('Edit header menu', 'تعديل القائمة'), href: '/admin/globals/header' },
    ...(isAdmin ? [{ label: tr('Branding & settings', 'الهوية والإعدادات'), href: '/admin/globals/settings' }] : []),
    { label: tr('View website ↗', 'عرض الموقع ↗'), href: '/', external: true },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ margin: '0 0 4px' }}>
        {tr('Welcome', 'أهلاً')}
        {user && 'name' in user && user.name ? `${tr(',', '،')} ${String(user.name)}` : ''}
      </h2>
      <p style={{ margin: '0 0 20px', color: 'var(--theme-elevation-600)' }}>
        {tr(
          'Website traffic statistics are available in your analytics service; this panel shows content and enquiries.',
          'إحصائيات الزيارات متاحة في خدمة التحليلات؛ هذه اللوحة تعرض المحتوى والطلبات.',
        )}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            style={{ ...card, borderColor: 'highlight' in s && s.highlight ? 'var(--theme-success-500)' : card.borderColor }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: 'var(--theme-elevation-600)' }}>{s.label}</div>
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {shortcuts.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={'external' in s ? '_blank' : undefined}
            rel="noreferrer"
            className="btn btn--style-secondary btn--size-small"
            style={{ margin: 0 }}
          >
            {s.label}
          </a>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12, marginBottom: 12 }}>
        {months && (
          <div style={card}>
            <h4 style={{ marginTop: 0 }}>{tr('Enquiries – last 6 months', 'الطلبات – آخر 6 أشهر')}</h4>
            <div
              style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}
              role="img"
              aria-label={months.map((m) => `${m.label}: ${m.total}`).join(', ')}
            >
              {months.map((m) => {
                const max = Math.max(1, ...months.map((x) => x.total))
                return (
                  <div key={m.label} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>{m.total}</div>
                    <div
                      title={`${tr('Quotations', 'عروض أسعار')} ${m.quote} · ${tr('contact', 'تواصل')} ${m.contact} · ${tr('brochure', 'بروشور')} ${m.brochure}`}
                      style={{ height: Math.round((m.total / max) * 100) + 2, background: 'var(--theme-success-500)', borderRadius: 4 }}
                    />
                    <div style={{ fontSize: 11, marginTop: 6, color: 'var(--theme-elevation-600)' }}>{m.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div style={card}>
          <h4 style={{ marginTop: 0 }}>{tr('SEO health', 'فحص SEO')}</h4>
          {seoIssues.length === 0 ? (
            <p style={{ margin: 0 }}>
              ✓{' '}
              {tr(
                'Every published page, service, project and article has an SEO title and description in both languages.',
                'كل الصفحات والخدمات والمشاريع والمقالات المنشورة لها عنوان ووصف SEO باللغتين.',
              )}
            </p>
          ) : (
            <>
              <p style={{ marginTop: 0, color: 'var(--theme-elevation-600)' }}>
                {tr(
                  'Published items missing an SEO title or description (open the SEO tab and use Auto-generate):',
                  'عناصر منشورة ينقصها عنوان أو وصف SEO (افتح تبويب SEO واستخدم التوليد التلقائي):',
                )}
              </p>
              <ul style={{ margin: 0, paddingInlineStart: 18, maxHeight: 150, overflow: 'auto' }}>
                {seoIssues.slice(0, 30).map((i) => (
                  <li key={`${i.collection}-${i.id}-${i.locale}`}>
                    <a href={`/admin/collections/${i.collection}/${i.id}?locale=${i.locale}`}>{i.title}</a>{' '}
                    <span style={{ color: 'var(--theme-elevation-500)' }}>
                      ({collectionName(i.collection)}, {i.locale.toUpperCase()}:{' '}
                      {i.missing.replace('title', tr('title', 'العنوان')).replace('description', tr('description', 'الوصف'))})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      {latestLeads && latestLeads.docs.length > 0 && (
        <div style={card}>
          <h4 style={{ marginTop: 0 }}>{tr('Latest enquiries', 'أحدث الطلبات')}</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {latestLeads.docs.map((lead) => (
                <tr key={lead.id} style={{ borderTop: '1px solid var(--theme-elevation-100)' }}>
                  <td style={{ padding: '6px 0' }}>
                    <a href={`/admin/collections/leads/${lead.id}`}>{lead.name}</a>
                  </td>
                  <td>
                    {lead.type === 'quote'
                      ? tr('Quotation', 'عرض سعر')
                      : lead.type === 'brochure'
                        ? tr('Brochure', 'بروشور')
                        : tr('Contact', 'تواصل')}
                  </td>
                  <td>{lead.locale?.toUpperCase()}</td>
                  <td>
                    {{ new: tr('New', 'جديد'), 'in-progress': tr('In progress', 'قيد المتابعة'), closed: tr('Closed', 'مغلق') }[
                      lead.status
                    ] ?? lead.status}
                  </td>
                  <td style={{ textAlign: 'end' }}>{new Date(lead.createdAt).toLocaleString(ar ? 'ar-u-nu-latn' : 'en-GB')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

async function seoHealth(payload: Payload) {
  const issues: { collection: string; id: number | string; title: string; locale: string; missing: string }[] = []
  for (const collection of ['pages', 'services', 'projects', 'articles'] as const) {
    for (const locale of ['ar', 'en'] as const) {
      const res = await payload.find({
        collection,
        where: { and: [{ _status: { equals: 'published' } }, { archived: { not_equals: true } }] },
        locale,
        fallbackLocale: false,
        limit: 200,
        depth: 0,
        select: { title: true, meta: { title: true, description: true } } as never,
      })
      for (const d of res.docs as unknown as { id: number; title?: string; meta?: { title?: string; description?: string } }[]) {
        const missing = [!d.meta?.title && 'title', !d.meta?.description && 'description'].filter(Boolean).join(' + ')
        if (missing) issues.push({ collection, id: d.id, title: d.title || `#${d.id}`, locale, missing })
      }
    }
  }
  return issues
}
