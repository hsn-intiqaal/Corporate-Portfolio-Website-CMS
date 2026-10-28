import React from 'react'
import type { PartnersBlock } from '@/payload-types'
import { Media } from '../site/Media'
import { Section, SectionHeading } from '../site/Section'

export function Partners({ block }: { block: PartnersBlock }) {
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} center />
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {(block.logos ?? []).map((item) => {
            const img = (
              <Media
                resource={item.logo}
                alt={item.name}
                size="thumbnail"
                imgClassName={`h-12 w-auto max-w-40 object-contain transition ${block.greyscale ? 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0' : ''}`}
                sizes="160px"
              />
            )
            return (
              <li key={item.id}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
