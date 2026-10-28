'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Icon } from './Icon'

export type NavItem = { href: string; label: string; newTab?: boolean; children?: { href: string; label: string; newTab?: boolean }[] }

export function MobileNav({ items, menuLabel, closeLabel, cta }: { items: NavItem[]; menuLabel: string; closeLabel: string; cta?: { href: string; label: string } | null }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lg:hidden">
      <button type="button" className="rounded-md p-2 hover:bg-black/5" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">{open ? closeLabel : menuLabel}</span>
        <Icon name={open ? 'close' : 'menu'} className="size-6" />
      </button>
      {open && (
        <nav id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white px-4 py-6">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href} className="block rounded-lg px-3 py-3 text-lg font-medium hover:bg-soft" target={item.newTab ? '_blank' : undefined}>
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="ms-4 border-s border-line ps-2">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link href={c.href} className="block rounded-lg px-3 py-2 text-muted hover:bg-soft" target={c.newTab ? '_blank' : undefined}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {cta && (
            <Link href={cta.href} className="btn btn-primary mt-6 w-full">
              {cta.label}
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
