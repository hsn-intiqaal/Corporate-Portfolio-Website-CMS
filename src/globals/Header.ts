import type { GlobalConfig } from 'payload'
import { staffOnly } from '@/access'
import { linkField } from '@/fields/link'
import { auditGlobal } from '@/hooks/audit'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header menu',
  admin: { group: 'Navigation' },
  access: { read: () => true, update: staffOnly },
  hooks: { afterChange: [revalidateGlobal, auditGlobal] },
  fields: [
    {
      name: 'navItems',
      label: 'Menu items',
      type: 'array',
      maxRows: 8,
      admin: { description: 'Drag to reorder. Labels are entered separately for Arabic and English (use the language switch at the top).' },
      fields: [
        linkField(),
        {
          name: 'children',
          label: 'Dropdown items (optional)',
          type: 'array',
          maxRows: 12,
          fields: [linkField()],
        },
      ],
    },
    { name: 'showQuoteButton', type: 'checkbox', defaultValue: true, label: 'Show "Request a quotation" button' },
    linkField({ name: 'quoteButton', label: 'Quote button (leave empty for /request-a-quote)', required: false, condition: (d) => Boolean(d?.showQuoteButton) }),
  ],
}
