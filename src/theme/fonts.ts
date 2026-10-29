/**
 * Self-hosted Google fonts available in the dashboard. Every font is declared here because next/font
 * must know them at build time; only the font the site actually uses is downloaded by visitors
 * (browsers fetch a font file only when a rule uses it).
 */
import {
  Almarai,
  Cairo,
  Changa,
  IBM_Plex_Sans_Arabic,
  Inter,
  Lato,
  Manrope,
  Montserrat,
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Open_Sans,
  Playfair_Display,
  Poppins,
  Readex_Pro,
  Roboto,
  Tajawal,
} from 'next/font/google'
import type { ArabicFont, LatinFont } from './options'

// next/font requires literal options in every call (no shared variables or spreads).
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--f-ibm-plex-arabic',
  display: 'swap',
  preload: true,
})
const cairo = Cairo({ subsets: ['arabic'], variable: '--f-cairo', display: 'swap', preload: false })
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--f-tajawal',
  display: 'swap',
  preload: false,
})
const almarai = Almarai({ subsets: ['arabic'], weight: ['400', '700', '800'], variable: '--f-almarai', display: 'swap', preload: false })
const notoKufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--f-noto-kufi', display: 'swap', preload: false })
const readex = Readex_Pro({ subsets: ['arabic'], variable: '--f-readex', display: 'swap', preload: false })
const notoNaskh = Noto_Naskh_Arabic({ subsets: ['arabic'], variable: '--f-noto-naskh', display: 'swap', preload: false })
const changa = Changa({ subsets: ['arabic'], variable: '--f-changa', display: 'swap', preload: false })

const inter = Inter({ subsets: ['latin'], variable: '--f-inter', display: 'swap', preload: true })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--f-poppins',
  display: 'swap',
  preload: false,
})
const montserrat = Montserrat({ subsets: ['latin'], variable: '--f-montserrat', display: 'swap', preload: false })
const roboto = Roboto({ subsets: ['latin'], variable: '--f-roboto', display: 'swap', preload: false })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--f-open-sans', display: 'swap', preload: false })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--f-lato', display: 'swap', preload: false })
const manrope = Manrope({ subsets: ['latin'], variable: '--f-manrope', display: 'swap', preload: false })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--f-playfair', display: 'swap', preload: false })

export const arabicFontVars: Record<ArabicFont, string> = {
  'ibm-plex-arabic': '--f-ibm-plex-arabic',
  cairo: '--f-cairo',
  tajawal: '--f-tajawal',
  almarai: '--f-almarai',
  'noto-kufi': '--f-noto-kufi',
  readex: '--f-readex',
  'noto-naskh': '--f-noto-naskh',
  changa: '--f-changa',
}

export const latinFontVars: Record<LatinFont, string> = {
  inter: '--f-inter',
  poppins: '--f-poppins',
  montserrat: '--f-montserrat',
  roboto: '--f-roboto',
  'open-sans': '--f-open-sans',
  lato: '--f-lato',
  manrope: '--f-manrope',
  playfair: '--f-playfair',
}

/** Class names that define every font variable; applied to <html>. */
export const fontVariableClasses = [
  ibmPlexArabic,
  cairo,
  tajawal,
  almarai,
  notoKufi,
  readex,
  notoNaskh,
  changa,
  inter,
  poppins,
  montserrat,
  roboto,
  openSans,
  lato,
  manrope,
  playfair,
]
  .map((f) => f.variable)
  .join(' ')
