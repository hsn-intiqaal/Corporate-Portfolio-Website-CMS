/**
 * Design options the dashboard can choose from. This file is plain data (no next/font imports) so
 * the CMS config can use it; the font loaders live in ./fonts.ts.
 */
export const arabicFonts = {
  'ibm-plex-arabic': { label: 'IBM Plex Sans Arabic', css: 'IBM Plex Sans Arabic' },
  cairo: { label: 'Cairo', css: 'Cairo' },
  tajawal: { label: 'Tajawal', css: 'Tajawal' },
  almarai: { label: 'Almarai', css: 'Almarai' },
  'noto-kufi': { label: 'Noto Kufi Arabic', css: 'Noto Kufi Arabic' },
  readex: { label: 'Readex Pro', css: 'Readex Pro' },
  'noto-naskh': { label: 'Noto Naskh Arabic (classic)', css: 'Noto Naskh Arabic' },
  changa: { label: 'Changa', css: 'Changa' },
} as const

export const latinFonts = {
  inter: { label: 'Inter', css: 'Inter' },
  poppins: { label: 'Poppins', css: 'Poppins' },
  montserrat: { label: 'Montserrat', css: 'Montserrat' },
  roboto: { label: 'Roboto', css: 'Roboto' },
  'open-sans': { label: 'Open Sans', css: 'Open Sans' },
  lato: { label: 'Lato', css: 'Lato' },
  manrope: { label: 'Manrope', css: 'Manrope' },
  playfair: { label: 'Playfair Display (serif)', css: 'Playfair Display' },
} as const

export type ArabicFont = keyof typeof arabicFonts
export type LatinFont = keyof typeof latinFonts

export const colorPresets = {
  ocean: { label: 'Ocean blue', primary: '#0b5ea8', primaryDark: '#083f73', accent: '#18a0c9' },
  teal: { label: 'Teal', primary: '#0f766e', primaryDark: '#0b4f4a', accent: '#14b8a6' },
  navy: { label: 'Navy & gold', primary: '#1e3a5f', primaryDark: '#122540', accent: '#c9a227' },
  emerald: { label: 'Emerald', primary: '#047857', primaryDark: '#064e3b', accent: '#84cc16' },
  graphite: { label: 'Graphite & orange', primary: '#334155', primaryDark: '#1e293b', accent: '#f97316' },
  burgundy: { label: 'Burgundy', primary: '#8b1e3f', primaryDark: '#5c1429', accent: '#d4a373' },
} as const

export type ColorPreset = keyof typeof colorPresets

export const radiusOptions = {
  none: { label: 'Square corners', lg: '0', xl: '0', '2xl': '0' },
  small: { label: 'Slightly rounded', lg: '0.25rem', xl: '0.375rem', '2xl': '0.5rem' },
  medium: { label: 'Rounded (default)', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem' },
  large: { label: 'Very rounded', lg: '0.75rem', xl: '1rem', '2xl': '1.5rem' },
} as const

export const fontSizeOptions = {
  small: { label: 'Small (15px)', px: 15 },
  normal: { label: 'Normal (16px)', px: 16 },
  large: { label: 'Large (17px)', px: 17 },
  xlarge: { label: 'Extra large (18px)', px: 18 },
} as const

export const headingWeightOptions = { '600': 'Semi-bold', '700': 'Bold', '800': 'Extra bold' } as const

/** Defaults used when a setting is empty (match the original design). */
export const themeDefaults = {
  ink: '#0f172a',
  muted: '#475569',
  soft: '#f5f7fa',
  background: '#ffffff',
  dark: '#0f172a',
} as const
