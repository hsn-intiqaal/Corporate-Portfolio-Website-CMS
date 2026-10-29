import type { Payload } from 'payload'
import React from 'react'

type Props = { payload: Payload; i18n?: { language?: string } }

const loadBrand = async (payload: Payload, language?: string) => {
  try {
    const s = await payload.findGlobal({ slug: 'settings', depth: 1, locale: language === 'en' ? 'en' : 'ar', fallbackLocale: 'ar' })
    const media = (m: unknown) => (m && typeof m === 'object' && 'url' in m ? (m as { url?: string; alt?: string }) : null)
    return { name: s.siteName ?? 'Dashboard', logo: media(s.logo), icon: media(s.favicon) ?? media(s.logo) }
  } catch {
    return { name: 'Dashboard', logo: null, icon: null }
  }
}

/** Company logo on the dashboard login page (from Branding & settings). */
export async function Logo({ payload, i18n }: Props) {
  const brand = await loadBrand(payload, i18n?.language)
  return (
    <div className="cms-brand-logo">
      {brand.logo?.url ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin graphic, rendered outside next/image
        <img src={brand.logo.url} alt={brand.name} />
      ) : null}
      <span>{brand.name}</span>
    </div>
  )
}

/** Small square icon in the dashboard navigation. */
export async function Icon({ payload, i18n }: Props) {
  const brand = await loadBrand(payload, i18n?.language)
  return brand.icon?.url ? (
    // eslint-disable-next-line @next/next/no-img-element -- admin graphic, rendered outside next/image
    <img className="cms-brand-icon" src={brand.icon.url} alt={brand.name} />
  ) : (
    <span className="cms-brand-icon cms-brand-icon--text" aria-label={brand.name}>
      {brand.name.slice(0, 1)}
    </span>
  )
}
