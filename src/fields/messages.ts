/** Validation messages shown in the dashboard user's language (Payload passes `req` to validators). */
export const vmsg = (options: unknown, en: string, ar: string) =>
  (options as { req?: { i18n?: { language?: string } } } | undefined)?.req?.i18n?.language === 'ar' ? ar : en
