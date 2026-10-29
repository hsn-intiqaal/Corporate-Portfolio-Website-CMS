export const locales = ['ar', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ar'

export const isLocale = (value: unknown): value is Locale => typeof value === 'string' && (locales as readonly string[]).includes(value)

export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr')
export const otherLocale = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar')
export const localeLabel: Record<Locale, string> = { ar: 'العربية', en: 'English' }
