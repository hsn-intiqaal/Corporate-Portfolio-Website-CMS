import 'server-only'
import { locales } from '@/i18n/config'
import { buildUrlset, latest, type SitemapEntry } from '@/seo/sitemap'
import { getAllSlugs, getArticleCategories } from './data'
import { absoluteURL, docPath, type LinkableCollection } from './paths'

export const SITEMAP_TYPES = ['pages', 'services', 'projects', 'articles'] as const
export type SitemapType = (typeof SITEMAP_TYPES)[number]

const alternatesFor = (pathFor: (l: (typeof locales)[number]) => string) => {
  const alt: Record<string, string> = Object.fromEntries(locales.map((l) => [l, absoluteURL(pathFor(l))]))
  alt['x-default'] = absoluteURL(pathFor('ar'))
  return alt
}

/** One <url> per language, each listing all language versions (as Google recommends for hreflang). */
const bothLanguages = (pathFor: (l: (typeof locales)[number]) => string, lastmod?: string | null, images?: string[]): SitemapEntry[] =>
  locales.map((l) => ({ loc: absoluteURL(pathFor(l)), lastmod, alternates: alternatesFor(pathFor), images }))

/** Entries for one sitemap; archived, unpublished and noindex documents are excluded. */
export async function sitemapEntries(type: SitemapType): Promise<{ entries: SitemapEntry[]; lastmod?: string }> {
  const docs = (await getAllSlugs(type)).filter((d) => !d.meta?.noIndex)
  const lastmod = latest(docs.map((d) => d.updatedAt))
  const entries = docs.flatMap((d) =>
    bothLanguages((l) => docPath(type as LinkableCollection, d.slug, l), d.updatedAt, d.image ? [d.image] : undefined),
  )

  if (type === 'pages') {
    // Listing pages that are not CMS pages themselves.
    const [services, projects, articles, categories] = await Promise.all([
      getAllSlugs('services'),
      getAllSlugs('projects'),
      getAllSlugs('articles'),
      getArticleCategories('ar'),
    ])
    const own = new Set(docs.map((d) => d.slug))
    const listing = (slug: string, path: string, updated?: string) => (own.has(slug) ? [] : bothLanguages((l) => `/${l}${path}`, updated))
    entries.push(
      ...listing('services', '/services', latest(services.map((s) => s.updatedAt))),
      ...listing('projects', '/projects', latest(projects.map((s) => s.updatedAt))),
      ...listing('blog', '/blog', latest(articles.map((s) => s.updatedAt))),
      ...categories.flatMap((c) => bothLanguages((l) => `/${l}/blog/category/${c.slug}`, c.updatedAt)),
    )
  }
  return { entries, lastmod }
}

export const sitemapXml = async (type: SitemapType) => buildUrlset((await sitemapEntries(type)).entries)
