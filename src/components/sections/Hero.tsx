import React from 'react'
import type { HeroBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { CMSLink, type LinkData } from '../site/CMSLink'
import { Media } from '../site/Media'

const overlays = { none: '', light: 'bg-dark/25', medium: 'bg-dark/50', strong: 'bg-dark/70' }
const heights = { medium: 'min-h-[22rem] sm:min-h-[26rem]', large: 'min-h-[30rem] sm:min-h-[36rem]', full: 'min-h-[calc(100svh-5rem)]' }

export function Hero({ block, locale, first }: { block: HeroBlock; locale: Locale; first?: boolean }) {
  const hasImage = block.backgroundImage && typeof block.backgroundImage === 'object'
  const center = block.alignment === 'center'
  const Heading = first ? 'h1' : 'h2'
  return (
    <section
      id={block.settings?.anchor || undefined}
      className={`on-dark relative isolate flex items-center overflow-hidden ${heights[block.height ?? 'large']} ${hasImage ? 'bg-dark' : 'bg-gradient-to-br from-brand-dark via-brand to-accent'}`}
    >
      {hasImage && (
        <>
          <Media resource={block.backgroundImage} fill priority={first} imgClassName="-z-20 object-cover" sizes="100vw" />
          <div className={`absolute inset-0 -z-10 ${overlays[block.overlay ?? 'medium']}`} aria-hidden />
        </>
      )}
      <div className={`container-site py-20 ${center ? 'text-center' : ''}`}>
        <div className={`max-w-3xl ${center ? 'mx-auto' : ''}`}>
          <Heading className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{block.headline}</Heading>
          {block.subheading && <p className="mt-6 text-lg text-white/85 sm:text-xl">{block.subheading}</p>}
          {block.buttons && block.buttons.length > 0 && (
            <div className={`mt-10 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}>
              {block.buttons.map((b) => (
                <CMSLink key={b.id} link={b.link as LinkData} locale={locale} asButton onDark />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
