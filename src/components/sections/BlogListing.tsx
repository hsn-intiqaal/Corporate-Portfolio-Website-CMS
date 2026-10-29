import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Locale } from '@/i18n/config'
import { fmt } from '@/i18n/dictionary'
import { getTexts } from '@/lib/texts'
import { getArticleCategories, getArticles, getPage, getSettings } from '@/lib/data'
import type { ArticleCategory } from '@/payload-types'
import { PageHeader } from '../site/PageHeader'
import { Pagination } from '../site/Pagination'
import { ArticleCard } from './ArticleCard'
import { RenderSections } from './RenderSections'

export const blogPath = (locale: Locale, page = 1, category?: string) =>
  `/${locale}/blog${category ? `/category/${category}` : ''}${page > 1 ? `/page/${page}` : ''}`

/** Article list used by /blog, /blog/page/N and /blog/category/X[/page/N]. */
export async function BlogListing({ locale, page, category }: { locale: Locale; page: number; category?: ArticleCategory }) {
  const t = await getTexts(locale)
  const [result, categories, settings, intro] = await Promise.all([
    getArticles(locale, { page, categoryId: category?.id }),
    getArticleCategories(locale),
    getSettings(locale),
    category ? Promise.resolve(null) : getPage('blog', locale),
  ])
  if (page > 1 && page > result.totalPages) notFound()
  const numerals = settings.arabicNumerals ?? 'western'
  const title = category?.title || intro?.doc.title || t.blog
  const crumbs = [
    { name: t.home, path: `/${locale}` },
    { name: t.blog, path: `/${locale}/blog` },
    ...(category ? [{ name: category.title, path: blogPath(locale, 1, category.slug) }] : []),
  ]
  return (
    <>
      <PageHeader
        title={page > 1 ? `${title} – ${fmt(t.pageOf, { page, total: result.totalPages })}` : title}
        intro={category?.description}
        crumbs={crumbs}
      />
      <section className="py-14 sm:py-20">
        <div className="container-site">
          {categories.length > 0 && (
            <nav aria-label={t.articles} className="mb-10 flex flex-wrap gap-2">
              {[{ slug: '', title: t.allCategories }, ...categories].map((c) => {
                const active = (category?.slug ?? '') === c.slug
                return (
                  <Link
                    key={c.slug || 'all'}
                    href={blogPath(locale, 1, c.slug || undefined)}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${active ? 'bg-brand text-white ring-brand' : 'bg-white ring-line hover:ring-brand'}`}
                  >
                    {c.title}
                  </Link>
                )
              })}
            </nav>
          )}
          {result.docs.length === 0 ? (
            <p className="py-16 text-center text-muted">{t.noArticles}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {result.docs.map((a, i) => (
                <ArticleCard key={a.id} article={a} locale={locale} numerals={numerals} priority={i < 3} as="h2" />
              ))}
            </div>
          )}
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            hrefFor={(p) => blogPath(locale, p, category?.slug)}
            labels={{ previous: t.previous, next: t.next, pageOf: fmt(t.pageOf, { page: result.page, total: result.totalPages }) }}
          />
        </div>
      </section>
      {!category && page === 1 && (
        <RenderSections sections={intro?.doc.layout} locale={locale} numerals={numerals} firstIsPageHeading={false} />
      )}
    </>
  )
}
