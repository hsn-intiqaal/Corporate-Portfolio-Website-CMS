import type { Locale } from '@/i18n/config'

export type NumeralStyle = 'western' | 'eastern'

const intlLocale = (locale: Locale, numerals: NumeralStyle) =>
  locale === 'ar' ? (numerals === 'eastern' ? 'ar-EG' : 'ar-u-nu-latn') : 'en-GB'

export const formatNumber = (value: number, locale: Locale, numerals: NumeralStyle = 'western') =>
  new Intl.NumberFormat(intlLocale(locale, numerals)).format(value)

export const formatMonthYear = (iso: string | null | undefined, locale: Locale, numerals: NumeralStyle = 'western') => {
  if (!iso) return ''
  return new Intl.DateTimeFormat(intlLocale(locale, numerals), { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))
}

export const formatYear = (year: number, locale: Locale, numerals: NumeralStyle = 'western') =>
  new Intl.NumberFormat(intlLocale(locale, numerals), { useGrouping: false }).format(year)
