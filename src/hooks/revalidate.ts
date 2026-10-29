import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * The site is small, so any content change revalidates the whole public site. This keeps pages
 * statically cached (fast, cheap to host) while edits appear within seconds of publishing.
 */
const revalidateSite = async (context: Record<string, unknown>) => {
  if (context?.disableRevalidate) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next.js (e.g. seed script or migrations) - nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  // Draft autosaves do not affect the public site.
  if (doc?._status === 'draft' && previousDoc?._status !== 'published') return doc
  await revalidateSite(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateSite(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  await revalidateSite(req.context)
  return doc
}
