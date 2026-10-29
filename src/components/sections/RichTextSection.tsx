import React from 'react'
import type { RichTextBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { RichText } from '../site/RichText'
import { Section } from '../site/Section'

export function RichTextSection({ block, locale }: { block: RichTextBlock; locale: Locale }) {
  return (
    <Section settings={block.settings}>
      <div className={`container-site ${block.width === 'wide' ? '' : 'max-w-3xl'}`}>
        <RichText data={block.content} locale={locale} className="text-lg" />
      </div>
    </Section>
  )
}
