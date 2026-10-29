import { APIError, type CollectionBeforeChangeHook } from 'payload'
import { isAdmin } from '@/access'

/**
 * Editors may publish only when the administrator enables it in Settings > Roles.
 * Otherwise they save drafts and an administrator publishes.
 */
export const publishGuard: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (!req.user || isAdmin(req)) return data
  const publishing = data?._status === 'published'
  const editingPublished = originalDoc?._status === 'published' && data?._status !== 'draft'
  if (!publishing && !editingPublished) return data

  const settings = await req.payload.findGlobal({ slug: 'settings', depth: 0, req, overrideAccess: true })
  if (!settings?.editorsCanPublish) {
    const message =
      req.i18n?.language === 'ar'
        ? 'صلاحيتك تسمح بحفظ المسودات فقط. اطلب من المدير نشرها.'
        : 'Your role can save drafts only. Ask an administrator to publish.'
    throw new APIError(message, 403, undefined, true)
  }
  return data
}
