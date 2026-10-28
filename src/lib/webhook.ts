import crypto from 'node:crypto'
import type { Payload } from 'payload'

/** Sends a signed JSON event to the CRM / automation webhook configured in Settings > Integrations. */
export async function sendWebhook(payload: Payload, event: string, data: Record<string, unknown>) {
  try {
    const settings = await payload.findGlobal({ slug: 'settings', depth: 0, overrideAccess: true })
    if (!settings.webhookUrl) return
    const body = JSON.stringify({ event, sentAt: new Date().toISOString(), data })
    const signature = crypto.createHmac('sha256', settings.webhookSecret || '').update(body).digest('hex')
    const res = await fetch(settings.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Signature': signature, 'X-Event': event },
      body,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) payload.logger.warn(`Webhook ${event} returned ${res.status}`)
  } catch (error) {
    payload.logger.error({ err: error, msg: `Webhook ${event} failed` })
  }
}
