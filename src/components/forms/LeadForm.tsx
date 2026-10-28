'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { submitLead } from '@/app/(frontend)/actions'
import type { Dictionary } from '@/i18n/dictionary'
import type { LeadFormState } from '@/lib/leads'
import { Turnstile } from './Turnstile'

type Props = {
  type: 'contact' | 'quote'
  locale: 'ar' | 'en'
  t: Dictionary['form']
  services: { id: number; title: string }[]
}

const initial: LeadFormState = { status: 'idle' }

function Field({ name, label, error, children }: { name: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`f-${name}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function LeadForm({ type, locale, t, services }: Props) {
  const [state, action, pending] = useActionState(submitLead, initial)
  const [startedAt] = useState(() => Date.now())
  const pathname = usePathname()
  // Service pages link to the quotation form with ?service=<id> to preselect it.
  const preselected = useSearchParams()?.get('service') ?? ''
  const defaultService = services.some((s) => String(s.id) === preselected) ? preselected : ''
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const e = state.errors ?? {}

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  const a11y = (name: string) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': e[name] ? true : undefined,
    'aria-describedby': e[name] ? `f-${name}-error` : undefined,
    className: 'field',
  })

  if (state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl bg-emerald-50 p-8 text-center text-emerald-900 ring-1 ring-emerald-200">
        <p className="text-lg font-semibold">{state.message}</p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      className="space-y-5"
      // Submitted manually instead of via `action` so React does not reset the fields when validation fails.
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        startTransition(() => action(data))
      }}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="sourcePage" value={pathname ?? ''} />
      {/* Honeypot field: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === 'error' && state.message && (
        <div ref={statusRef} tabIndex={-1} role="alert" data-form-error className="rounded-lg bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={t.name} error={e.name}>
          <input {...a11y('name')} type="text" autoComplete="name" required maxLength={120} />
        </Field>
        <Field name="email" label={t.email} error={e.email}>
          <input {...a11y('email')} type="email" autoComplete="email" required maxLength={160} dir="ltr" />
        </Field>
        <Field name="phone" label={type === 'quote' ? t.phone : `${t.phone}`} error={e.phone}>
          <input {...a11y('phone')} type="tel" autoComplete="tel" required={type === 'quote'} maxLength={40} dir="ltr" />
        </Field>
        <Field name="company" label={t.company} error={e.company}>
          <input {...a11y('company')} type="text" autoComplete="organization" maxLength={160} />
        </Field>
      </div>

      {type === 'quote' ? (
        <>
          <Field name="service" label={t.service} error={e.service}>
            <select {...a11y('service')} required defaultValue={defaultService}>
              <option value="" disabled>
                {t.selectService}
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field name="projectLocation" label={t.projectLocation} error={e.projectLocation}>
              <input {...a11y('projectLocation')} type="text" maxLength={200} />
            </Field>
            <Field name="timeline" label={t.timeline} error={e.timeline}>
              <input {...a11y('timeline')} type="text" maxLength={100} />
            </Field>
            <Field name="budget" label={t.budget} error={e.budget}>
              <input {...a11y('budget')} type="text" maxLength={100} />
            </Field>
          </div>
          <Field name="message" label={t.details} error={e.message}>
            <textarea {...a11y('message')} rows={6} required maxLength={5000} />
          </Field>
          <Field name="attachments" label={t.attachments} error={e.attachments}>
            <input {...a11y('attachments')} type="file" multiple accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" className="field file:me-3 file:rounded-md file:border-0 file:bg-soft file:px-3 file:py-1.5 file:text-sm" />
            <p className="mt-1.5 text-xs text-muted">{t.attachmentsHint}</p>
          </Field>
        </>
      ) : (
        <>
          <Field name="subject" label={t.subject} error={e.subject}>
            <input {...a11y('subject')} type="text" maxLength={200} />
          </Field>
          <Field name="message" label={t.message} error={e.message}>
            <textarea {...a11y('message')} rows={6} required maxLength={5000} />
          </Field>
        </>
      )}

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--color-brand)]" aria-invalid={e.consent ? true : undefined} />
          <span>{t.consent}</span>
        </label>
        {e.consent && <p className="mt-1.5 text-sm text-red-600">{e.consent}</p>}
      </div>

      <Turnstile locale={locale} />

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? t.sending : type === 'quote' ? t.submitQuote : t.submit}
      </button>
    </form>
  )
}
