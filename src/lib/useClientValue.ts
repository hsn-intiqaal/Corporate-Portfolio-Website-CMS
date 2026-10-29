'use client'
import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
export const notifyClientValues = () => listeners.forEach((l) => l())

/**
 * Reads a browser-only value (localStorage, URL) without a hydration mismatch: the server and the
 * first client render use `serverValue`, then React re-renders with the real value.
 * Call `notifyClientValues()` after changing the underlying value.
 */
export function useClientValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      window.addEventListener('popstate', cb)
      return () => {
        listeners.delete(cb)
        window.removeEventListener('popstate', cb)
      }
    },
    read,
    () => serverValue,
  )
}
