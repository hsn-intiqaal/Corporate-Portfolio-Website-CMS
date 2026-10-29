import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { TranslationNotice } from '@/components/site/Notices'
import { RenderSections } from '@/components/sections/RenderSections'
import { isLocale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getPage, getSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [res, settings] = await Promise.all([getPage('home', locale), getSettings(locale)])
  return buildMetadata({ locale, path: '', meta: res?.doc.meta, fallbackTitle: settings.siteName, settings })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const [res, settings] = await Promise.all([getPage('home', locale), getSettings(locale)])
  if (!res) notFound()
  return (
    <>
      <TranslationNotice show={res.fallbackUsed} t={await getTexts(locale)} />
      <RenderSections sections={res.doc.layout} locale={locale} numerals={settings.arabicNumerals ?? 'western'} />
    </>
  )
}
