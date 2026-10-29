import type { CollectionConfig } from 'payload'
import { adminOnly, staffOnly } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const ArticleCategories: CollectionConfig = {
  slug: 'article-categories',
  labels: { singular: 'Article category', plural: 'Article categories' },
  orderable: true,
  admin: { useAsTitle: 'title', group: 'Articles', defaultColumns: ['title', 'slug'] },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: adminOnly },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Shown on the category page and used as its meta description.' },
    },
    slugField(),
  ],
}
