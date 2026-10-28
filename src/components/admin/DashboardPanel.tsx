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
    { label: 'Services', value: services.totalDocs, href: '/admin/collections/services' },
    { label: 'Projects', value: projects.totalDocs, href: '/admin/collections/projects' },
  ]

  const shortcuts = [
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
                  <td>{lead.type === 'quote' ? 'Quotation' : 'Contact'}</td>
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
