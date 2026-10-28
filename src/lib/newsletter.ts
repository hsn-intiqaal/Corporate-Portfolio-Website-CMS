import 'server-only'
import crypto from 'node:crypto'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { clientIp, str, verifyTurnstile } from './leads'
import { absoluteURL } from './paths'
import { getPayloadClient } from './payload'
import { sendWebhook } from './webhook'

export type NewsletterState = { status: 'idle' | 'success' | 'error'; message?: string }

/** Double opt-in: store as pending, email a confirmation link, confirm on click. */
export async function handleNewsletterSignup(formData: FormData): Promise<NewsletterState> {
  const localeRaw = str(formData, 'locale')
  const locale: Locale = isLocale(localeRaw) ? localeRaw : 'ar'
  const t = getDictionary(locale).newsletter
  if (str(formData, 'website')) return { status: 'success', message: t.checkEmail }

  const email = str(formData, 'email', 160).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) return { status: 'error', message: t.invalid }

  const payload = await getPayloadClient()
  const { ip, ipHash } = await clientIp()
  const recent = await payload.count({
    collection: 'subscribers',
    where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: new Date(Date.now() - 60 * 60 * 1000).toISOString() } }] },
    overrideAccess: true,
  })
  if (recent.totalDocs >= 5) return { status: 'error', message: getDictionary(locale).form.rateLimited }
  if (!(await verifyTurnstile(str(formData, 'cf-turnstile-response', 4000), ip))) return { status: 'error', message: getDictionary(locale).form.challengeFailed }

  const token = crypto.randomBytes(24).toString('base64url')
  const existing = await payload.find({ collection: 'subscribers', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })
  const current = existing.docs[0]
  // Same answer whether or not the address is already subscribed, so the form cannot be used to probe emails.
  if (current?.status === 'confirmed') return { status: 'success', message: t.checkEmail }
  if (current) await payload.update({ collection: 'subscribers', id: current.id, data: { status: 'pending', token, locale }, overrideAccess: true })
  else await payload.create({ collection: 'subscribers', data: { email, status: 'pending', token, locale, ipHash, source: str(formData, 'sourcePage', 300) }, overrideAccess: true })

  const link = absoluteURL(`/${locale}/newsletter?confirm=${token}`)
  await payload
    .sendEmail({
      to: email,
      subject: t.emailSubject,
      html: `<div dir="${locale === 'ar' ? 'rtl' : 'ltr'}" style="font-family:Arial,sans-serif"><p>${t.emailBody}</p><p><a href="${link}">${t.emailButton}</a></p></div>`,
    })
    .catch((err: unknown) => payload.logger.error({ err, msg: 'Newsletter confirmation email failed' }))
  return { status: 'success', message: t.checkEmail }
}

export async function confirmSubscription(token: string, action: 'confirm' | 'unsubscribe') {
  if (!token || token.length < 20) return false
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'subscribers', where: { token: { equals: token } }, limit: 1, depth: 0, overrideAccess: true })
  const sub = res.docs[0]
  if (!sub) return false
  if (action === 'unsubscribe') {
    await payload.update({ collection: 'subscribers', id: sub.id, data: { status: 'unsubscribed' }, overrideAccess: true })
    return true
  }
  if (sub.status !== 'confirmed') {
    // Keep the token so the same link can later be used to unsubscribe.
    await payload.update({ collection: 'subscribers', id: sub.id, data: { status: 'confirmed', confirmedAt: new Date().toISOString() }, overrideAccess: true })
    await sendWebhook(payload, 'subscriber.confirmed', { email: sub.email, locale: sub.locale })
  }
  return true
}
