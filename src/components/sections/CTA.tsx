import React from 'react'
import type { CTABlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getSettings } from '@/lib/data'
import { CMSLink, type LinkData } from '../site/CMSLink'
import { Icon } from '../site/Icon'
import { isDarkBg, Section } from '../site/Section'

export async function CTA({ block, locale }: { block: CTABlock; locale: Locale }) {
  const settings = await getSettings(locale)
  const dark = isDarkBg(block.settings)
  const t = await getTexts(locale)
  return (
    <Section settings={block.settings}>
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <h2 className="section-title max-w-3xl">{block.headline}</h2>
        {block.text && <p className="max-w-2xl text-lg text-muted">{block.text}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          <CMSLink link={block.button as LinkData} locale={locale} asButton onDark={dark} />
          {block.showWhatsApp && settings.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary ${dark ? 'text-white' : 'text-brand'}`}
            >
              <Icon name="whatsapp" className="size-5" /> {t.whatsapp}
            </a>
          )}
        </div>
      </div>
    </Section>
  )
}
