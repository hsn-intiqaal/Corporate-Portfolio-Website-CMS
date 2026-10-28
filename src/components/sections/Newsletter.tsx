import React from 'react'
import type { NewsletterBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { NewsletterForm } from '../forms/NewsletterForm'
import { isDarkBg, Section } from '../site/Section'

export function Newsletter({ block, locale }: { block: NewsletterBlock; locale: Locale }) {
  const t = getDictionary(locale).newsletter
  const dark = isDarkBg(block.settings)
  return (
    <Section settings={block.settings}>
      <div className="container-site max-w-3xl text-center">
        <h2 className="section-title">{block.title || t.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{block.intro || t.text}</p>
        <div className="mx-auto mt-8 max-w-lg text-start">
          <NewsletterForm locale={locale} t={t} dark={dark} />
        </div>
      </div>
    </Section>
  )
}
