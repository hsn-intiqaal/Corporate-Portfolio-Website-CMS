import { describe, expect, it } from 'vitest'
import { defaultDictionaries, fmt } from '@/i18n/dictionary'
import { mergeTexts } from '@/lib/mergeTexts'
import { siteTextKeys } from '@/globals/SiteTexts'

const shape = (o: object): string[] =>
  Object.entries(o)
    .flatMap(([k, v]) => (typeof v === 'object' && v ? shape(v).map((n) => `${k}.${n}`) : [k]))
    .sort()

describe('website texts', () => {
  it('has the same keys in Arabic and English', () => {
    expect(shape(defaultDictionaries.ar)).toEqual(shape(defaultDictionaries.en))
  })
  it('keeps the same {placeholders} in both languages', () => {
    for (const key of ['minRead', 'pageOf', 'searchResults'] as const) {
      const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort()
      expect(vars(defaultDictionaries.ar[key])).toEqual(vars(defaultDictionaries.en[key]))
    }
  })
  it('lists every top-level text on the "Site texts" dashboard page exactly once', () => {
    const flat = Object.entries(defaultDictionaries.en)
      .filter(([, v]) => typeof v === 'string')
      .map(([k]) => k)
      .sort()
    expect([...siteTextKeys].sort()).toEqual(flat)
  })
  it('fills placeholders', () => {
    expect(fmt('Page {page} of {total}', { page: 2, total: 5 })).toBe('Page 2 of 5')
    expect(fmt('{missing} stays', {})).toBe('{missing} stays')
  })
  it('overlays non-empty dashboard values only', () => {
    const merged = mergeTexts(defaultDictionaries.en, {
      requestQuote: 'Get a price',
      home: '  ',
      form: { submit: 'Go', unknown: 'x' },
      bogus: 'y',
    })
    expect(merged.requestQuote).toBe('Get a price')
    expect(merged.home).toBe(defaultDictionaries.en.home)
    expect(merged.form.submit).toBe('Go')
    expect(merged.form.name).toBe(defaultDictionaries.en.form.name)
    expect('bogus' in merged).toBe(false)
  })
})
