import type { CollectionConfig } from 'payload'
import { adminOnly, staffOnly } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name', group: 'Articles', defaultColumns: ['name', 'role', 'updatedAt'] },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: adminOnly },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'role', type: 'text', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea', localized: true },
    { name: 'linkedin', type: 'text' },
    slugField('name'),
  ],
}
