'use client'
import React, { useState } from 'react'

/** Shows a cover image and loads the YouTube/Vimeo player only after a click (fast and privacy-friendly). */
export function VideoPlayer({
  embedUrl,
  poster,
  title,
  playLabel,
}: {
  embedUrl: string
  poster?: React.ReactNode
  title: string
  playLabel: string
}) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-dark shadow-lg">
      {playing ? (
        <iframe
          src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
          title={title}
          className="absolute inset-0 size-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex size-full items-center justify-center"
          aria-label={`${playLabel}: ${title}`}
        >
          {poster}
          <span className="absolute inset-0 bg-dark/30 transition group-hover:bg-dark/20" aria-hidden />
          <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-brand shadow-xl transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ms-1 size-8" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
