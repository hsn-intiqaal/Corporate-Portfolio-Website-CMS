import crypto from 'node:crypto'

const key = () => crypto.createHash('sha256').update(`downloads:${process.env.PAYLOAD_SECRET || ''}`).digest()

/** Creates a URL-safe token `<id>.<expiry>.<signature>` valid for `ttlSeconds`. */
export const signToken = (id: string | number, ttlSeconds = 60 * 60 * 24) => {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const sig = crypto.createHmac('sha256', key()).update(`${id}.${exp}`).digest('base64url')
  return `${id}.${exp}.${sig}`
}

export const verifyToken = (token: string): string | null => {
  const [id, exp, sig] = token.split('.')
  if (!id || !exp || !sig) return null
  if (Number(exp) < Date.now() / 1000) return null
  const expected = crypto.createHmac('sha256', key()).update(`${id}.${exp}`).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? id : null
}
