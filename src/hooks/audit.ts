import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'

type AuditAction = 'create' | 'update' | 'publish' | 'delete' | 'login' | 'settings'

const titleOf = (doc: Record<string, unknown> | undefined): string => {
  if (!doc) return ''
  const candidate = doc.title ?? doc.name ?? doc.email ?? doc.filename ?? doc.from ?? doc.id
  return typeof candidate === 'string' || typeof candidate === 'number' ? String(candidate).slice(0, 200) : ''
}

const clientIp = (req: PayloadRequest): string | undefined => {
  const forwarded = req.headers?.get?.('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || req.headers?.get?.('x-real-ip') || undefined
}

export const writeAudit = async (
  req: PayloadRequest,
  entry: { action: AuditAction; entity: string; docId?: string | number; docTitle?: string },
) => {
  if (req.context?.skipAudit) return
  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        action: entry.action,
        entity: entry.entity,
        docId: entry.docId !== undefined ? String(entry.docId) : undefined,
        docTitle: entry.docTitle,
        user: req.user?.collection === 'users' ? req.user.id : undefined,
        ip: clientIp(req),
      },
      overrideAccess: true,
      req,
      context: { skipAudit: true },
    })
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'Failed to write audit log' })
  }
}

/** Records create / update / publish for staff actions. Draft saves are skipped. */
export const auditAfterChange: CollectionAfterChangeHook = async ({ collection, doc, operation, req }) => {
  if (!req.user) return doc
  let action: AuditAction = operation === 'create' ? 'create' : 'update'
  if (doc?._status === 'published') action = 'publish'
  // Draft saves and autosaves never change the public site, so they are not logged
  // (the document's own version history records them).
  else if (doc?._status === 'draft' && operation === 'update') return doc
  await writeAudit(req, { action, entity: collection.slug, docId: doc.id, docTitle: titleOf(doc) })
  return doc
}

export const auditAfterDelete: CollectionAfterDeleteHook = async ({ collection, doc, req }) => {
  if (!req.user) return doc
  await writeAudit(req, { action: 'delete', entity: collection.slug, docId: doc.id, docTitle: titleOf(doc) })
  return doc
}

export const auditGlobal: GlobalAfterChangeHook = async ({ global, doc, req }) => {
  if (!req.user) return doc
  await writeAudit(req, { action: 'settings', entity: global.slug, docTitle: global.label ? String(global.slug) : '' })
  return doc
}
