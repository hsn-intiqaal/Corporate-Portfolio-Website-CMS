import type { Field } from 'payload'
import { vmsg } from '@/fields/messages'

/** Section backgrounds. The actual colours come from Settings > Design. */
export const backgroundOptions = [
  { label: 'White', value: 'white' },
  { label: 'Light grey', value: 'light' },
  { label: 'Brand primary', value: 'primary' },
  { label: 'Dark', value: 'dark' },
  { label: 'Brand accent (soft)', value: 'accent' },
] as const

export type Background = (typeof backgroundOptions)[number]['value']

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
      validate: (v: unknown, o: unknown) =>
        !v ||
        (typeof v === 'string' && /^[a-z][a-z0-9-]*$/.test(v)) ||
        vmsg(o, 'Lowercase letters, numbers and hyphens', 'حروف إنجليزية صغيرة وأرقام وشرطات فقط'),
    },
  ],
}
