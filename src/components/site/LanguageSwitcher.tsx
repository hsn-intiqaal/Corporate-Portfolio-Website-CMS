'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { localeLabel, otherLocale, type Locale } from '@/i18n/config'

/** Links to the same page in the other language (slugs are shared between languages). */
export function LanguageSwitcher({ locale, className = '' }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || `/${locale}`
  const search = useSearchParams()?.toString()
  const target = otherLocale(locale)
  const href = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${target}`) + (search ? `?${search}` : '')
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      className={`rounded-md px-2.5 py-1.5 text-sm font-semibold hover:bg-black/5 ${className}`}
      onClick={() => {
        try {
          document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`
        } catch {}
      }}
    >
      {localeLabel[target]}
    </Link>
  )
}
