import type { Payload, TypedUser } from 'payload'
import React from 'react'

type Props = { payload: Payload; user?: TypedUser | null }

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
export async function DashboardPanel({ payload, user }: Props) {
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
    isAdmin ? leadsByMonth(payload) : null,
    seoHealth(payload),
  ])

  const stats = [
    ...(isAdmin
      ? [
          { label: 'New enquiries', value: newLeads?.totalDocs ?? 0, href: '/admin/collections/leads?where[status][equals]=new', highlight: (newLeads?.totalDocs ?? 0) > 0 },
          { label: 'Enquiries in progress', value: openLeads?.totalDocs ?? 0, href: '/admin/collections/leads?where[status][equals]=in-progress' },
        ]
      : []),
    { label: 'Draft pages', value: draftPages.totalDocs, href: '/admin/collections/pages?where[_status][equals]=draft' },
    { label: 'Draft services', value: draftServices.totalDocs, href: '/admin/collections/services?where[_status][equals]=draft' },
    { label: 'Draft projects', value: draftProjects.totalDocs, href: '/admin/collections/projects?where[_status][equals]=draft' },
    { label: 'Draft articles', value: draftArticles.totalDocs, href: '/admin/collections/articles?where[_status][equals]=draft' },
    { label: 'Articles', value: articles.totalDocs, href: '/admin/collections/articles' },
    ...(subscribers ? [{ label: 'Newsletter subscribers', value: subscribers.totalDocs, href: '/admin/collections/subscribers' }] : []),
    { label: 'Services', value: services.totalDocs, href: '/admin/collections/services' },
    { label: 'Projects', value: projects.totalDocs, href: '/admin/collections/projects' },
  ]

  const shortcuts = [
    { label: '+ New article', href: '/admin/collections/articles/create' },
    { label: '+ New page', href: '/admin/collections/pages/create' },
    { label: '+ New project', href: '/admin/collections/projects/create' },
    { label: '+ New service', href: '/admin/collections/services/create' },
    { label: 'Upload images', href: '/admin/collections/media/create' },
    { label: 'Edit header menu', href: '/admin/globals/header' },
    ...(isAdmin ? [{ label: 'Branding & settings', href: '/admin/globals/settings' }] : []),
    { label: 'View website ↗', href: '/', external: true },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ margin: '0 0 4px' }}>Welcome{user && 'name' in user && user.name ? `, ${String(user.name)}` : ''}</h2>
      <p style={{ margin: '0 0 20px', color: 'var(--theme-elevation-600)' }}>
        Website traffic statistics are available in your analytics service; this panel shows content and enquiries.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.map((s) => (
          <a key={s.label} href={s.href} style={{ ...card, borderColor: 'highlight' in s && s.highlight ? 'var(--theme-success-500)' : card.borderColor }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: 'var(--theme-elevation-600)' }}>{s.label}</div>
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {shortcuts.map((s) => (
          <a key={s.label} href={s.href} target={'external' in s ? '_blank' : undefined} rel="noreferrer" className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }}>
            {s.label}
          </a>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12, marginBottom: 12 }}>
        {months && (
          <div style={card}>
            <h4 style={{ marginTop: 0 }}>Enquiries – last 6 months</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }} role="img" aria-label={months.map((m) => `${m.label}: ${m.total}`).join(', ')}>
              {months.map((m) => {
                const max = Math.max(1, ...months.map((x) => x.total))
                return (
                  <div key={m.label} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>{m.total}</div>
                    <div title={`Quotations ${m.quote}, contact ${m.contact}, brochure ${m.brochure}`} style={{ height: Math.round((m.total / max) * 100) + 2, background: 'var(--theme-success-500)', borderRadius: 4 }} />
                    <div style={{ fontSize: 11, marginTop: 6, color: 'var(--theme-elevation-600)' }}>{m.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div style={card}>
          <h4 style={{ marginTop: 0 }}>SEO health</h4>
          {seoIssues.length === 0 ? (
            <p style={{ margin: 0 }}>✓ Every published page, service, project and article has an SEO title and description in both languages.</p>
          ) : (
            <>
              <p style={{ marginTop: 0, color: 'var(--theme-elevation-600)' }}>Published items missing an SEO title or description (open the SEO tab and use Auto-generate):</p>
              <ul style={{ margin: 0, paddingInlineStart: 18, maxHeight: 150, overflow: 'auto' }}>
                {seoIssues.slice(0, 30).map((i) => (
                  <li key={`${i.collection}-${i.id}-${i.locale}`}>
                    <a href={`/admin/collections/${i.collection}/${i.id}?locale=${i.locale}`}>{i.title}</a> <span style={{ color: 'var(--theme-elevation-500)' }}>({i.collection}, {i.locale.toUpperCase()}: {i.missing})</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      {latestLeads && latestLeads.docs.length > 0 && (
        <div style={card}>
          <h4 style={{ marginTop: 0 }}>Latest enquiries</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {latestLeads.docs.map((lead) => (
                <tr key={lead.id} style={{ borderTop: '1px solid var(--theme-elevation-100)' }}>
                  <td style={{ padding: '6px 0' }}>
                    <a href={`/admin/collections/leads/${lead.id}`}>{lead.name}</a>
                  </td>
                  <td>{lead.type === 'quote' ? 'Quotation' : lead.type === 'brochure' ? 'Brochure' : 'Contact'}</td>
                  <td>{lead.locale?.toUpperCase()}</td>
                  <td>{lead.status}</td>
                  <td style={{ textAlign: 'end' }}>{new Date(lead.createdAt).toLocaleString('en-GB')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

async function leadsByMonth(payload: Payload) {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + i, 1)))
  return Promise.all(
    months.map(async (start) => {
      const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1))
      const range = { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }
      const count = (type?: string) =>
        payload.count({ collection: 'leads', where: type ? { and: [...range.and, { type: { equals: type } }] } : range }).then((r) => r.totalDocs)
      const [total, quote, contact, brochure] = await Promise.all([count(), count('quote'), count('contact'), count('brochure')])
      return { label: start.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }), total, quote, contact, brochure }
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
