import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { followRedirect } from '@/lib/data'

type Props = { params: Promise<{ locale: string; rest: string[] }> }

/** Any deeper unknown path: honour an editable redirect, otherwise show the branded 404. */
export default async function CatchAll({ params }: Props) {
  const { locale, rest } = await params
  if (isLocale(locale)) {
    await followRedirect(`/${locale}/${rest.map(decodeURIComponent).join('/')}`)
  }
  notFound()
}
