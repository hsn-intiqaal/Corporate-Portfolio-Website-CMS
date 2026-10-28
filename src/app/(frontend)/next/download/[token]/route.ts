import { getPayloadClient } from '@/lib/payload'
import { verifyToken } from '@/lib/signing'

/** Resolves a signed brochure link to the protected file. Links expire (see lib/signing.ts). */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const id = verifyToken(token)
  if (!id) return new Response('This download link is invalid or has expired.', { status: 410 })
  const payload = await getPayloadClient()
  const doc = await payload.findByID({ collection: 'documents', id: Number(id), depth: 0, overrideAccess: true }).catch(() => null)
  if (!doc?.filename) return new Response('Not found', { status: 404 })
  return Response.redirect(new URL(`/api/documents/file/${encodeURIComponent(doc.filename)}?t=${encodeURIComponent(token)}`, _request.url), 302)
}
