import Link from 'next/link'
import React from 'react'
import { breadcrumbLd } from '@/lib/seo'
import { Icon } from './Icon'
import { JsonLd } from './JsonLd'

type Crumb = { name: string; path: string }

/** Title band for inner pages, with visible breadcrumbs and BreadcrumbList structured data. */
export function PageHeader({ title, intro, crumbs, children }: { title: string; intro?: string | null; crumbs: Crumb[]; children?: React.ReactNode }) {
  return (
    <div className="on-dark bg-gradient-to-br from-brand-dark to-brand py-14 sm:py-20">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
          <ol className="flex flex-wrap items-center gap-1.5">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="chevron" className="size-3.5" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-4xl text-4xl text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg text-white/85">{intro}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </div>
  )
}
