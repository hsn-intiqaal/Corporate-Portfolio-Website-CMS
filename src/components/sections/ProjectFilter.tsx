'use client'
import React, { useEffect, useState } from 'react'

type Props = {
  categories: { id: number; slug: string; title: string }[]
  itemCategories: number[][]
  allLabel: string
  emptyLabel: string
  children: React.ReactNode
}

/** Category filter for the projects overview. All projects are server-rendered; filtering is instant on the client. */
export function ProjectFilter({ categories, itemCategories, allLabel, emptyLabel, children }: Props) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('category') ?? ''
    if (categories.some((c) => c.slug === fromUrl)) setActive(fromUrl)
  }, [categories])

  const select = (slug: string) => {
    setActive(slug)
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set('category', slug)
    else url.searchParams.delete('category')
    window.history.replaceState(null, '', url)
  }

  const activeId = categories.find((c) => c.slug === active)?.id
  const items = React.Children.toArray(children)
  const visible = items.filter((_, i) => !activeId || itemCategories[i]?.includes(activeId))

  return (
    <>
      {categories.length > 0 && (
        <div role="group" className="mb-10 flex flex-wrap gap-2">
          {[{ slug: '', title: allLabel }, ...categories].map((c) => (
            <button
              key={c.slug || 'all'}
              type="button"
              aria-pressed={active === c.slug}
              onClick={() => select(c.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${active === c.slug ? 'bg-brand text-white ring-brand' : 'bg-white text-ink ring-line hover:ring-brand'}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}
      {visible.length > 0 ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible}</div> : <p className="py-10 text-center text-muted">{emptyLabel}</p>}
    </>
  )
}
