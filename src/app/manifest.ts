import type { MetadataRoute } from 'next'
import { getSettings } from '@/lib/data'
import { brandPalettes, type BrandPalette } from '@/fields/palette'

export const dynamic = 'force-dynamic'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSettings('ar').catch(() => null)
  const palette = brandPalettes[(settings?.palette as BrandPalette) ?? 'ocean'] ?? brandPalettes.ocean
  const icon = settings?.favicon && typeof settings.favicon === 'object' ? settings.favicon.url : null
  return {
    name: settings?.siteName ?? 'Website',
    short_name: settings?.siteName ?? 'Website',
    description: settings?.defaultDescription ?? undefined,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: palette.primary,
    dir: 'rtl',
    lang: 'ar',
    icons: icon ? [{ src: icon, sizes: '512x512', type: 'image/png' }] : [],
  }
}
