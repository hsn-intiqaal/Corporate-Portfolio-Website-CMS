import Link from 'next/link'
import React from 'react'
import { Icon } from './Icon'

/** Crawlable numbered pagination (real links, rel=prev/next). `hrefFor(1)` must be the canonical first page. */
export function Pagination({ page, totalPages, hrefFor, labels }: { page: number; totalPages: number; hrefFor: (p: number) => string; labels: { previous: string; next: string; pageOf: string } }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
  return (
    <nav aria-label={labels.pageOf} className="mt-12 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} rel="prev" aria-label={labels.previous} className="rounded-lg p-2.5 ring-1 ring-line hover:bg-soft">
          <Icon name="arrow" className="size-4 rotate-180" />
        </Link>
      )}
      {pages.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-muted">…</span>}
          <Link href={hrefFor(p)} aria-current={p === page ? 'page' : undefined} className={`min-w-10 rounded-lg px-3 py-2 text-center text-sm font-semibold ring-1 ${p === page ? 'bg-brand text-white ring-brand' : 'ring-line hover:bg-soft'}`}>
            {p}
          </Link>
        </React.Fragment>
      ))}
      {page < totalPages && (
        <Link href={hrefFor(page + 1)} rel="next" aria-label={labels.next} className="rounded-lg p-2.5 ring-1 ring-line hover:bg-soft">
          <Icon name="arrow" className="size-4" />
        </Link>
      )}
    </nav>
  )
}
