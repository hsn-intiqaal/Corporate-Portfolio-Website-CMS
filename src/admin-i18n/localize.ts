import type { Block, CollectionConfig, Config, Field, GlobalConfig, Plugin, Tab } from 'payload'

/**
 * Bilingual dashboard: turns every English label, description, option, tab, block and group name in
 * the config into `{ en, ar }` using the dictionary in ./ar.ts, so the whole dashboard follows the
 * user's interface language. Strings without a translation stay English (the unit tests list them).
 */
type Text = string | Record<string, string>
export type Translations = Record<string, string>

/** Same algorithm Payload uses for labels derived from a field name ("siteName" → "Site Name"). */
export const toWords = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())

export function createLocalizer(ar: Translations, missing?: Set<string>) {
  const t = (value: unknown): unknown => {
    if (typeof value !== 'string' || value === '') return value
    const translated = ar[value]
    if (!translated) {
      missing?.add(value)
      return value
    }
    return { en: value, ar: translated }
  }
  const tText = (value: Text | undefined) => (typeof value === 'string' ? (t(value) as Text) : value)

  const fields = (list: Field[] | undefined): Field[] | undefined => list?.map(field)

  const field = (input: Field): Field => {
    const f = { ...input } as Record<string, unknown>
    const name = typeof f.name === 'string' ? f.name : undefined
    if (f.label === undefined && name && f.type !== 'tabs' && f.type !== 'row') f.label = toWords(name)
    if (typeof f.label === 'string') f.label = t(f.label)
    if (f.admin && typeof f.admin === 'object') {
      const admin = { ...(f.admin as Record<string, unknown>) }
      if (typeof admin.description === 'string') admin.description = t(admin.description)
      f.admin = admin
    }
    if (Array.isArray(f.options)) {
      f.options = f.options.map((o) =>
        typeof o === 'string'
          ? { value: o, label: t(o) ?? o }
          : typeof o === 'object' && o
            ? { ...o, label: t((o as { label?: string }).label) }
            : o,
      )
    }
    if (Array.isArray(f.fields)) f.fields = fields(f.fields as Field[])
    if (Array.isArray(f.tabs)) f.tabs = (f.tabs as Tab[]).map(tab)
    if (Array.isArray(f.blocks)) f.blocks = (f.blocks as Block[]).map(block)
    if (f.labels && typeof f.labels === 'object') {
      const l = f.labels as { singular?: Text; plural?: Text }
      f.labels = { singular: tText(l.singular), plural: tText(l.plural) }
    }
    return f as Field
  }

  const tab = (input: Tab): Tab => {
    const out = { ...input } as Tab & { label?: unknown; description?: unknown }
    const label = out.label ?? ('name' in out && out.name ? toWords(out.name) : undefined)
    if (typeof label === 'string') (out as { label: unknown }).label = t(label)
    if (typeof out.description === 'string') out.description = t(out.description) as string
    out.fields = fields(out.fields) as Field[]
    return out
  }

  const block = (input: Block): Block => {
    const labels = input.labels ?? { singular: toWords(input.slug), plural: toWords(input.slug) }
    return {
      ...input,
      labels: { singular: tText(labels.singular as Text) as never, plural: tText(labels.plural as Text) as never },
      fields: fields(input.fields) as Field[],
    }
  }

  const admin = <T extends { group?: unknown; description?: unknown }>(a: T | undefined): T | undefined =>
    a
      ? {
          ...a,
          group: typeof a.group === 'string' ? t(a.group) : a.group,
          description: typeof a.description === 'string' ? t(a.description) : a.description,
        }
      : a

  const collection = (c: CollectionConfig): CollectionConfig => {
    const labels = c.labels ?? { singular: toWords(c.slug).replace(/s$/, ''), plural: toWords(c.slug) }
    return {
      ...c,
      labels: { singular: tText(labels.singular as Text) as never, plural: tText(labels.plural as Text) as never },
      admin: admin(c.admin as never) as CollectionConfig['admin'],
      fields: fields(c.fields) as Field[],
    }
  }

  const global = (g: GlobalConfig): GlobalConfig => ({
    ...g,
    label: typeof g.label === 'string' ? (t(g.label) as never) : (g.label ?? (t(toWords(g.slug)) as never)),
    admin: admin(g.admin as never) as GlobalConfig['admin'],
    fields: fields(g.fields) as Field[],
  })

  return { field, collection, global }
}

/** Strings without an Arabic translation, collected while the config is built (read by the unit tests). */
export const untranslated = new Set<string>()

/** Payload plugin: add it last so fields added by other plugins are translated too. */
export const localizeAdmin =
  (ar: Translations): Plugin =>
  (config: Config): Config => {
    const l = createLocalizer(ar, untranslated)
    return {
      ...config,
      collections: config.collections?.map(l.collection),
      globals: config.globals?.map(l.global),
    }
  }
