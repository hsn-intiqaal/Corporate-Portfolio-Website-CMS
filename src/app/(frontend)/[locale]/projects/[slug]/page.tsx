import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { RenderSections } from '@/components/sections/RenderSections'
import { Icon } from '@/components/site/Icon'
import { JsonLd } from '@/components/site/JsonLd'
import { Media } from '@/components/site/Media'
import { TranslationNotice } from '@/components/site/Notices'
import { PageHeader } from '@/components/site/PageHeader'
import { RichText } from '@/components/site/RichText'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { followRedirect, getAllSlugs, getProject, getSettings } from '@/lib/data'
import { formatMonthYear } from '@/lib/format'
import { absoluteURL, docPath } from '@/lib/paths'
import { buildMetadata } from '@/lib/seo'
import type { Media as MediaDoc } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  if (process.env.BUILD_WITHOUT_DB === '1') return []
  const projects = await getAllSlugs('projects').catch(() => [])
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [res, settings] = await Promise.all([getProject(decodeURIComponent(slug), locale), getSettings(locale)])
  if (!res) return {}
  const p = res.doc
  return buildMetadata({ locale, path: `/projects/${p.slug}`, meta: p.meta, fallbackTitle: p.title, fallbackDescription: p.excerpt, fallbackImage: p.coverImage, settings })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug: raw } = await params
  if (!isLocale(locale)) notFound()
  const slug = decodeURIComponent(raw)
  const res = await getProject(slug, locale)
  if (!res) {
    await followRedirect(`/${locale}/projects/${slug}`)
    notFound()
  }
  const project = res.doc
  const t = getDictionary(locale)
  const settings = await getSettings(locale)
  const numerals = settings.arabicNumerals ?? 'western'
  const path = docPath('projects', project.slug, locale)
  const gallery = (project.gallery ?? []).filter((m): m is MediaDoc => typeof m === 'object' && m !== null)
  const categories = (project.categories ?? []).filter((c) => typeof c === 'object')
  const services = (project.services ?? []).filter((s) => typeof s === 'object')

  const facts = [
    project.location && { label: t.location, value: project.location },
    project.completedAt && { label: t.date, value: formatMonthYear(project.completedAt, locale, numerals) },
    project.client && { label: t.client, value: project.client },
    categories.length > 0 && { label: t.category, value: categories.map((c) => (typeof c === 'object' ? c.title : '')).join('، ') },
    ...(project.details ?? []).map((d) => ({ label: d.label, value: d.value })),
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <>
      <TranslationNotice show={res.fallbackUsed} t={t} />
      <PageHeader
        title={project.title}
        intro={project.excerpt}
        crumbs={[
          { name: t.home, path: `/${locale}` },
          { name: t.projects, path: `/${locale}/projects` },
          { name: project.title, path },
        ]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Media resource={project.coverImage} size="large" priority imgClassName="aspect-[16/10] w-full rounded-2xl object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
            <RichText data={project.content} locale={locale} className="mt-10 text-lg" />
            {gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl">{t.gallery}</h2>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {gallery.map((img) => (
                    <li key={img.id}>
                      <a href={img.sizes?.large?.url || img.url || '#'} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                        <Media resource={img} size="card" imgClassName="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="space-y-6">
            {facts.length > 0 && (
              <dl className="divide-y divide-line rounded-2xl p-6 ring-1 ring-line">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="text-end font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {services.length > 0 && (
              <div className="rounded-2xl bg-soft p-6">
                <h2 className="mb-3 text-lg">{t.services}</h2>
                <ul className="space-y-1">
                  {services.map((s) =>
                    typeof s === 'object' ? (
                      <li key={s.id}>
                        <Link href={docPath('services', s.slug, locale)} className="flex items-center gap-2 py-1 text-brand hover:underline">
                          <Icon name="check" className="size-4" /> {s.title}
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            )}
            <Link href={`/${locale}/request-a-quote`} className="btn btn-primary w-full">
              {t.requestQuote}
            </Link>
          </aside>
        </div>
      </section>
      <RenderSections sections={project.layout} locale={locale} numerals={numerals} firstIsPageHeading={false} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.excerpt ?? undefined,
          url: absoluteURL(path),
          dateCreated: project.completedAt ?? undefined,
          locationCreated: project.location ? { '@type': 'Place', name: project.location } : undefined,
          image: [project.coverImage, ...gallery]
            .map((m) => (m && typeof m === 'object' && m.url ? absoluteURL(m.url) : null))
            .filter(Boolean),
          creator: { '@type': settings.organizationType ?? 'Organization', name: settings.siteName },
        }}
      />
    </>
  )
}
