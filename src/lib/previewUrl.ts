import type { GeneratePreviewURL } from 'payload'
import { isLocale, defaultLocale } from '@/i18n/config'
import { docPath, serverURL, type LinkableCollection } from './paths'

/** "Preview" button in the dashboard: opens the draft on the real site (staff login required). */
export const previewUrlFor =
  (collection: LinkableCollection): GeneratePreviewURL =>
  (doc, { locale }) => {
    const loc = isLocale(locale) ? locale : defaultLocale
    const path = docPath(collection, doc?.slug as string, loc)
    return `${serverURL}/next/preview?path=${encodeURIComponent(path)}`
  }
