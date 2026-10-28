import type { CollectionConfig } from 'payload'
import { adminOnly, staffOnly } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: { singular: 'Project category', plural: 'Project categories' },
  orderable: true,
  admin: { useAsTitle: 'title', group: 'Content', defaultColumns: ['title', 'slug'] },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: adminOnly },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [{ name: 'title', type: 'text', localized: true, required: true }, slugField()],
}
