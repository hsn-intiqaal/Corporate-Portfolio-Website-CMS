import React from 'react'
import type { ProcessBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { formatNumber, type NumeralStyle } from '@/lib/format'
import { Icon } from '../site/Icon'
import { isDarkBg, Section, SectionHeading } from '../site/Section'

export function Process({ block, locale, numerals }: { block: ProcessBlock; locale: Locale; numerals: NumeralStyle }) {
  const dark = isDarkBg(block.settings)
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} intro={block.intro} center />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(block.steps ?? []).map((step, i) => (
            <li key={step.id} className={`relative rounded-2xl p-6 ${dark ? 'bg-white/10' : 'bg-white shadow-sm ring-1 ring-line'}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`flex size-10 items-center justify-center rounded-full text-sm font-bold ${dark ? 'bg-white text-brand-dark' : 'bg-brand text-white'}`}>
                  {formatNumber(i + 1, locale, numerals)}
                </span>
                {step.icon && <Icon name={step.icon} className={`size-6 ${dark ? 'text-white/80' : 'text-accent'}`} />}
              </div>
              <h3 className="text-lg">{step.title}</h3>
              {step.text && <p className="mt-2 text-muted">{step.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
