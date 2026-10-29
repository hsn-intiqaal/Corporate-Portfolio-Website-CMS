import type { Tab } from 'payload'
import { vmsg } from '@/fields/messages'

export const contactTab: Tab = {
  label: 'Contact',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '33%' } },
        { name: 'whatsapp', type: 'text', admin: { width: '33%', description: 'International format, digits only, e.g. 9665XXXXXXXX' } },
        { name: 'email', type: 'email', admin: { width: '33%' } },
      ],
    },
    { name: 'address', type: 'textarea', localized: true },
    { name: 'workingHours', type: 'text', localized: true },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: { description: 'Google Maps → Share → Embed a map → copy only the src="…" URL.' },
      validate: (v: unknown, o: unknown) =>
        !v ||
        (typeof v === 'string' && /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(v)) ||
        vmsg(
          o,
          'Paste a Google Maps embed URL (https://www.google.com/maps/embed?...)',
          'الصق رابط تضمين خرائط جوجل (https://www.google.com/maps/embed?...)',
        ),
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: ['linkedin', 'x', 'instagram', 'facebook', 'youtube', 'tiktok', 'snapchat'],
              admin: { width: '30%' },
            },
            { name: 'url', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
  ],
}
