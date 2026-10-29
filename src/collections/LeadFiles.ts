import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { adminOnly } from '@/access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const MAX_LEAD_FILE_SIZE = 5 * 1024 * 1024
export const LEAD_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

/** Private attachments uploaded with quotation requests. Never publicly readable. */
export const LeadFiles: CollectionConfig = {
  slug: 'lead-files',
  labels: { singular: 'Lead attachment', plural: 'Lead attachments' },
  admin: { group: 'Leads', hidden: ({ user }) => !(user?.roles as string[] | undefined)?.includes('admin') },
  access: {
    read: adminOnly,
    create: adminOnly, // public uploads go through the server action with overrideAccess
    update: adminOnly,
    delete: adminOnly,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../lead-files'),
    mimeTypes: LEAD_FILE_TYPES,
    disableLocalStorage: false,
  },
  fields: [],
}
