'use client'
import { useField } from '@payloadcms/ui'
import React from 'react'

const isHex = (v: unknown): v is string => typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)
const expand = (h: string) => (h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h)

/** Colour swatch + native picker shown under a hex text field (admin.components.afterInput). */
export function ColorPicker({ path }: { path: string }) {
  const { value, setValue } = useField<string>({ path })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <input
        type="color"
        aria-label="Pick a colour"
        value={isHex(value) ? expand(value) : '#000000'}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: 44,
          height: 32,
          padding: 0,
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 6,
          background: 'none',
          cursor: 'pointer',
        }}
      />
      <span style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>{isHex(value) ? value : '—'}</span>
    </div>
  )
}
