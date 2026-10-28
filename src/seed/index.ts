/**
 * Seeds a demo site with bilingual placeholder content.
 *
 *   pnpm seed            # only if the database is empty
 *   pnpm seed --force    # wipe content collections first (never use on production!)
 *
 * All names, figures and images are placeholders to be replaced with the client's approved content.
 */
import type { CollectionSlug, GlobalSlug, Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import { placeholderImage, placeholderLogo } from './images'
import { simplePdf } from './pdf'
import { doc, h, p, ul } from './richtext'

type Bi = { __bi: true; ar: unknown; en: unknown }
const t = (ar: unknown, en: unknown): Bi => ({ __bi: true, ar, en })
const isBi = (v: unknown): v is Bi => typeof v === 'object' && v !== null && (v as Bi).__bi === true

/** Resolves bilingual markers into a single-language object. */
const resolve = (value: unknown, locale: 'ar' | 'en'): unknown => {
  if (isBi(value)) return value[locale]
  if (Array.isArray(value)) return value.map((v) => resolve(v, locale))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, locale)]))
  return value
}

/** Copies array/block row ids from the saved Arabic document so the English update targets the same rows. */
const withIds = (data: unknown, saved: unknown): unknown => {
  if (Array.isArray(data) && Array.isArray(saved))
    return data.map((row, i) => {
      const merged = withIds(row, saved[i]) as Record<string, unknown>
      const id = (saved[i] as { id?: string } | undefined)?.id
      return id && merged && typeof merged === 'object' ? { ...merged, id } : merged
    })
  if (data && typeof data === 'object' && saved && typeof saved === 'object' && !Array.isArray(data))
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, withIds(v, (saved as Record<string, unknown>)[k])]))
  return data
}

const ctx = { disableRevalidate: true, skipAudit: true }

async function createBi(payload: Payload, collection: CollectionSlug, data: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const ar = await payload.create({ collection, data: resolve(data, 'ar') as never, locale: 'ar', context: ctx, ...extra })
  const saved = await payload.findByID({ collection, id: ar.id, locale: 'ar', depth: 0, draft: true, context: ctx })
  await payload.update({ collection, id: ar.id, data: withIds(resolve(data, 'en'), saved) as never, locale: 'en', context: ctx })
  return ar
}

async function updateGlobalBi(payload: Payload, slug: GlobalSlug, data: Record<string, unknown>) {
  await payload.updateGlobal({ slug, data: resolve(data, 'ar') as never, locale: 'ar', context: ctx })
  const saved = await payload.findGlobal({ slug, locale: 'ar', depth: 0, context: ctx })
  await payload.updateGlobal({ slug, data: withIds(resolve(data, 'en'), saved) as never, locale: 'en', context: ctx })
}

async function uploadImage(payload: Payload, seed: number, alt: Bi, w = 1600, hgt = 1000) {
  const data = await placeholderImage(seed, w, hgt)
  const media = await payload.create({
    collection: 'media',
    data: { alt: alt.ar as string },
    file: { data, mimetype: 'image/jpeg', name: `placeholder-${seed}.jpg`, size: data.length },
    locale: 'ar',
    context: ctx,
  })
  await payload.update({ collection: 'media', id: media.id, data: { alt: alt.en as string }, locale: 'en', context: ctx })
  return media.id
}

const settings = (extra: Record<string, unknown> = {}) => ({ hidden: false, background: 'white', spacing: 'normal', ...extra })
const ref = (relationTo: 'pages' | 'services' | 'projects', value: number) => ({ relationTo, value })

async function seed() {
  const payload = await getPayload({ config })
  const force = process.argv.includes('--force')

  const existing = await payload.count({ collection: 'pages' })
  if (existing.totalDocs > 0 && !force) {
    payload.logger.info('Database already has content - skipping seed. Use --force to wipe and reseed (development only).')
    process.exit(0)
  }
  if (force) {
    if (process.env.NODE_ENV === 'production') throw new Error('Refusing to wipe content in production')
    for (const collection of ['redirects', 'leads', 'lead-files', 'subscribers', 'pages', 'articles', 'article-categories', 'authors', 'documents', 'projects', 'services', 'project-categories', 'media', 'audit-logs'] as CollectionSlug[]) {
      await payload.delete({ collection, where: { id: { exists: true } }, context: ctx })
    }
  }

  payload.logger.info('Seeding users...')
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'
  const users = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { name: 'Site Administrator', email: adminEmail, password: adminPassword, roles: ['admin'], receivesLeadEmails: true }, context: ctx })
    await payload.create({ collection: 'users', data: { name: 'Content Editor', email: 'editor@example.com', password: adminPassword, roles: ['editor'] }, context: ctx })
  }

  payload.logger.info('Seeding media...')
  const logoBuf = await placeholderLogo('Company', 205)
  const logo = await payload.create({ collection: 'media', data: { alt: 'شعار الشركة' }, file: { data: logoBuf, mimetype: 'image/png', name: 'logo.png', size: logoBuf.length }, locale: 'ar', context: ctx })
  await payload.update({ collection: 'media', id: logo.id, data: { alt: 'Company logo' }, locale: 'en', context: ctx })
  const heroImg = await uploadImage(payload, 1, t('صورة توضيحية لمشروع منجز', 'Illustrative image of a completed project'), 2000, 1100)
  const aboutImg = await uploadImage(payload, 4, t('فريق العمل في موقع المشروع', 'The team on a project site'))
  const partnerLogos: number[] = []
  for (let i = 0; i < 5; i++) {
    const buf = await placeholderLogo(`Partner ${i}`, 20 + i * 60)
    const m = await payload.create({ collection: 'media', data: { alt: `Partner logo ${i + 1}` }, file: { data: buf, mimetype: 'image/png', name: `partner-${i + 1}.png`, size: buf.length }, locale: 'ar', context: ctx })
    partnerLogos.push(m.id)
  }

  payload.logger.info('Seeding services...')
  const serviceDefs = [
    { slug: 'design-engineering', icon: 'tools', ar: 'التصميم والهندسة', en: 'Design & Engineering', arEx: 'دراسات وتصاميم هندسية متكاملة تراعي المعايير والكود المحلي.', enEx: 'Complete engineering studies and designs that follow local codes and standards.' },
    { slug: 'construction', icon: 'building', ar: 'التنفيذ والمقاولات', en: 'Construction', arEx: 'تنفيذ المشاريع بجودة عالية والتزام بالجدول الزمني والميزانية.', enEx: 'High-quality delivery on schedule and on budget.' },
    { slug: 'maintenance', icon: 'shield', ar: 'الصيانة والتشغيل', en: 'Maintenance & Operations', arEx: 'عقود صيانة دورية ووقائية تحافظ على كفاءة منشأتك.', enEx: 'Planned and preventive maintenance contracts that keep your facility performing.' },
    { slug: 'project-management', icon: 'calendar', ar: 'إدارة المشاريع', en: 'Project Management', arEx: 'إشراف كامل من التخطيط حتى التسليم مع تقارير واضحة.', enEx: 'End-to-end supervision from planning to handover, with clear reporting.' },
    { slug: 'renovation', icon: 'star', ar: 'التجديد والتطوير', en: 'Renovation', arEx: 'تحديث المنشآت القائمة لرفع قيمتها وتحسين أدائها.', enEx: 'Upgrading existing facilities to raise their value and performance.' },
    { slug: 'consulting', icon: 'users', ar: 'الاستشارات الفنية', en: 'Technical Consulting', arEx: 'استشارات متخصصة تساعدك على اتخاذ القرار الصحيح.', enEx: 'Specialist advice that helps you make the right decision.' },
  ]
  const services: number[] = []
  for (const [i, s] of serviceDefs.entries()) {
    const image = await uploadImage(payload, 10 + i, t(`صورة خدمة ${s.ar}`, `${s.en} service image`), 1400, 900)
    const created = await createBi(payload, 'services', {
      _status: 'published',
      slug: s.slug,
      icon: s.icon,
      image,
      featured: i < 3,
      title: t(s.ar, s.en),
      excerpt: t(s.arEx, s.enEx),
      content: t(
        doc(h('نظرة عامة'), p(`${s.arEx} نص تجريبي يُستبدل بالمحتوى المعتمد من العميل.`), h('ما الذي نقدمه'), ul(['تقييم أولي للاحتياجات', 'خطة عمل واضحة', 'متابعة وتقارير دورية'])),
        doc(h('Overview'), p(`${s.enEx} Placeholder text to be replaced with the client's approved content.`), h('What we deliver'), ul(['Initial needs assessment', 'A clear work plan', 'Regular follow-up and reporting'])),
      ),
      highlights: [
        { text: t('فريق معتمد وذو خبرة', 'Certified, experienced team') },
        { text: t('ضمان على الأعمال', 'Workmanship warranty') },
        { text: t('التزام بمعايير السلامة', 'Strict safety standards') },
      ],
    })
    services.push(created.id)
  }

  payload.logger.info('Seeding project categories and projects...')
  const catDefs = [
    { slug: 'residential', ar: 'سكني', en: 'Residential' },
    { slug: 'commercial', ar: 'تجاري', en: 'Commercial' },
    { slug: 'hospitality', ar: 'ضيافة', en: 'Hospitality' },
  ]
  const categories: number[] = []
  for (const c of catDefs) categories.push((await createBi(payload, 'project-categories', { slug: c.slug, title: t(c.ar, c.en) })).id)

  const projectDefs = [
    { slug: 'villa-north-district', ar: 'فيلا سكنية – الحي الشمالي', en: 'Private Villa – North District', cat: 0, loc: t('الرياض', 'Riyadh'), date: '2026-03-01' },
    { slug: 'corporate-hq-fitout', ar: 'تجهيز المقر الرئيسي لشركة', en: 'Corporate HQ Fit-out', cat: 1, loc: t('جدة', 'Jeddah'), date: '2026-01-01' },
    { slug: 'resort-leisure-area', ar: 'منطقة ترفيهية في منتجع', en: 'Resort Leisure Area', cat: 2, loc: t('العُلا', 'AlUla'), date: '2025-11-01' },
    { slug: 'residential-compound', ar: 'مجمع سكني متكامل', en: 'Residential Compound', cat: 0, loc: t('الدمام', 'Dammam'), date: '2025-08-01' },
    { slug: 'retail-center-renovation', ar: 'تجديد مركز تجاري', en: 'Retail Centre Renovation', cat: 1, loc: t('الخبر', 'Khobar'), date: '2025-05-01' },
    { slug: 'boutique-hotel', ar: 'فندق بوتيك', en: 'Boutique Hotel', cat: 2, loc: t('مكة المكرمة', 'Makkah'), date: '2025-02-01' },
  ]
  const projects: number[] = []
  for (const [i, pr] of projectDefs.entries()) {
    const cover = await uploadImage(payload, 20 + i, t(`صورة مشروع ${pr.ar}`, `${pr.en} project photo`))
    const g1 = await uploadImage(payload, 40 + i, t(`تفاصيل مشروع ${pr.ar}`, `${pr.en} detail`), 1200, 900)
    const g2 = await uploadImage(payload, 60 + i, t(`لقطة من مشروع ${pr.ar}`, `${pr.en} view`), 1200, 900)
    const created = await createBi(payload, 'projects', {
      _status: 'published',
      slug: pr.slug,
      title: t(pr.ar, pr.en),
      excerpt: t('مشروع تجريبي يوضح طريقة عرض المشاريع في الموقع.', 'A sample project showing how portfolio items are presented.'),
      coverImage: cover,
      gallery: [g1, g2],
      categories: [categories[pr.cat]],
      services: [services[i % services.length], services[(i + 1) % services.length]],
      location: pr.loc,
      client: t('عميل خاص', 'Private client'),
      completedAt: pr.date,
      featured: i < 3,
      content: t(
        doc(h('عن المشروع'), p('وصف تجريبي للمشروع: التحدي، والحل، والنتيجة. يُستبدل بالمحتوى المعتمد.')),
        doc(h('About the project'), p('Placeholder description: the challenge, the solution and the result. To be replaced with approved content.')),
      ),
      details: [
        { label: t('المساحة', 'Area'), value: t('٤٥٠ م²', '450 m²') },
        { label: t('المدة', 'Duration'), value: t('٤ أشهر', '4 months') },
      ],
    })
    projects.push(created.id)
  }

  payload.logger.info('Seeding authors, article categories and articles...')
  const authorImg1 = await uploadImage(payload, 81, t('صورة الكاتب', 'Author photo'), 400, 400)
  const authorImg2 = await uploadImage(payload, 82, t('صورة الكاتبة', 'Author photo'), 400, 400)
  const authors = [
    await createBi(payload, 'authors', { slug: 'engineering-team', name: t('فريق الهندسة', 'Engineering Team'), role: t('قسم الهندسة', 'Engineering department'), photo: authorImg1, bio: t('فريق المهندسين لدينا يشارك خبراته العملية من المشاريع.', 'Our engineers share practical lessons from real projects.') }),
    await createBi(payload, 'authors', { slug: 'editorial', name: t('فريق التحرير', 'Editorial Team'), role: t('التسويق والاتصال', 'Marketing & communications'), photo: authorImg2, bio: t('أخبار الشركة ونصائح للعملاء.', 'Company news and advice for clients.') }),
  ]
  const artCatDefs = [
    { slug: 'guides', ar: 'أدلة ونصائح', en: 'Guides & tips', dar: 'نصائح عملية قبل وأثناء تنفيذ مشروعك.', den: 'Practical advice before and during your project.' },
    { slug: 'news', ar: 'أخبار الشركة', en: 'Company news', dar: 'آخر أخبارنا ومشاريعنا.', den: 'Our latest news and projects.' },
    { slug: 'industry', ar: 'القطاع والتقنيات', en: 'Industry & technology', dar: 'اتجاهات وتقنيات حديثة في القطاع.', den: 'Trends and new technology in the industry.' },
  ]
  const articleCategories: number[] = []
  for (const c of artCatDefs) articleCategories.push((await createBi(payload, 'article-categories', { slug: c.slug, title: t(c.ar, c.en), description: t(c.dar, c.den) })).id)

  const articleDefs = [
    { slug: 'how-to-plan-your-project', ar: 'كيف تخطط لمشروعك خطوة بخطوة', en: 'How to plan your project step by step', cat: 0 },
    { slug: 'choosing-the-right-contractor', ar: 'كيف تختار المقاول المناسب', en: 'Choosing the right contractor', cat: 0 },
    { slug: 'preventive-maintenance-checklist', ar: 'قائمة الصيانة الوقائية الدورية', en: 'Preventive maintenance checklist', cat: 0 },
    { slug: 'budgeting-mistakes-to-avoid', ar: 'أخطاء شائعة في الميزانية وكيف تتجنبها', en: 'Budgeting mistakes to avoid', cat: 0 },
    { slug: 'we-completed-project-250', ar: 'أنجزنا مشروعنا رقم ٢٥٠', en: 'We completed our 250th project', cat: 1 },
    { slug: 'new-office-opening', ar: 'افتتاح مكتبنا الجديد', en: 'Our new office is open', cat: 1 },
    { slug: 'safety-award', ar: 'حصولنا على جائزة السلامة', en: 'We received a safety award', cat: 1 },
    { slug: 'sustainable-materials', ar: 'المواد المستدامة في البناء الحديث', en: 'Sustainable materials in modern construction', cat: 2 },
    { slug: 'smart-building-technology', ar: 'تقنيات المباني الذكية', en: 'Smart building technology', cat: 2 },
    { slug: 'energy-efficiency-tips', ar: 'نصائح لرفع كفاءة الطاقة', en: 'Energy efficiency tips', cat: 2 },
  ]
  const articles: number[] = []
  for (const [i, a] of articleDefs.entries()) {
    const cover = await uploadImage(payload, 90 + i, t(`صورة مقال: ${a.ar}`, `Article image: ${a.en}`), 1600, 1000)
    const created = await createBi(payload, 'articles', {
      _status: 'published',
      slug: a.slug,
      title: t(a.ar, a.en),
      excerpt: t(`مقال تجريبي بعنوان «${a.ar}» يوضح طريقة عرض المقالات. يُستبدل بالمحتوى المعتمد.`, `A sample article, “${a.en}”, showing how articles are presented. To be replaced with approved content.`),
      coverImage: cover,
      author: authors[i % 2].id,
      categories: [articleCategories[a.cat]],
      tags: [{ tag: t('مشاريع', 'projects') }, { tag: t('نصائح', 'tips') }],
      relatedServices: [services[i % services.length]],
      publishedAt: new Date(Date.UTC(2026, 9, 25 - i * 9)).toISOString(),
      featured: i < 3,
      content: t(
        doc(
          p('مقدمة تجريبية للمقال. هذا النص يوضح شكل الفقرات وطول السطر المناسب للقراءة باللغة العربية.'),
          h('لماذا هذا الموضوع مهم'),
          p('فقرة توضيحية عن أهمية الموضوع وأثره على نجاح المشروع وتكلفته وجودته على المدى الطويل.'),
          h('الخطوات الأساسية'),
          h('١. التقييم الأولي', 'h3'),
          p('حدد احتياجاتك وأهدافك والميزانية المتاحة قبل البدء.'),
          h('٢. التخطيط والتصميم', 'h3'),
          p('ضع خطة واضحة وجدولاً زمنياً واقعياً بالتعاون مع فريق متخصص.'),
          ul(['تحديد النطاق بدقة', 'مراجعة العروض', 'متابعة التنفيذ']),
          h('الخلاصة'),
          p('التخطيط الجيد يوفر الوقت والتكلفة. تواصل معنا لمناقشة مشروعك.'),
        ),
        doc(
          p('A placeholder introduction. This text shows paragraph styling and a comfortable reading width.'),
          h('Why this matters'),
          p("An explanatory paragraph on why the topic matters for a project's cost, quality and long-term success."),
          h('The key steps'),
          h('1. Initial assessment', 'h3'),
          p('Define your needs, goals and budget before you start.'),
          h('2. Planning and design', 'h3'),
          p('Agree a clear plan and a realistic schedule with a specialist team.'),
          ul(['Define the scope precisely', 'Compare proposals', 'Follow up during delivery']),
          h('Summary'),
          p('Good planning saves time and money. Contact us to discuss your project.'),
        ),
      ),
    })
    articles.push(created.id)
  }

  payload.logger.info('Seeding downloadable brochure...')
  const pdf = simplePdf(['Company Profile', 'Placeholder brochure - replace with the approved company profile PDF.', 'Services - Projects - Contact'])
  const brochureDoc = await payload.create({
    collection: 'documents',
    data: { title: 'الملف التعريفي للشركة', description: 'تعرّف على خدماتنا ومشاريعنا في ملف واحد.', gated: true },
    file: { data: pdf, mimetype: 'application/pdf', name: 'company-profile.pdf', size: pdf.length },
    locale: 'ar',
    context: ctx,
  })
  await payload.update({ collection: 'documents', id: brochureDoc.id, data: { title: 'Company profile', description: 'Our services and projects in one document.' }, locale: 'en', context: ctx })

  payload.logger.info('Seeding pages...')
  const quoteBtn = { type: 'custom', url: '/request-a-quote', label: t('اطلب عرض سعر', 'Request a quotation'), appearance: 'primary' }
  const home = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'home',
    title: t('الرئيسية', 'Home'),
    meta: {
      title: t('شركة النموذج | حلول هندسية ومقاولات', 'Example Company | Engineering & Contracting'),
      description: t('نصمم وننفذ مشاريع عالية الجودة في المملكة. اطلب عرض سعر اليوم.', 'We design and deliver high-quality projects. Request a quotation today.'),
    },
    layout: [
      {
        blockType: 'hero',
        headline: t('نبني مشاريع تدوم', 'We build projects that last'),
        subheading: t('خبرة في التصميم والتنفيذ والصيانة، بجودة والتزام في كل مرحلة.', 'Design, construction and maintenance expertise, with quality and commitment at every stage.'),
        backgroundImage: heroImg,
        buttons: [{ link: quoteBtn }, { link: { type: 'custom', url: '/projects', label: t('شاهد مشاريعنا', 'See our projects'), appearance: 'secondary' } }],
        overlay: 'medium',
        alignment: 'start',
        height: 'large',
        settings: settings(),
      },
      {
        blockType: 'stats',
        items: [
          { value: 15, suffix: '+', icon: 'calendar', label: t('سنوات من الخبرة', 'Years of experience') },
          { value: 250, suffix: '+', icon: 'building', label: t('مشروع منجز', 'Completed projects') },
          { value: 98, suffix: '%', icon: 'star', label: t('رضا العملاء', 'Client satisfaction') },
          { value: 60, icon: 'users', label: t('مهندس وفني', 'Engineers & technicians') },
        ],
        settings: settings({ background: 'light', spacing: 'compact' }),
      },
      {
        blockType: 'serviceCards',
        title: t('خدماتنا', 'Our services'),
        intro: t('حلول متكاملة من الفكرة حتى التسليم.', 'Complete solutions from concept to handover.'),
        mode: 'all',
        columns: '3',
        showExcerpt: true,
        showViewAll: false,
        settings: settings(),
      },
      {
        blockType: 'textImage',
        eyebrow: t('لماذا نحن', 'Why choose us'),
        title: t('شريك موثوق لمشروعك', 'A trusted partner for your project'),
        content: t(
          doc(p('نعمل بفريق متخصص وإجراءات جودة واضحة لضمان نتائج تفوق التوقعات.'), ul(['التزام بالمواعيد', 'شفافية في التكاليف', 'دعم بعد التسليم'])),
          doc(p('A specialist team and clear quality procedures ensure results that exceed expectations.'), ul(['On-time delivery', 'Transparent costs', 'After-handover support'])),
        ),
        image: aboutImg,
        imageSide: 'end',
        addButton: true,
        button: { type: 'custom', url: '/about', label: t('تعرّف علينا', 'About us'), appearance: 'secondary' },
        settings: settings({ background: 'light' }),
      },
      { blockType: 'projectGallery', title: t('مشاريع مختارة', 'Selected projects'), mode: 'featured', layout: 'grid', limit: 6, showViewAll: true, settings: settings() },
      {
        blockType: 'process',
        title: t('كيف نعمل', 'How we work'),
        intro: t('أربع خطوات واضحة من أول تواصل حتى التسليم.', 'Four clear steps from first contact to handover.'),
        steps: [
          { title: t('الاستشارة', 'Consultation'), text: t('نستمع لاحتياجاتك ونزور الموقع.', 'We listen to your needs and visit the site.'), icon: 'users' },
          { title: t('التصميم والعرض', 'Design & proposal'), text: t('نقدم تصميماً وعرض سعر مفصلاً.', 'We deliver a design and a detailed quotation.'), icon: 'tools' },
          { title: t('التنفيذ', 'Delivery'), text: t('فريقنا ينفذ مع تقارير دورية.', 'Our team builds, with regular reports.'), icon: 'building' },
          { title: t('التسليم والدعم', 'Handover & support'), text: t('تسليم مع ضمان ودعم بعد التسليم.', 'Handover with warranty and after-care.'), icon: 'shield' },
        ],
        settings: settings({ background: 'light' }),
      },
      { blockType: 'latestArticles', title: t('أحدث المقالات', 'Latest articles'), mode: 'latest', limit: 3, showViewAll: true, settings: settings() },
      {
        blockType: 'testimonials',
        title: t('ماذا يقول عملاؤنا', 'What our clients say'),
        items: [
          { quote: t('تجربة احترافية من البداية للنهاية. نص تجريبي.', 'A professional experience from start to finish. Placeholder quote.'), name: t('عميل', 'Client'), role: t('مالك فيلا', 'Villa owner') },
          { quote: t('التزام بالجدول ونتيجة ممتازة. نص تجريبي.', 'On schedule with an excellent result. Placeholder quote.'), name: t('عميل', 'Client'), role: t('مدير مرافق', 'Facilities manager') },
          { quote: t('فريق متعاون وسريع الاستجابة. نص تجريبي.', 'A cooperative, responsive team. Placeholder quote.'), name: t('عميل', 'Client'), role: t('مطور عقاري', 'Property developer') },
        ],
        settings: settings({ background: 'light' }),
      },
      { blockType: 'partners', title: t('شركاؤنا', 'Our partners'), greyscale: true, logos: partnerLogos.map((id, i) => ({ logo: id, name: `Partner ${i + 1}` })), settings: settings({ spacing: 'compact' }) },
      {
        blockType: 'faq',
        title: t('الأسئلة الشائعة', 'Frequently asked questions'),
        structuredData: true,
        items: [
          { question: t('كم يستغرق إعداد عرض السعر؟', 'How long does a quotation take?'), answer: t('عادةً خلال ٣ أيام عمل بعد استلام التفاصيل.', 'Usually within 3 working days of receiving the details.') },
          { question: t('هل تقدمون ضماناً على الأعمال؟', 'Do you offer a warranty?'), answer: t('نعم، نقدم ضماناً على جميع الأعمال المنفذة.', 'Yes, all completed work is covered by a warranty.') },
          { question: t('ما المناطق التي تخدمونها؟', 'Which areas do you serve?'), answer: t('نخدم جميع مناطق المملكة.', 'We serve all regions of the Kingdom.') },
        ],
        settings: settings(),
      },
      {
        blockType: 'cta',
        headline: t('جاهز لبدء مشروعك؟', 'Ready to start your project?'),
        text: t('أخبرنا عن مشروعك وسنعود إليك بعرض مناسب.', 'Tell us about your project and we will come back with a tailored proposal.'),
        button: { ...quoteBtn, appearance: 'primary' },
        showWhatsApp: true,
        settings: settings({ background: 'primary' }),
      },
    ],
  })

  const about = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'about',
    title: t('من نحن', 'About us'),
    layout: [
      { blockType: 'hero', headline: t('من نحن', 'About us'), subheading: t('قصة الشركة وقيمها.', 'Our story and values.'), backgroundImage: aboutImg, overlay: 'strong', alignment: 'start', height: 'medium', settings: settings() },
      {
        blockType: 'textImage',
        title: t('قصتنا', 'Our story'),
        content: t(doc(p('نص تجريبي عن تأسيس الشركة ومسيرتها. يُستبدل بالمحتوى المعتمد من العميل.')), doc(p("Placeholder text about the company's founding and journey, to be replaced with approved content."))),
        image: heroImg,
        imageSide: 'end',
        settings: settings(),
      },
      {
        blockType: 'stats',
        title: t('قيمنا', 'Our values'),
        items: [
          { value: 100, suffix: '%', icon: 'shield', label: t('التزام بالسلامة', 'Safety commitment') },
          { value: 24, suffix: '/7', icon: 'clock', label: t('دعم فني', 'Technical support') },
          { value: 15, suffix: '+', icon: 'award', label: t('سنوات من الخبرة', 'Years of experience') },
        ],
        settings: settings({ background: 'light' }),
      },
      {
        blockType: 'team',
        title: t('فريق القيادة', 'Leadership team'),
        members: [
          { name: t('اسم العضو', 'Team member'), role: t('المدير العام', 'General Manager'), photo: authorImg1 },
          { name: t('اسم العضو', 'Team member'), role: t('مدير المشاريع', 'Projects Director'), photo: authorImg2 },
          { name: t('اسم العضو', 'Team member'), role: t('المدير الفني', 'Technical Director') },
          { name: t('اسم العضو', 'Team member'), role: t('مدير المبيعات', 'Sales Manager') },
        ],
        settings: settings(),
      },
      {
        blockType: 'video',
        title: t('شاهد طريقة عملنا', 'See how we work'),
        // Placeholder: "Big Buck Bunny" (Blender Foundation, CC BY). Replace with the client's own video.
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        poster: heroImg,
        settings: settings({ background: 'light' }),
      },
      { blockType: 'brochure', title: t('حمّل الملف التعريفي', 'Download our company profile'), document: brochureDoc.id, settings: settings() },
      { blockType: 'cta', headline: t('لنعمل معاً', "Let's work together"), button: quoteBtn, settings: settings({ background: 'dark' }) },
    ],
  })

  const contact = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'contact',
    title: t('تواصل معنا', 'Contact us'),
    layout: [{ blockType: 'contact', title: t('نسعد بتواصلك', "We'd love to hear from you"), intro: t('أرسل رسالتك وسنرد خلال يوم عمل.', 'Send us a message and we will reply within one working day.'), form: 'contact', showDetails: true, showMap: true, settings: settings() }],
  })

  const quote = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'request-a-quote',
    title: t('اطلب عرض سعر', 'Request a quotation'),
    layout: [{ blockType: 'contact', title: t('تفاصيل مشروعك', 'Your project details'), intro: t('كلما زادت التفاصيل كان العرض أدق.', 'The more detail you share, the more accurate the quotation.'), form: 'quote', showDetails: true, showMap: false, settings: settings() }],
  })

  const legal = (ar: string, en: string) =>
    t(
      doc(h('نص تجريبي'), p(`يجب استبدال هذا النص بنص ${ar} المعتمد من المستشار القانوني للعميل.`)),
      doc(h('Placeholder'), p(`This text must be replaced with the ${en} approved by the client's legal adviser.`)),
    )
  const privacy = await createBi(payload, 'pages', { _status: 'published', slug: 'privacy-policy', title: t('سياسة الخصوصية', 'Privacy policy'), layout: [{ blockType: 'richText', width: 'narrow', content: legal('سياسة الخصوصية', 'privacy policy'), settings: settings() }] })
  const terms = await createBi(payload, 'pages', { _status: 'published', slug: 'terms', title: t('الشروط والأحكام', 'Terms and conditions'), layout: [{ blockType: 'richText', width: 'narrow', content: legal('الشروط والأحكام', 'terms and conditions'), settings: settings() }] })

  payload.logger.info('Seeding navigation and settings...')
  const link = (relationTo: 'pages' | 'services' | 'projects', id: number, ar: string, en: string) => ({ type: 'internal', reference: ref(relationTo, id), label: t(ar, en) })
  const custom = (url: string, ar: string, en: string) => ({ type: 'custom', url, label: t(ar, en) })
  await updateGlobalBi(payload, 'header', {
    navItems: [
      { link: link('pages', home.id, 'الرئيسية', 'Home') },
      { link: link('pages', about.id, 'من نحن', 'About') },
      { link: custom('/services', 'الخدمات', 'Services'), children: serviceDefs.slice(0, 4).map((s, i) => ({ link: link('services', services[i], s.ar, s.en) })) },
      { link: custom('/projects', 'المشاريع', 'Projects') },
      { link: custom('/blog', 'المدونة', 'Blog') },
      { link: link('pages', contact.id, 'تواصل معنا', 'Contact') },
    ],
    showQuoteButton: true,
    quoteButton: link('pages', quote.id, 'اطلب عرض سعر', 'Request a quote'),
  })
  await updateGlobalBi(payload, 'footer', {
    about: t('شركة النموذج – نص تجريبي يصف الشركة في سطرين، يُستبدل بالوصف المعتمد.', 'Example Company – a two-line placeholder description, to be replaced with the approved text.'),
    columns: [
      { title: t('الشركة', 'Company'), links: [{ link: link('pages', about.id, 'من نحن', 'About') }, { link: custom('/projects', 'المشاريع', 'Projects') }, { link: custom('/blog', 'المدونة', 'Blog') }, { link: link('pages', contact.id, 'تواصل معنا', 'Contact') }] },
      { title: t('الخدمات', 'Services'), links: serviceDefs.slice(0, 4).map((s, i) => ({ link: link('services', services[i], s.ar, s.en) })) },
    ],
    legalLinks: [{ link: link('pages', privacy.id, 'سياسة الخصوصية', 'Privacy policy') }, { link: link('pages', terms.id, 'الشروط والأحكام', 'Terms') }],
  })
  await updateGlobalBi(payload, 'settings', {
    siteName: t('شركة النموذج', 'Example Company'),
    tagline: t('حلول هندسية ومقاولات', 'Engineering & contracting'),
    logo: logo.id,
    palette: 'ocean',
    phone: '+966 11 000 0000',
    whatsapp: '966500000000',
    email: 'info@example.com',
    address: t('الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia'),
    workingHours: t('الأحد – الخميس، ٨ ص – ٥ م', 'Sun – Thu, 8 am – 5 pm'),
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d463876.0!2d46.67!3d24.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/' },
      { platform: 'x', url: 'https://x.com/' },
      { platform: 'instagram', url: 'https://www.instagram.com/' },
    ],
    titleSuffix: t(' | شركة النموذج', ' | Example Company'),
    defaultDescription: t('حلول هندسية ومقاولات بجودة عالية.', 'High-quality engineering and contracting solutions.'),
    defaultImage: heroImg,
    organizationType: 'Organization',
    missingTranslation: 'fallback',
    arabicNumerals: 'western',
    leadRecipients: [{ email: adminEmail }],
    spamAlertThreshold: 30,
    editorsCanPublish: false,
    newsletterEnabled: true,
  })

  payload.logger.info(`Seed complete. Dashboard: /admin  (login: ${adminEmail})`)
  process.exit(0)
}

// `payload run` exits as soon as the module finishes loading, so the seed must be awaited at top level.
await seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
