import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from './i18n/config'

/**
 * Sends visitors without a language prefix to /ar/... or /en/...: their saved choice first,
 * then their browser language, then the site default (Arabic).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()

  const saved = request.cookies.get('NEXT_LOCALE')?.value
  const accept = request.headers.get('accept-language')?.toLowerCase() ?? ''
  const preferred = isLocale(saved) ? saved : accept.startsWith('en') ? 'en' : accept.startsWith('ar') ? 'ar' : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.redirect(url, pathname === '/' ? 307 : 308)
}

export const config = {
  // Skip the dashboard, APIs, Next internals, preview routes and files with an extension.
  matcher: ['/((?!admin|api|next|_next|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)'],
}
