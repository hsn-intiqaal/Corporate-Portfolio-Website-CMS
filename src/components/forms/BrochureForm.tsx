'use client'
import { usePathname } from 'next/navigation'
import React, { startTransition, useActionState, useState } from 'react'
import { submitLead } from '@/app/(frontend)/actions'
import type { Dictionary } from '@/i18n/dictionary'
import type { LeadFormState } from '@/lib/leads'
import { Turnstile } from './Turnstile'

export function BrochureForm({
  locale,
  t,
  documentId,
  labels,
}: {
  locale: 'ar' | 'en'
  t: Dictionary['form']
  documentId: number
  labels: { download: string; ready: string; now: string }
}) {
  const [state, action, pending] = useActionState<LeadFormState, FormData>(submitLead, { status: 'idle' })
  const [startedAt] = useState(() => Date.now())
  const pathname = usePathname()
  const e = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-2xl bg-emerald-50 p-6 text-emerald-900 ring-1 ring-emerald-200">
        <p className="font-semibold">{labels.ready}</p>
        {state.downloadUrl && (
          <a href={state.downloadUrl} className="btn btn-primary mt-4">
            {labels.now}
          </a>
        )}
      </div>
    )
  }
  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault()
        const data = new FormData(ev.currentTarget)
        startTransition(() => action(data))
      }}
      className="space-y-4"
    >
      <input type="hidden" name="type" value="brochure" />
      <input type="hidden" name="document" value={documentId} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="sourcePage" value={pathname ?? ''} />
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {(['name', 'email', 'phone', 'company'] as const).map((f) => (
        <div key={f}>
          <label htmlFor={`b-${f}`} className="label">
            {t[f]}
          </label>
          <input
            id={`b-${f}`}
            name={f}
            type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
            dir={f === 'email' || f === 'phone' ? 'ltr' : undefined}
            required={f === 'name' || f === 'email'}
            aria-invalid={e[f] ? true : undefined}
            className="field"
          />
          {e[f] && <p className="mt-1 text-sm text-red-600">{e[f]}</p>}
        </div>
      ))}
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 size-4" />
        <span>{t.consent}</span>
      </label>
      {e.consent && <p className="text-sm text-red-600">{e.consent}</p>}
      {state.status === 'error' && state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}
      <Turnstile locale={locale} />
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? t.sending : labels.download}
      </button>
    </form>
  )
}
