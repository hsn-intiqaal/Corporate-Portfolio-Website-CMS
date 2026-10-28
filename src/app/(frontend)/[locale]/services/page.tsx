import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { ServiceCard } from '@/components/sections/Cards'
import { RenderSections } from '@/components/sections/RenderSections'
import { PageHeader } from '@/components/site/PageHeader'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getPage, getServices, getSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 3600

// An optional page with slug "services" supplies the intro text, SEO fields and extra sections.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [page, settings] = await Promise.all([getPage('services', locale), getSettings(locale)])
  return buildMetadata({ locale, path: '/services', meta: page?.doc.meta, fallbackTitle: page?.doc.title || getDictionary(locale).services, settings })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [page, services, settings] = await Promise.all([getPage('services', locale), getServices(locale), getSettings(locale)])
  const title = page?.doc.title || t.services
  return (
    <>
      <PageHeader title={title} crumbs={[{ name: t.home, path: `/${locale}` }, { name: title, path: `/${locale}/services` }]} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="relative">
              <ServiceCard service={s} locale={locale} />
            </div>
          ))}
        </div>
      </section>
      <RenderSections sections={page?.doc.layout} locale={locale} numerals={settings.arabicNumerals ?? 'western'} firstIsPageHeading={false} />
    </>
  )
}
