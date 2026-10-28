import Link from 'next/link'
import React from 'react'
import type { Project, Service } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { formatMonthYear, type NumeralStyle } from '@/lib/format'
import { docPath } from '@/lib/paths'
import { Icon } from '../site/Icon'
import { Media } from '../site/Media'

export function ServiceCard({ service, locale, showExcerpt = true }: { service: Service; locale: Locale; showExcerpt?: boolean }) {
  const t = getDictionary(locale)
  const href = docPath('services', service.slug, locale)
  const hasImage = service.image && typeof service.image === 'object'
  return (
    <article className="card group flex h-full flex-col text-ink">
      {hasImage ? (
        <Media resource={service.image} size="card" imgClassName="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" className="overflow-hidden" sizes="(max-width: 768px) 100vw, 33vw" />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!hasImage && service.icon && (
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon name={service.icon} className="size-6" />
          </span>
        )}
        <h3 className="text-xl">
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
            {service.title}
          </Link>
        </h3>
        {showExcerpt && service.excerpt && <p className="mt-3 flex-1 text-muted">{service.excerpt}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          {t.viewService} <Icon name="arrow" className="size-4" />
        </span>
      </div>
    </article>
  )
}

export function ProjectCard({ project, locale, numerals }: { project: Project; locale: Locale; numerals: NumeralStyle }) {
  const href = docPath('projects', project.slug, locale)
  const category = project.categories?.find((c) => typeof c === 'object')
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-ink text-white shadow-sm">
      <Media resource={project.coverImage} size="card" imgClassName="aspect-[4/3] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-75" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-5">
        {category && typeof category === 'object' && <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{category.title}</span>}
        <h3 className="text-lg text-white">
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-white/75">
          {project.location && <span>{project.location}</span>}
          {project.completedAt && <span>{formatMonthYear(project.completedAt, locale, numerals)}</span>}
        </p>
      </div>
    </article>
  )
}
