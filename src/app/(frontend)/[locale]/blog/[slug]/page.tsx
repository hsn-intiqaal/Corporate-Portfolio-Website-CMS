import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ArticleCard } from '@/components/sections/ArticleCard'
import { RenderSections } from '@/components/sections/RenderSections'
import { Icon } from '@/components/site/Icon'
import { JsonLd } from '@/components/site/JsonLd'
import { Media } from '@/components/site/Media'
import { TranslationNotice } from '@/components/site/Notices'
import { RichText } from '@/components/site/RichText'
import { ShareButtons } from '@/components/site/ShareButtons'
import { isLocale, locales } from '@/i18n/config'
import { fmt } from '@/i18n/dictionary'
import { getTexts } from '@/lib/texts'
import { followRedirect, getAllSlugs, getArticle, getArticles, getSettings } from '@/lib/data'
import { formatDate, formatNumber } from '@/lib/format'
import { extractHeadings } from '@/lib/lexical'
import { absoluteURL, docPath } from '@/lib/paths'
import { breadcrumbLd, buildMetadata } from '@/lib/seo'
import type { Article, ArticleCategory, Author, Media as MediaDoc } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  if (process.env.BUILD_WITHOUT_DB === '1') return []
  const articles = await getAllSlugs('articles').catch(() => [])
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [res, settings] = await Promise.all([getArticle(decodeURIComponent(slug), locale), getSettings(locale)])
  if (!res) return {}
  const a = res.doc
  const meta = buildMetadata({
    locale,
    path: `/blog/${a.slug}`,
    meta: a.meta,
    fallbackTitle: a.title,
    fallbackDescription: a.excerpt,
    fallbackImage: a.coverImage,
    settings,
  })
  const author = typeof a.author === 'object' && a.author ? a.author.name : undefined
  const tags = (a.tags ?? []).map((x) => x.tag).filter(Boolean)
  return {
    ...meta,
    authors: author ? [{ name: author }] : undefined,
    keywords: tags.length ? tags : undefined,
    alternates: { ...meta.alternates, types: { 'application/rss+xml': absoluteURL(`/${locale}/feed.xml`) } },
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: a.publishedAt ?? undefined,
      modifiedTime: a.updatedAt,
      authors: author ? [author] : undefined,
      tags: tags.length ? tags : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug: raw } = await params
  if (!isLocale(locale)) notFound()
  const slug = decodeURIComponent(raw)
  const res = await getArticle(slug, locale)
  if (!res) {
    await followRedirect(`/${locale}/blog/${slug}`)
    notFound()
  }
  const article = res.doc
  const t = await getTexts(locale)
  const settings = await getSettings(locale)
  const numerals = settings.arabicNumerals ?? 'western'
  const path = docPath('articles', article.slug, locale)
  const url = absoluteURL(path)
  const author = typeof article.author === 'object' ? (article.author as Author | null) : null
  const categories = (article.categories ?? []).filter((c): c is ArticleCategory => typeof c === 'object' && c !== null)
  const headings = extractHeadings(article.content)
  const tags = (article.tags ?? []).map((x) => x.tag).filter(Boolean)

  // Related: chosen by the editor, otherwise the latest from the same categories, otherwise the latest overall.
  const picked = (article.relatedArticles ?? []).filter((r): r is Article => typeof r === 'object' && r !== null)
  let related: Article[] = picked
  if (related.length === 0) {
    const sameCategory = categories.length
      ? (await getArticles(locale, { categoryIds: categories.map((c) => c.id), excludeId: article.id, limit: 3 })).docs
      : []
    related = sameCategory.length ? sameCategory : (await getArticles(locale, { excludeId: article.id, limit: 3 })).docs
  }
  const services = (article.relatedServices ?? []).filter((s) => typeof s === 'object' && s !== null)
  const cover = typeof article.coverImage === 'object' ? (article.coverImage as MediaDoc) : null

  return (
    <>
      <TranslationNotice show={res.fallbackUsed} t={t} />
      <article>
        <header className="bg-soft pt-10 pb-12 sm:pt-14">
          <div className="container-site max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href={`/${locale}`} className="hover:text-brand">
                    {t.home}
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <Icon name="chevron" className="size-3.5" />
                  <Link href={`/${locale}/blog`} className="hover:text-brand">
                    {t.blog}
                  </Link>
                </li>
                {categories[0] && (
                  <li className="flex items-center gap-1.5">
                    <Icon name="chevron" className="size-3.5" />
                    <Link href={`/${locale}/blog/category/${categories[0].slug}`} className="hover:text-brand">
                      {categories[0].title}
                    </Link>
                  </li>
                )}
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-5xl">{article.title}</h1>
            {article.excerpt && <p className="mt-5 text-lg text-muted sm:text-xl">{article.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {author && (
                <span className="flex items-center gap-2">
                  {author.photo && typeof author.photo === 'object' && (
                    <Media resource={author.photo} size="thumbnail" imgClassName="size-8 rounded-full object-cover" sizes="32px" />
                  )}
                  {t.by} <strong className="text-ink">{author.name}</strong>
                </span>
              )}
              {article.publishedAt && (
                <span>
                  {t.publishedOn} <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale, numerals)}</time>
                </span>
              )}
              {article.readingTime ? <span>{fmt(t.minRead, { n: formatNumber(article.readingTime, locale, numerals) })}</span> : null}
            </div>
          </div>
        </header>

        <div className="container-site max-w-6xl">
          {cover && (
            <Media
              resource={cover}
              size="large"
              priority
              imgClassName="-mt-2 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          )}
        </div>

        <div className="container-site grid max-w-6xl gap-12 py-12 lg:grid-cols-[1fr_16rem]">
          <div className="min-w-0">
            <RichText data={article.content} locale={locale} className="text-lg leading-loose" />
            {tags.length > 0 && (
              <ul aria-label={t.tags} className="mt-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/${locale}/search?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-soft px-3 py-1 text-sm hover:bg-line"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 border-t border-line pt-6">
              <ShareButtons url={url} title={article.title} labels={{ share: t.share, copyLink: t.copyLink, linkCopied: t.linkCopied }} />
            </div>
            {author && (
              <div className="mt-10 flex gap-5 rounded-2xl bg-soft p-6">
                {author.photo && typeof author.photo === 'object' && (
                  <Media resource={author.photo} size="thumbnail" imgClassName="size-16 rounded-full object-cover" sizes="64px" />
                )}
                <div>
                  <p className="font-semibold">{author.name}</p>
                  {author.role && <p className="text-sm text-muted">{author.role}</p>}
                  {author.bio && <p className="mt-2 text-muted">{author.bio}</p>}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 1 && (
              <nav aria-label={t.tableOfContents} className="rounded-2xl p-5 ring-1 ring-line">
                <p className="mb-3 font-semibold">{t.tableOfContents}</p>
                <ol className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? 'ps-4' : ''}>
                      <a href={`#${h.id}`} className="text-muted hover:text-brand">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {services.length > 0 && (
              <div className="rounded-2xl bg-brand-dark p-5 text-white">
                <p className="mb-3 font-semibold">{t.services}</p>
                <ul className="space-y-1.5 text-sm">
                  {services.map((s) =>
                    typeof s === 'object' ? (
                      <li key={s.id}>
                        <Link href={docPath('services', s.slug, locale)} className="text-white/85 hover:text-white">
                          {s.title}
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
                <Link href={`/${locale}/request-a-quote`} className="btn btn-light mt-4 w-full py-2.5">
                  {t.requestQuote}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </article>

      <RenderSections sections={article.layout} locale={locale} numerals={numerals} firstIsPageHeading={false} />

      {related.length > 0 && (
        <section className="bg-soft py-16">
          <div className="container-site">
            <h2 className="section-title mb-8">{t.relatedArticles}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} locale={locale} numerals={numerals} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt ?? undefined,
            inLanguage: locale,
            mainEntityOfPage: url,
            url,
            image: cover?.url ? [absoluteURL(cover.sizes?.og?.url || cover.url)] : undefined,
            datePublished: article.publishedAt ?? article.createdAt,
            dateModified: article.updatedAt,
            keywords: tags.join(', ') || undefined,
            articleSection: categories.map((c) => c.title),
            author: author
              ? {
                  '@type': 'Person',
                  name: author.name,
                  jobTitle: author.role ?? undefined,
                  sameAs: author.linkedin ? [author.linkedin] : undefined,
                }
              : { '@type': 'Organization', name: settings.siteName },
            publisher: {
              '@type': 'Organization',
              name: settings.siteName,
              logo:
                settings.logo && typeof settings.logo === 'object' && settings.logo.url
                  ? { '@type': 'ImageObject', url: absoluteURL(settings.logo.url) }
                  : undefined,
            },
          },
          breadcrumbLd([
            { name: t.home, path: `/${locale}` },
            { name: t.blog, path: `/${locale}/blog` },
            { name: article.title, path },
          ]),
        ]}
      />
    </>
  )
}
