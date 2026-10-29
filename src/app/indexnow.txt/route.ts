import { indexNowKey } from '@/lib/indexnow'

/** IndexNow key file (proves to search engines that pings come from this site). */
export function GET() {
  return new Response(indexNowKey(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
