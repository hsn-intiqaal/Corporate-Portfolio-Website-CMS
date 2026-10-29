const settings = { hidden: false, background: 'white', spacing: 'normal' }

export const pageTemplates = {
  landing: [
    {
      blockType: 'hero',
      headline: 'Page headline',
      subheading: 'Short supporting sentence.',
      overlay: 'medium',
      alignment: 'start',
      height: 'large',
      settings,
    },
    {
      blockType: 'serviceCards',
      title: 'Our services',
      mode: 'featured',
      columns: '3',
      showExcerpt: true,
      settings: { ...settings, background: 'light' },
    },
    { blockType: 'projectGallery', title: 'Selected projects', mode: 'featured', layout: 'grid', limit: 6, showViewAll: true, settings },
    {
      blockType: 'cta',
      headline: 'Ready to start your project?',
      button: { type: 'custom', url: '/request-a-quote', label: 'Request a quotation', appearance: 'primary' },
      settings: { ...settings, background: 'primary' },
    },
  ],
  about: [
    { blockType: 'hero', headline: 'About us', overlay: 'medium', alignment: 'start', height: 'medium', settings },
    { blockType: 'textImage', title: 'Our story', imageSide: 'end', settings },
    {
      blockType: 'stats',
      title: 'In numbers',
      items: [{ value: 10, suffix: '+', label: 'Years of experience', icon: 'calendar' }],
      settings: { ...settings, background: 'light' },
    },
  ],
  contact: [{ blockType: 'contact', title: 'Contact us', form: 'contact', showDetails: true, showMap: true, settings }],
  legal: [{ blockType: 'richText', width: 'narrow', settings }],
} as const
