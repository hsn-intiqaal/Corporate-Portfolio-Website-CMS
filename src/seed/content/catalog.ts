/** Placeholder services, projects, categories and articles. Replace with the client's approved content. */
import { t } from '../helpers'

export const serviceDefs = [
  {
    slug: 'design-engineering',
    icon: 'tools',
    ar: 'التصميم والهندسة',
    en: 'Design & Engineering',
    arEx: 'دراسات وتصاميم هندسية متكاملة تراعي المعايير والكود المحلي.',
    enEx: 'Complete engineering studies and designs that follow local codes and standards.',
  },
  {
    slug: 'construction',
    icon: 'building',
    ar: 'التنفيذ والمقاولات',
    en: 'Construction',
    arEx: 'تنفيذ المشاريع بجودة عالية والتزام بالجدول الزمني والميزانية.',
    enEx: 'High-quality delivery on schedule and on budget.',
  },
  {
    slug: 'maintenance',
    icon: 'shield',
    ar: 'الصيانة والتشغيل',
    en: 'Maintenance & Operations',
    arEx: 'عقود صيانة دورية ووقائية تحافظ على كفاءة منشأتك.',
    enEx: 'Planned and preventive maintenance contracts that keep your facility performing.',
  },
  {
    slug: 'project-management',
    icon: 'calendar',
    ar: 'إدارة المشاريع',
    en: 'Project Management',
    arEx: 'إشراف كامل من التخطيط حتى التسليم مع تقارير واضحة.',
    enEx: 'End-to-end supervision from planning to handover, with clear reporting.',
  },
  {
    slug: 'renovation',
    icon: 'star',
    ar: 'التجديد والتطوير',
    en: 'Renovation',
    arEx: 'تحديث المنشآت القائمة لرفع قيمتها وتحسين أدائها.',
    enEx: 'Upgrading existing facilities to raise their value and performance.',
  },
  {
    slug: 'consulting',
    icon: 'users',
    ar: 'الاستشارات الفنية',
    en: 'Technical Consulting',
    arEx: 'استشارات متخصصة تساعدك على اتخاذ القرار الصحيح.',
    enEx: 'Specialist advice that helps you make the right decision.',
  },
]

export const catDefs = [
  { slug: 'residential', ar: 'سكني', en: 'Residential' },
  { slug: 'commercial', ar: 'تجاري', en: 'Commercial' },
  { slug: 'hospitality', ar: 'ضيافة', en: 'Hospitality' },
]

export const projectDefs = [
  {
    slug: 'villa-north-district',
    ar: 'فيلا سكنية – الحي الشمالي',
    en: 'Private Villa – North District',
    cat: 0,
    loc: t('الرياض', 'Riyadh'),
    date: '2026-03-01',
  },
  {
    slug: 'corporate-hq-fitout',
    ar: 'تجهيز المقر الرئيسي لشركة',
    en: 'Corporate HQ Fit-out',
    cat: 1,
    loc: t('جدة', 'Jeddah'),
    date: '2026-01-01',
  },
  {
    slug: 'resort-leisure-area',
    ar: 'منطقة ترفيهية في منتجع',
    en: 'Resort Leisure Area',
    cat: 2,
    loc: t('العُلا', 'AlUla'),
    date: '2025-11-01',
  },
  {
    slug: 'residential-compound',
    ar: 'مجمع سكني متكامل',
    en: 'Residential Compound',
    cat: 0,
    loc: t('الدمام', 'Dammam'),
    date: '2025-08-01',
  },
  {
    slug: 'retail-center-renovation',
    ar: 'تجديد مركز تجاري',
    en: 'Retail Centre Renovation',
    cat: 1,
    loc: t('الخبر', 'Khobar'),
    date: '2025-05-01',
  },
  { slug: 'boutique-hotel', ar: 'فندق بوتيك', en: 'Boutique Hotel', cat: 2, loc: t('مكة المكرمة', 'Makkah'), date: '2025-02-01' },
]

export const artCatDefs = [
  {
    slug: 'guides',
    ar: 'أدلة ونصائح',
    en: 'Guides & tips',
    dar: 'نصائح عملية قبل وأثناء تنفيذ مشروعك.',
    den: 'Practical advice before and during your project.',
  },
  { slug: 'news', ar: 'أخبار الشركة', en: 'Company news', dar: 'آخر أخبارنا ومشاريعنا.', den: 'Our latest news and projects.' },
  {
    slug: 'industry',
    ar: 'القطاع والتقنيات',
    en: 'Industry & technology',
    dar: 'اتجاهات وتقنيات حديثة في القطاع.',
    den: 'Trends and new technology in the industry.',
  },
]

export const articleDefs = [
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
