import React from 'react'
import type { FAQBlock } from '@/payload-types'
import { Icon } from '../site/Icon'
import { JsonLd } from '../site/JsonLd'
import { Section, SectionHeading } from '../site/Section'

export function FAQ({ block }: { block: FAQBlock }) {
  const items = block.items ?? []
  return (
    <Section settings={block.settings}>
      <div className="container-site max-w-4xl">
        <SectionHeading title={block.title} intro={block.intro} center />
        <div className="divide-y divide-line overflow-hidden rounded-2xl bg-white text-ink ring-1 ring-line">
          {items.map((item) => (
            <details key={item.id} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {item.question}
                <Icon name="chevronDown" className="size-5 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 whitespace-pre-line text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      {block.structuredData && items.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((i) => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
          }}
        />
      )}
    </Section>
  )
}
