import type { CollectionConfig } from 'payload'
import { iconOptions, sectionBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { seoTab } from '@/fields/seo'
import { previewUrlFor } from '@/lib/previewUrl'
import { archivedField, contentCollectionDefaults, featuredField } from './shared'

export const Services: CollectionConfig = {
  slug: 'services',
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Drag rows to set the display order on the website.',
    preview: previewUrlFor('services'),
  },
  ...contentCollectionDefaults(),
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'excerpt', type: 'textarea', localized: true, maxLength: 280, admin: { description: 'Short summary shown on service cards (max 280 characters).' } },
            {
              type: 'row',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '70%' } },
                { name: 'icon', type: 'select', options: [...iconOptions], admin: { width: '30%' } },
              ],
            },
            { name: 'content', type: 'richText', localized: true },
            {
              name: 'highlights',
              type: 'array',
              label: 'Key benefits',
              maxRows: 8,
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
            {
              name: 'layout',
              label: 'Extra sections (optional)',
              type: 'blocks',
              blocks: sectionBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
    featuredField,
    archivedField,
  ],
}
