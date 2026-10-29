import type { CollectionAfterChangeHook, CollectionSlug } from 'payload'
import { locales } from '@/i18n/config'

const prefixFor: Record<string, string> = { pages: '', services: '/services', projects: '/projects', articles: '/blog' }

/**
 * When a document is published with a different slug than its previous published version,
 * add 301 redirects from the old URLs (both languages) to the document.
 * The previous *published* version is used because drafts in between were never public.
 */
export const slugRedirect: CollectionAfterChangeHook = async ({ collection, doc, req }) => {
  if (doc?._status !== 'published') return doc
  const versions = await req.payload.findVersions({
    collection: collection.slug as CollectionSlug,
    where: { and: [{ parent: { equals: doc.id } }, { 'version._status': { equals: 'published' } }] },
    sort: '-updatedAt',
    limit: 2,
    depth: 0,
    req,
    overrideAccess: true,
  })
  // versions[0] is the one just published; versions[1] is the previous public one.
  const oldSlug = (versions.docs[1]?.version as { slug?: string } | undefined)?.slug
  if (!oldSlug || oldSlug === doc.slug) return doc

  const prefix = prefixFor[collection.slug] ?? ''
  for (const locale of locales) {
    const from = oldSlug === 'home' && !prefix ? `/${locale}` : `/${locale}${prefix}/${oldSlug}`
    const existing = await req.payload.find({
      collection: 'redirects',
      where: { from: { equals: from } },
      limit: 1,
      depth: 0,
      req,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) continue
    await req.payload.create({
      collection: 'redirects',
      data: { from, to: { type: 'reference', reference: { relationTo: collection.slug as 'pages', value: doc.id } }, type: '301' },
      req,
      overrideAccess: true,
    })
  }
  return doc
}
