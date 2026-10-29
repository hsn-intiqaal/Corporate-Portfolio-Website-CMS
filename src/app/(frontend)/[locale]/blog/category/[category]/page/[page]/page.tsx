import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { BlogListing } from '@/components/sections/BlogListing'
import { isLocale } from '@/i18n/config'
import { blogListingMetadata } from '@/lib/blogMeta'
import { getArticleCategory } from '@/lib/data'

type Props = { params: Promise<{ locale: string; category: string; page: string }> }
export const revalidate = 3600
// Rendered on first request, then cached and refreshed on publish like the other pages.
export const generateStaticParams = async () => []

const parsePage = (raw: string) => (/^\d{1,4}$/.test(raw) ? Number(raw) : NaN)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, page } = await params
  if (!isLocale(locale) || !(parsePage(page) > 1)) return {}
  const cat = await getArticleCategory(decodeURIComponent(category), locale)
  return cat ? blogListingMetadata(locale, parsePage(page), cat) : {}
}

export default async function CategoryPaged({ params }: Props) {
  const { locale, category, page: raw } = await params
  const page = parsePage(raw)
  if (!isLocale(locale) || !page) notFound()
  const cat = await getArticleCategory(decodeURIComponent(category), locale)
  if (!cat) notFound()
  if (page === 1) permanentRedirect(`/${locale}/blog/category/${cat.slug}`)
  return <BlogListing locale={locale} page={page} category={cat} />
}
