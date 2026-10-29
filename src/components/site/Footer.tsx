import Link from 'next/link'
import React from 'react'
import { getTexts } from '@/lib/texts'
import type { Locale } from '@/i18n/config'
import { getFooter, getSettings } from '@/lib/data'
import { formatYear } from '@/lib/format'
import { CMSLink, type LinkData } from './CMSLink'
import { Icon, SocialIcon } from './Icon'
import { Media } from './Media'
import { NewsletterForm } from '../forms/NewsletterForm'

export async function Footer({ locale }: { locale: Locale }) {
  const [footer, settings] = await Promise.all([getFooter(locale), getSettings(locale)])
  const t = await getTexts(locale)
  const numerals = settings.arabicNumerals ?? 'western'
  const logo = settings.logoLight ?? settings.logo

  return (
    <footer className="on-dark bg-dark text-white/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href={`/${locale}`} className="inline-block">
            {logo && typeof logo === 'object' ? (
              <Media resource={logo} imgClassName={`h-10 w-auto ${settings.logoLight ? '' : 'brightness-0 invert'}`} sizes="200px" />
            ) : (
              <span className="text-xl font-extrabold text-white">{settings.siteName}</span>
            )}
          </Link>
          {footer.about && <p className="mt-4 max-w-sm text-sm leading-relaxed">{footer.about}</p>}
          {settings.social && settings.social.length > 0 && (
            <div className="mt-6">
              <p className="sr-only">{t.followUs}</p>
              <ul className="flex flex-wrap gap-2">
                {settings.social.map((s) => (
                  <li key={s.id ?? s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                      aria-label={s.platform}
                    >
                      <SocialIcon platform={s.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(footer.columns ?? []).map((col) => (
          <div key={col.id ?? col.title}>
            <h2 className="mb-4 text-base font-semibold text-white">{col.title}</h2>
            <ul className="space-y-2 text-sm">
              {(col.links ?? []).map((l) => (
                <li key={l.id}>
                  <CMSLink link={l.link as LinkData} locale={locale} className="hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{t.contactUs}</h2>
          <ul className="space-y-3 text-sm">
            {settings.phone && (
              <li className="flex items-start gap-2">
                <Icon name="phone" className="mt-0.5 size-4 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} dir="ltr" className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-start gap-2">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex items-start gap-2">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0" />
                <span className="whitespace-pre-line">{settings.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      {settings.newsletterEnabled !== false && (
        <div className="border-t border-white/10">
          <div className="container-site grid items-center gap-6 py-10 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-white">{t.newsletter.title}</h2>
              <p className="mt-1 text-sm">{t.newsletter.text}</p>
            </div>
            <NewsletterForm locale={locale} t={t.newsletter} dark />
          </div>
        </div>
      )}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {formatYear(new Date().getFullYear(), locale, numerals)} {settings.siteName}. {t.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a href={`/${locale}/feed.xml`} className="inline-flex items-center gap-1 hover:text-white">
                <Icon name="rss" className="size-3.5" /> {t.rss}
              </a>
            </li>
            {(footer.legalLinks ?? []).map((l) => (
              <li key={l.id}>
                <CMSLink link={l.link as LinkData} locale={locale} className="hover:text-white" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
