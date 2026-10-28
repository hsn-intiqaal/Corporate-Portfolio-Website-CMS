import React from 'react'

export function LeadsExportButton() {
  return (
    <div style={{ display: 'flex', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/leads/export-csv">
        Export all leads (CSV)
      </a>
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/leads/export-csv?status=new">
        Export new leads (CSV)
      </a>
    </div>
  )
}
