import React from 'react'

export function LeadsExportButton({ i18n }: { i18n?: { language?: string } }) {
  const ar = i18n?.language === 'ar'
  return (
    <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from an API route, not a page */}
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/leads/export-csv">
        {ar ? 'تصدير كل الطلبات (CSV)' : 'Export all leads (CSV)'}
      </a>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from an API route, not a page */}
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/leads/export-csv?status=new">
        {ar ? 'تصدير الطلبات الجديدة (CSV)' : 'Export new leads (CSV)'}
      </a>
    </div>
  )
}
