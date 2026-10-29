import { describe, expect, it } from 'vitest'
import { slugify } from '@/fields/slug'
import { extractHeadings, headingId, lexicalToText, readingMinutes } from '@/lib/lexical'
import { csvCell, toCsv } from '@/lib/csv'
import { toEmbedUrl } from '@/components/sections/Video'

const lex = (...children: object[]) => ({ root: { type: 'root', children } })
const heading = (tag: string, text: string) => ({ type: 'heading', tag, children: [{ type: 'text', text }] })
const para = (text: string) => ({ type: 'paragraph', children: [{ type: 'text', text }] })

describe('slugify', () => {
  it('makes URL-safe slugs and keeps Arabic letters', () => {
    expect(slugify('  Hello, World! 2026 ')).toBe('hello-world-2026')
    expect(slugify('Café   Déjà_vu')).toBe('cafe-deja-vu')
    expect(slugify('خدمات التصميم')).toBe('خدمات-التصميم')
    expect(slugify('--a--b--')).toBe('a-b')
  })
})

describe('lexical helpers', () => {
  const doc = lex(
    para('One two three'),
    heading('h2', 'Why it matters'),
    para('four'),
    heading('h3', 'Details'),
    heading('h2', 'Why it matters'),
  )

  it('extracts plain text', () => {
    expect(lexicalToText(doc)).toContain('One two three')
    expect(lexicalToText(null)).toBe('')
  })

  it('estimates reading time with a one-minute minimum', () => {
    expect(readingMinutes(doc)).toBe(1)
    expect(readingMinutes(lex(para(Array(1000).fill('word').join(' '))))).toBe(5)
  })

  it('builds a table of contents with unique ids', () => {
    expect(extractHeadings(doc)).toEqual([
      { id: 'why-it-matters', text: 'Why it matters', level: 2 },
      { id: 'details', text: 'Details', level: 3 },
      { id: 'why-it-matters-2', text: 'Why it matters', level: 2 },
    ])
    expect(headingId('لماذا هذا مهم؟')).toBe('لماذا-هذا-مهم')
  })
})

describe('CSV export', () => {
  it('quotes values and neutralises spreadsheet formulas', () => {
    expect(csvCell('a "b"')).toBe('"a ""b"""')
    expect(csvCell('=HYPERLINK("x")')).toBe('"\'=HYPERLINK(""x"")"')
    expect(csvCell(null)).toBe('""')
  })
  it('adds a BOM and CRLF rows so Excel reads Arabic', () => {
    const csv = toCsv(['name'], [['أحمد'], ['Sara']])
    expect(csv.startsWith('﻿')).toBe(true)
    expect(csv).toBe('﻿name\r\n"أحمد"\r\n"Sara"')
  })
})

describe('video embeds', () => {
  it('converts YouTube and Vimeo page URLs to privacy-friendly embeds', () => {
    expect(toEmbedUrl('https://www.youtube.com/watch?v=aqz-KE-bpKQ')).toBe('https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0')
    expect(toEmbedUrl('https://youtu.be/aqz-KE-bpKQ')).toContain('/embed/aqz-KE-bpKQ')
    expect(toEmbedUrl('https://vimeo.com/76979871')).toBe('https://player.vimeo.com/video/76979871?dnt=1')
    expect(toEmbedUrl('https://example.com/video')).toBeNull()
  })
})
