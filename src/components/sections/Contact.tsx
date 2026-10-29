import React, { Suspense } from 'react'
import type { ContactBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTexts } from '@/lib/texts'
import { getServices, getSettings } from '@/lib/data'
import { LeadForm } from '../forms/LeadForm'
import { Icon } from '../site/Icon'
import { Section, SectionHeading } from '../site/Section'

export async function Contact({ block, locale }: { block: ContactBlock; locale: Locale }) {
  const [settings, services] = await Promise.all([getSettings(locale), block.form === 'quote' ? getServices(locale) : Promise.resolve([])])
  const t = await getTexts(locale)
  const hasForm = block.form && block.form !== 'none'
  const details = [
    settings.phone && { icon: 'phone', label: t.phone, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}`, ltr: true },
    settings.whatsapp && {
      icon: 'whatsapp',
      label: t.whatsapp,
      value: `+${settings.whatsapp.replace(/\D/g, '')}`,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
      ltr: true,
    },
    settings.email && { icon: 'mail', label: t.email, value: settings.email, href: `mailto:${settings.email}` },
    settings.address && { icon: 'pin', label: t.address, value: settings.address },
    settings.workingHours && { icon: 'clock', label: '', value: settings.workingHours },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string; ltr?: boolean }[]

  return (
    <Section settings={block.settings}>
      <div className="container-site">
        <SectionHeading title={block.title} intro={block.intro} />
        <div className={`grid gap-10 ${hasForm && block.showDetails ? 'lg:grid-cols-5' : ''}`}>
          {hasForm && (
            <div className="rounded-2xl bg-white p-6 text-ink shadow-sm ring-1 ring-line sm:p-8 lg:col-span-3">
              <Suspense fallback={null}>
                <LeadForm
                  type={block.form as 'contact' | 'quote'}
                  locale={locale}
                  t={t.form}
                  services={services.map((s) => ({ id: s.id, title: s.title }))}
                />
              </Suspense>
            </div>
          )}
          {block.showDetails && (
            <div className="space-y-6 lg:col-span-2">
              <ul className="space-y-5">
                {details.map((d) => (
                  <li key={d.icon} className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <div>
                      {d.label && <div className="text-sm text-muted">{d.label}</div>}
                      {d.href ? (
                        <a
                          href={d.href}
                          dir={d.ltr ? 'ltr' : undefined}
                          className="font-semibold hover:text-brand"
                          target={d.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <div className="font-semibold whitespace-pre-line">{d.value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {block.showMap && settings.mapEmbedUrl && (
                <iframe
                  src={settings.mapEmbedUrl}
                  title={t.address}
                  className="aspect-[4/3] w-full rounded-2xl border-0 ring-1 ring-line"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
