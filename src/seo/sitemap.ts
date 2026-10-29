/**
 * Sitemap XML builders (pure; unit-tested). Google uses <loc>, <lastmod>, hreflang alternates and
 * <image:loc>; it ignores <priority> and <changefreq>, so those are not emitted.
 */
export type SitemapEntry = {
  loc: string
  lastmod?: string | null
  alternates?: Record<string, string>
  images?: string[]
}

export const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const iso = (d?: string | null) => {
  if (!d) return undefined
  const t = new Date(d)
  return Number.isNaN(t.getTime()) ? undefined : t.toISOString()
}

const STYLESHEET = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'

export function buildUrlset(entries: SitemapEntry[]): string {
  const urls = entries.map((e) => {
    const parts = [`<loc>${xmlEscape(e.loc)}</loc>`]
    const lm = iso(e.lastmod)
    if (lm) parts.push(`<lastmod>${lm}</lastmod>`)
    for (const [lang, href] of Object.entries(e.alternates ?? {}))
      parts.push(`<xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(href)}"/>`)
    for (const img of (e.images ?? []).slice(0, 1000)) parts.push(`<image:image><image:loc>${xmlEscape(img)}</image:loc></image:image>`)
    return `<url>${parts.join('')}</url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>${STYLESHEET}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls.join('')}</urlset>`
}

export function buildSitemapIndex(sitemaps: { loc: string; lastmod?: string | null }[]): string {
  const items = sitemaps.map(
    (s) => `<sitemap><loc>${xmlEscape(s.loc)}</loc>${iso(s.lastmod) ? `<lastmod>${iso(s.lastmod)}</lastmod>` : ''}</sitemap>`,
  )
  return `<?xml version="1.0" encoding="UTF-8"?>${STYLESHEET}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items.join('')}</sitemapindex>`
}

export const latest = (dates: (string | null | undefined)[]) =>
  dates.reduce<string | undefined>((max, d) => (d && (!max || d > max) ? d : max), undefined)

export const xmlResponse = (body: string) =>
  new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Fresh for crawlers after a publish, cheap to serve otherwise.
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
