/* Shared helpers for the Trend UI kits. Loaded with <script type="text/babel">.
   Not a design-system component — lowercase stem, no .d.ts, so the compiler skips it. */

const SAR = (n, locale) => new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', { maximumFractionDigits: 2 }).format(n);

/* Catalogue fixture. No photography was supplied, so every item has no image
   and renders through ProductMedia's labelled placeholder. */
const CATALOG = [
  { id: 1, brand: 'Nour Atelier', brandAr: 'نور أتيليه', name: 'Embroidered linen abaya', nameAr: 'عباية كتان مطرزة', price: 174, compareAt: 249, rating: 4.6, reviews: 128, cat: 'abayas' },
  { id: 2, brand: 'Sahar', brandAr: 'سحر', name: 'Silk twill scarf', nameAr: 'وشاح حرير تويل', price: 89, rating: 4.8, reviews: 64, cat: 'accessories' },
  { id: 3, brand: 'Mishaal', brandAr: 'مشعل', name: 'Pleated wide-leg trousers', nameAr: 'بنطال واسع مطوي', price: 210, rating: 4.4, reviews: 41, cat: 'clothing' },
  { id: 4, brand: 'Bayt Oud', brandAr: 'بيت العود', name: 'Oud & amber eau de parfum', nameAr: 'عطر عود وعنبر', price: 340, compareAt: 420, rating: 4.9, reviews: 302, cat: 'beauty', badge: 'Bestseller' },
  { id: 5, brand: 'Nour Atelier', brandAr: 'نور أتيليه', name: 'Structured tote in pebbled leather', nameAr: 'حقيبة جلد محبب', price: 495, rating: 4.5, reviews: 87, cat: 'bags' },
  { id: 6, brand: 'Layl', brandAr: 'ليل', name: 'Satin slip dress', nameAr: 'فستان ساتان', price: 265, compareAt: 330, rating: 4.2, reviews: 19, cat: 'clothing' },
  { id: 7, brand: 'Sahar', brandAr: 'سحر', name: 'Gold-plated hoop earrings', nameAr: 'أقراط دائرية مطلية', price: 120, rating: 4.7, reviews: 156, cat: 'accessories' },
  { id: 8, brand: 'Mishaal', brandAr: 'مشعل', name: 'Wool-blend tailored coat', nameAr: 'معطف صوف مخصص', price: 720, compareAt: 900, rating: 4.6, reviews: 33, cat: 'clothing', badge: 'New' },
];

const COPY = {
  en: {
    dir: 'ltr', lang: 'en', currency: 'SAR', locale: 'en',
    nav: [{ id: 'women', label: 'Women' }, { id: 'men', label: 'Men' }, { id: 'beauty', label: 'Beauty' }, { id: 'new', label: 'New in' }, { id: 'sale', label: 'Sale' }],
    signIn: 'Sign in', search: 'Search abayas, bags, perfume…',
    heroEyebrow: 'Autumn edit', heroTitle: 'Shop the trend, not the season',
    heroBody: 'Curated pieces from 400+ regional ateliers, delivered across the Gulf in 2–4 days.',
    heroCta: 'Shop new arrivals', heroCta2: 'Browse designers',
    newEyebrow: 'New this week', newTitle: 'Fresh from our ateliers', explore: 'Explore more',
    saleEyebrow: 'Up to 40% off', saleTitle: 'The mid-season sale',
    addToBag: 'Add to bag', bag: 'Your bag', checkout: 'Checkout', continueShopping: 'Continue shopping',
    size: 'Size', colour: 'Colour', qty: 'Quantity', description: 'Description', reviews: 'Reviews', shipping: 'Shipping & returns',
    placeOrder: 'Place order', payment: 'Payment', delivery: 'Delivery', contact: 'Contact',
    orderPlaced: 'Order placed', thanks: 'Thanks — your order is on its way.',
    filters: 'Filters', sort: 'Sort', results: 'results',
  },
  ar: {
    dir: 'rtl', lang: 'ar', currency: 'ر.س', locale: 'ar',
    nav: [{ id: 'women', label: 'نساء' }, { id: 'men', label: 'رجال' }, { id: 'beauty', label: 'الجمال' }, { id: 'new', label: 'وصل حديثاً' }, { id: 'sale', label: 'التخفيضات' }],
    signIn: 'تسجيل الدخول', search: 'ابحثي عن عبايات، حقائب، عطور…',
    heroEyebrow: 'إصدار الخريف', heroTitle: 'تسوّقي الترند لا الموسم',
    heroBody: 'قطع مختارة من أكثر من ٤٠٠ أتيليه في المنطقة، تُوصَل في الخليج خلال ٢–٤ أيام.',
    heroCta: 'تسوّقي الجديد', heroCta2: 'تصفّحي المصممين',
    newEyebrow: 'وصل هذا الأسبوع', newTitle: 'جديد من الأتيليهات', explore: 'اكتشفي المزيد',
    saleEyebrow: 'خصم حتى ٤٠٪', saleTitle: 'تخفيضات منتصف الموسم',
    addToBag: 'أضيفي إلى الحقيبة', bag: 'حقيبتك', checkout: 'إتمام الشراء', continueShopping: 'متابعة التسوق',
    size: 'المقاس', colour: 'اللون', qty: 'الكمية', description: 'الوصف', reviews: 'التقييمات', shipping: 'الشحن والإرجاع',
    placeOrder: 'تأكيد الطلب', payment: 'الدفع', delivery: 'التوصيل', contact: 'بيانات التواصل',
    orderPlaced: 'تم تأكيد الطلب', thanks: 'شكراً لك — طلبك في الطريق.',
    filters: 'التصفية', sort: 'الترتيب', results: 'نتيجة',
  },
};

/* Locale + theme state, wired to <html dir> and [data-theme]. */
function useKitShell(initial = 'en') {
  const [lang, setLang] = React.useState(initial);
  const [theme, setTheme] = React.useState('light');
  React.useEffect(() => {
    const t = COPY[lang];
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', t.lang);
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);
  const t = COPY[lang];
  const money = (n) => SAR(n, t.locale);
  const pname = (p) => (lang === 'ar' ? p.nameAr : p.name);
  const pbrand = (p) => (lang === 'ar' ? p.brandAr : p.brand);
  /* Localised product for DS commerce components. */
  const loc = (p) => ({ ...p, name: pname(p), brand: pbrand(p) });
  return { lang, setLang, theme, setTheme, t, money, pname, pbrand, loc,
    toggleLang: () => setLang(l => (l === 'en' ? 'ar' : 'en')),
    toggleTheme: () => setTheme(x => (x === 'light' ? 'dark' : 'light')) };
}

/* The EN/ع + theme control pair that sits in every kit's header. */
function KitControls({ shell, tone = 'dark' }) {
  const { IconButton } = window.TrendDesignSystem_7e8edd;
  const border = tone === 'dark' ? 'rgba(255,255,255,.28)' : 'var(--border-hairline)';
  const fg = tone === 'dark' ? '#fff' : 'var(--text-primary)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button type="button" onClick={shell.toggleLang} style={{
        background: 'transparent', border: '1px solid ' + border, color: fg,
        borderRadius: 'var(--radius-pill)', height: 32, paddingInline: 12, cursor: 'pointer',
        fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '.05em',
      }}>{shell.lang === 'en' ? 'ع' : 'EN'}</button>
      <IconButton icon={shell.theme === 'light' ? 'moon' : 'sun'} label="Theme"
        variant={tone === 'dark' ? 'inverse' : 'secondary'} size="sm" onClick={shell.toggleTheme} />
    </span>
  );
}

Object.assign(window, { SAR, CATALOG, COPY, useKitShell, KitControls });
