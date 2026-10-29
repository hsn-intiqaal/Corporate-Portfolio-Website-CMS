/** Colour helpers used for validation in the dashboard and for generating the site theme. */
export const isHexColor = (v: unknown): v is string => typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)

const expand = (hex: string) => (hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex).toLowerCase()

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = expand(hex)
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
}

const toHex = (rgb: number[]) =>
  `#${rgb
    .map((c) =>
      Math.round(Math.max(0, Math.min(255, c)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`

/** WCAG relative luminance. */
export const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two colours (1 to 21). */
export const contrastRatio = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/** Mixes a colour towards black (amount 0-1). Used to derive the hover/dark shade. */
export const darken = (hex: string, amount = 0.3) => toHex(hexToRgb(hex).map((c) => c * (1 - amount)))

/**
 * Payload field validator: valid hex and (optionally) enough contrast against another colour,
 * so the editor cannot pick, for example, a light button colour that makes white text unreadable.
 */
export const colorValidator =
  (opts: { against?: string; min?: number; label?: string } = {}) =>
  (value: unknown): true | string => {
    if (value === null || value === undefined || value === '') return true
    if (!isHexColor(value)) return 'Use a hex colour such as #0b5ea8 / استخدم لوناً بصيغة ‎#0b5ea8'
    if (opts.against && opts.min) {
      const ratio = contrastRatio(value, opts.against)
      if (ratio < opts.min)
        return `Contrast with ${opts.label ?? opts.against} is ${ratio.toFixed(1)}:1; at least ${opts.min}:1 is needed for readable text. / التباين ${ratio.toFixed(1)}:1 أقل من المطلوب ${opts.min}:1 لقراءة النص بوضوح.`
    }
    return true
  }
