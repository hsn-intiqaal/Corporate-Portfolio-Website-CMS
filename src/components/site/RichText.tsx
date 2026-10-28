import React from 'react'
import { RichText as LexicalRichText, type JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Locale } from '@/i18n/config'
import { docPath, type LinkableCollection } from '@/lib/paths'

const converters =
  (locale: Locale): JSXConvertersFunction =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({
      internalDocToHref: ({ linkNode }) => {
        const doc = linkNode.fields.doc
        if (!doc || typeof doc.value !== 'object') return '#'
        return docPath(doc.relationTo as LinkableCollection, (doc.value as { slug?: string }).slug, locale)
      },
    }),
  })

export function RichText({ data, locale, className = '' }: { data?: unknown; locale: Locale; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return <LexicalRichText data={data as SerializedEditorState} converters={converters(locale)} className={`prose-cms ${className}`} />
}
