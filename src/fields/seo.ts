import type { Field } from 'payload'
import { MetaDescriptionField, MetaImageField, MetaTitleField } from '@payloadcms/plugin-seo/fields'

/**
 * Per-language SEO tab: Google preview with live analysis, focus keyword, title, description,
 * sharing image, canonical override and indexing controls.
 */
export const seoTab = {
  name: 'meta',
  label: 'SEO',
  fields: [
    {
      name: 'searchPreview',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/SearchPreview#SearchPreview' } },
    },
    {
      name: 'keyword',
      type: 'text',
      localized: true,
      label: 'Focus keyword',
      admin: {
        description: 'The main phrase people would search for to find this page. Used only for the tips above; it is not published.',
      },
    },
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
    {
      type: 'collapsible',
      label: 'Advanced indexing',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Hide from search engines (noindex)',
          defaultValue: false,
          admin: { description: 'Removes the page from Google results and from the sitemap. Links on it are still followed.' },
        },
        {
          name: 'canonical',
          type: 'text',
          label: 'Canonical URL (optional)',
          admin: {
            description: 'Only when this content is duplicated elsewhere: the full URL of the original page. Leave empty normally.',
          },
          validate: (v: unknown) => !v || (typeof v === 'string' && /^https:\/\/[^\s]+$/.test(v)) || 'https://…',
        },
      ],
    },
  ] as Field[],
}
