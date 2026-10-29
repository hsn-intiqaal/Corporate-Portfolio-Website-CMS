'use client'
import { useConfig, useDocumentInfo, useFormFields, useLocale, useTranslation } from '@payloadcms/ui'
import React, { useEffect, useMemo, useState } from 'react'
import { lexicalToText } from '@/lib/lexical'
import { auditSeo, truncate } from '@/seo/audit'

const prefixFor: Record<string, string> = { pages: '', services: '/services', projects: '/projects', articles: '/blog' }

/**
 * Live Google result preview (desktop / mobile) and SEO checklist for the language being edited.
 * Reads the form as the editor types; nothing here is saved.
 */
export function SearchPreview() {
  const { i18n } = useTranslation()
  const ar = i18n.language === 'ar'
  const tr = (en: string, arabic: string) => (ar ? arabic : en)
  const locale = useLocale()
  const { collectionSlug } = useDocumentInfo()
  const { config } = useConfig()
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [site, setSite] = useState<{ name: string; icon?: string; suffix: string }>({ name: '', suffix: '' })

  const values = useFormFields(([fields]) => ({
    title: fields.title?.value as string | undefined,
    slug: fields.slug?.value as string | undefined,
    excerpt: fields.excerpt?.value as string | undefined,
    content: fields.content?.value,
    metaTitle: fields['meta.title']?.value as string | undefined,
    metaDescription: fields['meta.description']?.value as string | undefined,
    image: fields['meta.image']?.value,
    keyword: fields['meta.keyword']?.value as string | undefined,
    noIndex: fields['meta.noIndex']?.value as boolean | undefined,
  }))

  useEffect(() => {
    let cancelled = false
    fetch(`${config.serverURL}/api/globals/settings?locale=${locale.code}&depth=1`, { credentials: 'include' })
      .then((r) => r.json())
      .then((s) => {
        if (cancelled) return
        const icon = s?.favicon?.url ?? s?.logo?.url
        setSite({ name: s?.siteName ?? '', icon, suffix: s?.titleSuffix ?? '' })
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [config.serverURL, locale.code])

  const baseTitle = (values.metaTitle || values.title || '').trim()
  const fullTitle = values.metaTitle ? baseTitle : `${baseTitle}${site.suffix}`
  const description = values.metaDescription || values.excerpt || ''
  const host = (() => {
    try {
      return new URL(config.serverURL || 'https://example.com').host
    } catch {
      return 'example.com'
    }
  })()
  const path =
    values.slug === 'home' && collectionSlug === 'pages' ? '' : `${prefixFor[collectionSlug ?? 'pages'] ?? ''}/${values.slug ?? ''}`
  const crumbs = [host, locale.code, ...path.split('/').filter(Boolean)].join(' › ')

  const { checks, score } = useMemo(
    () =>
      auditSeo({
        title: values.title,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        slug: values.slug,
        hasImage: Boolean(values.image),
        noIndex: values.noIndex,
        keyword: values.keyword,
        bodyText: values.content ? lexicalToText(values.content) + ' ' + (values.excerpt ?? '') : (values.excerpt ?? null),
      }),
    [values],
  )
  const tone = score >= 80 ? 'good' : score >= 50 ? 'warn' : 'bad'
  const isRtl = locale.code === 'ar'

  return (
    <div className="cms-serp">
      <div className="cms-card__head">
        <h3 style={{ margin: 0, fontSize: 16 }}>{tr('How this page looks in Google', 'شكل الصفحة في نتائج جوجل')}</h3>
        <span className={`cms-score cms-score--${tone}`} title={tr('SEO score', 'تقييم SEO')}>
          {score}%
        </span>
      </div>
      <div className="cms-serp__tabs" role="group">
        {(['desktop', 'mobile'] as const).map((d) => (
          <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)}>
            {d === 'desktop' ? tr('Desktop', 'كمبيوتر') : tr('Mobile', 'موبايل')}
          </button>
        ))}
      </div>
      <div
        className={`cms-serp__result ${device === 'mobile' ? 'cms-serp__result--mobile' : ''}`}
        dir={isRtl ? 'rtl' : 'ltr'}
        lang={locale.code}
      >
        <div className="cms-serp__site">
          <span className="cms-serp__favicon">
            {site.icon ? (
              // eslint-disable-next-line @next/next/no-img-element -- tiny preview icon in the dashboard
              <img src={site.icon} alt="" />
            ) : (
              (site.name || host).slice(0, 1)
            )}
          </span>
          <span>
            <span className="cms-serp__name">{site.name || host}</span>
            <br />
            <span className="cms-serp__url">{crumbs}</span>
          </span>
        </div>
        <p className="cms-serp__title">{truncate(fullTitle || tr('Page title', 'عنوان الصفحة'), device === 'mobile' ? 70 : 62)}</p>
        <p className="cms-serp__desc">
          {description ? truncate(description, device === 'mobile' ? 130 : 160) : tr('Add a meta description below…', 'أضف وصفاً بالأسفل…')}
        </p>
      </div>
      <ul className="cms-serp__checks">
        {checks.map((c) => (
          <li key={c.id}>
            <span className={`cms-serp__dot cms-serp__dot--${c.status}`} aria-hidden />
            <span>{ar ? c.ar : c.en}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
