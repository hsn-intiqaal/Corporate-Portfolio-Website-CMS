import { describe, expect, it, vi } from 'vitest'
import { signToken, verifyToken } from '@/lib/signing'
import { hasAllowedSignature, validateLead, type LeadInput } from '@/lib/leadValidation'

describe('signed download links', () => {
  it('verifies a valid token and returns the document id', () => {
    expect(verifyToken(signToken(42))).toBe('42')
  })
  it('rejects tampered, malformed and expired tokens', () => {
    const [id, exp, sig] = signToken(42).split('.')
    expect(verifyToken(`43.${exp}.${sig}`)).toBeNull()
    expect(verifyToken(`${id}.${Number(exp) + 1}.${sig}`)).toBeNull()
    expect(verifyToken('garbage')).toBeNull()
    vi.useFakeTimers()
    const token = signToken(1, 60)
    vi.advanceTimersByTime(61_000)
    expect(verifyToken(token)).toBeNull()
    vi.useRealTimers()
  })
})

const blank: LeadInput = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  projectLocation: '',
  timeline: '',
  budget: '',
  service: '',
}
const opts = {
  consent: true,
  files: [],
  allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  maxFileSize: 5e6,
  maxFiles: 3,
  maxTotal: 15e6,
}

describe('lead form validation', () => {
  it('requires different fields per form type', () => {
    expect(Object.keys(validateLead('contact', blank, opts)).sort()).toEqual(['email', 'message', 'name'])
    expect(Object.keys(validateLead('quote', blank, opts)).sort()).toEqual(['email', 'message', 'name', 'phone', 'service'])
    expect(Object.keys(validateLead('brochure', blank, opts)).sort()).toEqual(['email', 'name'])
  })
  it('accepts a valid contact message', () => {
    expect(validateLead('contact', { ...blank, name: 'Sara', email: 'sara@example.com', message: 'Hello' }, opts)).toEqual({})
  })
  it('flags bad email, phone, length and missing consent', () => {
    const errors = validateLead(
      'contact',
      { ...blank, name: 'x'.repeat(121), email: 'nope', phone: 'abc', message: 'hi' },
      { ...opts, consent: false },
    )
    expect(errors).toEqual({ name: 'tooLong', email: 'invalidEmail', phone: 'invalidPhone', consent: 'required' })
  })
  it('checks quotation attachments', () => {
    const valid = { ...blank, name: 'A', email: 'a@b.co', phone: '+966 50 000 0000', service: '1', message: 'm' }
    expect(validateLead('quote', valid, { ...opts, files: [{ type: 'application/zip', size: 10 }] }).attachments).toBe('fileType')
    expect(validateLead('quote', valid, { ...opts, files: [{ type: 'image/png', size: 6e6 }] }).attachments).toBe('fileSize')
    expect(validateLead('quote', valid, { ...opts, files: Array(4).fill({ type: 'image/png', size: 1 }) }).attachments).toBe('fileCount')
    expect(validateLead('quote', valid, { ...opts, files: [{ type: 'application/pdf', size: 1000 }] })).toEqual({})
  })
  it('recognises real JPEG, PNG and PDF signatures only', () => {
    expect(hasAllowedSignature(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe(true)
    expect(hasAllowedSignature(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))).toBe(true)
    expect(hasAllowedSignature(new TextEncoder().encode('%PDF'))).toBe(true)
    expect(hasAllowedSignature(new TextEncoder().encode('MZ\x90\x00'))).toBe(false) // Windows executable
  })
})
