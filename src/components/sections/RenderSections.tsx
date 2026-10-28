import React from 'react'
import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import type { NumeralStyle } from '@/lib/format'
import { Brochure } from './Brochure'
import { Contact } from './Contact'
import { CTA } from './CTA'
import { FAQ } from './FAQ'
import { Hero } from './Hero'
import { LatestArticles } from './LatestArticles'
import { Newsletter } from './Newsletter'
import { Partners } from './Partners'
import { Process } from './Process'
import { ProjectGallery } from './ProjectGallery'
import { ProjectHighlight } from './ProjectHighlight'
import { RichTextSection } from './RichTextSection'
import { ServiceCards } from './ServiceCards'
import { Stats } from './Stats'
import { Testimonials } from './Testimonials'
import { Team } from './Team'
import { TextImage } from './TextImage'
import { Video } from './Video'

type Props = {
  sections?: Page['layout']
  locale: Locale
  numerals: NumeralStyle
  /** True when the first section should carry the page's <h1>. */
  firstIsPageHeading?: boolean
}

export function RenderSections({ sections, locale, numerals, firstIsPageHeading = true }: Props) {
  const visible = (sections ?? []).filter((s) => !s.settings?.hidden)
  return (
    <>
      {visible.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} locale={locale} first={firstIsPageHeading && index === 0} />
          case 'textImage':
            return <TextImage key={key} block={block} locale={locale} />
          case 'serviceCards':
            return <ServiceCards key={key} block={block} locale={locale} />
          case 'projectGallery':
            return <ProjectGallery key={key} block={block} locale={locale} numerals={numerals} />
          case 'projectHighlight':
            return <ProjectHighlight key={key} block={block} locale={locale} numerals={numerals} />
          case 'stats':
            return <Stats key={key} block={block} locale={locale} numerals={numerals} />
          case 'testimonials':
            return <Testimonials key={key} block={block} />
          case 'partners':
            return <Partners key={key} block={block} />
          case 'faq':
            return <FAQ key={key} block={block} />
          case 'cta':
            return <CTA key={key} block={block} locale={locale} />
          case 'contact':
            return <Contact key={key} block={block} locale={locale} />
          case 'richText':
            return <RichTextSection key={key} block={block} locale={locale} />
          case 'latestArticles':
            return <LatestArticles key={key} block={block} locale={locale} numerals={numerals} />
          case 'team':
            return <Team key={key} block={block} />
          case 'process':
            return <Process key={key} block={block} locale={locale} numerals={numerals} />
          case 'video':
            return <Video key={key} block={block} locale={locale} />
          case 'newsletter':
            return <Newsletter key={key} block={block} locale={locale} />
          case 'brochure':
            return <Brochure key={key} block={block} locale={locale} />
          default:
            return null
        }
      })}
    </>
  )
}
