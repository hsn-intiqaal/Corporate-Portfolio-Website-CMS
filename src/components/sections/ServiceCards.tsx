import Link from 'next/link'
import React from 'react'
import type { Service, ServiceCardsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getServices } from '@/lib/data'
import { Icon } from '../site/Icon'
import { Section, SectionHeading } from '../site/Section'
import { ServiceCard } from './Cards'

const cols = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' }

export async function ServiceCards({ block, locale }: { block: ServiceCardsBlock; locale: Locale }) {
  const ids = block.mode === 'selected' ? (block.services ?? []).map((s) => (typeof s === 'object' ? s.id : s)) : undefined
  let services: Service[] = await getServices(locale, { featured: block.mode === 'featured', ids })
  if (ids) services = ids.map((id) => services.find((s) => s.id === id)).filter(Boolean) as Service[]
  if (services.length === 0) return null
  const t = await getTexts(locale)
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} intro={block.intro} />
        <div className={`grid gap-6 ${cols[block.columns ?? '3']}`}>
          {services.map((s) => (
            <div key={s.id} className="relative">
              <ServiceCard service={s} locale={locale} showExcerpt={block.showExcerpt ?? true} />
            </div>
          ))}
        </div>
        {block.showViewAll && (
          <div className="mt-10 text-center">
            <Link href={`/${locale}/services`} className="btn btn-secondary text-brand">
              {t.viewAll} <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}
