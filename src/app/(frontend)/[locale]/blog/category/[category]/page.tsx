import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogListing } from '@/components/sections/BlogListing'
import { isLocale } from '@/i18n/config'
import { blogListingMetadata } from '@/lib/blogMeta'
import { getArticleCategory } from '@/lib/data'

type Props = { params: Promise<{ locale: string; category: string }> }
export const revalidate = 3600
// Rendered on first request, then cached and refreshed on publish like the other pages.
export const generateStaticParams = async () => []

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params
  if (!isLocale(locale)) return {}
  const cat = await getArticleCategory(decodeURIComponent(category), locale)
  return cat ? blogListingMetadata(locale, 1, cat) : {}
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params
  if (!isLocale(locale)) notFound()
  const cat = await getArticleCategory(decodeURIComponent(category), locale)
  if (!cat) notFound()
  return <BlogListing locale={locale} page={1} category={cat} />
}
