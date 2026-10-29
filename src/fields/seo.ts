import type { Field } from 'payload'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'

/** Per-language SEO fields (title, description, social image) shown in their own tab. */
export const seoTab = {
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({ titlePath: 'meta.title', descriptionPath: 'meta.description', imagePath: 'meta.image' }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
    PreviewField({ hasGenerateFn: true, titlePath: 'meta.title', descriptionPath: 'meta.description' }),
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Hide from search engines (noindex)',
      defaultValue: false,
    },
  ] as Field[],
}
