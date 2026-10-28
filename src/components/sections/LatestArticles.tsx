import Link from 'next/link'
import React from 'react'
import type { LatestArticlesBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getArticles } from '@/lib/data'
import type { NumeralStyle } from '@/lib/format'
import { Icon } from '../site/Icon'
import { Section, SectionHeading } from '../site/Section'
import { ArticleCard } from './ArticleCard'

export async function LatestArticles({ block, locale, numerals }: { block: LatestArticlesBlock; locale: Locale; numerals: NumeralStyle }) {
  const ids = block.mode === 'selected' ? (block.articles ?? []).map((a) => (typeof a === 'object' ? a.id : a)) : undefined
  const categoryIds = block.mode === 'category' ? (block.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c)) : undefined
  const { docs } = await getArticles(locale, { featured: block.mode === 'featured', ids, categoryIds, limit: block.limit ?? 3 })
  const articles = ids ? (ids.map((id) => docs.find((d) => d.id === id)).filter(Boolean) as typeof docs) : docs
  if (articles.length === 0) return null
  const t = getDictionary(locale)
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={block.title} intro={block.intro} />
          {block.showViewAll && (
            <Link href={`/${locale}/blog`} className="mb-10 inline-flex items-center gap-1.5 font-semibold text-brand">
              {t.viewAll} <Icon name="arrow" className="size-4" />
            </Link>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} locale={locale} numerals={numerals} />
          ))}
        </div>
      </div>
    </Section>
  )
}
