import Link from 'next/link'
import React from 'react'
import type { Locale } from '@/i18n/config'
import { docPath, type LinkableCollection } from '@/lib/paths'

export type LinkData = {
  type?: 'internal' | 'custom' | null
  label?: string | null
  newTab?: boolean | null
  url?: string | null
  appearance?: 'primary' | 'secondary' | null
  reference?: { relationTo: LinkableCollection; value: number | string | { slug?: string | null } } | null
}

export const resolveHref = (link: LinkData | null | undefined, locale: Locale): string | null => {
  if (!link) return null
  if (link.type === 'custom') {
    const url = link.url ?? ''
    // Root-relative custom links get the language prefix automatically, e.g. /contact -> /ar/contact.
    if (url.startsWith('/') && !/^\/(ar|en)(\/|$)/.test(url)) return `/${locale}${url === '/' ? '' : url}`
    return url || null
  }
  const ref = link.reference
  if (ref && typeof ref.value === 'object' && ref.value) return docPath(ref.relationTo, ref.value.slug, locale)
  return null
}

type Props = {
  link?: LinkData | null
  locale: Locale
  className?: string
  children?: React.ReactNode
  asButton?: boolean
  onDark?: boolean
}

export function CMSLink({ link, locale, className = '', children, asButton, onDark }: Props) {
  const href = resolveHref(link, locale)
  if (!href || !link) return null
  const appearance = link.appearance ?? 'primary'
  const buttonClass = asButton
    ? `btn ${appearance === 'primary' ? (onDark ? 'btn-light' : 'btn-primary') : onDark ? 'btn-secondary text-white' : 'btn-secondary text-brand'}`
    : ''
  const props = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const content = children ?? link.label
  const external = /^(https?:|mailto:|tel:)/.test(href)
  if (external)
    return (
      <a href={href} className={`${buttonClass} ${className}`} {...props}>
        {content}
      </a>
    )
  return (
    <Link href={href} className={`${buttonClass} ${className}`} {...props}>
      {content}
    </Link>
  )
}
