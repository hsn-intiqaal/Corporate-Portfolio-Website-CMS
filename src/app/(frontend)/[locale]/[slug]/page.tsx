import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import React from 'react'
import { TranslationNotice } from '@/components/site/Notices'
import { PageHeader } from '@/components/site/PageHeader'
import { RenderSections } from '@/components/sections/RenderSections'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { followRedirect, getAllSlugs, getPage, getSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  if (process.env.BUILD_WITHOUT_DB === '1') return []
  const pages = await getAllSlugs('pages').catch(() => [])
  return locales.flatMap((locale) => pages.filter((p) => p.slug !== 'home').map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [res, settings] = await Promise.all([getPage(decodeURIComponent(slug), locale), getSettings(locale)])
  if (!res) return {}
  return buildMetadata({ locale, path: `/${slug}`, meta: res.doc.meta, fallbackTitle: res.doc.title, settings })
}

export default async function Page({ params }: Props) {
  const { locale, slug: rawSlug } = await params
  if (!isLocale(locale)) notFound()
  const slug = decodeURIComponent(rawSlug)
  if (slug === 'home') permanentRedirect(`/${locale}`)
  const res = await getPage(slug, locale)
  if (!res) {
    await followRedirect(`/${locale}/${slug}`)
    notFound()
  }
  const settings = await getSettings(locale)
  const t = getDictionary(locale)
  const sections = res.doc.layout ?? []
  const startsWithHero = sections.find((s) => !s.settings?.hidden)?.blockType === 'hero'
  return (
    <>
      <TranslationNotice show={res.fallbackUsed} t={t} />
      {!startsWithHero && (
        <PageHeader
          title={res.doc.title}
          crumbs={[
            { name: t.home, path: `/${locale}` },
            { name: res.doc.title, path: `/${locale}/${slug}` },
          ]}
        />
      )}
      <RenderSections
        sections={sections}
        locale={locale}
        numerals={settings.arabicNumerals ?? 'western'}
        firstIsPageHeading={startsWithHero}
      />
    </>
  )
}
