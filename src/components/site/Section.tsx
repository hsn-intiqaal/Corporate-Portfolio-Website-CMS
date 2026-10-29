import React from 'react'

export type SectionSettings = {
  hidden?: boolean | null
  background?: 'white' | 'light' | 'primary' | 'dark' | 'accent' | null
  spacing?: 'compact' | 'normal' | 'spacious' | null
  anchor?: string | null
}

const bg = {
  white: 'bg-white',
  light: 'bg-soft',
  primary: 'bg-brand text-white on-dark',
  dark: 'bg-dark text-white on-dark',
  accent: 'bg-accent/10',
}
const pad = { compact: 'py-10 sm:py-12', normal: 'py-16 sm:py-20', spacious: 'py-20 sm:py-28' }

export const isDarkBg = (s?: SectionSettings | null) => s?.background === 'primary' || s?.background === 'dark'

export function Section({
  settings,
  className = '',
  children,
  as: Tag = 'section',
  ...rest
}: {
  settings?: SectionSettings | null
  className?: string
  children: React.ReactNode
  as?: 'section' | 'div'
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      id={settings?.anchor || undefined}
      className={`${bg[settings?.background ?? 'white']} ${pad[settings?.spacing ?? 'normal']} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  title,
  intro,
  eyebrow,
  center = false,
}: {
  title?: string | null
  intro?: string | null
  eyebrow?: string | null
  center?: boolean
}) {
  if (!title && !intro) return null
  return (
    <div className={`mb-10 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
    </div>
  )
}
