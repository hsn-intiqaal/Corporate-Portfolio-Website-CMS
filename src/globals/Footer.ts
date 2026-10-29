import type { GlobalConfig } from 'payload'
import { staffOnly } from '@/access'
import { linkField } from '@/fields/link'
import { auditGlobal } from '@/hooks/audit'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Navigation' },
  access: { read: () => true, update: staffOnly },
  hooks: { afterChange: [revalidateGlobal, auditGlobal] },
  fields: [
    { name: 'about', type: 'textarea', localized: true, label: 'Short company description' },
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'links', type: 'array', maxRows: 10, fields: [linkField()] },
      ],
    },
    { name: 'legalLinks', type: 'array', maxRows: 4, fields: [linkField()] },
  ],
}
