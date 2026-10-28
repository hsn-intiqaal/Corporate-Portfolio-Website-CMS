import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

/** Opened by the dashboard "Preview" button. Only signed-in staff can enable draft mode. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || '/'
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Invalid path', { status: 400 })

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Sign in to the dashboard to preview drafts.', { status: 403 })

  ;(await draftMode()).enable()
  redirect(path)
}
