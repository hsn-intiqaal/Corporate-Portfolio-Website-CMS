import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { Media } from '@/components/site/Media'
import { PageHeader } from '@/components/site/PageHeader'
import { isLocale } from '@/i18n/config'
import { fmt, type Dictionary } from '@/i18n/dictionary'
import { getTexts } from '@/lib/texts'
import { searchSite, type SearchHit } from '@/lib/data'
import { formatNumber } from '@/lib/format'
import { docPath } from '@/lib/paths'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  // Search result pages must not be indexed (thin, duplicate content).
  return { title: (await getTexts(locale)).search, robots: { index: false, follow: true } }
}

const groupLabel = (c: SearchHit['collection'], t: Dictionary) =>
  ({ services: t.services, projects: t.projects, articles: t.articles, pages: t.home })[c]

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { q = '' } = await searchParams
  const query = q.slice(0, 100)
  const t = await getTexts(locale)
  const hits = query ? await searchSite(query, locale) : []
  return (
    <>
      <PageHeader
        title={t.search}
        crumbs={[
          { name: t.home, path: `/${locale}` },
          { name: t.search, path: `/${locale}/search` },
        ]}
      >
        <form action={`/${locale}/search`} role="search" className="mt-8 flex max-w-2xl gap-2">
          <label htmlFor="q" className="sr-only">
            {t.search}
          </label>
          <input id="q" name="q" type="search" defaultValue={query} placeholder={t.searchPlaceholder} className="field flex-1" />
          <button type="submit" className="btn btn-light">
            {t.search}
          </button>
        </form>
      </PageHeader>
      <section className="py-14">
        <div className="container-site max-w-4xl">
          {query && (
            <p className="mb-8 text-muted" aria-live="polite">
              {fmt(t.searchResults, { count: formatNumber(hits.length, locale), query })}
            </p>
          )}
          {query && hits.length === 0 && <p className="py-10 text-center text-lg text-muted">{t.noResults}</p>}
          <ul className="space-y-4">
            {hits.map((hit) => (
              <li key={`${hit.collection}-${hit.slug}`}>
                <Link
                  href={docPath(hit.collection, hit.slug, locale)}
                  className="flex gap-5 rounded-2xl p-4 ring-1 ring-line transition hover:bg-soft hover:ring-brand"
                >
                  {hit.image && typeof hit.image === 'object' ? (
                    <Media
                      resource={hit.image as never}
                      size="thumbnail"
                      imgClassName="h-20 w-28 shrink-0 rounded-lg object-cover"
                      sizes="112px"
                    />
                  ) : null}
                  <div>
                    <span className="text-xs font-semibold text-brand">{groupLabel(hit.collection, t)}</span>
                    <p className="text-lg font-semibold">{hit.title}</p>
                    {hit.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted">{hit.excerpt}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
