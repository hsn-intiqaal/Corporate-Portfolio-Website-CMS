import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { ProjectCard } from '@/components/sections/Cards'
import { ProjectFilter } from '@/components/sections/ProjectFilter'
import { RenderSections } from '@/components/sections/RenderSections'
import { PageHeader } from '@/components/site/PageHeader'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getCategories, getPage, getProjects, getSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [page, settings] = await Promise.all([getPage('projects', locale), getSettings(locale)])
  return buildMetadata({ locale, path: '/projects', meta: page?.doc.meta, fallbackTitle: page?.doc.title || getDictionary(locale).projects, settings })
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [page, projects, categories, settings] = await Promise.all([getPage('projects', locale), getProjects(locale), getCategories(locale), getSettings(locale)])
  const numerals = settings.arabicNumerals ?? 'western'
  const title = page?.doc.title || t.projects
  const usedCategoryIds = new Set(projects.flatMap((p) => (p.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c))))
  return (
    <>
      <PageHeader title={title} crumbs={[{ name: t.home, path: `/${locale}` }, { name: title, path: `/${locale}/projects` }]} />
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <ProjectFilter
            categories={categories.filter((c) => usedCategoryIds.has(c.id)).map((c) => ({ id: c.id, slug: c.slug, title: c.title }))}
            itemCategories={projects.map((p) => (p.categories ?? []).map((c) => (typeof c === 'object' ? c.id : c)))}
            allLabel={t.allProjects}
            emptyLabel={t.noProjects}
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} numerals={numerals} />
            ))}
          </ProjectFilter>
        </div>
      </section>
      <RenderSections sections={page?.doc.layout} locale={locale} numerals={numerals} firstIsPageHeading={false} />
    </>
  )
}
