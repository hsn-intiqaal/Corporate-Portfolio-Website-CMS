import { SITEMAP_TYPES, sitemapXml, type SitemapType } from '@/lib/sitemapData'
import { xmlResponse } from '@/seo/sitemap'

export const dynamic = 'force-dynamic'

/** /sitemaps/pages.xml, /sitemaps/services.xml, /sitemaps/projects.xml, /sitemaps/articles.xml */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const type = file.replace(/\.xml$/, '') as SitemapType
  if (!file.endsWith('.xml') || !SITEMAP_TYPES.includes(type)) return new Response('Not found', { status: 404 })
  return xmlResponse(await sitemapXml(type))
}
