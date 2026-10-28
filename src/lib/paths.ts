import type { Locale } from '@/i18n/config'

export type LinkableCollection = 'pages' | 'services' | 'projects' | 'articles'

/** Public URL path of a document. Slugs are shared across languages. */
export const docPath = (collection: LinkableCollection, slug: string | null | undefined, locale: Locale): string => {
  if (!slug) return `/${locale}`
  if (collection === 'services') return `/${locale}/services/${slug}`
  if (collection === 'projects') return `/${locale}/projects/${slug}`
  if (collection === 'articles') return `/${locale}/blog/${slug}`
  return slug === 'home' ? `/${locale}` : `/${locale}/${slug}`
}

export const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
export const absoluteURL = (path: string) => `${serverURL}${path.startsWith('/') ? path : `/${path}`}`

/** Skips pre-rendering when the build has no database (e.g. a Docker image build); pages then render on first request and are cached. */
export const buildParams = async <T>(load: () => Promise<T[]>): Promise<T[]> => (process.env.BUILD_WITHOUT_DB === '1' ? [] : load())
