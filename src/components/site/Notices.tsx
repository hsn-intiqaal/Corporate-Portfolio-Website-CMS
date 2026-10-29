import { draftMode } from 'next/headers'
import React from 'react'
import type { Dictionary } from '@/i18n/dictionary'

export function TranslationNotice({ show, t }: { show: boolean; t: Dictionary }) {
  if (!show) return null
  return (
    <div role="note" className="border-b border-amber-200 bg-amber-50 py-3 text-center text-sm text-amber-900">
      {t.missingTranslation}
    </div>
  )
}

export async function DraftBanner({ t }: { t: Dictionary }) {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null
  return (
    <div className="sticky top-0 z-[60] flex items-center justify-center gap-4 bg-amber-400 px-4 py-2 text-sm font-medium text-ink">
      {t.draftBanner}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler that clears draft mode, must be a full request */}
      <a href="/next/exit-preview" className="underline">
        {t.exitPreview}
      </a>
    </div>
  )
}
