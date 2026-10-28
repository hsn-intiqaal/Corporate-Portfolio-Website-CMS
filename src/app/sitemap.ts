import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { getAllSlugs } from '@/lib/data'
import { absoluteURL, docPath } from '@/lib/paths'

// Rendered per request (three small queries) so it always reflects the latest published content.
export const dynamic = 'force-dynamic'

/** One entry per language with hreflang alternates. Archived, unpublished and noindex documents are excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, services, projects] = await Promise.all([getAllSlugs('pages'), getAllSlugs('services'), getAllSlugs('projects')])
  const entry = (collection: 'pages' | 'services' | 'projects', slug: string, lastModified?: string, priority = 0.7) =>
    locales.map((locale) => ({
      url: absoluteURL(docPath(collection, slug, locale)),
      lastModified: lastModified ? new Date(lastModified) : undefined,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, absoluteURL(docPath(collection, slug, l))])) },
    }))
  const indexable = <T extends { meta?: { noIndex?: boolean | null } }>(docs: T[]) => docs.filter((d) => !d.meta?.noIndex)

  const listing = (path: string) =>
    locales.map((locale) => ({
      url: absoluteURL(`/${locale}${path}`),
      priority: 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, absoluteURL(`/${l}${path}`)])) },
    }))

  return [
    ...indexable(pages).flatMap((p) => entry('pages', p.slug, p.updatedAt, p.slug === 'home' ? 1 : 0.6)),
    ...(pages.some((p) => p.slug === 'services') ? [] : listing('/services')),
    ...(pages.some((p) => p.slug === 'projects') ? [] : listing('/projects')),
    ...indexable(services).flatMap((s) => entry('services', s.slug, s.updatedAt, 0.8)),
    ...indexable(projects).flatMap((p) => entry('projects', p.slug, p.updatedAt, 0.6)),
  ]
}
