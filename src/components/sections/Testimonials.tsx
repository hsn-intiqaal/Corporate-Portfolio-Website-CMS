import React from 'react'
import type { TestimonialsBlock } from '@/payload-types'
import { Icon } from '../site/Icon'
import { Media } from '../site/Media'
import { Section, SectionHeading } from '../site/Section'

export function Testimonials({ block }: { block: TestimonialsBlock }) {
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} center />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(block.items ?? []).map((item) => (
            <figure key={item.id} className="flex h-full flex-col rounded-2xl bg-white p-7 text-ink shadow-sm ring-1 ring-line">
              <Icon name="quote" className="mb-4 size-8 text-accent/60" />
              <blockquote className="flex-1 text-lg leading-relaxed text-ink/90">{item.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {item.photo && typeof item.photo === 'object' && <Media resource={item.photo} size="thumbnail" imgClassName="size-12 rounded-full object-cover" sizes="48px" />}
                <div>
                  <div className="font-semibold">{item.name}</div>
                  {item.role && <div className="text-sm text-muted">{item.role}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
