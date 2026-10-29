import Link from 'next/link'
import React from 'react'
import type { Project, ProjectGalleryBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getProjects } from '@/lib/data'
import type { NumeralStyle } from '@/lib/format'
import { Icon } from '../site/Icon'
import { Section, SectionHeading } from '../site/Section'
import { ProjectCard } from './Cards'
import { Carousel } from './Carousel'

export async function ProjectGallery({ block, locale, numerals }: { block: ProjectGalleryBlock; locale: Locale; numerals: NumeralStyle }) {
  const ids = block.mode === 'selected' ? (block.projects ?? []).map((p) => (typeof p === 'object' ? p.id : p)) : undefined
  const categoryIds = block.mode === 'category' ? (block.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c)) : undefined
  let projects: Project[] = await getProjects(locale, { featured: block.mode === 'featured', ids, categoryIds, limit: block.limit ?? 6 })
  if (ids) projects = ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[]
  if (projects.length === 0) return null
  const t = await getTexts(locale)
  const cards = projects.map((p) => <ProjectCard key={p.id} project={p} locale={locale} numerals={numerals} />)
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={block.title} intro={block.intro} />
          {block.showViewAll && (
            <Link href={`/${locale}/projects`} className="mb-10 inline-flex items-center gap-1.5 font-semibold text-brand">
              {t.viewAll} <Icon name="arrow" className="size-4" />
            </Link>
          )}
        </div>
        {block.layout === 'carousel' ? (
          <Carousel previousLabel={t.previous} nextLabel={t.next}>
            {cards}
          </Carousel>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
        )}
      </div>
    </Section>
  )
}
