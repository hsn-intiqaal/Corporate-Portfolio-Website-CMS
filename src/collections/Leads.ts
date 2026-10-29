import type { CollectionConfig, Endpoint } from 'payload'
import { adminOnly, isAdmin } from '@/access'
import { auditAfterDelete } from '@/hooks/audit'
import { notifyNewLead } from '@/hooks/notifyLead'
import { toCsv } from '@/lib/csv'

const exportCsv: Endpoint = {
  path: '/export-csv',
  method: 'get',
  handler: async (req) => {
    if (!isAdmin(req)) return Response.json({ error: 'Forbidden' }, { status: 403 })
    const status = req.searchParams.get('status')
    const { docs } = await req.payload.find({
      collection: 'leads',
      where: status ? { status: { equals: status } } : undefined,
      limit: 10000,
      depth: 1,
      sort: '-createdAt',
      req,
      overrideAccess: false,
    })
    const columns = [
      'createdAt',
      'type',
      'status',
      'name',
      'email',
      'phone',
      'company',
      'service',
      'projectLocation',
      'timeline',
      'budget',
      'message',
      'locale',
      'sourcePage',
    ]
    const rows = docs.map((lead) =>
      columns.map((col) =>
        col === 'service'
          ? typeof lead.service === 'object'
            ? lead.service?.title
            : lead.service
          : (lead as unknown as Record<string, unknown>)[col],
      ),
    )
    const body = toCsv(columns, rows)
    return new Response(body, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  },
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'service', 'email', 'createdAt'],
    group: 'Leads',
    listSearchableFields: ['name', 'email', 'phone', 'company', 'message'],
    hidden: ({ user }) => !(user?.roles as string[] | undefined)?.includes('admin'),
    components: { beforeListTable: ['@/components/admin/LeadsExportButton#LeadsExportButton'] },
  },
  defaultSort: '-createdAt',
  // Leads are created only by the website forms (server-side, with overrideAccess) and are visible to administrators only.
  access: { read: adminOnly, create: () => false, update: adminOnly, delete: adminOnly },
  endpoints: [exportCsv],
  hooks: { afterChange: [notifyNewLead], afterDelete: [auditAfterDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          index: true,
          options: [
            { label: 'New', value: 'new' },
            { label: 'In progress', value: 'in-progress' },
            { label: 'Closed', value: 'closed' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Contact', value: 'contact' },
            { label: 'Quotation request', value: 'quote' },
            { label: 'Brochure download', value: 'brochure' },
          ],
          admin: { width: '33%', readOnly: true },
        },
        {
          name: 'locale',
          label: 'Visitor language',
          type: 'select',
          options: [
            { label: 'Arabic', value: 'ar' },
            { label: 'English', value: 'en' },
          ],
          admin: { width: '33%', readOnly: true },
        },
      ],
    },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users', admin: { description: 'Enquiry owner' } },
    {
      type: 'collapsible',
      label: 'Enquiry',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
            { name: 'company', type: 'text', admin: { readOnly: true, width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', required: true, admin: { readOnly: true, width: '50%' } },
            { name: 'phone', type: 'text', admin: { readOnly: true, width: '50%' } },
          ],
        },
        { name: 'subject', type: 'text', admin: { readOnly: true } },
        { name: 'service', type: 'relationship', relationTo: 'services', admin: { readOnly: true } },
        {
          type: 'row',
          fields: [
            { name: 'projectLocation', type: 'text', admin: { readOnly: true, width: '33%' } },
            { name: 'timeline', type: 'text', admin: { readOnly: true, width: '33%' } },
            { name: 'budget', type: 'text', admin: { readOnly: true, width: '33%' } },
          ],
        },
        { name: 'message', type: 'textarea', admin: { readOnly: true } },
        { name: 'attachments', type: 'upload', relationTo: 'lead-files', hasMany: true, admin: { readOnly: true } },
        {
          name: 'document',
          type: 'relationship',
          relationTo: 'documents',
          admin: { readOnly: true, condition: (d) => d?.type === 'brochure' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Internal notes',
      fields: [
        { name: 'note', type: 'textarea', required: true },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: { readOnly: true },
          hooks: { beforeChange: [({ value, req }) => value ?? req.user?.id] },
        },
        {
          name: 'at',
          type: 'date',
          admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
          hooks: { beforeChange: [({ value }) => value ?? new Date().toISOString()] },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Technical details',
      admin: { initCollapsed: true },
      fields: [
        { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
        {
          name: 'ipHash',
          type: 'text',
          index: true,
          admin: { readOnly: true, description: 'Hashed IP address used for rate limiting; the raw IP is not stored.' },
        },
        { name: 'userAgent', type: 'text', admin: { readOnly: true } },
        { name: 'consent', type: 'checkbox', admin: { readOnly: true } },
      ],
    },
  ],
}
