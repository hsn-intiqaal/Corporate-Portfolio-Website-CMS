import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Access } from 'payload'
import { adminOnly, isStaff, staffOnly } from '@/access'
import { verifyToken } from '@/lib/signing'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Staff see everything; visitors only the single document named in a valid signed `?t=` token. */
const readWithToken: Access = ({ req }) => {
  if (isStaff(req)) return true
  const token = req.searchParams?.get('t')
  const id = token ? verifyToken(token) : null
  return id ? { id: { equals: Number(id) } } : false
}

/**
 * Downloadable files (company profile, brochures, catalogues). Files are private: visitors get a
 * time-limited signed link after filling the "Download brochure" form, or a direct link when the
 * document is marked as public.
 */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Downloadable document', plural: 'Downloadable documents' },
  admin: { useAsTitle: 'title', group: 'Content', defaultColumns: ['title', 'filename', 'gated', 'updatedAt'] },
  access: { read: readWithToken, create: staffOnly, update: staffOnly, delete: adminOnly },
  upload: {
    staticDir: path.resolve(dirname, '../../documents'),
    mimeTypes: [
      'application/pdf',
      'application/zip',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'gated',
      type: 'checkbox',
      defaultValue: true,
      label: 'Ask for contact details before download',
      admin: { description: 'Unchecked: anyone with the page can download directly.' },
    },
  ],
}
