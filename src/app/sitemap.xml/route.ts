import { absoluteURL } from '@/lib/paths'
import { SITEMAP_TYPES, sitemapEntries } from '@/lib/sitemapData'
import { buildSitemapIndex, xmlResponse } from '@/seo/sitemap'

export const dynamic = 'force-dynamic'

/** Sitemap index: one sitemap per content type (submit this URL in Google Search Console). */
export async function GET() {
  const parts = await Promise.all(SITEMAP_TYPES.map(async (type) => ({ type, ...(await sitemapEntries(type)) })))
  return xmlResponse(
    buildSitemapIndex(
      parts.filter((p) => p.entries.length > 0).map((p) => ({ loc: absoluteURL(`/sitemaps/${p.type}.xml`), lastmod: p.lastmod })),
    ),
  )
}
