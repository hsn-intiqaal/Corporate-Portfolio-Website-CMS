/** Makes sitemaps readable when opened in a browser (search engines ignore the stylesheet). */
const XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex"/><title>XML Sitemap</title>
<style>body{font:14px/1.5 system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;margin:0;color:#0f172a;background:#f8fafc}header{background:#0f172a;color:#fff;padding:24px 16px}header div,main{max-width:1100px;margin:0 auto}h1{margin:0;font-size:22px}p{margin:6px 0 0;color:#cbd5e1}main{padding:16px}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden}th,td{padding:10px 12px;text-align:start;border-bottom:1px solid #e2e8f0;vertical-align:top}th{background:#f1f5f9;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#475569}a{color:#0b5ea8;text-decoration:none;word-break:break-all}a:hover{text-decoration:underline}.n{color:#64748b;white-space:nowrap}</style></head>
<body><header><div><h1>XML Sitemap</h1><p>For search engines. <xsl:value-of select="count(s:sitemapindex/s:sitemap) + count(s:urlset/s:url)"/> entries.</p></div></header><main>
<xsl:if test="s:sitemapindex"><table><tr><th>Sitemap</th><th>Last modified</th></tr>
<xsl:for-each select="s:sitemapindex/s:sitemap"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td class="n"><xsl:value-of select="substring(s:lastmod,1,10)"/></td></tr></xsl:for-each></table></xsl:if>
<xsl:if test="s:urlset"><table><tr><th>URL</th><th>Languages</th><th>Images</th><th>Last modified</th></tr>
<xsl:for-each select="s:urlset/s:url"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td class="n"><xsl:for-each select="xhtml:link"><xsl:value-of select="@hreflang"/><xsl:text> </xsl:text></xsl:for-each></td><td class="n"><xsl:value-of select="count(image:image)"/></td><td class="n"><xsl:value-of select="substring(s:lastmod,1,10)"/></td></tr></xsl:for-each></table></xsl:if>
</main></body></html>
</xsl:template></xsl:stylesheet>`

export function GET() {
  return new Response(XSL, { headers: { 'Content-Type': 'text/xsl; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } })
}
