'use client'
import Script from 'next/script'
import React from 'react'
import { notifyClientValues, useClientValue } from '@/lib/useClientValue'

import { CONSENT_EVENT, CONSENT_KEY as KEY } from './ThirdPartyScripts'

/** Loads Google Analytics only after the visitor accepts. Rendered only when NEXT_PUBLIC_GA_ID is set. */
/** Cookie consent banner. Loads Google Analytics (when configured) and consent-gated third-party scripts only after the visitor accepts. */
export function ConsentAnalytics({ gaId, text, accept, decline }: { gaId?: string; text: string; accept: string; decline: string }) {
  // undefined = not yet known (server render), null = no choice made yet.
  const consent = useClientValue<string | null | undefined>(() => {
    try {
      return localStorage.getItem(KEY)
    } catch {
      return null
    }
  }, undefined)
  const choose = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, v)
    } catch {}
    notifyClientValues()
    window.dispatchEvent(new Event(CONSENT_EVENT))
  }
  return (
    <>
      {consent === 'granted' && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId.replace(/[^A-Z0-9-]/gi, '')}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl bg-dark p-5 text-sm text-white shadow-2xl sm:flex-row sm:items-center"
        >
          <p className="flex-1">{text}</p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-light py-2" onClick={() => choose('granted')}>
              {accept}
            </button>
            <button type="button" className="btn btn-secondary py-2 text-white" onClick={() => choose('denied')}>
              {decline}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
