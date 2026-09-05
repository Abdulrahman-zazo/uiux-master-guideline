/* Trendsy UI-kit fixture + shell. Loaded by every kit's index.html.
   Data mirrors the buyer API (design-handoff-data.md §2, §5) exactly in shape.
   Items marked `fixture: true` are DESIGN-ONLY padding — the API seeds 2
   products, 2 stores and 4 orders; grids at two tiles look broken. */

const M = (minor) => ({ amountMinor: String(minor), currency: 'SYP', display: (minor / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
const ID = (n) => '0199aa00-0000-7000-8000-' + String(n).padStart(12, '0');
const IMG = (slug) => ({ thumb: '', sm: '', md: '', lg: '', original: '' }); // no fixture host reachable — ProductMedia renders its placeholder

/* ── Geo tree (subset of the 98 seeded nodes, §5.1) ── */
const GEO = [{ id: ID('f000'), code: 'SY', kind: 'country', path: 'SY', name: 'سوريا', nameEn: 'Syria', lat: null, lng: null, children: [
  { id: ID('f001'), code: 'DMS', kind: 'governorate', path: 'SY.DMS', name: 'محافظة دمشق', nameEn: 'Damascus Governorate', lat: null, lng: null, children: [
    { id: ID('f002'), code: 'DMC', kind: 'city', path: 'SY.DMS.DMC', name: 'مدينة دمشق', nameEn: 'Damascus', lat: 33.5138, lng: 36.2765, children: [
      { id: ID('f003'), code: 'OLD', kind: 'area', path: 'SY.DMS.DMC.OLD', name: 'دمشق القديمة', nameEn: 'Old Damascus', lat: null, lng: null, children: [
        { id: ID('f004'), code: 'HAMIDIYAH', kind: 'neighborhood', path: 'SY.DMS.DMC.OLD.HAMIDIYAH', name: 'الحميدية', nameEn: 'Al-Hamidiyah', lat: null, lng: null, children: [] },
        { id: ID('f005'), code: 'HARIQA', kind: 'neighborhood', path: 'SY.DMS.DMC.OLD.HARIQA', name: 'الحريقة', nameEn: 'Al-Hariqa', lat: null, lng: null, children: [] },
        { id: ID('f006'), code: 'BZOURIYAH', kind: 'neighborhood', path: 'SY.DMS.DMC.OLD.BZOURIYAH', name: 'البزورية', nameEn: 'Al-Bzouriyah', lat: null, lng: null, children: [] },
        { id: ID('f007'), code: 'ASROUNIYAH', kind: 'neighborhood', path: 'SY.DMS.DMC.OLD.ASROUNIYAH', name: 'العصرونية', nameEn: 'Al-Asrouniyah', lat: null, lng: null, children: [] },
      ] },
      { id: ID('f010'), code: 'MUHAJIRIN', kind: 'area', path: 'SY.DMS.DMC.MUHAJIRIN', name: 'المهاجرين', nameEn: 'Al-Muhajirin', lat: null, lng: null, children: [
        { id: ID('f011'), code: 'SHAALAN', kind: 'neighborhood', path: 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', name: 'الشعلان', nameEn: 'Al-Shaalan', lat: null, lng: null, children: [] },
        { id: ID('f012'), code: 'MALKI', kind: 'neighborhood', path: 'SY.DMS.DMC.MUHAJIRIN.MALKI', name: 'المالكي', nameEn: 'Al-Malki', lat: null, lng: null, children: [] },
      ] },
      { id: ID('f020'), code: 'KAFR_SOUSA', kind: 'area', path: 'SY.DMS.DMC.KAFR_SOUSA', name: 'كفرسوسة', nameEn: 'Kafr Sousa', lat: null, lng: null, children: [
        { id: ID('f021'), code: 'KAFR_SOUSA', kind: 'neighborhood', path: 'SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA', name: 'كفرسوسة', nameEn: 'Kafr Sousa', lat: null, lng: null, children: [] },
      ] },
      { id: ID('f030'), code: 'SALIHIYAH', kind: 'area', path: 'SY.DMS.DMC.SALIHIYAH', name: 'الصالحية', nameEn: 'Al-Salihiyah', lat: null, lng: null, children: [
        { id: ID('f031'), code: 'SALIHIYAH', kind: 'neighborhood', path: 'SY.DMS.DMC.SALIHIYAH.SALIHIYAH', name: 'الصالحية', nameEn: 'Al-Salihiyah', lat: null, lng: null, children: [] },
      ] },
      { id: ID('f040'), code: 'BARZEH', kind: 'area', path: 'SY.DMS.DMC.BARZEH', name: 'برزة', nameEn: 'Barzeh', lat: null, lng: null, children: [
        { id: ID('f041'), code: 'BARZEH', kind: 'neighborhood', path: 'SY.DMS.DMC.BARZEH.BARZEH', name: 'برزة', nameEn: 'Barzeh', lat: null, lng: null, children: [] },
      ] },
      { id: ID('f050'), code: 'DUMMAR', kind: 'area', path: 'SY.DMS.DMC.DUMMAR', name: 'دمر', nameEn: 'Dummar', lat: null, lng: null, children: [
        { id: ID('f051'), code: 'DUMMAR_PROJECT', kind: 'neighborhood', path: 'SY.DMS.DMC.DUMMAR.DUMMAR_PROJECT', name: 'مشروع دمر', nameEn: 'Dummar Project', lat: null, lng: null, children: [] },
      ] },
    ] },
  ] },
  { id: ID('f100'), code: 'RIF', kind: 'governorate', path: 'SY.RIF', name: 'ريف دمشق', nameEn: 'Rif Dimashq', lat: null, lng: null, children: [
    { id: ID('f101'), code: 'JARAMANA', kind: 'city', path: 'SY.RIF.JARAMANA', name: 'جرمانا', nameEn: 'Jaramana', lat: null, lng: null, children: [] },
    { id: ID('f102'), code: 'QUDSAYA', kind: 'city', path: 'SY.RIF.QUDSAYA', name: 'قدسيا', nameEn: 'Qudsaya', lat: null, lng: null, children: [] },
    { id: ID('f103'), code: 'DARAYA', kind: 'city', path: 'SY.RIF.DARAYA', name: 'داريا', nameEn: 'Daraya', lat: null, lng: null, children: [] },
  ] },
  { id: ID('f200'), code: 'ALP', kind: 'governorate', path: 'SY.ALP', name: 'حلب', nameEn: 'Aleppo', lat: null, lng: null, children: [
    { id: ID('f201'), code: 'ALEPPO', kind: 'city', path: 'SY.ALP.ALEPPO', name: 'مدينة حلب', nameEn: 'Aleppo', lat: null, lng: null, children: [] },
  ] },
] }];

function geoName(path, lang) {
  let pool = GEO, node = null;
  for (const seg of path.split('.')) { node = (pool || []).find(n => n.code === seg || n.path.endsWith('.' + seg) || n.path === seg); if (!node) return path; pool = node.children; }
  return lang === 'en' ? node.nameEn : node.name;
}
function geoLabel(path, lang, from = 2) {
  const parts = path.split('.'); const out = [];
  let pool = GEO;
  for (let i = 0; i < parts.length; i++) { const node = (pool || []).find(n => n.path === parts.slice(0, i + 1).join('.')); if (!node) break; if (i >= from) out.push(lang === 'en' ? node.nameEn : node.name); pool = node.children; }
  return out.join(' › ');
}

/* ── 13 markets (§5.2) — no images, no descriptions exist on the API ── */
const MARKETS = [
  ['c001', 'HAMIDIYAH', 'hamidiyah', 'souk', 'الحميدية', 'Al-Hamidiyah', 'SY.DMS.DMC.OLD.HAMIDIYAH', true],
  ['c002', 'MIDHAT_PASHA', 'midhat-pasha', 'souk', 'مدحت باشا', 'Midhat Pasha', 'SY.DMS.DMC.OLD.HARIQA', false],
  ['c003', 'BZOURIYAH', 'bzouriyah', 'souk', 'البزورية', 'Al-Bzouriyah', 'SY.DMS.DMC.OLD.BZOURIYAH', true],
  ['c004', 'HAMRA', 'hamra', 'street', 'الحمرا', 'Al-Hamra', 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', false],
  ['c005', 'MALKI_MALL', 'malki-mall', 'mall', 'مول المالكي', 'Malki Mall', 'SY.DMS.DMC.MUHAJIRIN.MALKI', false],
  ['c006', 'SHAM_CITY_CENTER', 'sham-city-center', 'mall', 'شام سيتي سنتر', 'Sham City Center', 'SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA', false],
  ['c007', 'DAMASCINO', 'damascino', 'mall', 'مول داماسكينو', 'Damascino Mall', 'SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA', false],
  ['c008', 'QASIOUN_MALL', 'qasioun-mall', 'mall', 'مول قاسيون', 'Qasioun Mall', 'SY.DMS.DMC.BARZEH.BARZEH', false],
  ['c009', 'UPTOWN', 'uptown', 'mall', 'أب تاون', 'Uptown', 'SY.DMS.DMC.DUMMAR.DUMMAR_PROJECT', false],
  ['c010', 'SHAALAN', 'shaalan', 'street', 'الشعلان', 'Al-Shaalan', 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', true],
  ['c011', 'SALIHIYAH', 'salihiyah', 'street', 'الصالحية', 'Al-Salihiyah', 'SY.DMS.DMC.SALIHIYAH.SALIHIYAH', true],
  ['c012', 'HARIQA', 'hariqa', 'street', 'الحريقة', 'Al-Hariqa', 'SY.DMS.DMC.OLD.HARIQA', true],
  ['c013', 'ASROUNIYAH', 'asrouniyah', 'street', 'العصرونية', 'Al-Asrouniyah', 'SY.DMS.DMC.OLD.ASROUNIYAH', false],
].map(([id, code, slug, kind, name, nameEn, nodePath, isFeatured]) => ({ id: ID(id), code, slug, kind, name, nameEn, nodePath, isFeatured }));
const marketByCode = (c) => MARKETS.find(m => m.code === c);

/* ── Categories (§5.3 real: sweets, fabrics) + fixture padding in defensible order ── */
const CATEGORIES = [
  { id: ID('0a02'), slug: 'fabrics-textiles', name: 'أقمشة ومنسوجات', nameEn: 'Fabrics & textiles', icon: 'scissors', children: [{ id: ID('0a12'), slug: 'damascene-fabrics', name: 'أقمشة دمشقية', nameEn: 'Damascene fabrics', children: [] }] },
  { id: ID('0a03'), slug: 'home', name: 'منزل ومفروشات', nameEn: 'Home', icon: 'lamp', fixture: true, children: [{ id: ID('0a13'), slug: 'copperware', name: 'نحاسيات', nameEn: 'Copperware', children: [] }, { id: ID('0a14'), slug: 'mosaic', name: 'موزاييك', nameEn: 'Mosaic', children: [] }] },
  { id: ID('0a04'), slug: 'gifts-perfume', name: 'هدايا وعطور', nameEn: 'Gifts & perfume', icon: 'gift', fixture: true, children: [{ id: ID('0a15'), slug: 'attar', name: 'عطور شرقية', nameEn: 'Attar', children: [] }, { id: ID('0a16'), slug: 'soap', name: 'صابون غار', nameEn: 'Laurel soap', children: [] }] },
  { id: ID('0a01'), slug: 'sweets', name: 'حلويات', nameEn: 'Sweets', icon: 'cake', children: [{ id: ID('0a11'), slug: 'oriental-sweets', name: 'حلويات شرقية', nameEn: 'Oriental sweets', children: [] }] },
  { id: ID('0a05'), slug: 'clothing', name: 'ملابس', nameEn: 'Clothing', icon: 'shirt', fixture: true, children: [{ id: ID('0a17'), slug: 'abayas', name: 'عبايات', nameEn: 'Abayas', children: [] }, { id: ID('0a18'), slug: 'shirts', name: 'قمصان', nameEn: 'Shirts', children: [] }] },
  { id: ID('0a06'), slug: 'electronics', name: 'إلكترونيات', nameEn: 'Electronics', icon: 'smartphone', fixture: true, children: [] },
];

/* ── Stores (§5.4 real ×2 + fixture ×6) ── */
const STORES = [
  { id: ID('0211'), slug: 'bayt-al-sham-sweets', name: 'بيت الشام للحلويات', nameEn: 'Bayt al-Sham Sweets', description: 'محل حلويات شامية عريق في قلب سوق الحميدية، يصنع البقلاوة والحلويات الشرقية يومياً منذ ثلاثة أجيال.', descriptionEn: 'A long-established Damascene sweets shop in the heart of Al-Hamidiyah, making baklava and oriental sweets daily for three generations.', marketCode: 'HAMIDIYAH', geoPath: 'SY.DMS.DMC.OLD.HAMIDIYAH', isFoundingPartner: true, logoUrl: '' },
  { id: ID('0212'), slug: 'anwal-dimashq', name: 'أنوال دمشق', nameEn: 'Anwal Dimashq', description: 'أقمشة دمشقية تقليدية من البروكار والأغباني، تُنسج على أنوال يدوية في سوق مدحت باشا.', descriptionEn: 'Traditional Damascene brocade and aghabani fabrics, woven on hand looms in Midhat Pasha.', marketCode: 'MIDHAT_PASHA', geoPath: 'SY.DMS.DMC.OLD.HARIQA', isFoundingPartner: false, logoUrl: '' },
  { id: ID('0213'), fixture: true, slug: 'nahhas-al-bzouriyah', name: 'نحّاس البزورية', nameEn: 'Nahhas al-Bzouriyah', description: 'صواني ودلال نحاسية مطروقة يدوياً.', descriptionEn: 'Hand-hammered copper trays and coffee pots.', marketCode: 'BZOURIYAH', geoPath: 'SY.DMS.DMC.OLD.BZOURIYAH', isFoundingPartner: true, logoUrl: '' },
  { id: ID('0214'), fixture: true, slug: 'attar-al-sham', name: 'عطّار الشام', nameEn: 'Attar al-Sham', description: 'عطور شرقية وصابون غار حلبي.', descriptionEn: 'Oriental attar and Aleppo laurel soap.', marketCode: 'BZOURIYAH', geoPath: 'SY.DMS.DMC.OLD.BZOURIYAH', isFoundingPartner: false, logoUrl: '' },
  { id: ID('0215'), fixture: true, slug: 'dar-al-fusayfisaa', name: 'دار الفسيفساء', nameEn: 'Dar al-Fusayfisaa', description: 'صناديق وطاولات موزاييك دمشقي.', descriptionEn: 'Damascene mosaic boxes and tables.', marketCode: 'ASROUNIYAH', geoPath: 'SY.DMS.DMC.OLD.ASROUNIYAH', isFoundingPartner: false, logoUrl: '' },
  { id: ID('0216'), fixture: true, slug: 'maison-salihiyah', name: 'ميزون الصالحية', nameEn: 'Maison Salihiyah', description: 'عبايات وملابس نسائية.', descriptionEn: 'Abayas and womenswear.', marketCode: 'SALIHIYAH', geoPath: 'SY.DMS.DMC.SALIHIYAH.SALIHIYAH', isFoundingPartner: false, logoUrl: '' },
  { id: ID('0217'), fixture: true, slug: 'qumsan-al-hamra', name: 'قمصان الحمرا', nameEn: 'Qumsan al-Hamra', description: 'قمصان قطنية رجالية.', descriptionEn: 'Men\'s cotton shirts.', marketCode: 'HAMRA', geoPath: 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', isFoundingPartner: false, logoUrl: '' },
  { id: ID('0218'), fixture: true, slug: 'halawiyat-al-shaalan', name: 'حلويات الشعلان', nameEn: 'Halawiyat al-Shaalan', description: 'معمول وغريبة وكعك بالتمر.', descriptionEn: 'Maamoul, ghraybeh and date cakes.', marketCode: 'SHAALAN', geoPath: 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', isFoundingPartner: false, logoUrl: '' },
].map(s => ({ ...s, marketName: marketByCode(s.marketCode).name, marketNameEn: marketByCode(s.marketCode).nameEn }));
const storeById = (id) => STORES.find(s => s.id === id);

/* ── Products (§5.5 real ×2 + fixture ×10). Shape = ProductDetailResponseDto ── */
function P(n, slug, name, nameEn, minor, storeN, catN, variants, desc, descEn, attrs = [], fixture = false, ratio) {
  const store = storeById(ID(storeN));
  const vs = variants.map(([vn, vnEn, vMinor, inStock], i) => ({ id: ID(n + '1' + i), name: vn, nameEn: vnEn, price: M(vMinor ?? minor), inStock: inStock !== false }));
  return { id: ID(n), slug, name, nameEn, price: M(minor), imageUrl: '', storeId: store.id, storeName: store.name, storeNameEn: store.nameEn, categoryId: ID(catN),
    description: desc, descriptionEn: descEn, variants: vs, media: [{ assetId: ID(n + '4'), urls: IMG(slug) }],
    store: { id: store.id, slug: store.slug, name: store.name, marketCode: store.marketCode }, attributes: attrs.map(([code, an, anEn, v, vEn]) => ({ code, name: an, nameEn: anEn, value: v, valueEn: vEn })), fixture };
}
const PRODUCTS = [
  P('0301', 'mixed-baklava', 'بقلاوة مشكلة', 'Mixed baklava', 8500000, '0211', '0a11', [['كيلو', '1 kg', 8500000], ['نصف كيلو', '500 g', 4500000]], 'تشكيلة بقلاوة شامية طازجة بالفستق الحلبي والجوز، تُحضّر يومياً في سوق الحميدية.', 'Fresh Damascene baklava assortment with Aleppo pistachio and walnut, made daily in Al-Hamidiyah.', [['weight', 'الوزن', 'Weight', '1 كغ', '1 kg'], ['shelf_life', 'مدة الحفظ', 'Shelf life', '10 أيام', '10 days']]),
  P('0302', 'damascene-brocade', 'قماش بروكار دمشقي', 'Damascene brocade fabric', 12000000, '0212', '0a12', [['متر', '1 m', 12000000], ['٣ أمتار', '3 m', 34000000]], 'بروكار حريري منسوج يدوياً بخيوط ذهبية، عرض ١٤٠ سم، يُقطع حسب الطلب.', 'Hand-woven silk brocade with gold thread, 140 cm wide, cut to order.', [['width', 'العرض', 'Width', '140 سم', '140 cm'], ['material', 'الخامة', 'Material', 'حرير طبيعي', 'Natural silk']]),
  P('0304', 'copper-tray-40', 'صينية نحاس مطروقة ٤٠ سم', 'Hammered copper tray 40 cm', 22000000, '0213', '0a13', [['٤٠ سم', '40 cm', 22000000], ['٦٠ سم', '60 cm', 38000000, false]], 'صينية نحاس أحمر مطروقة يدوياً بنقش دمشقي.', 'Hand-hammered red copper tray with Damascene engraving.', [['diameter', 'القطر', 'Diameter', '40 سم', '40 cm']], true),
  P('0305', 'dallah-set', 'طقم دلّة وفناجين', 'Dallah and cups set', 17500000, '0213', '0a13', [['طقم ٦', 'Set of 6', 17500000]], 'دلّة نحاسية مع ست فناجين، شغل يدوي.', 'Copper dallah with six cups, handmade.', [], true),
  P('0306', 'oud-attar-12ml', 'عطر عود دمشقي ١٢ مل', 'Damascene oud attar 12 ml', 9500000, '0214', '0a15', [['١٢ مل', '12 ml', 9500000], ['٢٥ مل', '25 ml', 17000000]], 'زيت عود مركّز في قارورة زجاج، بدون كحول.', 'Concentrated oud oil in a glass vial, alcohol-free.', [['volume', 'الحجم', 'Volume', '12 مل', '12 ml']], true),
  P('0307', 'laurel-soap-3', 'صابون غار حلبي ٣ قطع', 'Aleppo laurel soap ×3', 3600000, '0214', '0a16', [['٣ قطع', '3 bars', 3600000], ['٦ قطع', '6 bars', 6800000]], 'صابون غار ٤٠٪ معتّق سنة كاملة.', '40% laurel soap, aged one full year.', [['laurel', 'نسبة الغار', 'Laurel', '40%', '40%']], true),
  P('0308', 'mosaic-box', 'صندوق موزاييك دمشقي', 'Damascene mosaic box', 14000000, '0215', '0a14', [['صغير', 'Small', 14000000], ['كبير', 'Large', 26000000]], 'صندوق خشب جوز مطعّم بالصدف والموزاييك.', 'Walnut box inlaid with mother-of-pearl and mosaic.', [], true),
  P('0309', 'mosaic-side-table', 'طاولة جانبية موزاييك', 'Mosaic side table', 65000000, '0215', '0a14', [['قطعة', '1 piece', 65000000]], 'طاولة سداسية بتطعيم دمشقي كامل.', 'Hexagonal table with full Damascene inlay.', [['height', 'الارتفاع', 'Height', '55 سم', '55 cm']], true),
  P('0310', 'linen-abaya', 'عباية كتان مطرزة', 'Embroidered linen abaya', 28000000, '0216', '0a17', [['S', 'S', 28000000], ['M', 'M', 28000000], ['L', 'L', 28000000, false], ['XL', 'XL', 28000000]], 'عباية كتان بتطريز يدوي على الأكمام.', 'Linen abaya with hand embroidery on the sleeves.', [['material', 'الخامة', 'Material', 'كتان', 'Linen']], true),
  P('0311', 'cotton-shirt', 'قميص قطني رجالي', 'Men\'s cotton shirt', 9800000, '0217', '0a18', [['M', 'M', 9800000], ['L', 'L', 9800000], ['XL', 'XL', 9800000]], 'قميص قطن مصري ١٠٠٪، قصّة عادية.', '100% Egyptian cotton, regular fit.', [['material', 'الخامة', 'Material', 'قطن 100%', '100% cotton']], true),
  P('0312', 'maamoul-box', 'علبة معمول بالفستق', 'Pistachio maamoul box', 6200000, '0218', '0a11', [['كيلو', '1 kg', 6200000]], 'معمول بالفستق الحلبي، طازج يومياً.', 'Aleppo pistachio maamoul, fresh daily.', [], true),
  P('0313', 'aghabani-tablecloth', 'مفرش أغباني مطرز', 'Embroidered aghabani tablecloth', 19500000, '0212', '0a12', [['١٥٠×٢٥٠', '150×250', 19500000], ['١٨٠×٣٠٠', '180×300', 27000000]], 'مفرش أغباني بتطريز حريري دمشقي.', 'Aghabani tablecloth with Damascene silk embroidery.', [], true),
];
const productById = (id) => PRODUCTS.find(p => p.id === id);
const productBySlug = (s) => PRODUCTS.find(p => p.slug === s);

/* ── Buyer, address, cart, orders (§5.10) ── */
const ME = { id: ID('0101'), customerNumber: 'TS-C-000101', phone: '+963900000001', locale: 'ar', createdAt: '2026-08-26T09:00:00.000Z' };
const ADDRESSES = [
  { id: ID('0111'), label: 'المنزل', governorateNodeId: ID('f001'), cityNodeId: ID('f002'), areaNodeId: ID('f010'), neighborhoodNodeId: ID('f011'), path: 'SY.DMS.DMC.MUHAJIRIN.SHAALAN', description: 'بناء الياسمين، طابق ٣، قرب صيدلية الشعلان', phone: '+963900000001', lat: 33.518, lng: 36.293, isDefault: true },
  { id: ID('0112'), fixture: true, label: 'العمل', governorateNodeId: ID('f001'), cityNodeId: ID('f002'), areaNodeId: ID('f020'), neighborhoodNodeId: ID('f021'), path: 'SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA', description: 'مبنى الشركة، الطابق الأرضي، مقابل شام سيتي سنتر', phone: '+963900000001', lat: null, lng: null, isDefault: false },
];
const line = (id, pN, vIdx, qty) => { const p = productById(ID(pN)); const v = p.variants[vIdx]; const unit = Number(v.price.amountMinor); return { id: ID(id), productId: p.id, variantId: v.id, name: p.name, nameEn: p.nameEn, variantName: v.name, variantNameEn: v.nameEn, unitPrice: v.price, qty, lineTotal: M(unit * qty), imageUrl: '', available: true, storeId: p.storeId, storeName: p.storeName }; };
const CART = { id: ID('0501'), kind: 'user', items: [line('0502', '0301', 0, 1), line('0503', '0302', 0, 1)], itemsCount: 2, itemsSubtotal: M(20500000), couponCode: null, updatedAt: '2026-08-31T12:00:00.000Z' };

const ev = (seq, status, label, labelEn, at) => ({ seq, status, label, labelEn, occurredAt: at, note: null });
const ORDERS = [
  { id: ID('0601'), orderNumber: 'TS-000123', checkoutId: ID('0600'), storeId: ID('0211'), storeName: 'بيت الشام للحلويات', status: 'placed', statusLabel: 'بانتظار التأكيد', statusLabelEn: 'Awaiting confirmation', itemsCount: 1, total: M(9000000), createdAt: '2026-08-31T10:00:00.000Z',
    lines: [line('0611', '0301', 0, 1)], address: ADDRESSES[0], itemsSubtotal: M(8500000), deliveryFee: M(500000), cancellable: true,
    events: [ev(1, 'placed', 'تم استلام الطلب', 'Order placed', '2026-08-31T10:00:00.000Z')] },
  { id: ID('0602'), orderNumber: 'TS-000124', checkoutId: ID('0600'), storeId: ID('0212'), storeName: 'أنوال دمشق', status: 'shipped', statusLabel: 'في الطريق إليك', statusLabelEn: 'On its way', itemsCount: 1, total: M(12500000), createdAt: '2026-08-31T10:00:00.000Z',
    lines: [line('0612', '0302', 0, 1)], address: ADDRESSES[0], itemsSubtotal: M(12000000), deliveryFee: M(500000), cancellable: false,
    events: [ev(1, 'placed', 'تم استلام الطلب', 'Order placed', '2026-08-31T10:00:00.000Z'), ev(2, 'confirmed', 'تم التأكيد بالهاتف', 'Confirmed by phone', '2026-08-31T10:30:00.000Z'), ev(3, 'accepted', 'المحل يجهّز الطلب', 'Store is preparing', '2026-08-31T11:00:00.000Z'), ev(4, 'shipped', 'في الطريق إليك', 'On its way', '2026-08-31T12:00:00.000Z')] },
  { id: ID('0603'), orderNumber: 'TS-000117', checkoutId: ID('0590'), storeId: ID('0211'), storeName: 'بيت الشام للحلويات', status: 'delivered', statusLabel: 'تم التوصيل', statusLabelEn: 'Delivered', itemsCount: 1, total: M(9000000), createdAt: '2026-08-25T14:00:00.000Z',
    lines: [line('0613', '0301', 0, 1)], address: ADDRESSES[0], itemsSubtotal: M(8500000), deliveryFee: M(500000), cancellable: false,
    events: [ev(1, 'placed', 'تم استلام الطلب', 'Order placed', '2026-08-25T14:00:00.000Z'), ev(2, 'confirmed', 'تم التأكيد بالهاتف', 'Confirmed by phone', '2026-08-25T14:20:00.000Z'), ev(3, 'accepted', 'المحل يجهّز الطلب', 'Store is preparing', '2026-08-25T15:00:00.000Z'), ev(4, 'shipped', 'في الطريق إليك', 'On its way', '2026-08-26T09:00:00.000Z'), ev(5, 'delivered', 'تم التوصيل', 'Delivered', '2026-08-27T13:00:00.000Z')] },
  { id: ID('0604'), orderNumber: 'TS-000131', checkoutId: ID('0591'), storeId: ID('0212'), storeName: 'أنوال دمشق', status: 'confirmed', statusLabel: 'مؤكّد', statusLabelEn: 'Confirmed', itemsCount: 1, total: M(24500000), createdAt: '2026-09-01T09:00:00.000Z',
    lines: [line('0614', '0302', 0, 2)], address: ADDRESSES[0], itemsSubtotal: M(24000000), deliveryFee: M(500000), cancellable: true,
    events: [ev(1, 'placed', 'تم استلام الطلب', 'Order placed', '2026-09-01T09:00:00.000Z'), ev(2, 'confirmed', 'تم التأكيد بالهاتف', 'Confirmed by phone', '2026-09-01T09:25:00.000Z')] },
];
const CHECKOUT = { id: ID('0600'), createdAt: '2026-08-31T10:00:00.000Z', paymentMethodCode: 'cod', address: ADDRESSES[0], orders: [ORDERS[0], ORDERS[1]], itemsSubtotal: M(20500000), deliveryFee: M(1000000), discount: M(0), grandTotal: M(21500000) };

const REASONS = { cancel: [{ code: 'changed_mind', label: 'غيرت رأيي', labelEn: 'Changed my mind' }, { code: 'wrong_item', label: 'طلبت المنتج الخطأ', labelEn: 'Ordered the wrong item' }, { code: 'delivery_too_slow', label: 'التوصيل تأخر', labelEn: 'Delivery was too slow' }] };
const PAYMENT_METHODS = [{ code: 'cod', enabled: true, name: 'الدفع عند الاستلام', nameEn: 'Cash on delivery', description: 'ادفع نقداً لمندوب التوصيل عند استلام طلبك.', descriptionEn: 'Pay the courier in cash when your order arrives.' }];
const PAGES = [{ slug: 'about', title: 'من نحن', titleEn: 'About us' }, { slug: 'return-policy', title: 'سياسة الإرجاع', titleEn: 'Return policy' }, { slug: 'terms', title: 'الشروط والأحكام', titleEn: 'Terms & conditions' }, { slug: 'contact', title: 'اتصل بنا', titleEn: 'Contact us' }];

/* ── Copy — neutral Arabic (R7), English verified after ── */
const COPY = {
  ar: { dir: 'rtl', lang: 'ar',
    tabs: { home: 'الرئيسية', markets: 'الأسواق', cart: 'السلة', orders: 'طلباتي', account: 'حسابي' },
    search: 'ابحث عن منتج، محل، أو سوق', signIn: 'تسجيل الدخول', markets: 'أسواق دمشق', newArrivals: 'وصل حديثاً', categories: 'الفئات', seeAll: 'تصفّح الكل',
    addToCart: 'أضف إلى السلة', cart: 'السلة', checkout: 'إتمام الطلب', continueShopping: 'متابعة التسوق', qty: 'الكمية', description: 'الوصف', details: 'التفاصيل', fromStore: 'من نفس المحل', variant: 'الخيار',
    feeNote: 'رسوم التوصيل تُحسب في الخطوة التالية', confirm: 'تأكيد الطلب', processing: 'جارٍ إنشاء الطلب…', backToCart: 'العودة إلى السلة', trackOrders: 'تتبّع الطلبات',
    address: 'العنوان', payment: 'الدفع', review: 'المراجعة', next: 'متابعة', back: 'رجوع', addAddress: 'إضافة عنوان', landmark: 'وصف العنوان', landmarkHint: 'أقرب معلم، البناء، الطابق', phone: 'رقم الهاتف للتوصيل',
    ordersCreated: 'تم استلام طلبك', callSoon: 'سنتصل بك خلال ساعات العمل لتأكيد الطلب', active: 'جارية', done: 'مكتملة', lastUpdated: 'آخر تحديث', cancelOrder: 'إلغاء الطلب', reorder: 'إعادة الطلب', items: 'المنتجات', totals: 'الإجمالي',
    phoneEntry: 'أدخل رقم هاتفك', phoneWhy: 'نستخدم رقمك للتوصيل ولمكالمة تأكيد الطلب فقط.', sendCode: 'أرسل الرمز', verify: 'تحقّق', codeSent: 'أرسلنا رمزاً إلى', expiresIn: 'ينتهي الرمز خلال', resendIn: 'إعادة الإرسال بعد', resend: 'إعادة الإرسال', yourName: 'اسمك (اختياري)', continueBtn: 'متابعة',
    account: 'حسابي', addresses: 'العناوين', language: 'اللغة', devices: 'أجهزتك', pages: 'الصفحات', logout: 'تسجيل الخروج', deleteAccount: 'حذف الحساب', logoutAll: 'تسجيل الخروج من كل الأجهزة',
    emptyCart: 'سلتك فارغة', browseMarkets: 'تصفّح الأسواق', noOrders: 'لا طلبات بعد', noResults: 'لا توجد نتائج في هذا السوق — جرّب سوقاً آخر', clearMarket: 'إزالة تصفية السوق', offline: 'لا يوجد اتصال — سلتك محفوظة', storeInactive: 'هذا المحل غير متاح حالياً',
    filters: 'التصفية', sort: 'الترتيب', market: 'السوق', price: 'السعر', shopsCount: 'محلات', deliveryEstimate: 'موعد التوصيل', chooseArea: 'اختر منطقتك لمعرفة موعد التوصيل', shotInStore: 'صُوِّر في المحل', noRatings: 'لا تقييمات بعد', guestPrompt: 'سجّل الدخول لمتابعة طلباتك', outOfStock: 'غير متوفر',
    kinds: { souk: 'سوق', mall: 'مول', street: 'شارع تجاري' },
  },
  en: { dir: 'ltr', lang: 'en',
    tabs: { home: 'Home', markets: 'Markets', cart: 'Cart', orders: 'My orders', account: 'Account' },
    search: 'Search for a product, shop or market', signIn: 'Sign in', markets: 'Damascus markets', newArrivals: 'New arrivals', categories: 'Categories', seeAll: 'See all',
    addToCart: 'Add to cart', cart: 'Cart', checkout: 'Checkout', continueShopping: 'Continue shopping', qty: 'Quantity', description: 'Description', details: 'Details', fromStore: 'From the same shop', variant: 'Option',
    feeNote: 'Delivery fee is calculated at the next step', confirm: 'Confirm order', processing: 'Creating your order…', backToCart: 'Back to cart', trackOrders: 'Track orders',
    address: 'Address', payment: 'Payment', review: 'Review', next: 'Continue', back: 'Back', addAddress: 'Add address', landmark: 'Address description', landmarkHint: 'Nearest landmark, building, floor', phone: 'Phone for delivery',
    ordersCreated: 'Order received', callSoon: 'We will call during working hours to confirm your order', active: 'Active', done: 'Completed', lastUpdated: 'Last updated', cancelOrder: 'Cancel order', reorder: 'Reorder', items: 'Items', totals: 'Total',
    phoneEntry: 'Enter your phone number', phoneWhy: 'We use your number only for delivery and the confirmation call.', sendCode: 'Send code', verify: 'Verify', codeSent: 'We sent a code to', expiresIn: 'Code expires in', resendIn: 'Resend in', resend: 'Resend', yourName: 'Your name (optional)', continueBtn: 'Continue',
    account: 'Account', addresses: 'Addresses', language: 'Language', devices: 'Your devices', pages: 'Pages', logout: 'Sign out', deleteAccount: 'Delete account', logoutAll: 'Sign out of all devices',
    emptyCart: 'Your cart is empty', browseMarkets: 'Browse markets', noOrders: 'No orders yet', noResults: 'No results in this market — try another', clearMarket: 'Clear market filter', offline: 'No connection — your cart is saved', storeInactive: 'This shop is currently unavailable',
    filters: 'Filters', sort: 'Sort', market: 'Market', price: 'Price', shopsCount: 'shops', deliveryEstimate: 'Delivery estimate', chooseArea: 'Choose your area to see a delivery estimate', shotInStore: 'Shot in store', noRatings: 'No ratings yet', guestPrompt: 'Sign in to follow your orders', outOfStock: 'Out of stock',
    kinds: { souk: 'Souk', mall: 'Mall', street: 'Shopping street' },
  },
};

/* Locale + theme shell. Arabic-first: default ar/rtl. */
function useKitShell(initial = 'ar') {
  const [lang, setLang] = React.useState(initial);
  const [theme, setTheme] = React.useState('light');
  const [offline, setOffline] = React.useState(false);
  React.useEffect(() => {
    const t = COPY[lang];
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', t.lang);
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);
  const t = COPY[lang];
  const en = lang === 'en';
  const L = (obj, key) => (en && obj && obj[key + 'En'] != null) ? obj[key + 'En'] : (obj ? obj[key] : '');
  const loc = (p) => p ? ({ ...p, name: L(p, 'name'), storeName: L(p, 'storeName'), variantName: L(p, 'variantName'), description: L(p, 'description'), statusLabel: L(p, 'statusLabel'), label: L(p, 'label'), title: L(p, 'title'), marketName: L(p, 'marketName') }) : p;
  const marketName = (code) => L(marketByCode(code), 'name');
  return { lang, setLang, theme, setTheme, t, en, L, loc, marketName, offline, setOffline,
    geoName: (path) => geoName(path, lang), geoLabel: (path, from) => geoLabel(path, lang, from),
    toggleLang: () => setLang(l => (l === 'en' ? 'ar' : 'en')),
    toggleTheme: () => setTheme(x => (x === 'light' ? 'dark' : 'light')) };
}

/* ع/EN · theme · offline-sim controls for the kit header. */
function KitControls({ shell, tone = 'light', showOffline = true }) {
  const { IconButton } = window.TrendDesignSystem_7e8edd;
  const border = tone === 'dark' ? 'rgba(255,255,255,.28)' : 'var(--border-hairline)';
  const fg = tone === 'dark' ? '#fff' : 'var(--text-primary)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button type="button" onClick={shell.toggleLang} style={{ background: 'transparent', border: '1px solid ' + border, color: fg, borderRadius: 'var(--radius-pill)', height: 32, paddingInline: 12, cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500 }}>{shell.lang === 'en' ? 'ع' : 'EN'}</button>
      <IconButton icon={shell.theme === 'light' ? 'moon' : 'sun'} label="Theme" variant={tone === 'dark' ? 'inverse' : 'secondary'} size="sm" onClick={shell.toggleTheme} />
      {showOffline && <IconButton icon={shell.offline ? 'wifi-off' : 'wifi'} label="Simulate offline" variant={tone === 'dark' ? 'inverse' : 'secondary'} size="sm" active={shell.offline} onClick={() => shell.setOffline(o => !o)} />}
    </span>
  );
}

/* Compat for the PARKED console kits (seller_dashboard, admin_panel) built on the pre-Trendsy fixture. Not for new work. */
const CATALOG = PRODUCTS.map(p => ({ ...p, brand: p.storeName, brandAr: p.storeName, nameAr: p.name, name: p.nameEn, price: Number(p.price.amountMinor) / 100, rating: 4.6, reviews: 12 }));
function useKitShellCompat(initial) { const s = useKitShell(initial); return { ...s, money: (n) => new Intl.NumberFormat('en-US').format(n), pname: (p) => s.en ? (p.name || p.nameEn) : (p.nameAr || p.name), pbrand: (p) => p.brand || p.storeName, t: { ...s.t, currency: s.en ? 'SYP' : 'ل.س' } }; }
Object.assign(window, { CATALOG, useKitShellCompat });
Object.assign(window, { M, ID, GEO, geoName, geoLabel, MARKETS, marketByCode, CATEGORIES, STORES, storeById, PRODUCTS, productById, productBySlug, ME, ADDRESSES, CART, ORDERS, CHECKOUT, REASONS, PAYMENT_METHODS, PAGES, COPY, useKitShell, KitControls });
