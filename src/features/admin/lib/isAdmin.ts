const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || []

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email)
}
