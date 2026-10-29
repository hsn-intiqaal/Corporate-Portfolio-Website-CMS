import React from 'react'

export function SubscribersExportButton({ i18n }: { i18n?: { language?: string } }) {
  const ar = i18n?.language === 'ar'
  return (
    <div style={{ margin: '0 0 16px' }}>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from an API route, not a page */}
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/subscribers/export-csv">
        {ar ? 'تصدير المشتركين المؤكَّدين (CSV)' : 'Export confirmed subscribers (CSV)'}
      </a>
    </div>
  )
}
