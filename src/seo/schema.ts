import type { Locale } from '@/i18n/config'
import type { Setting } from '@/payload-types'

/** schema.org JSON-LD for the organisation and website (pure; unit-tested). */
type Abs = (path: string) => string

const clean = <T extends Record<string, unknown>>(o: T): T =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)),
  ) as T

const mediaUrl = (m: unknown, abs: Abs) => {
  const url = m && typeof m === 'object' && 'url' in m ? (m as { url?: string | null }).url : null
  return url ? (url.startsWith('http') ? url : abs(url)) : undefined
}

export function organizationLd(settings: Setting, locale: Locale, abs: Abs) {
  const type = settings.organizationType ?? 'Organization'
  const isLocal = type !== 'Organization'
  const logo = mediaUrl(settings.logo, abs)
  const address = clean({
    '@type': 'PostalAddress',
    streetAddress: settings.streetAddress || settings.address || undefined,
    addressLocality: settings.city ?? undefined,
    addressRegion: settings.region ?? undefined,
    postalCode: settings.postalCode ?? undefined,
    addressCountry: settings.countryCode ?? undefined,
  })
  const phone = settings.phone?.replace(/\s/g, '')
  return clean({
    '@context': 'https://schema.org',
    '@type': type,
    '@id': abs('/#organization'),
    name: settings.siteName,
    alternateName: settings.siteAlternateName ?? undefined,
    legalName: settings.legalName ?? undefined,
    url: abs(`/${locale}`),
    logo: logo ? { '@type': 'ImageObject', url: logo } : undefined,
    image: isLocal ? logo : undefined,
    description: settings.defaultDescription ?? undefined,
    foundingDate: settings.foundingYear ? String(settings.foundingYear) : undefined,
    email: settings.email ?? undefined,
    telephone: phone,
    address: Object.keys(address).length > 1 ? address : undefined,
    geo:
      isLocal && typeof settings.latitude === 'number' && typeof settings.longitude === 'number'
        ? { '@type': 'GeoCoordinates', latitude: settings.latitude, longitude: settings.longitude }
        : undefined,
    priceRange: isLocal ? (settings.priceRange ?? undefined) : undefined,
    areaServed: settings.areaServed
      ? settings.areaServed
          .split(/[,،]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined,
    openingHoursSpecification: isLocal
      ? (settings.openingHours ?? []).map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        }))
      : undefined,
    contactPoint:
      phone || settings.email
        ? [
            clean({
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: phone,
              email: settings.email ?? undefined,
              availableLanguage: ['Arabic', 'English'],
            }),
          ]
        : undefined,
    sameAs: (settings.social ?? []).map((s) => s.url),
  })
}

export function websiteLd(settings: Setting, locale: Locale, abs: Abs) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs(`/${locale}#website`),
    name: settings.siteName,
    alternateName: settings.siteAlternateName ?? undefined,
    url: abs(`/${locale}`),
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    publisher: { '@id': abs('/#organization') },
  })
}

/** ItemList for listing pages (services, projects, articles) so search engines understand the collection. */
export const itemListLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: item.url })),
})
