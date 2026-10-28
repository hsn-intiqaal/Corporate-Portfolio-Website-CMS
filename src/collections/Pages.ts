import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOrStaff, staffOnly } from '@/access'
import { sectionBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { seoTab } from '@/fields/seo'
import { auditAfterChange, auditAfterDelete } from '@/hooks/audit'
import { publishGuard } from '@/hooks/publishGuard'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { slugRedirect } from '@/hooks/slugRedirect'
import { previewUrlFor } from '@/lib/previewUrl'
import { pageTemplates } from './pageTemplates'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'archived', 'updatedAt'],
    group: 'Content',
    description: 'Home, About, Contact, Request a quotation, legal and custom pages. The page with slug "home" is the homepage.',
    preview: previewUrlFor('pages'),
  },
  access: {
    read: publishedOrStaff,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
    maxPerDoc: 50,
  },
  hooks: {
    beforeChange: [
      publishGuard,
      ({ data, operation }) => {
        if (operation === 'create' && (!data.layout || data.layout.length === 0) && data.template && data.template !== 'blank') {
          data.layout = pageTemplates[data.template as keyof typeof pageTemplates] ?? []
        }
        return data
      },
    ],
    afterChange: [slugRedirect, revalidateAfterChange, auditAfterChange],
    afterDelete: [revalidateAfterDelete, auditAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              label: 'Sections',
              type: 'blocks',
              blocks: sectionBlocks,
              admin: { initCollapsed: true, description: 'Add, reorder, duplicate or remove sections. Each section can be hidden without deleting it.' },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    {
      name: 'template',
      type: 'select',
      defaultValue: 'blank',
      admin: { position: 'sidebar', description: 'Starting sections for a new page.', condition: (data) => !data?.id },
      options: [
        { label: 'Blank', value: 'blank' },
        { label: 'Landing page', value: 'landing' },
        { label: 'About page', value: 'about' },
        { label: 'Contact page', value: 'contact' },
        { label: 'Legal / text page', value: 'legal' },
      ],
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Archived pages are hidden from the website and sitemap but kept here.' },
    },
  ],
}
