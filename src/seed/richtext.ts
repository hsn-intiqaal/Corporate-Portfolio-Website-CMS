/** Minimal Lexical JSON builders for seed content. */
type Node = Record<string, unknown>

const text = (t: string, format = 0): Node => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })
const block = (type: string, children: Node[], extra: Node = {}): Node => ({ type, children, direction: null, format: '', indent: 0, version: 1, ...extra })

export const p = (t: string) => block('paragraph', [text(t)], { textFormat: 0, textStyle: '' })
export const h = (t: string, tag: 'h2' | 'h3' = 'h2') => block('heading', [text(t)], { tag })
export const ul = (items: string[]) =>
  block('list', items.map((i, n) => block('listitem', [text(i)], { value: n + 1 })), { listType: 'bullet', start: 1, tag: 'ul' })

export const doc = (...children: Node[]) => ({ root: block('root', children) })
