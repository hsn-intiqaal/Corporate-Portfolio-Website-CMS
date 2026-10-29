import { darken, isHexColor } from './colors'
import {
  arabicFonts,
  colorPresets,
  fontSizeOptions,
  latinFonts,
  radiusOptions,
  themeDefaults,
  type ArabicFont,
  type ColorPreset,
  type LatinFont,
} from './options'

export type ThemeSettings = {
  colorMode?: 'preset' | 'custom' | null
  preset?: string | null
  primary?: string | null
  primaryDark?: string | null
  accent?: string | null
  ink?: string | null
  muted?: string | null
  dark?: string | null
  soft?: string | null
  background?: string | null
  arabicFont?: string | null
  arabicHeadingFont?: string | null
  latinFont?: string | null
  latinHeadingFont?: string | null
  baseFontSize?: string | null
  headingWeight?: string | null
  radius?: string | null
  buttonShape?: string | null
  customCss?: string | null
}

const pick = <T extends object>(map: T, key: unknown, fallback: keyof T): keyof T =>
  typeof key === 'string' && key in map ? (key as keyof T) : fallback
const color = (v: unknown, fallback: string) => (isHexColor(v) ? v : fallback)

/** Resolved brand colours (also used for the web app manifest theme colour). */
export const resolveColors = (t: ThemeSettings | null | undefined) => {
  const preset = colorPresets[pick(colorPresets, t?.preset, 'ocean') as ColorPreset]
  const custom = t?.colorMode === 'custom'
  const primary = custom ? color(t?.primary, preset.primary) : preset.primary
  return {
    primary,
    primaryDark: custom ? color(t?.primaryDark, darken(primary, 0.32)) : preset.primaryDark,
    accent: custom ? color(t?.accent, preset.accent) : preset.accent,
    ink: custom ? color(t?.ink, themeDefaults.ink) : themeDefaults.ink,
    muted: custom ? color(t?.muted, themeDefaults.muted) : themeDefaults.muted,
    dark: custom ? color(t?.dark, themeDefaults.dark) : themeDefaults.dark,
    soft: custom ? color(t?.soft, themeDefaults.soft) : themeDefaults.soft,
    background: custom ? color(t?.background, themeDefaults.background) : themeDefaults.background,
  }
}

/** Custom CSS cannot close the <style> element it is placed in. */
export const sanitizeCss = (css: string | null | undefined) => (css ?? '').replace(/<\/?\s*style/gi, '').replace(/<!--|-->/g, '')

/**
 * Builds the CSS variables for the theme chosen in Settings > Design. Font CSS variables
 * (`--f-*`) are defined by next/font in ./fonts.ts.
 */
export function buildThemeCss(
  t: ThemeSettings | null | undefined,
  fontVars: { arabic: Record<string, string>; latin: Record<string, string> },
) {
  const c = resolveColors(t)
  const arBody = pick(arabicFonts, t?.arabicFont, 'ibm-plex-arabic') as ArabicFont
  const arHead = pick(arabicFonts, t?.arabicHeadingFont, arBody) as ArabicFont
  const laBody = pick(latinFonts, t?.latinFont, 'inter') as LatinFont
  const laHead = pick(latinFonts, t?.latinHeadingFont, laBody) as LatinFont
  const radius = radiusOptions[pick(radiusOptions, t?.radius, 'medium') as keyof typeof radiusOptions]
  const size = fontSizeOptions[pick(fontSizeOptions, t?.baseFontSize, 'normal') as keyof typeof fontSizeOptions].px
  const weight = ['600', '700', '800'].includes(t?.headingWeight ?? '') ? t?.headingWeight : '700'
  const button = t?.buttonShape === 'pill' ? '9999px' : t?.buttonShape === 'square' ? '0' : radius.lg

  const vars = [
    `--brand-primary:${c.primary}`,
    `--brand-primary-dark:${c.primaryDark}`,
    `--brand-accent:${c.accent}`,
    `--theme-ink:${c.ink}`,
    `--theme-muted:${c.muted}`,
    `--theme-dark:${c.dark}`,
    `--theme-soft:${c.soft}`,
    `--theme-bg:${c.background}`,
    `--radius-lg:${radius.lg}`,
    `--radius-xl:${radius.xl}`,
    `--radius-2xl:${radius['2xl']}`,
    `--button-radius:${button}`,
    `--heading-weight:${weight}`,
    `--font-ar-body:var(${fontVars.arabic[arBody]})`,
    `--font-ar-heading:var(${fontVars.arabic[arHead]})`,
    `--font-la-body:var(${fontVars.latin[laBody]})`,
    `--font-la-heading:var(${fontVars.latin[laHead]})`,
  ]
  return `:root{${vars.join(';')}}html{font-size:${size}px}${sanitizeCss(t?.customCss)}`
}
