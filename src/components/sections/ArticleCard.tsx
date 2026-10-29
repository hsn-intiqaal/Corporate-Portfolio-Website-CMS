import Link from 'next/link'
import React from 'react'
import type { Article } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { fmt } from '@/i18n/dictionary'
import { getTexts } from '@/lib/texts'
import { formatDate, formatNumber, type NumeralStyle } from '@/lib/format'
import { docPath } from '@/lib/paths'
import { Icon } from '../site/Icon'
import { Media } from '../site/Media'

/** `as` sets the heading level so card titles follow the page outline (h2 on listings directly under the h1). */
export async function ArticleCard({
  article,
  locale,
  numerals,
  priority,
  as: Heading = 'h3',
}: {
  article: Article
  locale: Locale
  numerals: NumeralStyle
  priority?: boolean
  as?: 'h2' | 'h3'
}) {
  const t = await getTexts(locale)
  const href = docPath('articles', article.slug, locale)
  const category = article.categories?.find((c) => typeof c === 'object')
  return (
    <article className="card group relative flex h-full flex-col">
      <Media
        resource={article.coverImage}
        size="card"
        priority={priority}
        className="overflow-hidden"
        imgClassName="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {category && typeof category === 'object' && (
            <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">{category.title}</span>
          )}
          {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale, numerals)}</time>}
          {article.readingTime ? <span>{fmt(t.minRead, { n: formatNumber(article.readingTime, locale, numerals) })}</span> : null}
        </div>
        <Heading className="text-xl leading-snug">
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
            {article.title}
          </Link>
        </Heading>
        {article.excerpt && <p className="mt-3 line-clamp-3 flex-1 text-muted">{article.excerpt}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          {t.readArticle} <Icon name="arrow" className="size-4" />
        </span>
      </div>
    </article>
  )
}
