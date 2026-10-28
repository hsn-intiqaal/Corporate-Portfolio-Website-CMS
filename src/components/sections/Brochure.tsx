import React from 'react'
import type { BrochureBlock, Document } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { otherLocale } from '@/i18n/config'
import { signToken } from '@/lib/signing'
import { getPayloadClient } from '@/lib/payload'
import { BrochureForm } from '../forms/BrochureForm'
import { Icon } from '../site/Icon'
import { Media } from '../site/Media'
import { Section } from '../site/Section'

export async function Brochure({ block, locale }: { block: BrochureBlock; locale: Locale }) {
  const id = typeof block.document === 'object' ? block.document?.id : block.document
  if (!id) return null
  // Documents are private, so they are loaded server-side with access override.
  const payload = await getPayloadClient()
  const doc = (await payload.findByID({ collection: 'documents', id, depth: 0, locale, fallbackLocale: otherLocale(locale), overrideAccess: true }).catch(() => null)) as Document | null
  if (!doc) return null
  const t = getDictionary(locale)
  const labels = { download: t.download, ready: t.downloadReady, now: t.downloadNow }
  return (
    <Section settings={block.settings}>
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">PDF</span>
          <h2 className="section-title">{block.title || doc.title}</h2>
          <p className="mt-4 text-lg text-muted">{block.intro || doc.description}</p>
          {block.image && typeof block.image === 'object' && <Media resource={block.image} size="card" imgClassName="mt-8 w-full max-w-sm rounded-xl shadow-lg" sizes="384px" />}
        </div>
        <div className="rounded-2xl bg-white p-6 text-ink shadow-sm ring-1 ring-line sm:p-8">
          {doc.gated ? (
            <BrochureForm locale={locale} t={t.form} documentId={doc.id} labels={labels} />
          ) : (
            // Ungated: a long-lived signed link (pages are re-rendered at least hourly, so it never goes stale).
            <a href={`/next/download/${signToken(doc.id, 60 * 60 * 24 * 7)}`} className="btn btn-primary w-full">
              <Icon name="arrow" className="size-4 rotate-90" /> {t.download}
            </a>
          )}
        </div>
      </div>
    </Section>
  )
}
