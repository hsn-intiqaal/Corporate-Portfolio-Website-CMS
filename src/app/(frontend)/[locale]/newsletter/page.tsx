import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { isLocale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { confirmSubscription } from '@/lib/newsletter'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ confirm?: string; unsubscribe?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? { title: (await getTexts(locale)).newsletter.title, robots: { index: false } } : {}
}

/** Subscribe form, plus the target of the confirmation and unsubscribe links sent by email. */
export default async function NewsletterPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = await getTexts(locale)
  const { confirm, unsubscribe } = await searchParams
  let message: string | null = null
  if (confirm) message = (await confirmSubscription(confirm, 'confirm')) ? t.newsletter.confirmed : t.newsletter.invalidLink
  else if (unsubscribe)
    message = (await confirmSubscription(unsubscribe, 'unsubscribe')) ? t.newsletter.unsubscribed : t.newsletter.invalidLink

  return (
    <section className="py-20">
      <div className="container-site max-w-xl text-center">
        <h1 className="text-3xl">{t.newsletter.title}</h1>
        {message ? (
          <>
            <p role="status" className="mt-6 rounded-xl bg-soft p-5 text-lg">
              {message}
            </p>
            {confirm && message === t.newsletter.confirmed && (
              <p className="mt-4 text-sm text-muted">
                <Link href={`/${locale}/newsletter?unsubscribe=${encodeURIComponent(confirm)}`} className="underline">
                  {t.newsletter.unsubscribe}
                </Link>
              </p>
            )}
            <Link href={`/${locale}`} className="btn btn-primary mt-8">
              {t.backHome}
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-muted">{t.newsletter.text}</p>
            <div className="mt-8 text-start">
              <NewsletterForm locale={locale} t={t.newsletter} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
