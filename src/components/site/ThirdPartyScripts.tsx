'use client'
import { useEffect } from 'react'

export type ScriptSnippet = { id: string; code: string; placement: 'head' | 'body'; needsConsent: boolean }

export const CONSENT_KEY = 'analytics-consent'
export const CONSENT_EVENT = 'consent-change'

/**
 * Injects administrator-provided vendor snippets (live chat, tag manager, pixels).
 * `<script>` tags inside the snippet are re-created so the browser executes them.
 * Snippets that need consent wait until the visitor accepts cookies.
 */
export function ThirdPartyScripts({ snippets }: { snippets: ScriptSnippet[] }) {
  useEffect(() => {
    const injected = new Set<string>()
    const inject = () => {
      let consent: string | null = null
      try {
        consent = localStorage.getItem(CONSENT_KEY)
      } catch {}
      for (const s of snippets) {
        if (injected.has(s.id) || (s.needsConsent && consent !== 'granted')) continue
        injected.add(s.id)
        const target = s.placement === 'head' ? document.head : document.body
        const fragment = document.createRange().createContextualFragment(s.code)
        fragment.querySelectorAll('script').forEach((old) => {
          const el = document.createElement('script')
          for (const attr of Array.from(old.attributes)) el.setAttribute(attr.name, attr.value)
          el.text = old.text
          old.replaceWith(el)
        })
        target.appendChild(fragment)
      }
    }
    inject()
    window.addEventListener(CONSENT_EVENT, inject)
    return () => window.removeEventListener(CONSENT_EVENT, inject)
  }, [snippets])
  return null
}
