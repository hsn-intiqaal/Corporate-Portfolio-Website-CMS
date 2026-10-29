'use client'
import { useTranslation } from '@payloadcms/ui'
import React, { useState } from 'react'

/** Header button that switches the dashboard between Arabic and English (saved in the user's preferences). */
export function LanguageToggle() {
  const { i18n, switchLanguage } = useTranslation()
  const [busy, setBusy] = useState(false)
  const target = i18n.language === 'ar' ? 'en' : 'ar'
  if (!switchLanguage) return null
  return (
    <button
      type="button"
      className="cms-lang-toggle"
      disabled={busy}
      lang={target}
      aria-label={target === 'en' ? 'Switch dashboard to English' : 'تحويل لوحة التحكم إلى العربية'}
      onClick={async () => {
        setBusy(true)
        try {
          await switchLanguage(target)
        } finally {
          setBusy(false)
        }
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
      <span>{target === 'en' ? 'English' : 'العربية'}</span>
    </button>
  )
}
