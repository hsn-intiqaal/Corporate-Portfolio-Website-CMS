/**
 * Seeds a demo site with bilingual placeholder content.
 *
 *   pnpm seed            # only if the database is empty
 *   pnpm seed --force    # wipe content collections first (never use on production!)
 *
 * All names, figures and images are placeholders to be replaced with the client's approved content.
 */
import type { CollectionSlug } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import { placeholderLogo } from './images'
import { articleDefs, artCatDefs, catDefs, projectDefs, serviceDefs } from './content/catalog'
import { aboutPage, homePage } from './content/pages'
import { createBi, ctx, ref, settings, t, updateGlobalBi, uploadImage } from './helpers'
import { simplePdf } from './pdf'
import { doc, h, p, ul } from './richtext'

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
    for (const collection of [
      'redirects',
      'leads',
      'lead-files',
      'subscribers',
      'pages',
      'articles',
      'article-categories',
      'authors',
      'documents',
      'projects',
      'services',
      'project-categories',
      'media',
      'audit-logs',
    ] as CollectionSlug[]) {
      await payload.delete({ collection, where: { id: { exists: true } }, context: ctx })
    }
  }

  payload.logger.info('Seeding users...')
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'
  const users = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Site Administrator', email: adminEmail, password: adminPassword, roles: ['admin'], receivesLeadEmails: true },
      context: ctx,
    })
    await payload.create({
      collection: 'users',
      data: { name: 'Content Editor', email: 'editor@example.com', password: adminPassword, roles: ['editor'] },
      context: ctx,
    })
  }

  payload.logger.info('Seeding media...')
  const logoBuf = await placeholderLogo('Company', 205)
  const logo = await payload.create({
    collection: 'media',
    data: { alt: 'شعار الشركة' },
    file: { data: logoBuf, mimetype: 'image/png', name: 'logo.png', size: logoBuf.length },
    locale: 'ar',
    context: ctx,
  })
  await payload.update({ collection: 'media', id: logo.id, data: { alt: 'Company logo' }, locale: 'en', context: ctx })
  const heroImg = await uploadImage(payload, 1, t('صورة توضيحية لمشروع منجز', 'Illustrative image of a completed project'), 2000, 1100)
  const aboutImg = await uploadImage(payload, 4, t('فريق العمل في موقع المشروع', 'The team on a project site'))
  const partnerLogos: number[] = []
  for (let i = 0; i < 5; i++) {
    const buf = await placeholderLogo(`Partner ${i}`, 20 + i * 60)
    const m = await payload.create({
      collection: 'media',
      data: { alt: `Partner logo ${i + 1}` },
      file: { data: buf, mimetype: 'image/png', name: `partner-${i + 1}.png`, size: buf.length },
      locale: 'ar',
      context: ctx,
    })
    partnerLogos.push(m.id)
  }

  payload.logger.info('Seeding services...')

  const services: number[] = []
  for (const [i, s] of serviceDefs.entries()) {
    const image = await uploadImage(payload, 10 + i, t(`صورة خدمة ${s.ar}`, `${s.en} service image`), 1400, 900)
    const created = await createBi(payload, 'services', {
      _status: 'published',
      slug: s.slug,
      meta: {
        keyword: t(s.ar, s.en),
        title: t(`${s.ar} في الرياض | شركة النموذج`, `${s.en} in Riyadh | Example Company`),
        description: t(
          `${s.arEx} فريق معتمد وضمان على الأعمال. اطلب عرض سعر مجاني اليوم.`,
          `${s.enEx} Certified team and workmanship warranty. Request a free quotation today.`,
        ),
        image,
      },
      icon: s.icon,
      image,
      featured: i < 3,
      title: t(s.ar, s.en),
      excerpt: t(s.arEx, s.enEx),
      content: t(
        doc(
          h('نظرة عامة'),
          p(`${s.arEx} نص تجريبي يُستبدل بالمحتوى المعتمد من العميل.`),
          h('ما الذي نقدمه'),
          ul(['تقييم أولي للاحتياجات', 'خطة عمل واضحة', 'متابعة وتقارير دورية']),
        ),
        doc(
          h('Overview'),
          p(`${s.enEx} Placeholder text to be replaced with the client's approved content.`),
          h('What we deliver'),
          ul(['Initial needs assessment', 'A clear work plan', 'Regular follow-up and reporting']),
        ),
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

  const categories: number[] = []
  for (const c of catDefs) categories.push((await createBi(payload, 'project-categories', { slug: c.slug, title: t(c.ar, c.en) })).id)

  const projects: number[] = []
  for (const [i, pr] of projectDefs.entries()) {
    const cover = await uploadImage(payload, 20 + i, t(`صورة مشروع ${pr.ar}`, `${pr.en} project photo`))
    const g1 = await uploadImage(payload, 40 + i, t(`تفاصيل مشروع ${pr.ar}`, `${pr.en} detail`), 1200, 900)
    const g2 = await uploadImage(payload, 60 + i, t(`لقطة من مشروع ${pr.ar}`, `${pr.en} view`), 1200, 900)
    const created = await createBi(payload, 'projects', {
      _status: 'published',
      slug: pr.slug,
      meta: {
        title: t(`${pr.ar} | مشاريع شركة النموذج`, `${pr.en} | Example Company projects`),
        description: t(
          `تفاصيل مشروع ${pr.ar}: التحدي والحل والنتيجة، مع صور المشروع وبياناته. تعرّف على أعمالنا المنجزة.`,
          `${pr.en}: the challenge, the solution and the result, with project photos and key facts. See our completed work.`,
        ),
        image: cover,
      },
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
        doc(
          h('About the project'),
          p('Placeholder description: the challenge, the solution and the result. To be replaced with approved content.'),
        ),
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
    await createBi(payload, 'authors', {
      slug: 'engineering-team',
      name: t('فريق الهندسة', 'Engineering Team'),
      role: t('قسم الهندسة', 'Engineering department'),
      photo: authorImg1,
      bio: t('فريق المهندسين لدينا يشارك خبراته العملية من المشاريع.', 'Our engineers share practical lessons from real projects.'),
    }),
    await createBi(payload, 'authors', {
      slug: 'editorial',
      name: t('فريق التحرير', 'Editorial Team'),
      role: t('التسويق والاتصال', 'Marketing & communications'),
      photo: authorImg2,
      bio: t('أخبار الشركة ونصائح للعملاء.', 'Company news and advice for clients.'),
    }),
  ]

  const articleCategories: number[] = []
  for (const c of artCatDefs)
    articleCategories.push(
      (await createBi(payload, 'article-categories', { slug: c.slug, title: t(c.ar, c.en), description: t(c.dar, c.den) })).id,
    )

  const articles: number[] = []
  for (const [i, a] of articleDefs.entries()) {
    const cover = await uploadImage(payload, 90 + i, t(`صورة مقال: ${a.ar}`, `Article image: ${a.en}`), 1600, 1000)
    const created = await createBi(payload, 'articles', {
      _status: 'published',
      slug: a.slug,
      meta: {
        keyword: t(a.ar.split(' ').slice(0, 2).join(' '), a.en.split(' ').slice(0, 2).join(' ')),
        title: t(`${a.ar} | مدونة شركة النموذج`, `${a.en} | Example Company blog`),
        description: t(
          `${a.ar}: دليل عملي مختصر بخطوات واضحة ونصائح من خبراء فريقنا لمساعدتك على اتخاذ القرار الصحيح لمشروعك.`,
          `${a.en}: a short practical guide with clear steps and expert tips from our team to help you make the right decision.`,
        ),
        image: cover,
      },
      title: t(a.ar, a.en),
      excerpt: t(
        `مقال تجريبي بعنوان «${a.ar}» يوضح طريقة عرض المقالات. يُستبدل بالمحتوى المعتمد.`,
        `A sample article, “${a.en}”, showing how articles are presented. To be replaced with approved content.`,
      ),
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
  const pdf = simplePdf([
    'Company Profile',
    'Placeholder brochure - replace with the approved company profile PDF.',
    'Services - Projects - Contact',
  ])
  const brochureDoc = await payload.create({
    collection: 'documents',
    data: { title: 'الملف التعريفي للشركة', description: 'تعرّف على خدماتنا ومشاريعنا في ملف واحد.', gated: true },
    file: { data: pdf, mimetype: 'application/pdf', name: 'company-profile.pdf', size: pdf.length },
    locale: 'ar',
    context: ctx,
  })
  await payload.update({
    collection: 'documents',
    id: brochureDoc.id,
    data: { title: 'Company profile', description: 'Our services and projects in one document.' },
    locale: 'en',
    context: ctx,
  })

  payload.logger.info('Seeding pages...')
  const home = await createBi(payload, 'pages', homePage({ heroImg, aboutImg, partnerLogos }))

  const about = await createBi(payload, 'pages', aboutPage({ heroImg, aboutImg, authorImg1, authorImg2, brochureDoc: brochureDoc.id }))

  const contact = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'contact',
    meta: {
      title: t('تواصل معنا | شركة النموذج', 'Contact us | Example Company'),
      description: t(
        'تواصل مع فريق شركة النموذج عبر الهاتف أو الواتساب أو البريد الإلكتروني، أو أرسل رسالتك وسنرد خلال يوم عمل.',
        'Contact the Example Company team by phone, WhatsApp or email, or send us a message and we will reply within one working day.',
      ),
      image: heroImg,
    },
    title: t('تواصل معنا', 'Contact us'),
    layout: [
      {
        blockType: 'contact',
        title: t('نسعد بتواصلك', "We'd love to hear from you"),
        intro: t('أرسل رسالتك وسنرد خلال يوم عمل.', 'Send us a message and we will reply within one working day.'),
        form: 'contact',
        showDetails: true,
        showMap: true,
        settings: settings(),
      },
    ],
  })

  const quote = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'request-a-quote',
    meta: {
      title: t('اطلب عرض سعر مجاني | شركة النموذج', 'Request a free quotation | Example Company'),
      description: t(
        'أرسل تفاصيل مشروعك واحصل على عرض سعر مفصل ومجاني خلال ثلاثة أيام عمل من فريق شركة النموذج المتخصص.',
        'Send your project details and receive a detailed, free quotation within three working days from our specialist team.',
      ),
      image: heroImg,
    },
    title: t('اطلب عرض سعر', 'Request a quotation'),
    layout: [
      {
        blockType: 'contact',
        title: t('تفاصيل مشروعك', 'Your project details'),
        intro: t('كلما زادت التفاصيل كان العرض أدق.', 'The more detail you share, the more accurate the quotation.'),
        form: 'quote',
        showDetails: true,
        showMap: false,
        settings: settings(),
      },
    ],
  })

  const legal = (ar: string, en: string) =>
    t(
      doc(h('نص تجريبي'), p(`يجب استبدال هذا النص بنص ${ar} المعتمد من المستشار القانوني للعميل.`)),
      doc(h('Placeholder'), p(`This text must be replaced with the ${en} approved by the client's legal adviser.`)),
    )
  const privacy = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'privacy-policy',
    meta: {
      title: t('سياسة الخصوصية | شركة النموذج', 'Privacy policy | Example Company'),
      description: t(
        'تعرّف على كيفية جمع بياناتك الشخصية واستخدامها وحمايتها عند استخدام موقع شركة النموذج ونماذج التواصل.',
        'How Example Company collects, uses and protects your personal data when you use this website and its contact forms.',
      ),
      image: heroImg,
    },
    title: t('سياسة الخصوصية', 'Privacy policy'),
    layout: [{ blockType: 'richText', width: 'narrow', content: legal('سياسة الخصوصية', 'privacy policy'), settings: settings() }],
  })
  const terms = await createBi(payload, 'pages', {
    _status: 'published',
    slug: 'terms',
    meta: {
      title: t('الشروط والأحكام | شركة النموذج', 'Terms and conditions | Example Company'),
      description: t(
        'الشروط والأحكام التي تنظم استخدام موقع شركة النموذج والخدمات والمعلومات المعروضة فيه. يرجى قراءتها بعناية.',
        'The terms and conditions that govern the use of the Example Company website, its services and the information shown on it.',
      ),
      image: heroImg,
    },
    title: t('الشروط والأحكام', 'Terms and conditions'),
    layout: [{ blockType: 'richText', width: 'narrow', content: legal('الشروط والأحكام', 'terms and conditions'), settings: settings() }],
  })

  payload.logger.info('Seeding navigation and settings...')
  const link = (relationTo: 'pages' | 'services' | 'projects', id: number, ar: string, en: string) => ({
    type: 'internal',
    reference: ref(relationTo, id),
    label: t(ar, en),
  })
  const custom = (url: string, ar: string, en: string) => ({ type: 'custom', url, label: t(ar, en) })
  await updateGlobalBi(payload, 'header', {
    navItems: [
      { link: link('pages', home.id, 'الرئيسية', 'Home') },
      { link: link('pages', about.id, 'من نحن', 'About') },
      {
        link: custom('/services', 'الخدمات', 'Services'),
        children: serviceDefs.slice(0, 4).map((s, i) => ({ link: link('services', services[i], s.ar, s.en) })),
      },
      { link: custom('/projects', 'المشاريع', 'Projects') },
      { link: custom('/blog', 'المدونة', 'Blog') },
      { link: link('pages', contact.id, 'تواصل معنا', 'Contact') },
    ],
    showQuoteButton: true,
    quoteButton: link('pages', quote.id, 'اطلب عرض سعر', 'Request a quote'),
  })
  await updateGlobalBi(payload, 'footer', {
    about: t(
      'شركة النموذج – نص تجريبي يصف الشركة في سطرين، يُستبدل بالوصف المعتمد.',
      'Example Company – a two-line placeholder description, to be replaced with the approved text.',
    ),
    columns: [
      {
        title: t('الشركة', 'Company'),
        links: [
          { link: link('pages', about.id, 'من نحن', 'About') },
          { link: custom('/projects', 'المشاريع', 'Projects') },
          { link: custom('/blog', 'المدونة', 'Blog') },
          { link: link('pages', contact.id, 'تواصل معنا', 'Contact') },
        ],
      },
      {
        title: t('الخدمات', 'Services'),
        links: serviceDefs.slice(0, 4).map((s, i) => ({ link: link('services', services[i], s.ar, s.en) })),
      },
    ],
    legalLinks: [
      { link: link('pages', privacy.id, 'سياسة الخصوصية', 'Privacy policy') },
      { link: link('pages', terms.id, 'الشروط والأحكام', 'Terms') },
    ],
  })
  await updateGlobalBi(payload, 'settings', {
    siteName: t('شركة النموذج', 'Example Company'),
    tagline: t('حلول هندسية ومقاولات', 'Engineering & contracting'),
    logo: logo.id,
    theme: { colorMode: 'preset', preset: 'ocean', arabicFont: 'ibm-plex-arabic', latinFont: 'inter' },
    phone: '+966 11 000 0000',
    whatsapp: '966500000000',
    email: 'info@example.com',
    address: t('الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia'),
    workingHours: t('الأحد – الخميس، ٨ ص – ٥ م', 'Sun – Thu, 8 am – 5 pm'),
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d463876.0!2d46.67!3d24.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa',
    social: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/' },
      { platform: 'x', url: 'https://x.com/' },
      { platform: 'instagram', url: 'https://www.instagram.com/' },
    ],
    titleSuffix: t(' | شركة النموذج', ' | Example Company'),
    defaultDescription: t('حلول هندسية ومقاولات بجودة عالية.', 'High-quality engineering and contracting solutions.'),
    defaultImage: heroImg,
    organizationType: 'HomeAndConstructionBusiness',
    siteAlternateName: t('النموذج', 'Example Co'),
    legalName: t('شركة النموذج للمقاولات', 'Example Contracting Company'),
    foundingYear: 2010,
    streetAddress: t('طريق الملك فهد', 'King Fahd Road'),
    city: t('الرياض', 'Riyadh'),
    region: t('منطقة الرياض', 'Riyadh Province'),
    postalCode: '12211',
    countryCode: 'SA',
    latitude: 24.7136,
    longitude: 46.6753,
    areaServed: t('الرياض، جدة، الدمام', 'Riyadh, Jeddah, Dammam'),
    openingHours: [{ days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' }],
    indexNow: true,
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
