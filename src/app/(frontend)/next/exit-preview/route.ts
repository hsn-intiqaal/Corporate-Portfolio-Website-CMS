import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  ;(await draftMode()).disable()
  const referer = request.headers.get('referer')
  let path = '/'
  try {
    if (referer) path = new URL(referer).pathname
  } catch {}
  redirect(path)
}
