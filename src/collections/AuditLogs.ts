import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: { singular: 'Audit log entry', plural: 'Audit log' },
  admin: {
    group: 'Administration',
    useAsTitle: 'docTitle',
    defaultColumns: ['createdAt', 'action', 'entity', 'docTitle', 'user', 'ip'],
    hidden: ({ user }) => !(user?.roles as string[] | undefined)?.includes('admin'),
    description: 'Logins, publishing, deletions, user and settings changes. Read-only.',
  },
  defaultSort: '-createdAt',
  access: { read: adminOnly, create: () => false, update: () => false, delete: () => false },
  fields: [
    {
      name: 'action',
      type: 'select',
      required: true,
      index: true,
      options: ['create', 'update', 'publish', 'delete', 'login', 'settings'],
    },
    { name: 'entity', type: 'text', index: true },
    { name: 'docId', type: 'text' },
    { name: 'docTitle', type: 'text' },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'ip', type: 'text' },
  ],
}
