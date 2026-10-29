import React from 'react'
import type { StatsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { formatNumber, type NumeralStyle } from '@/lib/format'
import { Icon } from '../site/Icon'
import { isDarkBg, Section, SectionHeading } from '../site/Section'

export function Stats({ block, locale, numerals }: { block: StatsBlock; locale: Locale; numerals: NumeralStyle }) {
  const dark = isDarkBg(block.settings)
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} intro={block.intro} center />
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {(block.items ?? []).map((item) => (
            <div key={item.id} className={`rounded-2xl p-6 text-center ${dark ? 'bg-white/10' : 'bg-white shadow-sm ring-1 ring-line'}`}>
              {item.icon && <Icon name={item.icon} className={`mx-auto mb-3 size-8 ${dark ? 'text-white/80' : 'text-accent'}`} />}
              <dd className={`text-3xl font-extrabold sm:text-4xl ${dark ? 'text-white' : 'text-brand-dark'}`} dir="ltr">
                {item.prefix}
                {formatNumber(item.value, locale, numerals)}
                {item.suffix}
              </dd>
              <dt className={`mt-2 text-sm ${dark ? 'text-white/80' : 'text-muted'}`}>{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
