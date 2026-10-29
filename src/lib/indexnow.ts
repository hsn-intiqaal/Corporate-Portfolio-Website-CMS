import crypto from 'node:crypto'
import type { CollectionAfterChangeHook } from 'payload'
import { locales } from '@/i18n/config'
import { absoluteURL, docPath, serverURL, type LinkableCollection } from './paths'

/** Stable IndexNow key derived from the app secret; published at /indexnow.txt. */
export const indexNowKey = () =>
  crypto
    .createHash('sha256')
    .update(`indexnow:${process.env.PAYLOAD_SECRET || ''}`)
    .digest('hex')
    .slice(0, 32)

const enabledEnvironment = () =>
  process.env.NODE_ENV === 'production' &&
  (process.env.SITE_ENV ?? process.env.VERCEL_ENV ?? 'production') === 'production' &&
  !serverURL.includes('localhost')

/** Tells Bing, Yandex, Seznam, Naver… (IndexNow) that the published URLs changed. Never blocks publishing. */
export const pingIndexNow: CollectionAfterChangeHook = async ({ collection, doc, req }) => {
  if (doc?._status !== 'published' || doc?.meta?.noIndex || req.context?.disableRevalidate || !enabledEnvironment()) return doc
  const settings = await req.payload.findGlobal({ slug: 'settings', depth: 0, req, overrideAccess: true }).catch(() => null)
  if (!settings?.indexNow) return doc
  const urlList = locales.map((l) => absoluteURL(docPath(collection.slug as LinkableCollection, doc.slug, l)))
  void fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(serverURL).host, key: indexNowKey(), keyLocation: absoluteURL('/indexnow.txt'), urlList }),
    signal: AbortSignal.timeout(5000),
  })
    .then((r) => !r.ok && req.payload.logger.warn(`IndexNow responded ${r.status}`))
    .catch((err) => req.payload.logger.warn({ err, msg: 'IndexNow ping failed' }))
  return doc
}
