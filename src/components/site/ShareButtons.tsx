'use client'
import React, { useState } from 'react'
import { Icon, SocialIcon } from './Icon'

export function ShareButtons({
  url,
  title,
  labels,
}: {
  url: string
  title: string
  labels: { share: string; copyLink: string; linkCopied: string }
}) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const tt = encodeURIComponent(title)
  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${tt}%20${u}`, icon: <Icon name="whatsapp" className="size-4" /> },
    { name: 'X', href: `https://x.com/intent/post?url=${u}&text=${tt}`, icon: <SocialIcon platform="x" className="size-4" /> },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: <SocialIcon platform="linkedin" className="size-4" />,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: <SocialIcon platform="facebook" className="size-4" />,
    },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold">{labels.share}</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.share}: ${l.name}`}
          className="flex size-9 items-center justify-center rounded-full bg-soft text-ink hover:bg-brand hover:text-white"
        >
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        className="rounded-full bg-soft px-3 py-2 text-xs font-semibold hover:bg-line"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {}
        }}
      >
        <span aria-live="polite">{copied ? labels.linkCopied : labels.copyLink}</span>
      </button>
    </div>
  )
}
