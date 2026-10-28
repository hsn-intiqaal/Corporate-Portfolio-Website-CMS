import type { CollectionConfig } from 'payload'
import { sectionBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { seoTab } from '@/fields/seo'
import { readingMinutes } from '@/lib/lexical'
import { previewUrlFor } from '@/lib/previewUrl'
import { archivedField, contentCollectionDefaults, featuredField } from './shared'

const defaults = contentCollectionDefaults()

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status', 'featured'],
    group: 'Articles',
    description: 'Blog / news articles. Published articles appear at /ar/blog and /en/blog, in the sitemap and in the RSS feed.',
    preview: previewUrlFor('articles'),
    listSearchableFields: ['title', 'excerpt'],
  },
  defaultSort: '-publishedAt',
  ...defaults,
  hooks: {
    ...defaults.hooks,
    beforeChange: [
      ...(defaults.hooks?.beforeChange ?? []),
      ({ data, originalDoc }) => {
        // Publication date defaults to the first time the article is published.
        if (data._status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) data.publishedAt = new Date().toISOString()
        if (data.content) data.readingTime = readingMinutes(data.content)
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'excerpt', type: 'textarea', localized: true, maxLength: 300, admin: { description: 'Summary for article cards, RSS and the default meta description.' } },
            { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
            { name: 'content', type: 'richText', localized: true, required: true },
            {
              name: 'layout',
              label: 'Extra sections after the article (optional)',
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
    { name: 'publishedAt', type: 'date', index: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' }, description: 'Set automatically on first publish; can be back-dated.' } },
    { name: 'author', type: 'relationship', relationTo: 'authors', admin: { position: 'sidebar' } },
    { name: 'categories', type: 'relationship', relationTo: 'article-categories', hasMany: true, admin: { position: 'sidebar' } },
    {
      // An array of localized rows (rather than a localized hasMany text field) so tags are searchable.
      name: 'tags',
      type: 'array',
      admin: { position: 'sidebar', description: 'Keywords: shown on the article, used by site search and as meta keywords.', initCollapsed: true },
      fields: [{ name: 'tag', type: 'text', localized: true, required: true }],
    },
    { name: 'relatedArticles', type: 'relationship', relationTo: 'articles', hasMany: true, maxRows: 3, admin: { position: 'sidebar', description: 'Leave empty to pick automatically from the same category.' }, filterOptions: ({ id }) => ({ id: { not_equals: id } }) },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'readingTime', type: 'number', admin: { position: 'sidebar', readOnly: true, description: 'Minutes, calculated automatically.' } },
    featuredField,
    archivedField,
  ],
}
