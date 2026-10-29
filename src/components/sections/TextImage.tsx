import React from 'react'
import type { TextImageBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { CMSLink, type LinkData } from '../site/CMSLink'
import { Media } from '../site/Media'
import { RichText } from '../site/RichText'
import { isDarkBg, Section } from '../site/Section'

export function TextImage({ block, locale }: { block: TextImageBlock; locale: Locale }) {
  const hasImage = block.image && typeof block.image === 'object'
  return (
    <Section settings={block.settings}>
      <div className={`container-site grid items-center gap-10 ${hasImage ? 'lg:grid-cols-2 lg:gap-16' : ''}`}>
        <div className={block.imageSide === 'start' ? 'lg:order-2' : ''}>
          {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
          {block.title && <h2 className="section-title mb-6">{block.title}</h2>}
          <RichText data={block.content} locale={locale} className="text-lg" />
          {block.addButton && block.button && (
            <div className="mt-8">
              <CMSLink link={block.button as LinkData} locale={locale} asButton onDark={isDarkBg(block.settings)} />
            </div>
          )}
        </div>
        {hasImage && (
          <div className={block.imageSide === 'start' ? 'lg:order-1' : ''}>
            <Media
              resource={block.image}
              size="large"
              imgClassName="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </Section>
  )
}
