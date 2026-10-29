import Image from 'next/image'
import React from 'react'
import { serverURL } from '@/lib/paths'
import type { Media as MediaDoc } from '@/payload-types'

type Props = {
  resource?: MediaDoc | number | string | null
  size?: 'thumbnail' | 'card' | 'large' | 'og'
  className?: string
  imgClassName?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
  alt?: string
}

/** Responsive image from the media library (WebP/AVIF, lazy-loaded, alt text from the CMS). */
export function Media({ resource, size, className, imgClassName, fill, priority, sizes, alt }: Props) {
  if (!resource || typeof resource !== 'object' || !resource.url) return null
  const variant = size ? resource.sizes?.[size] : undefined
  // Same-origin uploads are passed as local paths so next/image reads them without an extra HTTP hop.
  const raw = variant?.url || resource.url
  const src = raw.startsWith(serverURL) ? raw.slice(serverURL.length) : raw
  const width = variant?.width || resource.width || 1200
  const height = variant?.height || resource.height || 800
  const isSvg = resource.mimeType === 'image/svg+xml'
  const style =
    resource.focalX != null && resource.focalY != null ? { objectPosition: `${resource.focalX}% ${resource.focalY}%` } : undefined

  const img = (
    <Image
      src={src}
      alt={alt ?? resource.alt ?? ''}
      {...(fill ? { fill: true } : { width, height })}
      sizes={sizes ?? (fill ? '100vw' : `(max-width: 768px) 100vw, ${width}px`)}
      priority={priority}
      unoptimized={isSvg}
      className={imgClassName}
      style={style}
    />
  )
  return className ? <div className={className}>{img}</div> : img
}
