import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import '../globals.css'
import { ConsentAnalytics } from '@/components/site/ConsentAnalytics'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { Icon } from '@/components/site/Icon'
import { JsonLd } from '@/components/site/JsonLd'
import { ThirdPartyScripts } from '@/components/site/ThirdPartyScripts'
import { DraftBanner } from '@/components/site/Notices'
import { INDEXABLE_ROBOTS } from '@/lib/seo'
import { organizationLd, websiteLd } from '@/seo/schema'
import { buildThemeCss } from '@/theme/css'
import { arabicFontVars, fontVariableClasses, latinFontVars } from '@/theme/fonts'
import { dir, isLocale, locales } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getSettings } from '@/lib/data'
import { absoluteURL, buildParams, serverURL } from '@/lib/paths'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export const generateStaticParams = () => buildParams(async () => locales.map((locale) => ({ locale })))

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const settings = await getSettings(locale)
  const favicon = settings.favicon && typeof settings.favicon === 'object' ? settings.favicon.url : undefined
  return {
    metadataBase: new URL(serverURL),
    applicationName: settings.siteName ?? undefined,
    icons: favicon ? { icon: favicon, apple: favicon } : undefined,
    verification: {
      google: settings.googleSiteVerification || undefined,
      yandex: settings.yandexVerification || undefined,
      other: settings.bingSiteVerification ? { 'msvalidate.01': settings.bingSiteVerification } : undefined,
    },
    robots: INDEXABLE_ROBOTS,
    twitter: settings.twitterHandle ? { site: settings.twitterHandle, creator: settings.twitterHandle } : undefined,
    formatDetection: { telephone: false, email: false, address: false },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const settings = await getSettings(locale)
  const t = await getTexts(locale)
  const themeCss = buildThemeCss(settings.theme, { arabic: arabicFontVars, latin: latinFontVars })

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const snippets = (settings.customScripts ?? []).map((s, i) => ({
    id: s.id ?? String(i),
    code: s.code,
    placement: s.placement ?? 'body',
    needsConsent: s.needsConsent !== false,
  }))
  const needsBanner = Boolean(gaId) || snippets.some((s) => s.needsConsent)
  const structuredData = [organizationLd(settings, locale, absoluteURL), websiteLd(settings, locale, absoluteURL)]

  return (
    <html lang={locale} dir={dir(locale)} className={fontVariableClasses}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-[100] rounded-md bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
          {t.skipToContent}
        </a>
        <DraftBanner t={t} />
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        {settings.whatsapp && settings.theme?.showWhatsAppButton !== false && (
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp}
            className="fixed end-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
          >
            <Icon name="whatsapp" className="size-7" />
          </a>
        )}
        <JsonLd data={structuredData} />
        {needsBanner && <ConsentAnalytics gaId={gaId} text={t.cookieText} accept={t.accept} decline={t.decline} />}
        {snippets.length > 0 && <ThirdPartyScripts snippets={snippets} />}
      </body>
    </html>
  )
}
