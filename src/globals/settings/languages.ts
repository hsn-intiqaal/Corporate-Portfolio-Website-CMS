import type { Tab } from 'payload'

export const languagesTab: Tab = {
  label: 'Languages',
  fields: [
    {
      name: 'missingTranslation',
      type: 'radio',
      defaultValue: 'fallback',
      label: 'When a translation is missing',
      options: [
        { label: 'Show the other language with a notice', value: 'fallback' },
        { label: 'Hide the page until the translation is ready', value: 'hide' },
      ],
    },
    {
      name: 'arabicNumerals',
      type: 'radio',
      defaultValue: 'western',
      label: 'Numbers on the Arabic site',
      options: [
        { label: 'Western (0-9)', value: 'western' },
        { label: 'Eastern Arabic (٠-٩)', value: 'eastern' },
      ],
    },
  ],
}
