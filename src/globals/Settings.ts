import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access'
import { auditGlobal } from '@/hooks/audit'
import { revalidateGlobal } from '@/hooks/revalidate'
import { brandTab } from './settings/brand'
import { designTab } from './settings/design'
import { contactTab } from './settings/contact'
import { seoTab } from './settings/seo'
import { languagesTab } from './settings/languages'
import { integrationsTab } from './settings/integrations'
import { leadsTab } from './settings/leads'

/** Site-wide settings, one file per tab in ./settings. Readable by the website, editable by administrators. */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Branding & settings',
  admin: { group: 'Administration' },
  access: { read: () => true, update: adminOnly },
  hooks: { afterChange: [revalidateGlobal, auditGlobal] },
  fields: [{ type: 'tabs', tabs: [brandTab, designTab, contactTab, seoTab, languagesTab, integrationsTab, leadsTab] }],
}
