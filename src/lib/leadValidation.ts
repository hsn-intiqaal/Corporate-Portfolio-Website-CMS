/** Pure validation for contact, quotation and brochure forms (no I/O, unit-tested). */
export type LeadType = 'contact' | 'quote' | 'brochure'
export type LeadErrorKey = 'required' | 'invalidEmail' | 'invalidPhone' | 'tooLong' | 'fileType' | 'fileSize' | 'fileCount'

export const LEAD_LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  company: 160,
  subject: 200,
  message: 5000,
  projectLocation: 200,
  timeline: 100,
  budget: 100,
  service: 20,
} as const

export type LeadInput = { -readonly [K in keyof typeof LEAD_LIMITS]: string }
export type UploadInfo = { type: string; size: number }

export const REQUIRED_FIELDS: Record<LeadType, (keyof LeadInput)[]> = {
  quote: ['name', 'email', 'phone', 'service', 'message'],
  brochure: ['name', 'email'],
  contact: ['name', 'email', 'message'],
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[\d\s()-]{7,20}$/

export function validateLead(
  type: LeadType,
  data: LeadInput,
  opts: { consent: boolean; files: UploadInfo[]; allowedTypes: string[]; maxFileSize: number; maxFiles: number; maxTotal: number },
): Partial<Record<keyof LeadInput | 'consent' | 'attachments', LeadErrorKey>> {
  const errors: Partial<Record<keyof LeadInput | 'consent' | 'attachments', LeadErrorKey>> = {}
  for (const key of REQUIRED_FIELDS[type]) if (!data[key]) errors[key] = 'required'
  for (const [key, max] of Object.entries(LEAD_LIMITS) as [keyof LeadInput, number][]) if (data[key].length > max) errors[key] = 'tooLong'
  if (data.email && !errors.email && !EMAIL_RE.test(data.email)) errors.email = 'invalidEmail'
  if (data.phone && !errors.phone && !PHONE_RE.test(data.phone)) errors.phone = 'invalidPhone'
  if (!opts.consent) errors.consent = 'required'
  if (type === 'quote' && opts.files.length) {
    if (opts.files.length > opts.maxFiles) errors.attachments = 'fileCount'
    else if (opts.files.some((f) => !opts.allowedTypes.includes(f.type))) errors.attachments = 'fileType'
    else if (opts.files.some((f) => f.size > opts.maxFileSize)) errors.attachments = 'fileSize'
    else if (opts.files.reduce((n, f) => n + f.size, 0) > opts.maxTotal) errors.attachments = 'fileSize'
  }
  return errors
}

/** Checks the real file signature (magic bytes) rather than the browser-reported type. */
export const hasAllowedSignature = (head: Uint8Array) => {
  const hex = Array.from(head.subarray(0, 4), (b) => b.toString(16).padStart(2, '0')).join('')
  return hex.startsWith('ffd8ff') || hex === '89504e47' || hex === '25504446' // JPEG, PNG, PDF
}
