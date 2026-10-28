import Link from 'next/link'
import React, { Suspense } from 'react'
import { getDictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { getHeader, getSettings } from '@/lib/data'
import { resolveHref, type LinkData } from './CMSLink'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Media } from './Media'
import { MobileNav, type NavItem } from './MobileNav'

export async function Header({ locale }: { locale: Locale }) {
  const [header, settings] = await Promise.all([getHeader(locale), getSettings(locale)])
  const t = getDictionary(locale)

  const toItem = (link: LinkData | null | undefined) => {
    const href = resolveHref(link, locale)
    return href && link?.label ? { href, label: link.label, newTab: Boolean(link.newTab) } : null
  }
  const items: NavItem[] = (header.navItems ?? [])
    .map((item) => {
      const base = toItem(item.link as LinkData)
      if (!base) return null
      const children = (item.children ?? []).map((c) => toItem(c.link as LinkData)).filter(Boolean) as NavItem[]
      return { ...base, children }
    })
    .filter(Boolean) as NavItem[]

  const cta = header.showQuoteButton
    ? toItem(header.quoteButton as LinkData) ?? { href: `/${locale}/request-a-quote`, label: t.requestQuote }
    : null

  return (
    // Solid background on purpose: a backdrop-filter would trap the fixed mobile menu inside the header.
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2" aria-label={settings.siteName ?? t.home}>
          {settings.logo && typeof settings.logo === 'object' ? (
            <Media resource={settings.logo} imgClassName="h-9 w-auto lg:h-11" priority sizes="200px" alt={settings.siteName ?? ''} />
          ) : (
            <span className="text-lg font-extrabold text-brand-dark lg:text-xl">{settings.siteName}</span>
          )}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href + item.label} className="group relative">
                <Link href={item.href} target={item.newTab ? '_blank' : undefined} className="flex items-center gap-1 rounded-md px-3 py-2 font-medium text-ink/80 hover:bg-soft hover:text-ink">
                  {item.label}
                  {item.children && item.children.length > 0 && <Icon name="chevronDown" className="size-4" />}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="invisible absolute start-0 top-full min-w-56 rounded-xl border border-line bg-white p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link href={c.href} target={c.newTab ? '_blank' : undefined} className="block rounded-lg px-3 py-2 text-sm hover:bg-soft">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Suspense fallback={null}>
            <LanguageSwitcher locale={locale} />
          </Suspense>
          {cta && (
            <Link href={cta.href} className="btn btn-primary hidden sm:inline-flex">
              {cta.label}
            </Link>
          )}
          <MobileNav items={items} cta={cta} menuLabel={t.menu} closeLabel={t.close} />
        </div>
      </div>
    </header>
  )
}
