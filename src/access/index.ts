import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

type Role = 'admin' | 'editor'

export const hasRole = (req: PayloadRequest, role: Role): boolean => {
  const user = req.user as { collection?: string; roles?: Role[] } | null
  return Boolean(user && user.collection === 'users' && user.roles?.includes(role))
}

export const isAdmin = (req: PayloadRequest) => hasRole(req, 'admin')
export const isStaff = (req: PayloadRequest) => isAdmin(req) || hasRole(req, 'editor')

export const adminOnly: Access = ({ req }) => isAdmin(req)
export const staffOnly: Access = ({ req }) => isStaff(req)
export const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req)

/** Public visitors only see published, non-archived documents; staff see everything. */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req)) return true
  const where: Where = {
    and: [{ _status: { equals: 'published' } }, { archived: { not_equals: true } }],
  }
  return where
}

/** Users: admins manage everyone, other users can only read/update themselves. */
export const adminOrSelf: Access = ({ req }) => {
  if (isAdmin(req)) return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}
