import { withPayload } from '@payloadcms/next/withPayload'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  poweredByHeader: false,
  experimental: {
    // Quotation requests can include up to 3 attachments of 5 MB each.
    serverActions: { bodySizeLimit: '16mb' },
    proxyClientMaxBodySize: '16mb',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      new URL(serverURL),
      ...(process.env.S3_PUBLIC_URL ? [new URL(process.env.S3_PUBLIC_URL)] : []),
    ].map((url) => ({
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      port: url.port,
    })),
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
