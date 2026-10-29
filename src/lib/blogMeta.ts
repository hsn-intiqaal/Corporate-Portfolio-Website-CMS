import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getPage, getSettings } from './data'
import { absoluteURL } from './paths'
import { buildMetadata } from './seo'
import type { ArticleCategory } from '@/payload-types'

/** Metadata for blog listing pages, with a self-referencing canonical per page and the RSS feed link. */
export async function blogListingMetadata(locale: Locale, page: number, category?: ArticleCategory | null): Promise<Metadata> {
  const t = await getTexts(locale)
  const [settings, intro] = await Promise.all([getSettings(locale), category ? null : getPage('blog', locale)])
  const path = `/blog${category ? `/category/${category.slug}` : ''}${page > 1 ? `/page/${page}` : ''}`
  const base = category?.title || intro?.doc.title || t.blog
  const meta = buildMetadata({
    locale,
    path,
    meta: category ? undefined : intro?.doc.meta,
    // Each paginated page gets a distinct title to avoid duplicate-title warnings in Search Console.
    fallbackTitle: page > 1 ? `${base} (${page})` : base,
    fallbackDescription: category?.description,
    settings,
  })
  return { ...meta, alternates: { ...meta.alternates, types: { 'application/rss+xml': absoluteURL(`/${locale}/feed.xml`) } } }
}
