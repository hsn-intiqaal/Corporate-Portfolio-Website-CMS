/** Helpers for writing bilingual seed data: t('عربي', 'English') values are split per locale on save. */
import type { CollectionSlug, GlobalSlug, Payload } from 'payload'
import { placeholderImage } from './images'

export type Bi = { __bi: true; ar: unknown; en: unknown }
export const t = (ar: unknown, en: unknown): Bi => ({ __bi: true, ar, en })
export const isBi = (v: unknown): v is Bi => typeof v === 'object' && v !== null && (v as Bi).__bi === true

/** Resolves bilingual markers into a single-language object. */
export const resolve = (value: unknown, locale: 'ar' | 'en'): unknown => {
  if (isBi(value)) return value[locale]
  if (Array.isArray(value)) return value.map((v) => resolve(v, locale))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, locale)]))
  return value
}

/** Copies array/block row ids from the saved Arabic document so the English update targets the same rows. */
export const withIds = (data: unknown, saved: unknown): unknown => {
  if (Array.isArray(data) && Array.isArray(saved))
    return data.map((row, i) => {
      const merged = withIds(row, saved[i]) as Record<string, unknown>
      const id = (saved[i] as { id?: string } | undefined)?.id
      return id && merged && typeof merged === 'object' ? { ...merged, id } : merged
    })
  if (data && typeof data === 'object' && saved && typeof saved === 'object' && !Array.isArray(data))
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, withIds(v, (saved as Record<string, unknown>)[k])]))
  return data
}

export const ctx = { disableRevalidate: true, skipAudit: true }

export async function createBi(
  payload: Payload,
  collection: CollectionSlug,
  data: Record<string, unknown>,
  extra: Record<string, unknown> = {},
) {
  const ar = await payload.create({ collection, data: resolve(data, 'ar') as never, locale: 'ar', context: ctx, ...extra })
  const saved = await payload.findByID({ collection, id: ar.id, locale: 'ar', depth: 0, draft: true, context: ctx })
  await payload.update({ collection, id: ar.id, data: withIds(resolve(data, 'en'), saved) as never, locale: 'en', context: ctx })
  return ar
}

export async function updateGlobalBi(payload: Payload, slug: GlobalSlug, data: Record<string, unknown>) {
  await payload.updateGlobal({ slug, data: resolve(data, 'ar') as never, locale: 'ar', context: ctx })
  const saved = await payload.findGlobal({ slug, locale: 'ar', depth: 0, context: ctx })
  await payload.updateGlobal({ slug, data: withIds(resolve(data, 'en'), saved) as never, locale: 'en', context: ctx })
}

export async function uploadImage(payload: Payload, seed: number, alt: Bi, w = 1600, hgt = 1000) {
  const data = await placeholderImage(seed, w, hgt)
  const media = await payload.create({
    collection: 'media',
    data: { alt: alt.ar as string },
    file: { data, mimetype: 'image/jpeg', name: `placeholder-${seed}.jpg`, size: data.length },
    locale: 'ar',
    context: ctx,
  })
  await payload.update({ collection: 'media', id: media.id, data: { alt: alt.en as string }, locale: 'en', context: ctx })
  return media.id
}

export const settings = (extra: Record<string, unknown> = {}) => ({ hidden: false, background: 'white', spacing: 'normal', ...extra })
export const ref = (relationTo: 'pages' | 'services' | 'projects', value: number) => ({ relationTo, value })
