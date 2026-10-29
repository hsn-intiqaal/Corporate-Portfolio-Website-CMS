import type { Metadata } from 'next'
import { locales, type Locale } from '@/i18n/config'
import type { Media, Setting } from '@/payload-types'
import { absoluteURL } from './paths'

type Meta =
  { title?: string | null; description?: string | null; image?: number | Media | null; noIndex?: boolean | null } | null | undefined

const imageUrl = (img: unknown): string | undefined => {
  if (!img || typeof img !== 'object') return undefined
  const m = img as Media
  const url = m.sizes?.og?.url || m.url
  if (!url) return undefined
  return url.startsWith('http') ? url : absoluteURL(url)
}

/**
 * Builds per-language metadata: unique title/description/social image, canonical URL,
 * hreflang alternates (ar, en, x-default) and Open Graph / X cards.
 */
export function buildMetadata({
  locale,
  path,
  meta,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  settings,
}: {
  locale: Locale
  /** Path without the locale prefix, e.g. "/services/x" or "" for home */
  path: string
  meta?: Meta
  fallbackTitle?: string | null
  fallbackDescription?: string | null
  fallbackImage?: unknown
  settings: Setting
}): Metadata {
  const suffix = settings.titleSuffix ?? ''
  const baseTitle = meta?.title || fallbackTitle || settings.defaultTitle || settings.siteName || ''
  const title = path === '' && !meta?.title ? baseTitle : `${baseTitle}${suffix}`
  const description = meta?.description || fallbackDescription || settings.defaultDescription || undefined
  const image = imageUrl(meta?.image) || imageUrl(fallbackImage) || imageUrl(settings.defaultImage)
  const canonical = absoluteURL(`/${locale}${path}`)
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, absoluteURL(`/${l}${path}`)]))
  languages['x-default'] = absoluteURL(`/ar${path}`)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    robots: meta?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      siteName: settings.siteName ?? undefined,
      title,
      description,
      url: canonical,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_SA'],
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images: image ? [image] : undefined },
  }
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteURL(item.path) })),
})
