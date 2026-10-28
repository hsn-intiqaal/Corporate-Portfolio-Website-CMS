import type { CollectionAfterChangeHook } from 'payload'

const escape = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Emails the nominated recipients when a new enquiry arrives. Includes the visitor's language. */
export const notifyNewLead: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const { payload } = req
  try {
    const settings = await payload.findGlobal({ slug: 'settings', depth: 0, req, overrideAccess: true })
    const staff = await payload.find({
      collection: 'users',
      where: { receivesLeadEmails: { equals: true } },
      depth: 0,
      limit: 50,
      req,
      overrideAccess: true,
    })
    const recipients = new Set<string>([
      ...((settings?.leadRecipients ?? []).map((r: { email?: string | null }) => r.email).filter(Boolean) as string[]),
      ...staff.docs.map((u) => u.email),
    ])
    if (recipients.size === 0) {
      payload.logger.warn('New lead received but no lead notification recipients are configured (Settings > Leads).')
      return doc
    }

    let serviceTitle = ''
    if (doc.service) {
      const id = typeof doc.service === 'object' ? doc.service.id : doc.service
      const service = await payload.findByID({ collection: 'services', id, depth: 0, locale: 'en', req, overrideAccess: true }).catch(() => null)
      serviceTitle = service?.title ?? ''
    }

    const language = doc.locale === 'ar' ? 'Arabic (العربية)' : 'English'
    const kind = doc.type === 'quote' ? 'Quotation request' : 'Contact message'
    const rows: [string, unknown][] = [
      ['Type', kind],
      ['Visitor language', language],
      ['Name', doc.name],
      ['Email', doc.email],
      ['Phone', doc.phone],
      ['Company', doc.company],
      ['Subject', doc.subject],
      ['Service', serviceTitle],
      ['Project location', doc.projectLocation],
      ['Timeline', doc.timeline],
      ['Budget', doc.budget],
      ['Message', doc.message],
      ['Attachments', Array.isArray(doc.attachments) ? doc.attachments.length : 0],
      ['Page', doc.sourcePage],
    ]
    const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/leads/${doc.id}`
    const html = `<div style="font-family:Arial,sans-serif">
      <h2>New ${escape(kind.toLowerCase())} — reply in ${escape(language)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">${rows
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `<tr><td style="color:#555;vertical-align:top"><b>${escape(k)}</b></td><td style="white-space:pre-wrap" dir="auto">${escape(v)}</td></tr>`)
        .join('')}</table>
      <p><a href="${escape(adminUrl)}">Open this lead in the dashboard</a></p></div>`

    await payload.sendEmail({
      to: [...recipients].join(','),
      replyTo: doc.email,
      subject: `[${doc.locale?.toUpperCase()}] ${kind}: ${doc.name}`,
      html,
    })
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Failed to send lead notification email' })
  }
  return doc
}
