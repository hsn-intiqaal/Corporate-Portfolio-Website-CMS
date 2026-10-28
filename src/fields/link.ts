import type { Condition, Field, GroupField, Validate } from 'payload'

export const linkableCollections = ['pages', 'services', 'projects', 'articles'] as const

const requireTarget: Validate = (_value, { siblingData }) => {
  const s = siblingData as { type?: string; reference?: unknown; url?: string }
  if (s.type === 'internal' && !s.reference) return 'Choose a page to link to'
  if (s.type === 'custom') {
    if (!s.url) return 'Enter a URL'
    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/.test(s.url)) return 'URL must start with https://, /, #, mailto: or tel:'
  }
  return true
}

type LinkOptions = { name?: string; label?: string; required?: boolean; withAppearance?: boolean; condition?: Condition }

/** A link to an internal published document or an external URL, with a localized label. */
export const linkField = ({ name = 'link', label, required = true, withAppearance = false, condition }: LinkOptions = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: { hideGutter: true, condition },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Internal page', value: 'internal' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        { name: 'newTab', type: 'checkbox', label: 'Open in new tab', admin: { width: '50%', style: { alignSelf: 'flex-end' } } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', localized: true, required, admin: { width: '50%' } },
        {
          name: 'reference',
          type: 'relationship',
          relationTo: [...linkableCollections],
          maxDepth: 1,
          // Only published documents can be linked, so menus never point at drafts.
          filterOptions: () => ({ _status: { equals: 'published' } }),
          admin: { width: '50%', condition: (_, s) => s?.type === 'internal' },
          validate: requireTarget,
        },
        {
          name: 'url',
          type: 'text',
          admin: { width: '50%', condition: (_, s) => s?.type === 'custom' },
          validate: requireTarget,
        },
      ],
    },
    ...(withAppearance
      ? [
          {
            name: 'appearance',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary button', value: 'primary' },
              { label: 'Secondary button', value: 'secondary' },
            ],
          } as Field,
        ]
      : []),
  ],
})
