import Link from 'next/link'
import React from 'react'
import { getTexts } from '@/lib/texts'

// Rendered inside the locale layout. The language is not passed to not-found pages, so both are shown.
export default async function NotFound() {
  const ar = await getTexts('ar')
  const en = await getTexts('en')
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-extrabold text-brand/20" aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-3xl">
        <span lang="ar" dir="rtl" className="block">
          {ar.notFoundTitle}
        </span>
        <span lang="en" dir="ltr" className="mt-1 block text-xl text-muted">
          {en.notFoundTitle}
        </span>
      </h1>
      <p className="mt-4 max-w-md text-muted">
        <span lang="ar" dir="rtl" className="block">
          {ar.notFoundText}
        </span>
        <span lang="en" dir="ltr" className="block">
          {en.notFoundText}
        </span>
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/ar" className="btn btn-primary">
          {ar.backHome}
        </Link>
        <Link href="/en" className="btn btn-secondary text-brand">
          {en.backHome}
        </Link>
      </div>
    </div>
  )
}
