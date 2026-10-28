import type { CollectionConfig } from 'payload'
import { adminOnly, adminOnlyField, adminOrSelf, isAdmin } from '@/access'
import { writeAudit, auditAfterDelete } from '@/hooks/audit'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
    group: 'Administration',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8-hour sessions
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15-minute lockout after 5 failed attempts
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
  },
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        await writeAudit({ ...req, user: { ...user, collection: 'users' } } as typeof req, {
          action: 'login',
          entity: 'users',
          docId: user.id,
          docTitle: user.email,
        })
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (req.user && !req.context?.skipAudit) {
          await writeAudit(req, { action: operation, entity: 'users', docId: doc.id, docTitle: doc.email })
        }
        return doc
      },
    ],
    afterDelete: [auditAfterDelete],
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first account created through the admin UI becomes an administrator.
        if (operation === 'create' && !req.user) {
          const { totalDocs } = await req.payload.count({ collection: 'users', req, overrideAccess: true })
          if (totalDocs === 0) data.roles = ['admin']
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: adminOnlyField, update: adminOnlyField },
      admin: {
        description:
          'Administrator: publishing, deleting, users, leads and settings. Editor: content drafts (and publishing if enabled in Settings).',
      },
    },
    {
      name: 'receivesLeadEmails',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Administrators only: also send new enquiry notifications to this user.', condition: (_, __, { user }) => isAdmin({ user } as never) },
    },
  ],
  timestamps: true,
}
