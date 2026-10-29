import type { Field, GlobalConfig } from 'payload'
import { staffOnly } from '@/access'
import { auditGlobal } from '@/hooks/audit'
import { revalidateGlobal } from '@/hooks/revalidate'
import { defaultDictionaries, type Dictionary } from '@/i18n/dictionary'

const en = defaultDictionaries.en
const ar = defaultDictionaries.ar

/** One text field per built-in string; the label shows the default wording in the dashboard's language. */
const textField = (key: string, enDefault: string, arDefault: string): Field => ({
  name: key,
  type: (enDefault.length > 70 ? 'textarea' : 'text') as 'text',
  localized: true,
  label: { en: enDefault, ar: arDefault },
  admin: {
    description: {
      en: `Leave empty to use the default. ${enDefault.includes('{') ? 'Keep the {placeholders}.' : ''}`.trim(),
      ar: `اتركه فارغاً لاستخدام النص الافتراضي. ${arDefault.includes('{') ? 'حافظ على المتغيرات بين {}.' : ''}`.trim(),
    },
  },
})

type FlatKey = { [K in keyof Dictionary]: Dictionary[K] extends string ? K : never }[keyof Dictionary]

const fieldsFor = (keys: FlatKey[]): Field[] => keys.map((k) => textField(k, en[k], ar[k]))
const groupFor = (key: 'form' | 'newsletter'): Field => ({
  name: key,
  type: 'group',
  label: false,
  fields: Object.keys(en[key]).map((k) =>
    textField(k, en[key][k as keyof Dictionary[typeof key]], ar[key][k as keyof Dictionary[typeof key]]),
  ),
})

const sections: { slug: string; label: { en: string; ar: string }; keys?: FlatKey[]; group?: 'form' | 'newsletter' }[] = [
  {
    slug: 'site-texts-general',
    label: { en: 'Texts: general & navigation', ar: 'نصوص: عام والتنقل' },
    keys: [
      'skipToContent',
      'menu',
      'close',
      'home',
      'services',
      'projects',
      'requestQuote',
      'contactUs',
      'viewAll',
      'readMore',
      'previous',
      'next',
      'followUs',
      'rights',
      'phone',
      'email',
      'address',
      'whatsapp',
      'notFoundTitle',
      'notFoundText',
      'backHome',
      'missingTranslation',
      'draftBanner',
      'exitPreview',
      'cookieText',
      'accept',
      'decline',
    ],
  },
  {
    slug: 'site-texts-content',
    label: { en: 'Texts: services & projects', ar: 'نصوص: الخدمات والمشاريع' },
    keys: [
      'viewService',
      'viewProject',
      'allProjects',
      'location',
      'date',
      'client',
      'category',
      'gallery',
      'relatedServices',
      'noProjects',
      'watchVideo',
      'download',
      'downloadReady',
      'downloadNow',
    ],
  },
  {
    slug: 'site-texts-blog',
    label: { en: 'Texts: blog & search', ar: 'نصوص: المدونة والبحث' },
    keys: [
      'blog',
      'articles',
      'latestArticles',
      'readArticle',
      'minRead',
      'publishedOn',
      'updatedOn',
      'by',
      'tableOfContents',
      'share',
      'copyLink',
      'linkCopied',
      'relatedArticles',
      'allCategories',
      'pageOf',
      'noArticles',
      'tags',
      'rss',
      'search',
      'searchPlaceholder',
      'searchResults',
      'noResults',
    ],
  },
  { slug: 'site-texts-forms', label: { en: 'Texts: forms', ar: 'نصوص: النماذج' }, group: 'form' },
  { slug: 'site-texts-newsletter', label: { en: 'Texts: newsletter', ar: 'نصوص: النشرة البريدية' }, group: 'newsletter' },
]

// Every built-in string must appear in exactly one section (checked by the unit tests).
export const siteTextKeys = sections.flatMap((t) => t.keys ?? [])
export const siteTextSlugs = sections.map((t) => t.slug)

/**
 * Editable website texts, split over several globals because PostgreSQL limits how many localized
 * columns one query can aggregate (~100). They appear together under "Site texts" in the dashboard.
 */
export const SiteTexts: GlobalConfig[] = sections.map((section) => ({
  slug: section.slug,
  label: section.label,
  admin: {
    group: { en: 'Site texts', ar: 'نصوص الموقع' },
    description: {
      en: 'Fixed texts on the website. Switch the locale at the top to edit Arabic or English. Empty fields use the default shown as the label.',
      ar: 'النصوص الثابتة في الموقع. بدّل اللغة من الأعلى لتعديل العربية أو الإنجليزية. الحقول الفارغة تستخدم النص الافتراضي الظاهر كعنوان للحقل.',
    },
  },
  access: { read: () => true, update: staffOnly },
  hooks: { afterChange: [revalidateGlobal, auditGlobal] },
  fields: section.group ? [groupFor(section.group)] : fieldsFor(section.keys ?? []),
}))
