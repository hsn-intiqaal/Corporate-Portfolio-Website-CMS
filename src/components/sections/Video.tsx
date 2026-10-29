import React from 'react'
import type { VideoBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { Media } from '../site/Media'
import { Section, SectionHeading } from '../site/Section'
import { VideoPlayer } from './VideoPlayer'

/** Converts a YouTube/Vimeo page URL into its privacy-enhanced embed URL. */
export const toEmbedUrl = (url: string): string | null => {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?dnt=1`
  return null
}

export async function Video({ block, locale }: { block: VideoBlock; locale: Locale }) {
  const embed = toEmbedUrl(block.url)
  if (!embed) return null
  const t = await getTexts(locale)
  const ytId = embed.match(/embed\/([\w-]{11})/)?.[1]
  const poster =
    block.poster && typeof block.poster === 'object' ? (
      <Media resource={block.poster} fill imgClassName="object-cover" sizes="(max-width: 1024px) 100vw, 960px" />
    ) : ytId ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
    ) : null
  return (
    <Section settings={block.settings}>
      <div className="container-site max-w-5xl">
        <SectionHeading title={block.title} intro={block.intro} center />
        <VideoPlayer embedUrl={embed} poster={poster} title={block.title || t.watchVideo} playLabel={t.watchVideo} />
      </div>
    </Section>
  )
}
