import type { Block } from 'payload'
import { linkField } from '@/fields/link'
import { sectionSettings } from '@/fields/palette'

export const iconOptions = ['check', 'star', 'users', 'building', 'calendar', 'award', 'globe', 'tools', 'shield', 'clock', 'drop', 'leaf'] as const

const heading = (name = 'title', required = false) =>
  ({ name, type: 'text', localized: true, required }) as const
const intro = { name: 'intro', type: 'textarea', localized: true } as const

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero banner', plural: 'Hero banners' },
  interfaceName: 'HeroBlock',
  fields: [
    heading('headline', true),
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      // Localized so the Arabic version can use its own image when text is embedded in it.
      localized: true,
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      fields: [linkField({ withAppearance: true })],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overlay',
          type: 'select',
          defaultValue: 'medium',
          options: ['none', 'light', 'medium', 'strong'].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
          admin: { width: '33%' },
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'start',
          options: [
            { label: 'Start (left in English, right in Arabic)', value: 'start' },
            { label: 'Centre', value: 'center' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Full screen', value: 'full' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    sectionSettings,
  ],
}

export const TextImageBlock: Block = {
  slug: 'textImage',
  labels: { singular: 'Text and image', plural: 'Text and image' },
  interfaceName: 'TextImageBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small label above the title' } },
    heading(),
    { name: 'content', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'end',
      options: [
        { label: 'Image after text (right in English, left in Arabic)', value: 'end' },
        { label: 'Image before text (left in English, right in Arabic)', value: 'start' },
      ],
    },
    { name: 'addButton', type: 'checkbox' },
    linkField({ name: 'button', required: false, withAppearance: true, condition: (_, s) => Boolean(s?.addButton) }),
    sectionSettings,
  ],
}

export const ServiceCardsBlock: Block = {
  slug: 'serviceCards',
  labels: { singular: 'Service cards', plural: 'Service cards' },
  interfaceName: 'ServiceCardsBlock',
  fields: [
    heading(),
    intro,
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'all',
      options: [
        { label: 'All services', value: 'all' },
        { label: 'Featured services', value: 'featured' },
        { label: 'Pick services', value: 'selected' },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'selected' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: ['2', '3', '4'],
          admin: { width: '50%' },
        },
        { name: 'showExcerpt', type: 'checkbox', defaultValue: true, admin: { width: '50%' } },
      ],
    },
    { name: 'showViewAll', type: 'checkbox', defaultValue: false, label: 'Show "View all" link' },
    sectionSettings,
  ],
}

export const ProjectGalleryBlock: Block = {
  slug: 'projectGallery',
  labels: { singular: 'Project gallery', plural: 'Project galleries' },
  interfaceName: 'ProjectGalleryBlock',
  fields: [
    heading(),
    intro,
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'latest',
      options: [
        { label: 'Latest projects', value: 'latest' },
        { label: 'Featured projects', value: 'featured' },
        { label: 'By category', value: 'category' },
        { label: 'Pick projects', value: 'selected' },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'selected' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'project-categories',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'category' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Carousel', value: 'carousel' },
          ],
          admin: { width: '50%' },
        },
        { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 24, admin: { width: '50%' } },
      ],
    },
    { name: 'showViewAll', type: 'checkbox', defaultValue: true, label: 'Show "View all" link' },
    sectionSettings,
  ],
}

export const ProjectHighlightBlock: Block = {
  slug: 'projectHighlight',
  labels: { singular: 'Project highlight', plural: 'Project highlights' },
  interfaceName: 'ProjectHighlightBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'project', type: 'relationship', relationTo: 'projects', required: true },
    { name: 'summary', type: 'textarea', localized: true, admin: { description: 'Leave empty to use the project excerpt' } },
    sectionSettings,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Statistics', plural: 'Statistics' },
  interfaceName: 'StatsBlock',
  fields: [
    heading(),
    intro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Use verified figures only.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'number', required: true, admin: { width: '25%' } },
            { name: 'prefix', type: 'text', admin: { width: '15%' } },
            { name: 'suffix', type: 'text', admin: { width: '15%', description: 'e.g. + or %' } },
            { name: 'icon', type: 'select', options: [...iconOptions], admin: { width: '45%' } },
          ],
        },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
    sectionSettings,
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  interfaceName: 'TestimonialsBlock',
  fields: [
    heading(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', localized: true, required: true, admin: { width: '50%' } },
            { name: 'role', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    sectionSettings,
  ],
}

export const PartnersBlock: Block = {
  slug: 'partners',
  labels: { singular: 'Partner logos', plural: 'Partner logos' },
  interfaceName: 'PartnersBlock',
  fields: [
    heading(),
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'url', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },
    { name: 'greyscale', type: 'checkbox', defaultValue: true },
    sectionSettings,
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  interfaceName: 'FAQBlock',
  fields: [
    heading(),
    intro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'textarea', localized: true, required: true },
      ],
    },
    { name: 'structuredData', type: 'checkbox', defaultValue: true, label: 'Add FAQ structured data for search engines' },
    sectionSettings,
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  interfaceName: 'CTABlock',
  fields: [
    heading('headline', true),
    { name: 'text', type: 'textarea', localized: true },
    linkField({ name: 'button', withAppearance: true }),
    { name: 'showWhatsApp', type: 'checkbox', label: 'Also show WhatsApp button (from Settings)' },
    sectionSettings,
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Contact section', plural: 'Contact sections' },
  interfaceName: 'ContactBlock',
  fields: [
    heading(),
    intro,
    {
      name: 'form',
      type: 'select',
      defaultValue: 'contact',
      options: [
        { label: 'Contact form', value: 'contact' },
        { label: 'Quotation request form', value: 'quote' },
        { label: 'No form', value: 'none' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'showDetails', type: 'checkbox', defaultValue: true, label: 'Show contact details', admin: { width: '50%' } },
        { name: 'showMap', type: 'checkbox', defaultValue: true, label: 'Show map (from Settings)', admin: { width: '50%' } },
      ],
    },
    sectionSettings,
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'content', type: 'richText', localized: true, required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (reading width)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    sectionSettings,
  ],
}

export const sectionBlocks: Block[] = [
  HeroBlock,
  TextImageBlock,
  ServiceCardsBlock,
  ProjectGalleryBlock,
  ProjectHighlightBlock,
  StatsBlock,
  TestimonialsBlock,
  PartnersBlock,
  FAQBlock,
  CTABlock,
  ContactBlock,
  RichTextBlock,
]
