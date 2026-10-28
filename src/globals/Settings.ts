import type { GlobalConfig } from 'payload'
import { adminOnly, adminOnlyField } from '@/access'
import { brandPalettes } from '@/fields/palette'
import { auditGlobal } from '@/hooks/audit'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Branding & settings',
  admin: { group: 'Administration' },
  access: { read: () => true, update: adminOnly },
  hooks: { afterChange: [revalidateGlobal, auditGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                { name: 'tagline', type: 'text', localized: true, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'For light backgrounds' } },
                { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'For dark backgrounds (optional)' } },
                { name: 'favicon', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Square PNG, 512×512' } },
              ],
            },
            {
              name: 'palette',
              type: 'select',
              required: true,
              defaultValue: 'ocean',
              label: 'Brand colours',
              admin: { description: 'Choose from the approved palettes. New palettes are added by the developer.' },
              options: Object.entries(brandPalettes).map(([value, p]) => ({ value, label: p.label })),
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { width: '33%' } },
                { name: 'whatsapp', type: 'text', admin: { width: '33%', description: 'International format, digits only, e.g. 9665XXXXXXXX' } },
                { name: 'email', type: 'email', admin: { width: '33%' } },
              ],
            },
            { name: 'address', type: 'textarea', localized: true },
            { name: 'workingHours', type: 'text', localized: true },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              admin: { description: 'Google Maps → Share → Embed a map → copy only the src="…" URL.' },
              validate: (v: unknown) => !v || (typeof v === 'string' && /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(v)) || 'Paste a Google Maps embed URL (https://www.google.com/maps/embed?...)',
            },
            {
              name: 'social',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['linkedin', 'x', 'instagram', 'facebook', 'youtube', 'tiktok', 'snapchat'],
                      admin: { width: '30%' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'defaultTitle', type: 'text', localized: true, admin: { description: 'Used on pages without their own SEO title' } },
            { name: 'titleSuffix', type: 'text', localized: true, admin: { description: 'Appended to page titles, e.g. " | Company"' } },
            { name: 'defaultDescription', type: 'textarea', localized: true },
            { name: 'defaultImage', type: 'upload', relationTo: 'media', admin: { description: 'Default social sharing image (1200×630)' } },
            {
              name: 'organizationType',
              type: 'select',
              defaultValue: 'Organization',
              options: [
                { label: 'Organization', value: 'Organization' },
                { label: 'Local business (has a public address)', value: 'LocalBusiness' },
              ],
            },
            { name: 'googleSiteVerification', type: 'text', admin: { description: 'Google Search Console HTML-tag verification code (content value only)' } },
          ],
        },
        {
          label: 'Languages',
          fields: [
            {
              name: 'missingTranslation',
              type: 'radio',
              defaultValue: 'fallback',
              label: 'When a translation is missing',
              options: [
                { label: 'Show the other language with a notice', value: 'fallback' },
                { label: 'Hide the page until the translation is ready', value: 'hide' },
              ],
            },
            {
              name: 'arabicNumerals',
              type: 'radio',
              defaultValue: 'western',
              label: 'Numbers on the Arabic site',
              options: [
                { label: 'Western (0-9)', value: 'western' },
                { label: 'Eastern Arabic (٠-٩)', value: 'eastern' },
              ],
            },
          ],
        },
        {
          label: 'Integrations',
          fields: [
            {
              name: 'webhookUrl',
              type: 'text',
              label: 'CRM / automation webhook URL',
              access: { read: adminOnlyField },
              admin: { description: 'New leads and confirmed newsletter subscribers are POSTed here as JSON (works with HubSpot, Zoho, Zapier, Make, n8n...). Each request is signed: header X-Signature = HMAC-SHA256(body, secret).' },
              validate: (v: unknown) => !v || (typeof v === 'string' && /^https:\/\//.test(v)) || 'Must start with https://',
            },
            { name: 'webhookSecret', type: 'text', access: { read: adminOnlyField }, admin: { description: 'Shared secret used to sign webhook requests.' } },
            {
              name: 'newsletterEnabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show the newsletter signup in the footer',
            },
            {
              name: 'customScripts',
              type: 'array',
              label: 'Third-party scripts (live chat, tag manager, pixels)',
              admin: { description: 'Paste the vendor snippet. Scripts marked "needs consent" load only after the visitor accepts cookies. Only add code from trusted vendors.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'code', type: 'code', required: true, admin: { language: 'html' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'placement', type: 'select', defaultValue: 'body', options: [{ label: 'End of page', value: 'body' }, { label: 'Head', value: 'head' }], admin: { width: '50%' } },
                    { name: 'needsConsent', type: 'checkbox', defaultValue: true, label: 'Needs cookie consent', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Leads & roles',
          fields: [
            {
              name: 'leadRecipients',
              type: 'array',
              label: 'Send new enquiries to',
              access: { read: adminOnlyField },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
            {
              name: 'spamAlertThreshold',
              type: 'number',
              defaultValue: 30,
              min: 5,
              access: { read: adminOnlyField },
              admin: { description: 'Send an alert email when more than this many enquiries arrive within one hour.' },
            },
            {
              name: 'editorsCanPublish',
              type: 'checkbox',
              defaultValue: false,
              label: 'Editors can publish (otherwise they save drafts for an administrator to publish)',
            },
          ],
        },
      ],
    },
  ],
}
