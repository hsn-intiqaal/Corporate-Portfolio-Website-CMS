import 'server-only'
import crypto from 'node:crypto'
import { headers } from 'next/headers'
import { isLocale, type Locale } from '@/i18n/config'
import { LEAD_FILE_TYPES, MAX_LEAD_FILE_SIZE } from '@/collections/LeadFiles'
import { getPayloadClient } from './payload'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
  /** Signed, time-limited link returned after a brochure request. */
  downloadUrl?: string
}

type ErrorKey = 'required' | 'invalidEmail' | 'invalidPhone' | 'tooLong' | 'fileType' | 'fileSize' | 'fileCount'
type ResultKey = 'success' | 'error' | 'rateLimited' | 'challengeFailed'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MAX_FILES = 3
// Serverless hosts cap request bodies (Vercel: 4.5 MB), so the total is configurable.
const MAX_TOTAL_UPLOAD = Number(process.env.LEAD_UPLOAD_TOTAL_MB || 15) * 1024 * 1024

export const str = (fd: FormData, key: string, max = 200) => {
  const v = fd.get(key)
  return typeof v === 'string' ? v.trim().slice(0, max + 1) : ''
}

export const hashIp = (ip: string) => crypto.createHmac('sha256', process.env.PAYLOAD_SECRET || 'salt').update(ip).digest('hex').slice(0, 32)

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // challenge not configured (development)
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}

/**
 * Validates and stores a contact or quotation request. Runs only on the server:
 * honeypot + minimum fill time + rate limit (per hashed IP, stored in the DB so it works on
 * serverless hosting) + optional Cloudflare Turnstile, then saves the lead and its private files.
 */
export async function clientIp() {
  const h = await headers()
  const ip = h.get('cf-connecting-ip') || h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || '0.0.0.0'
  return { ip, ipHash: hashIp(ip), userAgent: (h.get('user-agent') || '').slice(0, 300) }
}

export async function handleLeadSubmission(formData: FormData, messages: (key: ErrorKey | ResultKey) => string): Promise<LeadFormState> {
  const payload = await getPayloadClient()
  const { ip, ipHash, userAgent } = await clientIp()

  const rawType = str(formData, 'type')
  const type = rawType === 'quote' || rawType === 'brochure' ? rawType : 'contact'
  const localeRaw = str(formData, 'locale')
  const locale: Locale = isLocale(localeRaw) ? localeRaw : 'ar'

  // Honeypot: real visitors never fill the hidden field. Pretend success so bots learn nothing.
  if (str(formData, 'website')) return { status: 'success', message: messages('success') }
  // Bots submit instantly; humans take more than 3 seconds.
  const startedAt = Number(str(formData, 'startedAt'))
  if (startedAt && Date.now() - startedAt < 3000) return { status: 'success', message: messages('success') }

  const recent = await payload.count({
    collection: 'leads',
    where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString() } }] },
    overrideAccess: true,
  })
  if (recent.totalDocs >= RATE_LIMIT_MAX) return { status: 'error', message: messages('rateLimited') }

  if (!(await verifyTurnstile(str(formData, 'cf-turnstile-response', 4000), ip))) {
    return { status: 'error', message: messages('challengeFailed') }
  }

  const data = {
    name: str(formData, 'name', 120),
    email: str(formData, 'email', 160).toLowerCase(),
    phone: str(formData, 'phone', 40),
    company: str(formData, 'company', 160),
    subject: str(formData, 'subject', 200),
    message: str(formData, 'message', 5000),
    projectLocation: str(formData, 'projectLocation', 200),
    timeline: str(formData, 'timeline', 100),
    budget: str(formData, 'budget', 100),
    service: str(formData, 'service', 20),
  }
  const limits: Record<string, number> = { name: 120, email: 160, phone: 40, company: 160, subject: 200, message: 5000, projectLocation: 200, timeline: 100, budget: 100 }

  const errors: Record<string, string> = {}
  const required = type === 'quote' ? ['name', 'email', 'phone', 'service', 'message'] : type === 'brochure' ? ['name', 'email'] : ['name', 'email', 'message']
  for (const key of required) if (!data[key as keyof typeof data]) errors[key] = messages('required')
  for (const [key, max] of Object.entries(limits)) if ((data[key as keyof typeof data] ?? '').length > max) errors[key] = messages('tooLong')
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = messages('invalidEmail')
  if (data.phone && !/^\+?[\d\s()-]{7,20}$/.test(data.phone)) errors.phone = messages('invalidPhone')
  if (formData.get('consent') !== 'on') errors.consent = messages('required')

  const files = formData.getAll('attachments').filter((f): f is File => typeof f === 'object' && f !== null && 'size' in f && f.size > 0)
  if (type === 'quote') {
    if (files.length > MAX_FILES) errors.attachments = messages('fileCount')
    else if (files.some((f) => !LEAD_FILE_TYPES.includes(f.type))) errors.attachments = messages('fileType')
    else if (files.some((f) => f.size > MAX_LEAD_FILE_SIZE)) errors.attachments = messages('fileSize')
    else if (files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_UPLOAD) errors.attachments = messages('fileSize')
  }

  let serviceId: number | undefined
  if (data.service) {
    const id = Number(data.service)
    const exists = Number.isInteger(id) && (await payload.count({ collection: 'services', where: { id: { equals: id } }, overrideAccess: true })).totalDocs > 0
    if (exists) serviceId = id
    else if (type === 'quote') errors.service = messages('required')
  }

  let documentId: number | undefined
  if (type === 'brochure') {
    const id = Number(str(formData, 'document', 20))
    const doc = Number.isInteger(id) ? await payload.findByID({ collection: 'documents', id, depth: 0, overrideAccess: true }).catch(() => null) : null
    if (!doc) return { status: 'error', message: messages('error') }
    documentId = doc.id
  }

  if (Object.keys(errors).length > 0) return { status: 'error', errors, message: messages('error') }

  try {
    const attachmentIds: number[] = []
    for (const file of type === 'quote' ? files : []) {
      const buffer = Buffer.from(await file.arrayBuffer())
      // Verify the real file signature, not just the browser-reported type.
      const sig = buffer.subarray(0, 4).toString('hex')
      const okSig = sig.startsWith('ffd8ff') || sig === '89504e47' || sig === '25504446'
      if (!okSig) return { status: 'error', errors: { attachments: messages('fileType') }, message: messages('error') }
      const ext = file.type === 'application/pdf' ? 'pdf' : file.type === 'image/png' ? 'png' : 'jpg'
      try {
        const saved = await payload.create({
          collection: 'lead-files',
          data: {},
          // Files are renamed to random names; the original name is never used on disk.
          file: { data: buffer, mimetype: file.type, name: `${crypto.randomUUID()}.${ext}`, size: buffer.length },
          overrideAccess: true,
        })
        attachmentIds.push(saved.id)
      } catch {
        // Payload rejects corrupt or disguised files (e.g. an invalid PDF structure).
        return { status: 'error', errors: { attachments: messages('fileType') }, message: messages('error') }
      }
    }

    await payload.create({
      collection: 'leads',
      data: {
        type,
        status: 'new',
        locale,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        company: data.company || undefined,
        subject: data.subject || undefined,
        message: data.message || undefined,
        projectLocation: data.projectLocation || undefined,
        timeline: data.timeline || undefined,
        budget: data.budget || undefined,
        service: serviceId,
        attachments: attachmentIds,
        document: documentId,
        consent: true,
        ipHash,
        userAgent,
        sourcePage: str(formData, 'sourcePage', 300),
      },
      overrideAccess: true,
    })

    await maybeSendSpamAlert(ipHash)
    if (documentId) {
      const { signToken } = await import('./signing')
      return { status: 'success', message: messages('success'), downloadUrl: `/next/download/${signToken(documentId)}` }
    }
    return { status: 'success', message: messages('success') }
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Failed to save lead' })
    return { status: 'error', message: messages('error') }
  }
}

/** Emails administrators once when enquiry volume in the last hour crosses the configured threshold. */
async function maybeSendSpamAlert(_ipHash: string) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings', depth: 0, overrideAccess: true })
  const threshold = settings.spamAlertThreshold ?? 30
  const lastHour = await payload.count({
    collection: 'leads',
    where: { createdAt: { greater_than: new Date(Date.now() - 60 * 60 * 1000).toISOString() } },
    overrideAccess: true,
  })
  if (lastHour.totalDocs !== threshold + 1) return
  const to = (settings.leadRecipients ?? []).map((r) => r.email).filter(Boolean)
  if (to.length === 0) return
  await payload
    .sendEmail({
      to: to.join(','),
      subject: 'Unusual enquiry volume on the website',
      text: `More than ${threshold} enquiries were received in the last hour. This may be spam. Review the Leads inbox in the dashboard.`,
    })
    .catch(() => undefined)
}
