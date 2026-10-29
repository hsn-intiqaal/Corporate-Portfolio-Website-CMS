import 'server-only'
import { draftMode } from 'next/headers'
import { permanentRedirect, redirect } from 'next/navigation'
import { cache } from 'react'
import type { Where } from 'payload'
import { otherLocale, type Locale } from '@/i18n/config'
import type { Article, ArticleCategory, Footer, Header, Page, Project, ProjectCategory, Service, Setting } from '@/payload-types'
import { docPath } from './paths'
import { getPayloadClient } from './payload'

const visible: Where = { archived: { not_equals: true } }

const isDraft = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/**
 * Shared query options. Public requests run with access control (published + not archived only);
 * draft previews (verified staff, see /next/preview) read the latest draft.
 */
const queryOpts = async () => {
  const draft = await isDraft()
  return draft ? { draft: true, overrideAccess: true } : { draft: false, overrideAccess: false }
}

export const getSettings = cache(async (locale: Locale): Promise<Setting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', locale, depth: 1, overrideAccess: false })
})

export const getHeader = cache(async (locale: Locale): Promise<Header> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'header', locale, depth: 1, overrideAccess: false })
})

export const getFooter = cache(async (locale: Locale): Promise<Footer> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'footer', locale, depth: 1, overrideAccess: false })
})

export type Localized<T> = { doc: T; fallbackUsed: boolean }

type DocCollection = 'pages' | 'services' | 'projects' | 'articles'

/**
 * Loads a document by slug and applies the site-wide missing-translation rule from Settings:
 * show the other language with a notice, or hide the document (404) until it is translated.
 */
const findLocalizedBySlug = async <T extends { title?: string | null }>(
  collection: DocCollection,
  slug: string,
  locale: Locale,
): Promise<Localized<T> | null> => {
  const payload = await getPayloadClient()
  const opts = await queryOpts()
  const where: Where = { and: [{ slug: { equals: slug } }, visible] }
  const base = { collection, where, limit: 1, depth: 2 as const, ...opts }

  const strict = await payload.find({ ...base, locale, fallbackLocale: false })
  const strictDoc = strict.docs[0] as unknown as T | undefined
  if (!strictDoc) return null

  const translated = Boolean(strictDoc.title)
  if (!translated) {
    const settings = await getSettings(locale)
    if (settings.missingTranslation === 'hide' && !opts.draft) return null
  }
  const withFallback = await payload.find({ ...base, locale, fallbackLocale: otherLocale(locale) })
  return { doc: withFallback.docs[0] as unknown as T, fallbackUsed: !translated }
}

export const getPage = cache((slug: string, locale: Locale) => findLocalizedBySlug<Page>('pages', slug, locale))
export const getService = cache((slug: string, locale: Locale) => findLocalizedBySlug<Service>('services', slug, locale))
export const getProject = cache((slug: string, locale: Locale) => findLocalizedBySlug<Project>('projects', slug, locale))
export const getArticle = cache((slug: string, locale: Locale) => findLocalizedBySlug<Article>('articles', slug, locale))

export const ARTICLES_PER_PAGE = 9

/** Published articles, newest first, with pagination. */
export const getArticles = cache(
  async (
    locale: Locale,
    filter: {
      page?: number
      limit?: number
      categoryId?: number
      featured?: boolean
      ids?: number[]
      excludeId?: number
      categoryIds?: number[]
    } = {},
  ) => {
    const payload = await getPayloadClient()
    const and: Where[] = [visible]
    if (filter.featured) and.push({ featured: { equals: true } })
    if (filter.ids) and.push({ id: { in: filter.ids } })
    if (filter.excludeId) and.push({ id: { not_equals: filter.excludeId } })
    if (filter.categoryId) and.push({ categories: { in: [filter.categoryId] } })
    if (filter.categoryIds?.length) and.push({ categories: { in: filter.categoryIds } })
    const settings = await getSettings(locale)
    // "Hide untranslated" mode: filter in the query (title exists in this language) so pagination stays exact.
    if (settings.missingTranslation === 'hide') and.push({ title: { exists: true } })
    const res = await payload.find({
      collection: 'articles',
      where: { and },
      sort: '-publishedAt',
      limit: filter.limit ?? ARTICLES_PER_PAGE,
      page: filter.page ?? 1,
      depth: 1,
      locale,
      fallbackLocale: otherLocale(locale),
      ...(await queryOpts()),
    })
    return { docs: res.docs as Article[], totalPages: res.totalPages, page: res.page ?? 1, totalDocs: res.totalDocs }
  },
)

export const getArticleCategories = cache(async (locale: Locale): Promise<ArticleCategory[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'article-categories',
    sort: '_order',
    limit: 100,
    depth: 0,
    locale,
    fallbackLocale: otherLocale(locale),
  })
  return res.docs
})

export const getArticleCategory = cache(async (slug: string, locale: Locale): Promise<ArticleCategory | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'article-categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: otherLocale(locale),
  })
  return res.docs[0] ?? null
})

export type SearchHit = {
  collection: 'services' | 'projects' | 'articles' | 'pages'
  slug: string
  title: string
  excerpt?: string | null
  image?: unknown
}

/** Simple site search over titles and summaries in the visitor's language. */
export const searchSite = async (query: string, locale: Locale): Promise<SearchHit[]> => {
  const q = query.trim().slice(0, 100)
  if (q.length < 2) return []
  const payload = await getPayloadClient()
  const common = { limit: 20, depth: 1, locale, fallbackLocale: otherLocale(locale), overrideAccess: false, draft: false } as const
  const textMatch = (fields: string[]): Where => ({ or: fields.map((f) => ({ [f]: { like: q } })) })
  const [services, projects, articles, pages] = await Promise.all([
    payload.find({ collection: 'services', where: { and: [visible, textMatch(['title', 'excerpt'])] }, ...common }),
    payload.find({ collection: 'projects', where: { and: [visible, textMatch(['title', 'excerpt', 'location'])] }, ...common }),
    payload.find({
      collection: 'articles',
      where: { and: [visible, textMatch(['title', 'excerpt', 'tags.tag'])] },
      sort: '-publishedAt',
      ...common,
    }),
    payload.find({ collection: 'pages', where: { and: [visible, textMatch(['title']), { slug: { not_in: ['home'] } }] }, ...common }),
  ])
  return [
    ...services.docs.map((d) => ({ collection: 'services' as const, slug: d.slug, title: d.title, excerpt: d.excerpt, image: d.image })),
    ...projects.docs.map((d) => ({
      collection: 'projects' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      image: d.coverImage,
    })),
    ...articles.docs.map((d) => ({
      collection: 'articles' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      image: d.coverImage,
    })),
    ...pages.docs.map((d) => ({ collection: 'pages' as const, slug: d.slug, title: d.title })),
  ]
}

/** Removes untranslated items from listings when the site is set to hide missing translations. */
const translatedOnly = async <T extends { id: number | string }>(collection: DocCollection, docs: T[], locale: Locale) => {
  const settings = await getSettings(locale)
  if (settings.missingTranslation !== 'hide' || docs.length === 0) return docs
  const payload = await getPayloadClient()
  const strict = await payload.find({
    collection,
    where: { id: { in: docs.map((d) => Number(d.id)) } },
    locale,
    fallbackLocale: false,
    select: { title: true },
    limit: docs.length,
    depth: 0,
    overrideAccess: false,
  })
  const ok = new Set(strict.docs.filter((d) => Boolean((d as { title?: string }).title)).map((d) => d.id))
  return docs.filter((d) => ok.has(Number(d.id)))
}

export const getServices = cache(async (locale: Locale, filter: { featured?: boolean; ids?: (number | string)[] } = {}) => {
  const payload = await getPayloadClient()
  const and: Where[] = [visible]
  if (filter.featured) and.push({ featured: { equals: true } })
  if (filter.ids) and.push({ id: { in: filter.ids } })
  const res = await payload.find({
    collection: 'services',
    where: { and },
    sort: '_order',
    limit: 100,
    depth: 1,
    locale,
    fallbackLocale: otherLocale(locale),
    ...(await queryOpts()),
  })
  return translatedOnly('services', res.docs as Service[], locale)
})

export const getProjects = cache(
  async (
    locale: Locale,
    filter: { featured?: boolean; ids?: (number | string)[]; categoryIds?: (number | string)[]; limit?: number } = {},
  ) => {
    const payload = await getPayloadClient()
    const and: Where[] = [visible]
    if (filter.featured) and.push({ featured: { equals: true } })
    if (filter.ids) and.push({ id: { in: filter.ids } })
    if (filter.categoryIds?.length) and.push({ categories: { in: filter.categoryIds } })
    const res = await payload.find({
      collection: 'projects',
      where: { and },
      sort: '-completedAt',
      limit: filter.limit ?? 100,
      depth: 1,
      locale,
      fallbackLocale: otherLocale(locale),
      ...(await queryOpts()),
    })
    return translatedOnly('projects', res.docs as Project[], locale)
  },
)

export const getCategories = cache(async (locale: Locale): Promise<ProjectCategory[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'project-categories',
    sort: '_order',
    limit: 100,
    depth: 0,
    locale,
    fallbackLocale: otherLocale(locale),
  })
  return res.docs
})

/** Slugs for static generation and the sitemap. */
export const getAllSlugs = cache(async (collection: DocCollection) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection,
    where: visible,
    limit: 1000,
    depth: 1,
    select: {
      slug: true,
      updatedAt: true,
      meta: { noIndex: true },
      ...(collection === 'services' ? { image: true } : collection === 'pages' ? {} : { coverImage: true }),
    } as never,
    overrideAccess: false,
    draft: false,
    pagination: false,
  })
  type Row = {
    slug: string
    updatedAt: string
    meta?: { noIndex?: boolean | null }
    image?: { url?: string | null } | null
    coverImage?: { url?: string | null } | null
  }
  // `image` is the absolute URL of the main image, used for image entries in the sitemap.
  return (res.docs as unknown as Row[]).map((d) => {
    const url = (d.image ?? d.coverImage)?.url
    return { ...d, image: url ? (url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${url}`) : undefined }
  })
})

/**
 * Follows an editable redirect (Navigation > Redirects) for a path that would otherwise 404.
 * Returns only when no redirect matches.
 */
export const followRedirect = async (path: string): Promise<void> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'redirects', where: { from: { equals: path } }, limit: 1, depth: 1 })
  const r = res.docs[0]
  if (!r) return
  let target: string | null = null
  if (r.to?.type === 'custom') target = r.to.url ?? null
  else if (r.to?.reference && typeof r.to.reference.value === 'object' && r.to.reference.value) {
    const locale = path.split('/')[1] === 'en' ? 'en' : 'ar'
    target = docPath(r.to.reference.relationTo, r.to.reference.value.slug, locale)
  }
  if (!target || target === path) return
  if (r.type === '302') redirect(target)
  permanentRedirect(target)
}
