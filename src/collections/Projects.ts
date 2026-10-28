import type { CollectionConfig } from 'payload'
import { sectionBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { seoTab } from '@/fields/seo'
import { previewUrlFor } from '@/lib/previewUrl'
import { archivedField, contentCollectionDefaults, featuredField } from './shared'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'completedAt', 'featured', '_status'],
    group: 'Content',
    preview: previewUrlFor('projects'),
    listSearchableFields: ['title', 'location', 'client'],
  },
  defaultSort: '-completedAt',
  ...contentCollectionDefaults(),
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'excerpt', type: 'textarea', localized: true, maxLength: 280 },
            { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Additional images shown in the project gallery.' },
            },
            { name: 'content', type: 'richText', localized: true },
            {
              name: 'details',
              type: 'array',
              label: 'Project facts',
              admin: { description: 'e.g. Area: 450 m², Duration: 4 months' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                    { name: 'value', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                  ],
                },
              ],
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
    { name: 'categories', type: 'relationship', relationTo: 'project-categories', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, admin: { position: 'sidebar', description: 'Services delivered on this project' } },
    { name: 'location', type: 'text', localized: true, admin: { position: 'sidebar' } },
    { name: 'client', type: 'text', localized: true, admin: { position: 'sidebar' } },
    { name: 'completedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' } } },
    featuredField,
    archivedField,
  ],
}
