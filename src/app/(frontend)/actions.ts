'use server'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { handleLeadSubmission, type LeadFormState } from '@/lib/leads'
import { handleNewsletterSignup, type NewsletterState } from '@/lib/newsletter'

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const locale = formData.get('locale')
  const t = getDictionary(isLocale(locale) ? locale : 'ar')
  return handleLeadSubmission(formData, (key) => (key in t.form ? t.form[key as keyof typeof t.form] : t.form.error))
}

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  return handleNewsletterSignup(formData)
}
