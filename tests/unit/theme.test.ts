import { describe, expect, it } from 'vitest'
import { colorValidator, contrastRatio, darken, isHexColor } from '@/theme/colors'
import { buildThemeCss, resolveColors, sanitizeCss } from '@/theme/css'
import { arabicFonts, latinFonts } from '@/theme/options'

const fontVars = {
  arabic: Object.fromEntries(Object.keys(arabicFonts).map((k) => [k, `--f-${k}`])),
  latin: Object.fromEntries(Object.keys(latinFonts).map((k) => [k, `--f-${k}`])),
}

describe('colour helpers', () => {
  it('validates hex colours and computes WCAG contrast', () => {
    expect(isHexColor('#0b5ea8')).toBe(true)
    expect(isHexColor('#fff')).toBe(true)
    expect(isHexColor('blue')).toBe(false)
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
    expect(darken('#ffffff', 0.5)).toBe('#808080')
  })
  it('rejects colours that would make white button text unreadable', () => {
    const v = colorValidator({ against: '#ffffff', min: 4.5 })
    expect(v('#0b5ea8')).toBe(true)
    expect(v('#ffeb3b')).toMatch(/Contrast/)
    expect(v('not-a-colour')).toMatch(/hex/)
    expect(v('')).toBe(true)
  })
})

describe('theme CSS', () => {
  it('uses the preset palette by default', () => {
    expect(resolveColors({ colorMode: 'preset', preset: 'teal' }).primary).toBe('#0f766e')
    expect(resolveColors(null).primary).toBe('#0b5ea8')
  })
  it('applies custom colours and derives the dark shade when empty', () => {
    const c = resolveColors({ colorMode: 'custom', primary: '#336699' })
    expect(c.primary).toBe('#336699')
    expect(c.primaryDark).toBe(darken('#336699', 0.32))
  })
  it('ignores invalid custom values', () => {
    expect(resolveColors({ colorMode: 'custom', primary: 'red;}body{display:none' }).primary).toBe('#0b5ea8')
  })
  it('maps fonts, size, radius and button shape to CSS variables', () => {
    const css = buildThemeCss(
      { arabicFont: 'cairo', latinHeadingFont: 'playfair', baseFontSize: 'large', radius: 'none', buttonShape: 'pill' },
      fontVars,
    )
    expect(css).toContain('--font-ar-body:var(--f-cairo)')
    expect(css).toContain('--font-ar-heading:var(--f-cairo)')
    expect(css).toContain('--font-la-body:var(--f-inter)')
    expect(css).toContain('--font-la-heading:var(--f-playfair)')
    expect(css).toContain('html{font-size:17px}')
    expect(css).toContain('--radius-2xl:0')
    expect(css).toContain('--button-radius:9999px')
  })
  it('cannot break out of the style element with custom CSS', () => {
    expect(sanitizeCss('a{color:red}</style><script>alert(1)</script>')).not.toMatch(/<\/style/i)
    expect(buildThemeCss({ customCss: '</STYLE><b>' }, fontVars)).not.toMatch(/<\/style/i)
  })
})
