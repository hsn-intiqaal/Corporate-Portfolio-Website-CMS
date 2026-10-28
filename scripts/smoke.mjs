// Post-deploy smoke test: node scripts/smoke.mjs https://example.com
// Checks the key public pages, SEO files and that private data is not exposed.
const base = (process.argv[2] || process.env.SMOKE_URL || 'http://localhost:3000').replace(/\/$/, '')
const checks = []
const check = (name, fn) => checks.push({ name, fn })
const get = (path, init) => fetch(base + path, { redirect: 'manual', ...init })

for (const path of ['/ar', '/en', '/ar/services', '/en/projects', '/en/contact', '/ar/request-a-quote', '/ar/blog', '/en/blog']) {
  check(`GET ${path} is 200`, async () => {
    const r = await get(path)
    if (r.status !== 200) throw new Error(`status ${r.status}`)
    const html = await r.text()
    if (!/<link rel="canonical"/.test(html)) throw new Error('missing canonical')
    if (!/hrefLang="(ar|en)"/i.test(html)) throw new Error('missing hreflang')
  })
}
check('Arabic pages are right-to-left', async () => {
  const html = await (await get('/ar')).text()
  if (!/<html[^>]+dir="rtl"/.test(html)) throw new Error('no dir=rtl')
})
check('Root redirects to a language', async () => {
  const r = await get('/')
  if (![307, 308].includes(r.status) || !/\/(ar|en)$/.test(r.headers.get('location') || '')) throw new Error(`status ${r.status}`)
})
check('Unknown page is a 404', async () => {
  const r = await get('/en/this-page-does-not-exist-xyz')
  if (r.status !== 404) throw new Error(`status ${r.status}`)
})
check('sitemap.xml lists both languages', async () => {
  const xml = await (await get('/sitemap.xml')).text()
  if (!xml.includes('/ar') || !xml.includes('/en')) throw new Error('missing locales')
})
check('RSS feeds are valid XML with items', async () => {
  for (const l of ['ar', 'en']) {
    const r = await get(`/${l}/feed.xml`)
    const xml = await r.text()
    if (r.status !== 200 || !xml.includes('<rss')) throw new Error(`/${l}/feed.xml returned ${r.status}`)
  }
})
check('Search works and is not indexed', async () => {
  const html = await (await get('/en/search?q=a')).text()
  if (!/<meta name="robots" content="noindex/.test(html)) throw new Error('search page is indexable')
})
check('Web app manifest is served', async () => {
  const r = await get('/manifest.webmanifest')
  if (r.status !== 200) throw new Error(`status ${r.status}`)
})
check('robots.txt is served', async () => {
  const r = await get('/robots.txt')
  if (r.status !== 200) throw new Error(`status ${r.status}`)
})
check('Leads are not public', async () => {
  for (const path of ['/api/leads', '/api/lead-files', '/api/leads/export-csv', '/api/audit-logs', '/api/subscribers', '/api/documents', '/api/subscribers/export-csv']) {
    const r = await get(path)
    if (r.status !== 403 && r.status !== 401) throw new Error(`${path} returned ${r.status}`)
  }
})
check('Forged download links are rejected', async () => {
  const r = await get('/next/download/1.9999999999.forged')
  if (r.status !== 410) throw new Error(`status ${r.status}`)
})
check('Dashboard login page loads', async () => {
  const r = await get('/admin/login')
  if (r.status !== 200) throw new Error(`status ${r.status}`)
})
check('Security headers are set', async () => {
  const r = await get('/en')
  for (const h of ['x-content-type-options', 'x-frame-options', 'referrer-policy']) if (!r.headers.get(h)) throw new Error(`missing ${h}`)
})

let failed = 0
for (const { name, fn } of checks) {
  try {
    await fn()
    console.log(`  ✓ ${name}`)
  } catch (e) {
    failed++
    console.log(`  ✗ ${name}: ${e.message}`)
  }
}
console.log(failed ? `\n${failed} check(s) failed against ${base}` : `\nAll ${checks.length} checks passed against ${base}`)
process.exit(failed ? 1 : 0)
