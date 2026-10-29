import type { Tab } from 'payload'
import { adminOnlyField } from '@/access'

export const leadsTab: Tab = {
  label: 'Leads & roles',
  fields: [
    {
      name: 'leadRecipients',
      type: 'array',
      label: 'Send new enquiries to',
      access: { read: adminOnlyField },
      fields: [{ name: 'email', type: 'email', required: true }],
    },
    {
      name: 'spamAlertThreshold',
      type: 'number',
      defaultValue: 30,
      min: 5,
      access: { read: adminOnlyField },
      admin: { description: 'Send an alert email when more than this many enquiries arrive within one hour.' },
    },
    {
      name: 'editorsCanPublish',
      type: 'checkbox',
      defaultValue: false,
      label: 'Editors can publish (otherwise they save drafts for an administrator to publish)',
    },
  ],
}
