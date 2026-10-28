/** Helpers for Lexical rich-text JSON (plain text, reading time, headings for a table of contents). */
type LexNode = { type?: string; text?: string; tag?: string; children?: LexNode[] }

export const lexicalToText = (data: unknown): string => {
  const root = (data as { root?: LexNode } | null)?.root
  if (!root) return ''
  const walk = (n: LexNode): string => (n.text ?? '') + (n.children ?? []).map(walk).join(n.type === 'root' ? '\n' : ' ')
  return walk(root).replace(/\s+/g, ' ').trim()
}

/** Minutes at ~200 words per minute (similar for Arabic and English body text). */
export const readingMinutes = (data: unknown): number => Math.max(1, Math.round(lexicalToText(data).split(' ').filter(Boolean).length / 200))

export const headingId = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80) || 'section'

export const extractHeadings = (data: unknown): { id: string; text: string; level: 2 | 3 }[] => {
  const root = (data as { root?: LexNode } | null)?.root
  if (!root) return []
  const out: { id: string; text: string; level: 2 | 3 }[] = []
  const seen = new Map<string, number>()
  for (const node of root.children ?? []) {
    if (node.type !== 'heading' || (node.tag !== 'h2' && node.tag !== 'h3')) continue
    const text = lexicalToText({ root: { type: 'root', children: [node] } })
    if (!text) continue
    let id = headingId(text)
    const n = seen.get(id) ?? 0
    seen.set(id, n + 1)
    if (n) id = `${id}-${n + 1}`
    out.push({ id, text, level: node.tag === 'h2' ? 2 : 3 })
  }
  return out
}
