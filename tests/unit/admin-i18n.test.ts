import { describe, expect, it } from 'vitest'
import { createLocalizer, toWords } from '@/admin-i18n/localize'

describe('dashboard translation', () => {
  it('translates labels, descriptions, options and nested fields', () => {
    const l = createLocalizer({ Title: 'العنوان', 'Site Name': 'اسم الموقع', Help: 'مساعدة', Light: 'فاتح', Tab: 'تبويب' })
    const g = l.global({
      slug: 'x',
      label: 'Title',
      fields: [
        { name: 'siteName', type: 'text', admin: { description: 'Help' } },
        { name: 'mode', type: 'select', options: ['Light', { label: 'Title', value: 't' }] },
        { type: 'tabs', tabs: [{ label: 'Tab', fields: [{ name: 'title', type: 'text' }] }] },
      ],
    })
    expect(g.label).toEqual({ en: 'Title', ar: 'العنوان' })
    const [site, mode, tabs] = g.fields as never as [
      Record<string, never>,
      Record<string, never>,
      { tabs: { label: unknown; fields: { label: unknown }[] }[] },
    ]
    expect(site.label).toEqual({ en: 'Site Name', ar: 'اسم الموقع' })
    expect((site.admin as { description: unknown }).description).toEqual({ en: 'Help', ar: 'مساعدة' })
    expect((mode.options as { label: unknown }[])[0].label).toEqual({ en: 'Light', ar: 'فاتح' })
    expect(tabs.tabs[0].label).toEqual({ en: 'Tab', ar: 'تبويب' })
    expect(tabs.tabs[0].fields[0].label).toEqual({ en: 'Title', ar: 'العنوان' })
  })
  it('derives labels from field names like Payload does', () => {
    expect(toWords('siteName')).toBe('Site Name')
    expect(toWords('ip_hash')).toBe('Ip hash')
  })
  it('has an Arabic translation for every string in the real CMS config', async () => {
    const { untranslated } = await import('@/admin-i18n/localize')
    await (
      await import('@payload-config')
    ).default
    expect([...untranslated]).toEqual([])
  })
})
