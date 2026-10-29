import type { Tab } from 'payload'
import { adminOnlyField } from '@/access'
import { vmsg } from '@/fields/messages'

export const integrationsTab: Tab = {
  label: 'Integrations',
  fields: [
    {
      name: 'webhookUrl',
      type: 'text',
      label: 'CRM / automation webhook URL',
      access: { read: adminOnlyField },
      admin: {
        description:
          'New leads and confirmed newsletter subscribers are POSTed here as JSON (works with HubSpot, Zoho, Zapier, Make, n8n...). Each request is signed: header X-Signature = HMAC-SHA256(body, secret).',
      },
      validate: (v: unknown, o: unknown) =>
        !v || (typeof v === 'string' && /^https:\/\//.test(v)) || vmsg(o, 'Must start with https://', 'يجب أن يبدأ بـ https://'),
    },
    {
      name: 'webhookSecret',
      type: 'text',
      access: { read: adminOnlyField },
      admin: { description: 'Shared secret used to sign webhook requests.' },
    },
    {
      name: 'newsletterEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the newsletter signup in the footer',
    },
    {
      name: 'customScripts',
      type: 'array',
      label: 'Third-party scripts (live chat, tag manager, pixels)',
      admin: {
        description:
          'Paste the vendor snippet. Scripts marked "needs consent" load only after the visitor accepts cookies. Only add code from trusted vendors.',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'code', type: 'code', required: true, admin: { language: 'html' } },
        {
          type: 'row',
          fields: [
            {
              name: 'placement',
              type: 'select',
              defaultValue: 'body',
              options: [
                { label: 'End of page', value: 'body' },
                { label: 'Head', value: 'head' },
              ],
              admin: { width: '50%' },
            },
            { name: 'needsConsent', type: 'checkbox', defaultValue: true, label: 'Needs cookie consent', admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}
