import 'server-only'
import { cache } from 'react'
import type { GlobalSlug } from 'payload'
import { siteTextSlugs } from '@/globals/SiteTexts'
import { defaultDictionaries, type Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { mergeTexts } from './mergeTexts'
import { getPayloadClient } from './payload'

/** Built-in texts merged with the overrides saved in the dashboard (Site texts). Cached per request. */
export const getTexts = cache(async (locale: Locale): Promise<Dictionary> => {
  if (process.env.BUILD_WITHOUT_DB === '1' && process.env.NEXT_PHASE === 'phase-production-build') return defaultDictionaries[locale]
  const payload = await getPayloadClient()
  try {
    const parts = await Promise.all(
      siteTextSlugs.map((slug) =>
        payload.findGlobal({ slug: slug as GlobalSlug, locale, fallbackLocale: false, depth: 0, overrideAccess: false }),
      ),
    )
    return mergeTexts(defaultDictionaries[locale], Object.assign({}, ...parts) as Record<string, unknown>)
  } catch (error) {
    // Never break the website over custom texts, but make the failure visible in the logs.
    payload.logger.error({ err: error, msg: 'Could not load Site texts; using the built-in texts' })
    return defaultDictionaries[locale]
  }
})
