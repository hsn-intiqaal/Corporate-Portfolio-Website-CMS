import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig, type Field } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'

import { adminOnly } from './access'
import { ArticleCategories } from './collections/ArticleCategories'
import { Articles } from './collections/Articles'
import { AuditLogs } from './collections/AuditLogs'
import { Authors } from './collections/Authors'
import { Documents } from './collections/Documents'
import { LeadFiles } from './collections/LeadFiles'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { ProjectCategories } from './collections/ProjectCategories'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Subscribers } from './collections/Subscribers'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { docPath, serverURL } from './lib/paths'
import { isLocale } from './i18n/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 = Boolean(process.env.S3_BUCKET)
const useSmtp = Boolean(process.env.SMTP_HOST)

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Dashboard', robots: 'noindex, nofollow' },
    components: {
      beforeDashboard: ['@/components/admin/DashboardPanel#DashboardPanel'],
    },
    dateFormat: 'd MMM yyyy, HH:mm',
  },
  // The dashboard itself can be used in Arabic or English (each user picks in their account).
  i18n: { supportedLanguages: { ar, en }, fallbackLanguage: 'en' },
  localization: {
    locales: [
      { label: 'العربية', code: 'ar', rtl: true },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'ar',
    fallback: true,
  },
  collections: [Pages, Services, Projects, ProjectCategories, Articles, ArticleCategories, Authors, Media, Documents, Leads, LeadFiles, Subscribers, Users, AuditLogs],
  globals: [Header, Footer, Settings],
  // Rich text: headings, lists, links, quotes, images, internal links and tables.
  editor: lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()] }),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // In development the schema is pushed automatically; production uses the migrations in src/migrations.
    push: process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DISABLE_PUSH !== 'true',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  upload: {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per upload in the dashboard
  },
  email: useSmtp
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@example.com',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Website',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  // Scheduled publishing runs through the jobs queue. On a VPS it runs in-process; on Vercel a cron
  // calls /api/payload-jobs/run (see vercel.json).
  jobs: {
    access: { run: ({ req }) => Boolean(req.user) || req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}` },
    autoRun: process.env.VERCEL ? undefined : [{ cron: '* * * * *', queue: 'default', limit: 10 }],
    jobsCollectionOverrides: ({ defaultJobsCollection }) => ({
      ...defaultJobsCollection,
      admin: { ...defaultJobsCollection.admin, hidden: true },
    }),
  },
  plugins: [
    seoPlugin({
      // Fields are placed manually in each collection's SEO tab (see src/fields/seo.ts).
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc?.title ?? '',
      generateDescription: ({ doc }) => doc?.excerpt ?? '',
      generateImage: ({ doc }) => doc?.coverImage ?? doc?.image ?? '',
      generateURL: ({ doc, collectionConfig, locale }) =>
        `${serverURL}${docPath((collectionConfig?.slug ?? 'pages') as 'pages', doc?.slug, isLocale(locale) ? locale : 'ar')}`,
    }),
    redirectsPlugin({
      collections: ['pages', 'services', 'projects', 'articles'],
      redirectTypes: ['301', '302'],
      overrides: {
        admin: { group: 'Navigation', description: 'Old URL → new destination. Created automatically when a published slug changes.' },
        access: { read: () => true, create: adminOnly, update: adminOnly, delete: adminOnly },
        hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
        fields: ({ defaultFields }) =>
          defaultFields.map((field) =>
            'name' in field && field.name === 'from'
              ? ({ ...field, admin: { ...field.admin, description: 'Path only, including the language, e.g. /en/old-page' } } as Field)
              : field,
          ),
      },
    }),
    s3Storage({
      enabled: useS3,
      // Keep the DB schema identical whether or not S3 is configured, so migrations are portable.
      alwaysInsertFields: true,
      collections: {
        media: process.env.S3_PUBLIC_URL
          ? {
              prefix: 'media',
              // Public images are served straight from the bucket's CDN domain.
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) => `${process.env.S3_PUBLIC_URL}/${prefix}/${filename}`,
            }
          : { prefix: 'media' },
        // Lead attachments stay private: they are streamed through Payload, which checks admin access.
        'lead-files': { prefix: 'lead-files' },
        documents: { prefix: 'documents' },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  telemetry: false,
})
