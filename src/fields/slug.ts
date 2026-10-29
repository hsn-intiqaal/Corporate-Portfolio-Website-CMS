import type { Field, FieldHook } from 'payload'
import { vmsg } from '@/fields/messages'

/**
 * Arabic letters and digits only (U+0620–U+064A, U+0660–U+0669, U+066E–U+06D3). Punctuation such as
 * ؟ ، ؛ and the tatweel are excluded so they never end up in URLs or heading anchors.
 */
export const ARABIC_CHARS = '\\u0620-\\u064a\\u0660-\\u0669\\u066e-\\u06d3'
const NOT_SLUG_CHAR = new RegExp(`[^a-z0-9${ARABIC_CHARS}\\s-]`, 'g')
export const SLUG_PATTERN = new RegExp(`^[a-z0-9${ARABIC_CHARS}]+(?:-[a-z0-9${ARABIC_CHARS}]+)*$`)

export const slugify = (value: string): string =>
  value
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/_/g, ' ')
    .replace(NOT_SLUG_CHAR, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    const source = data?.[fallbackField] ?? originalDoc?.[fallbackField]
    // Localized fields arrive as a string for the current locale.
    if (typeof source === 'string' && source.length > 0) return slugify(source)
    return value
  }

/**
 * URL slug shared by both languages (e.g. /ar/services/x and /en/services/x), which keeps the
 * language switcher and hreflang alternates trivial. Uniqueness is enforced by a DB index.
 */
export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description: 'Used in the URL. Generated from the English title if left empty. Changing it creates a redirect automatically.',
  },
  validate: (value: unknown, o: unknown) => {
    if (typeof value !== 'string' || !value) return vmsg(o, 'Slug is required', 'الرابط مطلوب')
    if (!SLUG_PATTERN.test(value))
      return vmsg(o, 'Use lowercase letters, numbers and hyphens only', 'استخدم حروفاً صغيرة وأرقاماً وشرطات فقط')
    return true
  },
  hooks: {
    beforeValidate: [formatSlug(fallbackField)],
    beforeDuplicate: [({ value }) => (value ? `${value}-copy-${Date.now().toString(36)}` : value)],
  },
})
