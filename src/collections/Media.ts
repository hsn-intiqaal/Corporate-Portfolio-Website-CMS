import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { adminOnly, staffOnly } from '@/access'
import { auditAfterDelete } from '@/hooks/audit'
import { vmsg } from '@/fields/messages'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'] },
  access: {
    read: () => true,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  hooks: { afterDelete: [auditAfterDelete] },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'image/gif'],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre', formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 800, height: 600, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1600, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: { format: 'jpeg', options: { quality: 80 } } },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for visitors using screen readers and for search engines. Required.' },
      validate: (value: unknown, o: unknown) =>
        (typeof value === 'string' && value.trim().length >= 3) ||
        vmsg(o, 'Alternative text is required (at least 3 characters)', 'النص البديل مطلوب (3 أحرف على الأقل)'),
    },
    { name: 'caption', type: 'text', localized: true },
  ],
}
