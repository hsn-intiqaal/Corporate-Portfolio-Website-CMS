import type { Field, FieldHook } from 'payload'

export const slugify = (value: string): string =>
  value
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, '')
    .replace(/[\s_]+/g, '-')
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
  validate: (value: unknown) => {
    if (typeof value !== 'string' || !value) return 'Slug is required'
    if (!/^[a-z0-9؀-ۿ]+(?:-[a-z0-9؀-ۿ]+)*$/.test(value))
      return 'Use lowercase letters, numbers and hyphens only'
    return true
  },
  hooks: {
    beforeValidate: [formatSlug(fallbackField)],
    beforeDuplicate: [({ value }) => (value ? `${value}-copy-${Date.now().toString(36)}` : value)],
  },
})
