import type { Tab } from 'payload'

export const seoTab: Tab = {
  label: 'SEO defaults',
  fields: [
    { name: 'defaultTitle', type: 'text', localized: true, admin: { description: 'Used on pages without their own SEO title' } },
    { name: 'titleSuffix', type: 'text', localized: true, admin: { description: 'Appended to page titles, e.g. " | Company"' } },
    { name: 'defaultDescription', type: 'textarea', localized: true },
    { name: 'defaultImage', type: 'upload', relationTo: 'media', admin: { description: 'Default social sharing image (1200×630)' } },
    {
      name: 'organizationType',
      type: 'select',
      defaultValue: 'Organization',
      options: [
        { label: 'Organization', value: 'Organization' },
        { label: 'Local business (has a public address)', value: 'LocalBusiness' },
      ],
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      admin: { description: 'Google Search Console HTML-tag verification code (content value only)' },
    },
  ],
}
