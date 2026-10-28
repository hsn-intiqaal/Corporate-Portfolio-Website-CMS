import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogListing } from '@/components/sections/BlogListing'
import { isLocale } from '@/i18n/config'
import { blogListingMetadata } from '@/lib/blogMeta'

type Props = { params: Promise<{ locale: string }> }
export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? blogListingMetadata(locale, 1) : {}
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <BlogListing locale={locale} page={1} />
}
