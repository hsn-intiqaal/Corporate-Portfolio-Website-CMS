import type { MetadataRoute } from 'next'
import { absoluteURL } from '@/lib/paths'

export default function robots(): MetadataRoute.Robots {
  // Staging/preview deployments must not be indexed.
  const isProduction = process.env.SITE_ENV
    ? process.env.SITE_ENV === 'production'
    : process.env.VERCEL_ENV
      ? process.env.VERCEL_ENV === 'production'
      : true
  if (!isProduction) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [
      {
        userAgent: '*',
        // Images are served from /api/media/file when no CDN bucket is configured: keep them crawlable for image search.
        allow: ['/', '/api/media/file/'],
        disallow: ['/admin', '/api/', '/next/'],
      },
    ],
    sitemap: absoluteURL('/sitemap.xml'),
  }
}
