import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { BlogListing } from '@/components/sections/BlogListing'
import { isLocale } from '@/i18n/config'
import { blogListingMetadata } from '@/lib/blogMeta'

type Props = { params: Promise<{ locale: string; page: string }> }
export const revalidate = 3600
// Rendered on first request, then cached and refreshed on publish like the other pages.
export const generateStaticParams = async () => []

const parsePage = (raw: string) => (/^\d{1,4}$/.test(raw) ? Number(raw) : NaN)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params
  return isLocale(locale) && parsePage(page) > 1 ? blogListingMetadata(locale, parsePage(page)) : {}
}

export default async function BlogPaged({ params }: Props) {
  const { locale, page: raw } = await params
  const page = parsePage(raw)
  if (!isLocale(locale) || !page) notFound()
  if (page === 1) permanentRedirect(`/${locale}/blog`)
  return <BlogListing locale={locale} page={page} />
}
