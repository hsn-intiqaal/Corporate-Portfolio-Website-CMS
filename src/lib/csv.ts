/** CSV cell that is safe to open in Excel: quoted, and formulas neutralised (CSV/formula injection). */
export const csvCell = (value: unknown): string => {
  let text = value === null || value === undefined ? '' : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

/** UTF-8 BOM so Excel shows Arabic correctly. */
export const toCsv = (header: string[], rows: unknown[][]) =>
  '﻿' + [header.join(','), ...rows.map((r) => r.map(csvCell).join(','))].join('\r\n')
