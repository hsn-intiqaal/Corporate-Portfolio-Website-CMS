import { describe, expect, it } from 'vitest'
import { auditSeo, truncate } from '@/seo/audit'
import { itemListLd, organizationLd, websiteLd } from '@/seo/schema'
import { buildSitemapIndex, buildUrlset, latest, xmlEscape } from '@/seo/sitemap'
import type { Setting } from '@/payload-types'

const abs = (p: string) => `https://example.com${p}`

describe('SEO audit', () => {
  const good = {
    title: 'Pool construction',
    metaTitle: 'Swimming pool construction in Riyadh | Example Co',
    metaDescription: 'Design and build of residential and commercial swimming pools in Riyadh, with warranty and maintenance plans.',
    slug: 'pool-construction',
    hasImage: true,
    keyword: 'swimming pool',
    bodyText: 'We build every swimming pool to last.',
  }
  it('scores a well-optimised page at 100', () => {
    const { score, checks } = auditSeo(good)
    expect(score).toBe(100)
    expect(checks.every((c) => c.status === 'good')).toBe(true)
  })
  it('flags missing description, long title and missing image', () => {
    const { checks, score } = auditSeo({ ...good, metaTitle: 'x'.repeat(70), metaDescription: '', hasImage: false })
    const ids = checks.map((c) => c.id)
    expect(ids).toContain('title-long')
    expect(ids).toContain('desc-missing')
    expect(checks.find((c) => c.id === 'image')?.status).toBe('warn')
    expect(score).toBeLessThan(80)
  })
  it('gives 0 when the page is hidden from search engines', () => {
    expect(auditSeo({ ...good, noIndex: true }).score).toBe(0)
  })
  it('matches Arabic keywords regardless of hamza and taa marbuta spelling', () => {
    const { checks } = auditSeo({ ...good, metaTitle: 'انشاء المسابح في الرياض والمنطقة الشرقية باحترافية', keyword: 'إنشاء المسابح' })
    expect(checks.find((c) => c.id === 'kw-title')?.status).toBe('good')
  })
  it('truncates like a search result', () => {
    expect(truncate('abcdef', 4)).toBe('abc…')
    expect(truncate('abc', 4)).toBe('abc')
  })
})

describe('sitemaps', () => {
  it('escapes XML and writes hreflang alternates and images', () => {
    const xml = buildUrlset([
      {
        loc: 'https://example.com/en/a?x=1&y=2',
        lastmod: '2026-10-01T10:00:00Z',
        alternates: { ar: 'https://example.com/ar/a', en: 'https://example.com/en/a' },
        images: ['https://example.com/i.jpg'],
      },
    ])
    expect(xml).toContain('<loc>https://example.com/en/a?x=1&amp;y=2</loc>')
    expect(xml).toContain('<lastmod>2026-10-01T10:00:00.000Z</lastmod>')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ar" href="https://example.com/ar/a"/>')
    expect(xml).toContain('<image:image><image:loc>https://example.com/i.jpg</image:loc></image:image>')
    expect(xml).not.toContain('<priority>')
  })
  it('builds a sitemap index and skips invalid dates', () => {
    const xml = buildSitemapIndex([{ loc: 'https://example.com/sitemaps/pages.xml', lastmod: 'not a date' }])
    expect(xml).toContain('<sitemapindex')
    expect(xml).not.toContain('<lastmod>')
  })
  it('helpers', () => {
    expect(xmlEscape(`<a href="x">&'`)).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&apos;')
    expect(latest(['2026-01-01', null, '2026-03-01', undefined])).toBe('2026-03-01')
  })
})

describe('structured data', () => {
  const settings = {
    siteName: 'Example Co',
    siteAlternateName: 'EC',
    organizationType: 'LocalBusiness',
    phone: '+966 11 000 0000',
    email: 'info@example.com',
    streetAddress: 'King Fahd Rd',
    city: 'Riyadh',
    countryCode: 'SA',
    latitude: 24.7,
    longitude: 46.6,
    areaServed: 'Riyadh، Jeddah, Dammam',
    openingHours: [{ days: ['Sunday', 'Monday'], opens: '08:00', closes: '17:00' }],
    social: [{ platform: 'x', url: 'https://x.com/example' }],
  } as unknown as Setting

  it('describes a local business with address, geo, hours and contact point', () => {
    const ld = organizationLd(settings, 'en', abs) as Record<string, unknown>
    expect(ld['@type']).toBe('LocalBusiness')
    expect(ld.telephone).toBe('+966110000000')
    expect(ld.address).toMatchObject({ addressLocality: 'Riyadh', addressCountry: 'SA' })
    expect(ld.geo).toMatchObject({ latitude: 24.7 })
    expect(ld.areaServed).toEqual(['Riyadh', 'Jeddah', 'Dammam'])
    expect(ld.openingHoursSpecification).toHaveLength(1)
    expect(ld.sameAs).toEqual(['https://x.com/example'])
  })
  it('omits empty values and local-only fields for organisations', () => {
    const ld = organizationLd(
      { siteName: 'Org', organizationType: 'Organization', latitude: 1, longitude: 2 } as unknown as Setting,
      'ar',
      abs,
    )
    expect(ld).not.toHaveProperty('geo')
    expect(ld).not.toHaveProperty('address')
    expect(ld).not.toHaveProperty('sameAs')
  })
  it('links the website to the organisation and lists items', () => {
    expect(websiteLd(settings, 'ar', abs)).toMatchObject({
      inLanguage: 'ar',
      publisher: { '@id': 'https://example.com/#organization' },
      alternateName: 'EC',
    })
    expect(itemListLd([{ name: 'A', url: 'u' }]).itemListElement[0]).toEqual({ '@type': 'ListItem', position: 1, name: 'A', url: 'u' })
  })
})
