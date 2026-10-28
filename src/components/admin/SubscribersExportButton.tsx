import React from 'react'

export function SubscribersExportButton() {
  return (
    <div style={{ margin: '0 0 16px' }}>
      <a className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} href="/api/subscribers/export-csv">
        Export confirmed subscribers (CSV)
      </a>
    </div>
  )
}
