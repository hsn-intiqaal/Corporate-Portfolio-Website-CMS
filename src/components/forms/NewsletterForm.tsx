'use client'
import { usePathname } from 'next/navigation'
import React, { startTransition, useActionState } from 'react'
import { subscribeNewsletter } from '@/app/(frontend)/actions'
import type { Dictionary } from '@/i18n/dictionary'
import type { NewsletterState } from '@/lib/newsletter'
import { Turnstile } from './Turnstile'

export function NewsletterForm({ locale, t, dark }: { locale: 'ar' | 'en'; t: Dictionary['newsletter']; dark?: boolean }) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(subscribeNewsletter, { status: 'idle' })
  const pathname = usePathname()
  if (state.status === 'success') {
    return (
      <p
        role="status"
        className={`rounded-xl p-4 text-sm font-medium ${dark ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-900'}`}
      >
        {state.message}
      </p>
    )
  }
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        startTransition(() => action(data))
      }}
      className="space-y-3"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sourcePage" value={pathname ?? ''} />
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`nl-email-${dark ? 'd' : 'l'}`}>
          {t.placeholder}
        </label>
        <input
          id={`nl-email-${dark ? 'd' : 'l'}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          dir="ltr"
          placeholder={t.placeholder}
          className={`field flex-1 ${dark ? 'border-white/20 bg-white/10 text-white placeholder:text-white/60' : ''}`}
        />
        <button type="submit" disabled={pending} className={`btn ${dark ? 'btn-light' : 'btn-primary'}`}>
          {t.submit}
        </button>
      </div>
      <Turnstile locale={locale} />
      {state.status === 'error' && (
        <p role="alert" className={`text-sm ${dark ? 'text-red-200' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
