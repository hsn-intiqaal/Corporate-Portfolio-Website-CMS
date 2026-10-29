/**
 * SEO checks for one document in one language. Pure (no I/O) so it runs in the dashboard home
 * panel, inside the editor (live, as the editor types) and in unit tests.
 *
 * Length guidance follows how Google typically displays results: titles are cut at ~580px
 * (≈ 50–60 characters), descriptions at ~920px on desktop (≈ 120–160 characters).
 */
export type SeoInput = {
  title?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  slug?: string | null
  hasImage?: boolean
  noIndex?: boolean | null
  keyword?: string | null
  bodyText?: string | null
}

export type SeoStatus = 'good' | 'warn' | 'bad'
export type SeoCheck = { id: string; status: SeoStatus; en: string; ar: string }

export const TITLE_RANGE = [30, 60] as const
export const DESCRIPTION_RANGE = [70, 160] as const

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[ً-ٰٟ]/g, '') // Arabic diacritics
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')

const contains = (haystack: string | null | undefined, needle: string) => Boolean(haystack && norm(haystack).includes(norm(needle)))

export function auditSeo(input: SeoInput): { checks: SeoCheck[]; score: number } {
  const checks: SeoCheck[] = []
  const add = (id: string, status: SeoStatus, en: string, ar: string) => checks.push({ id, status, en, ar })
  const title = (input.metaTitle || input.title || '').trim()
  const desc = (input.metaDescription || '').trim()

  if (input.noIndex) add('noindex', 'bad', 'Hidden from search engines (noindex is on).', 'الصفحة مخفية من محركات البحث (noindex مفعّل).')

  if (!input.metaTitle)
    add('title-missing', 'warn', 'No SEO title: the page title is used instead.', 'لا يوجد عنوان SEO: سيُستخدم عنوان الصفحة.')
  if (title.length < TITLE_RANGE[0])
    add(
      'title-short',
      'warn',
      `Title is short (${title.length} characters; aim for 30–60).`,
      `العنوان قصير (${title.length} حرفاً؛ الأفضل 30–60).`,
    )
  else if (title.length > TITLE_RANGE[1])
    add(
      'title-long',
      'warn',
      `Title may be cut in Google (${title.length} characters; aim for 30–60).`,
      `قد يُقص العنوان في جوجل (${title.length} حرفاً؛ الأفضل 30–60).`,
    )
  else add('title-ok', 'good', 'Title length is good.', 'طول العنوان مناسب.')

  if (!desc)
    add('desc-missing', 'bad', 'No meta description: Google will pick text from the page.', 'لا يوجد وصف: سيختار جوجل نصاً من الصفحة.')
  else if (desc.length < DESCRIPTION_RANGE[0])
    add(
      'desc-short',
      'warn',
      `Description is short (${desc.length} characters; aim for 70–160).`,
      `الوصف قصير (${desc.length} حرفاً؛ الأفضل 70–160).`,
    )
  else if (desc.length > DESCRIPTION_RANGE[1])
    add(
      'desc-long',
      'warn',
      `Description may be cut (${desc.length} characters; aim for 70–160).`,
      `قد يُقص الوصف (${desc.length} حرفاً؛ الأفضل 70–160).`,
    )
  else add('desc-ok', 'good', 'Description length is good.', 'طول الوصف مناسب.')

  if (input.slug && input.slug.length > 75)
    add('slug-long', 'warn', 'The URL is long; shorter URLs are easier to share.', 'الرابط طويل؛ الروابط القصيرة أسهل في المشاركة.')

  add(
    'image',
    input.hasImage ? 'good' : 'warn',
    input.hasImage ? 'Has a sharing image.' : 'No sharing image: links shared on social media will look plain.',
    input.hasImage ? 'توجد صورة مشاركة.' : 'لا توجد صورة مشاركة: الروابط على مواقع التواصل ستظهر بدون صورة.',
  )

  const kw = input.keyword?.trim()
  if (!kw) {
    add('keyword-missing', 'warn', 'Set a focus keyword to get keyword tips.', 'حدّد كلمة مفتاحية للحصول على نصائح أدق.')
  } else {
    add(
      'kw-title',
      contains(title, kw) ? 'good' : 'warn',
      contains(title, kw) ? 'Keyword appears in the title.' : 'Add the keyword to the title.',
      contains(title, kw) ? 'الكلمة المفتاحية موجودة في العنوان.' : 'أضف الكلمة المفتاحية إلى العنوان.',
    )
    add(
      'kw-desc',
      contains(desc, kw) ? 'good' : 'warn',
      contains(desc, kw) ? 'Keyword appears in the description.' : 'Add the keyword to the description.',
      contains(desc, kw) ? 'الكلمة المفتاحية موجودة في الوصف.' : 'أضف الكلمة المفتاحية إلى الوصف.',
    )
    if (input.bodyText !== undefined && input.bodyText !== null) {
      const inBody = contains(input.bodyText, kw)
      add(
        'kw-body',
        inBody ? 'good' : 'warn',
        inBody ? 'Keyword appears in the content.' : 'Use the keyword in the page content.',
        inBody ? 'الكلمة المفتاحية موجودة في المحتوى.' : 'استخدم الكلمة المفتاحية في محتوى الصفحة.',
      )
    }
  }

  const weight: Record<SeoStatus, number> = { good: 1, warn: 0.5, bad: 0 }
  const scored = checks.filter((c) => c.id !== 'keyword-missing')
  const score = input.noIndex ? 0 : Math.round((scored.reduce((n, c) => n + weight[c.status], 0) / Math.max(1, scored.length)) * 100)
  return { checks, score }
}

/** Truncation similar to Google's (by characters, as pixel widths are not known here). */
export const truncate = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s)
