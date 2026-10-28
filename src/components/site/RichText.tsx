import React from 'react'
import { RichText as LexicalRichText, type JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Locale } from '@/i18n/config'
import { headingId, lexicalToText } from '@/lib/lexical'
import { docPath, type LinkableCollection } from '@/lib/paths'

const converters =
  (locale: Locale): JSXConvertersFunction =>
  ({ defaultConverters }) => {
    // Same id scheme as extractHeadings() so the table of contents can link to each h2/h3.
    const seen = new Map<string, number>()
    return {
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag
      const children = nodesToJSX({ nodes: node.children })
      if (Tag !== 'h2' && Tag !== 'h3') return <Tag>{children}</Tag>
      let id = headingId(lexicalToText({ root: { type: 'root', children: [node] } }))
      const n = seen.get(id) ?? 0
      seen.set(id, n + 1)
      if (n) id = `${id}-${n + 1}`
      return (
        <Tag id={id} className="scroll-mt-28">
          {children}
        </Tag>
      )
    },
    ...LinkJSXConverter({
      internalDocToHref: ({ linkNode }) => {
        const doc = linkNode.fields.doc
        if (!doc || typeof doc.value !== 'object') return '#'
        return docPath(doc.relationTo as LinkableCollection, (doc.value as { slug?: string }).slug, locale)
      },
    }),
    }
  }

export function RichText({ data, locale, className = '' }: { data?: unknown; locale: Locale; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return <LexicalRichText data={data as SerializedEditorState} converters={converters(locale)} className={`prose-cms ${className}`} />
}
