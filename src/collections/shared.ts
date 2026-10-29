import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOrStaff, staffOnly } from '@/access'
import { auditAfterChange, auditAfterDelete } from '@/hooks/audit'
import { publishGuard } from '@/hooks/publishGuard'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { slugRedirect } from '@/hooks/slugRedirect'
import { pingIndexNow } from '@/lib/indexnow'

/** Access, versions and hooks shared by the published content collections. */
export const contentCollectionDefaults = (): Pick<CollectionConfig, 'access' | 'versions' | 'hooks'> => ({
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: adminOnly },
  versions: { drafts: { autosave: { interval: 2000 }, schedulePublish: true }, maxPerDoc: 50 },
  hooks: {
    beforeChange: [publishGuard],
    afterChange: [slugRedirect, revalidateAfterChange, auditAfterChange, pingIndexNow],
    afterDelete: [revalidateAfterDelete, auditAfterDelete],
  },
})

export const archivedField = {
  name: 'archived',
  type: 'checkbox',
  defaultValue: false,
  label: 'Hidden / archived',
  admin: { position: 'sidebar', description: 'Hidden items are removed from the website and sitemap but kept here.' },
} as const

export const featuredField = {
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
  admin: { position: 'sidebar', description: 'Show in "featured" sections on the homepage.' },
} as const
