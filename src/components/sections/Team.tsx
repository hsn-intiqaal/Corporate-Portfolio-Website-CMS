import React from 'react'
import type { TeamBlock } from '@/payload-types'
import { SocialIcon } from '../site/Icon'
import { Media } from '../site/Media'
import { Section, SectionHeading } from '../site/Section'

export function Team({ block }: { block: TeamBlock }) {
  const members = block.members ?? []
  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} intro={block.intro} center />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-2xl bg-white text-ink shadow-sm ring-1 ring-line">
              {m.photo && typeof m.photo === 'object' ? (
                <Media resource={m.photo} size="card" imgClassName="aspect-square w-full object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-brand/10 text-5xl font-bold text-brand" aria-hidden>
                  {m.name.slice(0, 1)}
                </div>
              )}
              <div className="p-5">
                <p className="text-lg font-semibold">{m.name}</p>
                {m.role && <p className="text-sm text-muted">{m.role}</p>}
                {m.bio && <p className="mt-3 text-sm text-muted">{m.bio}</p>}
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn – ${m.name}`} className="mt-3 inline-flex text-brand">
                    <SocialIcon platform="linkedin" className="size-5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
