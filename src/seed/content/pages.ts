/** Homepage and About page sections (placeholder content). */
import { settings, t } from '../helpers'
import { doc, p, ul } from '../richtext'

const quoteBtn = { type: 'custom', url: '/request-a-quote', label: t('اطلب عرض سعر', 'Request a quotation'), appearance: 'primary' }

export const homePage = (m: { heroImg: number; aboutImg: number; partnerLogos: number[] }) => ({
  _status: 'published',
  slug: 'home',
  title: t('الرئيسية', 'Home'),
  meta: {
    title: t('شركة النموذج | حلول هندسية ومقاولات', 'Example Company | Engineering & Contracting'),
    description: t(
      'نصمم وننفذ مشاريع عالية الجودة في المملكة. اطلب عرض سعر اليوم.',
      'We design and deliver high-quality projects. Request a quotation today.',
    ),
  },
  layout: [
    {
      blockType: 'hero',
      headline: t('نبني مشاريع تدوم', 'We build projects that last'),
      subheading: t(
        'خبرة في التصميم والتنفيذ والصيانة، بجودة والتزام في كل مرحلة.',
        'Design, construction and maintenance expertise, with quality and commitment at every stage.',
      ),
      backgroundImage: m.heroImg,
      buttons: [
        { link: quoteBtn },
        { link: { type: 'custom', url: '/projects', label: t('شاهد مشاريعنا', 'See our projects'), appearance: 'secondary' } },
      ],
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
        doc(
          p('نعمل بفريق متخصص وإجراءات جودة واضحة لضمان نتائج تفوق التوقعات.'),
          ul(['التزام بالمواعيد', 'شفافية في التكاليف', 'دعم بعد التسليم']),
        ),
        doc(
          p('A specialist team and clear quality procedures ensure results that exceed expectations.'),
          ul(['On-time delivery', 'Transparent costs', 'After-handover support']),
        ),
      ),
      image: m.aboutImg,
      imageSide: 'end',
      addButton: true,
      button: { type: 'custom', url: '/about', label: t('تعرّف علينا', 'About us'), appearance: 'secondary' },
      settings: settings({ background: 'light' }),
    },
    {
      blockType: 'projectGallery',
      title: t('مشاريع مختارة', 'Selected projects'),
      mode: 'featured',
      layout: 'grid',
      limit: 6,
      showViewAll: true,
      settings: settings(),
    },
    {
      blockType: 'process',
      title: t('كيف نعمل', 'How we work'),
      intro: t('أربع خطوات واضحة من أول تواصل حتى التسليم.', 'Four clear steps from first contact to handover.'),
      steps: [
        {
          title: t('الاستشارة', 'Consultation'),
          text: t('نستمع لاحتياجاتك ونزور الموقع.', 'We listen to your needs and visit the site.'),
          icon: 'users',
        },
        {
          title: t('التصميم والعرض', 'Design & proposal'),
          text: t('نقدم تصميماً وعرض سعر مفصلاً.', 'We deliver a design and a detailed quotation.'),
          icon: 'tools',
        },
        {
          title: t('التنفيذ', 'Delivery'),
          text: t('فريقنا ينفذ مع تقارير دورية.', 'Our team builds, with regular reports.'),
          icon: 'building',
        },
        {
          title: t('التسليم والدعم', 'Handover & support'),
          text: t('تسليم مع ضمان ودعم بعد التسليم.', 'Handover with warranty and after-care.'),
          icon: 'shield',
        },
      ],
      settings: settings({ background: 'light' }),
    },
    {
      blockType: 'latestArticles',
      title: t('أحدث المقالات', 'Latest articles'),
      mode: 'latest',
      limit: 3,
      showViewAll: true,
      settings: settings(),
    },
    {
      blockType: 'testimonials',
      title: t('ماذا يقول عملاؤنا', 'What our clients say'),
      items: [
        {
          quote: t('تجربة احترافية من البداية للنهاية. نص تجريبي.', 'A professional experience from start to finish. Placeholder quote.'),
          name: t('عميل', 'Client'),
          role: t('مالك فيلا', 'Villa owner'),
        },
        {
          quote: t('التزام بالجدول ونتيجة ممتازة. نص تجريبي.', 'On schedule with an excellent result. Placeholder quote.'),
          name: t('عميل', 'Client'),
          role: t('مدير مرافق', 'Facilities manager'),
        },
        {
          quote: t('فريق متعاون وسريع الاستجابة. نص تجريبي.', 'A cooperative, responsive team. Placeholder quote.'),
          name: t('عميل', 'Client'),
          role: t('مطور عقاري', 'Property developer'),
        },
      ],
      settings: settings({ background: 'light' }),
    },
    {
      blockType: 'partners',
      title: t('شركاؤنا', 'Our partners'),
      greyscale: true,
      logos: m.partnerLogos.map((id, i) => ({ logo: id, name: `Partner ${i + 1}` })),
      settings: settings({ spacing: 'compact' }),
    },
    {
      blockType: 'faq',
      title: t('الأسئلة الشائعة', 'Frequently asked questions'),
      structuredData: true,
      items: [
        {
          question: t('كم يستغرق إعداد عرض السعر؟', 'How long does a quotation take?'),
          answer: t('عادةً خلال ٣ أيام عمل بعد استلام التفاصيل.', 'Usually within 3 working days of receiving the details.'),
        },
        {
          question: t('هل تقدمون ضماناً على الأعمال؟', 'Do you offer a warranty?'),
          answer: t('نعم، نقدم ضماناً على جميع الأعمال المنفذة.', 'Yes, all completed work is covered by a warranty.'),
        },
        {
          question: t('ما المناطق التي تخدمونها؟', 'Which areas do you serve?'),
          answer: t('نخدم جميع مناطق المملكة.', 'We serve all regions of the Kingdom.'),
        },
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

export const aboutPage = (m: { heroImg: number; aboutImg: number; authorImg1: number; authorImg2: number; brochureDoc: number }) => ({
  _status: 'published',
  slug: 'about',
  title: t('من نحن', 'About us'),
  layout: [
    {
      blockType: 'hero',
      headline: t('من نحن', 'About us'),
      subheading: t('قصة الشركة وقيمها.', 'Our story and values.'),
      backgroundImage: m.aboutImg,
      overlay: 'strong',
      alignment: 'start',
      height: 'medium',
      settings: settings(),
    },
    {
      blockType: 'textImage',
      title: t('قصتنا', 'Our story'),
      content: t(
        doc(p('نص تجريبي عن تأسيس الشركة ومسيرتها. يُستبدل بالمحتوى المعتمد من العميل.')),
        doc(p("Placeholder text about the company's founding and journey, to be replaced with approved content.")),
      ),
      image: m.heroImg,
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
        { name: t('اسم العضو', 'Team member'), role: t('المدير العام', 'General Manager'), photo: m.authorImg1 },
        { name: t('اسم العضو', 'Team member'), role: t('مدير المشاريع', 'Projects Director'), photo: m.authorImg2 },
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
      poster: m.heroImg,
      settings: settings({ background: 'light' }),
    },
    {
      blockType: 'brochure',
      title: t('حمّل الملف التعريفي', 'Download our company profile'),
      document: m.brochureDoc,
      settings: settings(),
    },
    { blockType: 'cta', headline: t('لنعمل معاً', "Let's work together"), button: quoteBtn, settings: settings({ background: 'dark' }) },
  ],
})
