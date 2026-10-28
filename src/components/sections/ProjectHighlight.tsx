import Link from 'next/link'
import React from 'react'
import type { ProjectHighlightBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getProjects } from '@/lib/data'
import { formatMonthYear, type NumeralStyle } from '@/lib/format'
import { docPath } from '@/lib/paths'
import { Icon } from '../site/Icon'
import { Media } from '../site/Media'
import { isDarkBg, Section } from '../site/Section'

export async function ProjectHighlight({ block, locale, numerals }: { block: ProjectHighlightBlock; locale: Locale; numerals: NumeralStyle }) {
  const id = typeof block.project === 'object' ? block.project?.id : block.project
  if (!id) return null
  // Re-query so drafts, archived projects and translation rules are respected.
  const [project] = await getProjects(locale, { ids: [id], limit: 1 })
  if (!project) return null
  const t = getDictionary(locale)
  return (
    <Section settings={block.settings}>
      <div className="container-site grid items-center gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Media resource={project.coverImage} size="large" imgClassName="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg" sizes="(max-width: 1024px) 100vw, 60vw" />
        </div>
        <div className="lg:col-span-2">
          {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
          <h2 className="section-title">{project.title}</h2>
          <p className="mt-2 text-sm text-muted">
            {[project.location, formatMonthYear(project.completedAt, locale, numerals)].filter(Boolean).join(' · ')}
          </p>
          <p className="mt-5 text-lg text-muted">{block.summary || project.excerpt}</p>
          <Link href={docPath('projects', project.slug, locale)} className={`btn mt-8 ${isDarkBg(block.settings) ? 'btn-light' : 'btn-primary'}`}>
            {t.viewProject} <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  )
}
