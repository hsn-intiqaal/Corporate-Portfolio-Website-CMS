import type { Field, Tab } from 'payload'
import { colorValidator } from '@/theme/colors'
import { arabicFonts, colorPresets, fontSizeOptions, headingWeightOptions, latinFonts, radiusOptions, themeDefaults } from '@/theme/options'

// Custom colours start from the default palette so editors adjust them rather than starting blank.
const colorDefaults: Record<string, string> = {
  ...themeDefaults,
  primary: colorPresets.ocean.primary,
  accent: colorPresets.ocean.accent,
  // primaryDark has no default on purpose: empty means "derive from the primary colour".
}

const colorField = (name: string, label: string, description: string, validate = colorValidator()): Field => ({
  name,
  type: 'text',
  label,
  validate,
  defaultValue: colorDefaults[name],
  admin: {
    width: '33%',
    placeholder: '#0b5ea8',
    description,
    components: { afterInput: ['@/components/admin/ColorPicker#ColorPicker'] },
    condition: (data) => data?.theme?.colorMode === 'custom',
  },
})

const toOptions = <T extends Record<string, { label: string }>>(o: T) => Object.entries(o).map(([value, v]) => ({ value, label: v.label }))

/** Settings > Design: colours, fonts, shapes, header options and custom CSS. */
export const designTab: Tab = {
  label: 'Design',
  fields: [
    {
      name: 'theme',
      type: 'group',
      label: false,
      fields: [
        {
          type: 'collapsible',
          label: 'Colours',
          fields: [
            {
              name: 'colorMode',
              type: 'radio',
              defaultValue: 'preset',
              options: [
                { label: 'Ready-made palette', value: 'preset' },
                { label: 'Custom colours', value: 'custom' },
              ],
              admin: { layout: 'horizontal' },
            },
            {
              // Stored at the top level as "palette" for backwards compatibility.
              name: 'preset',
              type: 'select',
              defaultValue: 'ocean',
              options: toOptions(colorPresets),
              admin: { condition: (data) => data?.theme?.colorMode !== 'custom' },
            },
            {
              type: 'row',
              fields: [
                colorField(
                  'primary',
                  'Primary colour',
                  'Buttons, links, header accents. White text must be readable on it.',
                  colorValidator({ against: '#ffffff', min: 4.5, label: 'white text' }),
                ),
                colorField(
                  'primaryDark',
                  'Primary (dark shade)',
                  'Hover state and page title band. Empty = generated from the primary colour.',
                  colorValidator({ against: '#ffffff', min: 4.5, label: 'white text' }),
                ),
                colorField('accent', 'Accent colour', 'Icons and highlights.'),
              ],
            },
            {
              type: 'row',
              fields: [
                colorField(
                  'ink',
                  'Text colour',
                  'Headings and body text. Must be readable on the page background.',
                  colorValidator({ against: '#ffffff', min: 7, label: 'the white background' }),
                ),
                colorField(
                  'muted',
                  'Secondary text',
                  'Descriptions and captions.',
                  colorValidator({ against: '#ffffff', min: 4.5, label: 'the white background' }),
                ),
                colorField(
                  'dark',
                  'Dark sections & footer',
                  'Background of dark sections and the footer.',
                  colorValidator({ against: '#ffffff', min: 7, label: 'white text' }),
                ),
              ],
            },
            {
              type: 'row',
              fields: [
                colorField('soft', 'Light section background', 'Background of "light grey" sections.'),
                colorField('background', 'Page background', 'Usually white.'),
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Fonts',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'arabicFont',
                  type: 'select',
                  label: 'Arabic body font',
                  defaultValue: 'ibm-plex-arabic',
                  options: toOptions(arabicFonts),
                  admin: { width: '50%' },
                },
                {
                  name: 'arabicHeadingFont',
                  type: 'select',
                  label: 'Arabic heading font',
                  options: toOptions(arabicFonts),
                  admin: { width: '50%', description: 'Empty = same as body font' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'latinFont',
                  type: 'select',
                  label: 'English body font',
                  defaultValue: 'inter',
                  options: toOptions(latinFonts),
                  admin: { width: '50%' },
                },
                {
                  name: 'latinHeadingFont',
                  type: 'select',
                  label: 'English heading font',
                  options: toOptions(latinFonts),
                  admin: { width: '50%', description: 'Empty = same as body font' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'baseFontSize',
                  type: 'select',
                  label: 'Text size',
                  defaultValue: 'normal',
                  options: toOptions(fontSizeOptions),
                  admin: { width: '50%' },
                },
                {
                  name: 'headingWeight',
                  type: 'select',
                  label: 'Heading weight',
                  defaultValue: '700',
                  options: Object.entries(headingWeightOptions).map(([value, label]) => ({ value, label })),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Shapes',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'radius',
                  type: 'select',
                  label: 'Corners of cards and images',
                  defaultValue: 'medium',
                  options: toOptions(radiusOptions),
                  admin: { width: '50%' },
                },
                {
                  name: 'buttonShape',
                  type: 'select',
                  label: 'Button shape',
                  defaultValue: 'rounded',
                  options: [
                    { label: 'Same as corners', value: 'rounded' },
                    { label: 'Pill', value: 'pill' },
                    { label: 'Square', value: 'square' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Header & floating buttons',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'headerStyle',
                  type: 'select',
                  label: 'Header colour',
                  defaultValue: 'light',
                  options: [
                    { label: 'Light (white)', value: 'light' },
                    { label: 'Primary colour', value: 'brand' },
                    { label: 'Dark', value: 'dark' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'stickyHeader',
                  type: 'checkbox',
                  label: 'Keep header visible while scrolling',
                  defaultValue: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'showSearch', type: 'checkbox', label: 'Show search icon', defaultValue: true, admin: { width: '33%' } },
                {
                  name: 'showLanguageSwitcher',
                  type: 'checkbox',
                  label: 'Show language switcher',
                  defaultValue: true,
                  admin: { width: '33%' },
                },
                {
                  name: 'showWhatsAppButton',
                  type: 'checkbox',
                  label: 'Show floating WhatsApp button',
                  defaultValue: true,
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Advanced: custom CSS',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'customCss',
              type: 'code',
              label: 'Custom CSS',
              admin: {
                language: 'css',
                description:
                  'For small adjustments by someone who knows CSS. Applied to every page after the theme. Wrong CSS can break the layout: test on staging first.',
              },
            },
          ],
        },
      ],
    },
  ],
}
