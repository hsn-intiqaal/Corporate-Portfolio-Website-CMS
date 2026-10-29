import type { Tab } from 'payload'

const days = [
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
]
const time = (v: unknown) => !v || (typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v)) || 'HH:MM (24h), e.g. 08:30'

/** Settings > SEO: defaults for every page, search-engine verification and the business details Google shows. */
export const seoTab: Tab = {
  label: 'SEO defaults',
  fields: [
    {
      type: 'collapsible',
      label: 'Titles & descriptions',
      fields: [
        { name: 'defaultTitle', type: 'text', localized: true, admin: { description: 'Used on pages without their own SEO title' } },
        { name: 'titleSuffix', type: 'text', localized: true, admin: { description: 'Appended to page titles, e.g. " | Company"' } },
        {
          name: 'siteAlternateName',
          type: 'text',
          localized: true,
          admin: { description: 'Another name people use for the company (acronym or short name). Helps Google show the right site name.' },
        },
        { name: 'defaultDescription', type: 'textarea', localized: true },
        { name: 'defaultImage', type: 'upload', relationTo: 'media', admin: { description: 'Default social sharing image (1200×630)' } },
        { name: 'twitterHandle', type: 'text', admin: { description: 'X (Twitter) account for link cards, e.g. @company' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Search engine verification & indexing',
      fields: [
        {
          name: 'googleSiteVerification',
          type: 'text',
          admin: { description: 'Google Search Console HTML-tag verification code (content value only)' },
        },
        {
          name: 'bingSiteVerification',
          type: 'text',
          admin: { description: 'Bing Webmaster Tools verification code (msvalidate.01 content value)' },
        },
        { name: 'yandexVerification', type: 'text', admin: { description: 'Yandex Webmaster verification code (optional)' } },
        {
          name: 'indexNow',
          type: 'checkbox',
          defaultValue: true,
          label: 'Notify Bing and other IndexNow search engines when content is published',
          admin: { description: 'Google does not support IndexNow; it discovers changes through the sitemap.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Business details for Google',
      admin: { description: 'Shown to Google as structured data (knowledge panel, local results). Fill in only what is accurate.' },
      fields: [
        {
          name: 'organizationType',
          type: 'select',
          defaultValue: 'Organization',
          options: [
            { label: 'Organization', value: 'Organization' },
            { label: 'Local business (has a public address)', value: 'LocalBusiness' },
            { label: 'Home & construction business', value: 'HomeAndConstructionBusiness' },
            { label: 'Professional service', value: 'ProfessionalService' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'legalName', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'foundingYear', type: 'number', min: 1800, max: 2100, admin: { width: '25%' } },
            { name: 'priceRange', type: 'text', admin: { width: '25%', description: 'e.g. $$ (local businesses)' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'streetAddress', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'city', type: 'text', localized: true, admin: { width: '25%' } },
            { name: 'region', type: 'text', localized: true, admin: { width: '25%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'postalCode', type: 'text', admin: { width: '25%' } },
            { name: 'countryCode', type: 'text', defaultValue: 'SA', admin: { width: '25%', description: 'Two letters, e.g. SA, EG, AE' } },
            { name: 'latitude', type: 'number', admin: { width: '25%', step: 0.000001 } },
            { name: 'longitude', type: 'number', admin: { width: '25%', step: 0.000001 } },
          ],
        },
        {
          name: 'areaServed',
          type: 'text',
          localized: true,
          admin: { description: 'Cities or countries you serve, separated by commas' },
        },
        {
          name: 'openingHours',
          type: 'array',
          label: 'Opening hours',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'days', type: 'select', hasMany: true, required: true, options: days, admin: { width: '50%' } },
                { name: 'opens', type: 'text', required: true, validate: time, admin: { width: '25%', placeholder: '08:00' } },
                { name: 'closes', type: 'text', required: true, validate: time, admin: { width: '25%', placeholder: '17:00' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
