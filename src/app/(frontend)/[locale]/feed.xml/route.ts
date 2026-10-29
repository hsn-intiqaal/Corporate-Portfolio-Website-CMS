import { isLocale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getArticles, getSettings } from '@/lib/data'
import { absoluteURL, docPath } from '@/lib/paths'

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** RSS 2.0 feed of the latest 30 articles per language: /ar/feed.xml and /en/feed.xml. */
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return new Response('Not found', { status: 404 })
  const [settings, { docs }] = await Promise.all([getSettings(locale), getArticles(locale, { limit: 30 })])
  const t = await getTexts(locale)
  const items = docs
    .map((a) => {
      const url = absoluteURL(docPath('articles', a.slug, locale))
      const img =
        typeof a.coverImage === 'object' && a.coverImage?.url ? absoluteURL(a.coverImage.sizes?.card?.url || a.coverImage.url) : null
      return `<item><title>${esc(a.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>${a.publishedAt ? `<pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>` : ''}<description>${esc(a.excerpt)}</description>${(a.categories ?? []).map((c) => (typeof c === 'object' ? `<category>${esc(c.title)}</category>` : '')).join('')}${img ? `<enclosure url="${esc(img)}" type="image/webp" length="0"/>` : ''}</item>`
    })
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(`${t.blog} – ${settings.siteName}`)}</title><link>${absoluteURL(`/${locale}/blog`)}</link><description>${esc(settings.defaultDescription)}</description><language>${locale}</language><atom:link href="${absoluteURL(`/${locale}/feed.xml`)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' },
  })
}
