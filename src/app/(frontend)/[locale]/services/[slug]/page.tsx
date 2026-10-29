import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ProjectCard } from '@/components/sections/Cards'
import { RenderSections } from '@/components/sections/RenderSections'
import { Icon } from '@/components/site/Icon'
import { JsonLd } from '@/components/site/JsonLd'
import { Media } from '@/components/site/Media'
import { TranslationNotice } from '@/components/site/Notices'
import { PageHeader } from '@/components/site/PageHeader'
import { RichText } from '@/components/site/RichText'
import { isLocale, locales } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { followRedirect, getAllSlugs, getProjects, getService, getServices, getSettings } from '@/lib/data'
import { absoluteURL, docPath } from '@/lib/paths'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  if (process.env.BUILD_WITHOUT_DB === '1') return []
  const services = await getAllSlugs('services').catch(() => [])
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [res, settings] = await Promise.all([getService(decodeURIComponent(slug), locale), getSettings(locale)])
  if (!res) return {}
  const s = res.doc
  return buildMetadata({
    locale,
    path: `/services/${s.slug}`,
    meta: s.meta,
    fallbackTitle: s.title,
    fallbackDescription: s.excerpt,
    fallbackImage: s.image,
    settings,
  })
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug: raw } = await params
  if (!isLocale(locale)) notFound()
  const slug = decodeURIComponent(raw)
  const res = await getService(slug, locale)
  if (!res) {
    await followRedirect(`/${locale}/services/${slug}`)
    notFound()
  }
  const service = res.doc
  const t = await getTexts(locale)
  const [settings, allServices, projects] = await Promise.all([
    getSettings(locale),
    getServices(locale),
    getProjects(locale, { limit: 100 }),
  ])
  const numerals = settings.arabicNumerals ?? 'western'
  const related = projects.filter((p) => p.services?.some((s) => (typeof s === 'object' ? s.id : s) === service.id)).slice(0, 3)
  const others = allServices.filter((s) => s.id !== service.id).slice(0, 6)
  const path = docPath('services', service.slug, locale)

  return (
    <>
      <TranslationNotice show={res.fallbackUsed} t={t} />
      <PageHeader
        title={service.title}
        intro={service.excerpt}
        crumbs={[
          { name: t.home, path: `/${locale}` },
          { name: t.services, path: `/${locale}/services` },
          { name: service.title, path },
        ]}
      >
        <Link href={`/${locale}/request-a-quote?service=${service.id}`} className="btn btn-light mt-8">
          {t.requestQuote} <Icon name="arrow" className="size-4" />
        </Link>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {service.image && typeof service.image === 'object' && (
              <Media
                resource={service.image}
                size="large"
                priority
                imgClassName="mb-10 aspect-[16/9] w-full rounded-2xl object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            )}
            <RichText data={service.content} locale={locale} className="text-lg" />
            {service.highlights && service.highlights.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {service.highlights.map((h) => (
                  <li key={h.id} className="flex items-start gap-3 rounded-xl bg-soft p-4">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span>{h.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl bg-brand-dark p-7 text-white">
              <h2 className="text-xl text-white">{t.requestQuote}</h2>
              {settings.phone && (
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="mt-4 flex items-center gap-2 text-white/90" dir="ltr">
                  <Icon name="phone" className="size-4" /> {settings.phone}
                </a>
              )}
              <Link href={`/${locale}/request-a-quote?service=${service.id}`} className="btn btn-light mt-6 w-full">
                {t.requestQuote}
              </Link>
            </div>
            {others.length > 0 && (
              <nav aria-label={t.relatedServices} className="rounded-2xl p-6 ring-1 ring-line">
                <h2 className="mb-3 text-lg">{t.relatedServices}</h2>
                <ul className="space-y-1">
                  {others.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={docPath('services', s.slug, locale)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-soft"
                      >
                        {s.title} <Icon name="chevron" className="size-4 text-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </section>

      <RenderSections sections={service.layout} locale={locale} numerals={numerals} firstIsPageHeading={false} />

      {related.length > 0 && (
        <section className="bg-soft py-16 sm:py-20">
          <div className="container-site">
            <h2 className="section-title mb-10">{t.projects}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} locale={locale} numerals={numerals} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.excerpt ?? undefined,
          url: absoluteURL(path),
          provider: { '@type': settings.organizationType ?? 'Organization', name: settings.siteName, url: absoluteURL(`/${locale}`) },
          image: service.image && typeof service.image === 'object' && service.image.url ? absoluteURL(service.image.url) : undefined,
        }}
      />
    </>
  )
}
