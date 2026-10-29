'use client'
import React, { useRef } from 'react'
import { Icon } from '../site/Icon'

/** Scroll-snap carousel. Works with touch, keyboard and in both reading directions. */
export function Carousel({ children, previousLabel, nextLabel }: { children: React.ReactNode; previousLabel: string; nextLabel: string }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (forward: boolean) => {
    const el = track.current
    if (!el) return
    const rtl = getComputedStyle(el).direction === 'rtl'
    const delta = el.clientWidth * 0.85 * (forward ? 1 : -1) * (rtl ? -1 : 1)
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }
  return (
    <div className="relative">
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-2"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
      >
        {React.Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">{child}</div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(false)}
          className="rounded-full border border-line bg-white p-3 text-ink shadow-sm hover:bg-soft"
          aria-label={previousLabel}
        >
          <Icon name="arrow" className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scroll(true)}
          className="rounded-full border border-line bg-white p-3 text-ink shadow-sm hover:bg-soft"
          aria-label={nextLabel}
        >
          <Icon name="arrow" className="size-5" />
        </button>
      </div>
    </div>
  )
}
