import type { CollectionConfig, Endpoint } from 'payload'
import { adminOnly, isAdmin } from '@/access'

const exportCsv: Endpoint = {
  path: '/export-csv',
  method: 'get',
  handler: async (req) => {
    if (!isAdmin(req)) return Response.json({ error: 'Forbidden' }, { status: 403 })
    const { docs } = await req.payload.find({ collection: 'subscribers', where: { status: { equals: 'confirmed' } }, limit: 50000, depth: 0, req, overrideAccess: false })
    const cell = (v: unknown) => `"${String(v ?? '').replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')}"`
    const rows = docs.map((s) => [s.email, s.name, s.locale, s.confirmedAt].map(cell).join(','))
    return new Response('﻿' + ['email,name,locale,confirmedAt', ...rows].join('\r\n'), {
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="subscribers.csv"', 'Cache-Control': 'no-store' },
    })
  },
}

/** Newsletter subscribers with double opt-in. Export the confirmed list to your email marketing tool. */
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Newsletter subscriber', plural: 'Newsletter subscribers' },
  admin: {
    useAsTitle: 'email',
    group: 'Leads',
    defaultColumns: ['email', 'status', 'locale', 'createdAt'],
    hidden: ({ user }) => !(user?.roles as string[] | undefined)?.includes('admin'),
    components: { beforeListTable: ['@/components/admin/SubscribersExportButton#SubscribersExportButton'] },
  },
  access: { read: adminOnly, create: () => false, update: adminOnly, delete: adminOnly },
  endpoints: [exportCsv],
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'name', type: 'text' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Pending confirmation', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    { name: 'locale', type: 'select', options: ['ar', 'en'] },
    { name: 'confirmedAt', type: 'date', admin: { readOnly: true } },
    { name: 'token', type: 'text', index: true, admin: { hidden: true }, access: { read: () => false } },
    { name: 'ipHash', type: 'text', index: true, admin: { hidden: true } },
    { name: 'source', type: 'text', admin: { readOnly: true } },
  ],
}
