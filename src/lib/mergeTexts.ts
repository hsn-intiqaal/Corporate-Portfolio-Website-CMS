import type { Dictionary } from '@/i18n/dictionary'

const isFilled = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

/** Overlays non-empty dashboard values on the built-in texts. Unknown keys are ignored. */
export function mergeTexts(base: Dictionary, overrides: Record<string, unknown> | null | undefined): Dictionary {
  if (!overrides) return base
  const out = { ...base } as Record<string, unknown>
  for (const [key, value] of Object.entries(base)) {
    const o = overrides[key]
    if (typeof value === 'string') {
      if (isFilled(o)) out[key] = o.trim()
    } else if (o && typeof o === 'object') {
      const nested = { ...(value as Record<string, string>) }
      for (const k of Object.keys(nested)) {
        const v = (o as Record<string, unknown>)[k]
        if (isFilled(v)) nested[k] = v.trim()
      }
      out[key] = nested
    }
  }
  return out as Dictionary
}
