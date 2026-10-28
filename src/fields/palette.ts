import type { Field } from 'payload'

/** Approved section backgrounds. Brand colours themselves are chosen in Settings. */
export const backgroundOptions = [
  { label: 'White', value: 'white' },
  { label: 'Light grey', value: 'light' },
  { label: 'Brand primary', value: 'primary' },
  { label: 'Dark', value: 'dark' },
  { label: 'Brand accent (soft)', value: 'accent' },
] as const

export type Background = (typeof backgroundOptions)[number]['value']

/** Approved brand palettes. Adding a new palette is a developer change, which protects design quality. */
export const brandPalettes = {
  ocean: { label: 'Ocean blue', primary: '#0b5ea8', primaryDark: '#083f73', accent: '#18a0c9' },
  teal: { label: 'Teal', primary: '#0f766e', primaryDark: '#0b4f4a', accent: '#14b8a6' },
  navy: { label: 'Navy & gold', primary: '#1e3a5f', primaryDark: '#122540', accent: '#c9a227' },
  emerald: { label: 'Emerald', primary: '#047857', primaryDark: '#064e3b', accent: '#84cc16' },
  graphite: { label: 'Graphite & orange', primary: '#334155', primaryDark: '#1e293b', accent: '#f97316' },
  burgundy: { label: 'Burgundy', primary: '#8b1e3f', primaryDark: '#5c1429', accent: '#d4a373' },
} as const

export type BrandPalette = keyof typeof brandPalettes

export const sectionSettings: Field = {
  name: 'settings',
  type: 'group',
  label: 'Section settings',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'hidden', type: 'checkbox', label: 'Hide this section', defaultValue: false },
        {
          name: 'background',
          type: 'select',
          defaultValue: 'white',
          options: [...backgroundOptions],
          admin: { width: '33%' },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'anchor',
      type: 'text',
      admin: { description: 'Optional ID for in-page links, e.g. "faq" makes #faq work.' },
      validate: (v: unknown) =>
        !v || (typeof v === 'string' && /^[a-z][a-z0-9-]*$/.test(v)) || 'Lowercase letters, numbers and hyphens',
    },
  ],
}
