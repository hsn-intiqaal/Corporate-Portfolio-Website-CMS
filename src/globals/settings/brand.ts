import type { Tab } from 'payload'

export const brandTab: Tab = {
  label: 'Brand',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'siteName', type: 'text', localized: true, required: true, admin: { width: '50%' } },
        { name: 'tagline', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'For light backgrounds' } },
        { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'For dark backgrounds (optional)' } },
        { name: 'favicon', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Square PNG, 512×512' } },
      ],
    },
  ],
}
