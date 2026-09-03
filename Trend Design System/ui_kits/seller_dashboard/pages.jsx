const { Card, StatCard, DataTable, StatusPill, Badge, Button, IconButton, Tabs, Tag, Eyebrow, Divider, ProgressBar, EmptyState, Alert, ProductMedia, PriceBlock, Input, Textarea, Select, Checkbox, Switch, FormField, OptionPicker, Pagination, Avatar, Icon, RatingStars } = window.TrendDesignSystem_7e8edd;

const ORDERS = [
  { id: '#TR-4821', customer: 'Layla Al-Harbi', customerAr: 'ليلى الحربي', items: 2, status: 'processing', total: '612.00', date: '2 Sep' },
  { id: '#TR-4820', customer: 'Omar Nasser', customerAr: 'عمر ناصر', items: 1, status: 'shipped', total: '249.00', date: '2 Sep' },
  { id: '#TR-4819', customer: 'Hana Qasim', customerAr: 'هناء قاسم', items: 4, status: 'delivered', total: '1,180.50', date: '1 Sep' },
  { id: '#TR-4818', customer: 'Yousef Bakr', customerAr: 'يوسف بكر', items: 1, status: 'pending', total: '89.00', date: '1 Sep' },
  { id: '#TR-4817', customer: 'Reem Saleh', customerAr: 'ريم صالح', items: 3, status: 'failed', total: '735.00', date: '31 Aug' },
  { id: '#TR-4816', customer: 'Faisal Idris', customerAr: 'فيصل إدريس', items: 2, status: 'refunded', total: '420.00', date: '31 Aug' },
];

/* Small inline bar chart — no charting library, tokens only. */
function BarChart({ data, shell }) {
  const max = Math.max(...data.map(d => d[1]));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, paddingTop: 8 }}>
      {data.map(([label, v], i) => (
        <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <div style={{ width: '100%', height: (v / max) * 108, background: i === data.length - 1 ? 'var(--purple-700)' : 'var(--purple-200)', borderRadius: '6px 6px 0 0', transition: 'height var(--duration-slow) var(--ease-out)' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function SellerOverview({ shell, go }) {
  const ar = shell.lang === 'ar';
  const weeks = ar ? [['الأسبوع ١', 42], ['الأسبوع ٢', 58], ['الأسبوع ٣', 51], ['الأسبوع ٤', 74], ['الأسبوع ٥', 66], ['الأسبوع ٦', 92]] : [['Wk 1', 42], ['Wk 2', 58], ['Wk 3', 51], ['Wk 4', 74], ['Wk 5', 66], ['Wk 6', 92]];
  return (
    <>
      <Alert tone="warning" title={ar ? '٣ منتجات على وشك النفاد' : '3 products are nearly out of stock'}
        action={<Button size="sm" variant="secondary" onClick={() => go('catalog')}>{ar ? 'مراجعة الكتالوج' : 'Review catalogue'}</Button>} />
      <div className="tiles">
        <StatCard label={ar ? 'الإيرادات' : 'Revenue'} value={ar ? '١٨٤٬٢٩٠' : '184,290'} unit={shell.t.currency} delta={12.4} deltaLabel={ar ? 'مقارنة بالأسبوع الماضي' : 'vs last week'} icon="wallet" />
        <StatCard label={ar ? 'الطلبات' : 'Orders'} value={ar ? '١٬٢٨٤' : '1,284'} delta={4.8} deltaLabel={ar ? 'مقارنة بالأسبوع الماضي' : 'vs last week'} icon="package" />
        <StatCard label={ar ? 'متوسط قيمة السلة' : 'Avg. basket'} value={ar ? '٤٣٦' : '436'} unit={shell.t.currency} delta={2.1} icon="shopping-cart" />
        <StatCard label={ar ? 'المرتجعات' : 'Returns'} value={ar ? '٣٨' : '38'} delta={-4.1} deltaLabel={ar ? 'مقارنة بالأسبوع الماضي' : 'vs last week'} icon="undo-2" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 20 }}>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Eyebrow>{ar ? 'الإيرادات' : 'Revenue'}</Eyebrow>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{ar ? 'آخر ٦ أسابيع' : 'Last 6 weeks'}</span>
            </div>
            <Tabs variant="pill" active="6w" onChange={() => {}} items={ar ? [{ id: '6w', label: '٦ أسابيع' }, { id: '3m', label: '٣ أشهر' }, { id: '1y', label: 'سنة' }] : [{ id: '6w', label: '6 weeks' }, { id: '3m', label: '3 months' }, { id: '1y', label: '12 months' }]} />
          </div>
          <BarChart data={weeks} shell={shell} />
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow>{ar ? 'الأكثر مبيعاً' : 'Top sellers'}</Eyebrow>
          {CATALOG.slice(0, 4).map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', width: 14 }}>{i + 1}</span>
              <ProductMedia ratio="1 / 1" style={{ width: 38, flex: '0 0 auto' }} radius="var(--radius-sm)" />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shell.pname(p)}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>{ar ? `${88 - i * 17} قطعة` : `${88 - i * 17} sold`}</span>
              </div>
              <PriceBlock amount={p.price} size="sm" currency={shell.t.currency} />
            </div>
          ))}
          <Divider spacing={2} />
          <ProgressBar value={82} label={ar ? 'اكتمال ملف المتجر' : 'Store profile completion'} showValue />
        </Card>
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px' }}>
          <Eyebrow>{ar ? 'أحدث الطلبات' : 'Recent orders'}</Eyebrow>
          <Button variant="ghost" size="sm" iconEnd="arrow-right" onClick={() => go('orders')}>{ar ? 'كل الطلبات' : 'All orders'}</Button>
        </div>
        <SellerOrderTable shell={shell} rows={ORDERS.slice(0, 4)} dense />
      </Card>
    </>
  );
}

function SellerOrderTable({ shell, rows, dense }) {
  const ar = shell.lang === 'ar';
  return (
    <DataTable dense={dense} rows={rows} onRowClick={() => {}} columns={[
      { key: 'id', label: ar ? 'الطلب' : 'Order', numeric: true },
      { key: 'customer', label: ar ? 'العميل' : 'Customer', render: r => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
          <Avatar name={ar ? r.customerAr : r.customer} size="xs" />{ar ? r.customerAr : r.customer}
        </span>) },
      { key: 'items', label: ar ? 'القطع' : 'Items', numeric: true },
      { key: 'date', label: ar ? 'التاريخ' : 'Date', muted: true },
      { key: 'status', label: ar ? 'الحالة' : 'Status', render: r => <StatusPill status={r.status} /> },
      { key: 'total', label: (ar ? 'الإجمالي' : 'Total') + ' (' + shell.t.currency + ')', align: 'end', numeric: true },
    ]} />
  );
}

function SellerOrders({ shell }) {
  const ar = shell.lang === 'ar';
  const [tab, setTab] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const rows = tab === 'all' ? ORDERS : ORDERS.filter(o => o.status === tab);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <Tabs active={tab} onChange={setTab} items={ar
          ? [{ id: 'all', label: 'الكل', count: 6 }, { id: 'pending', label: 'معلّق', count: 1 }, { id: 'processing', label: 'قيد التجهيز', count: 1 }, { id: 'shipped', label: 'تم الشحن', count: 1 }, { id: 'delivered', label: 'تم التوصيل', count: 1 }]
          : [{ id: 'all', label: 'All', count: 6 }, { id: 'pending', label: 'Pending', count: 1 }, { id: 'processing', label: 'Processing', count: 1 }, { id: 'shipped', label: 'Shipped', count: 1 }, { id: 'delivered', label: 'Delivered', count: 1 }]} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm" iconStart="download">{ar ? 'تصدير CSV' : 'Export CSV'}</Button>
          <Button variant="primary" size="sm" iconStart="printer">{ar ? 'طباعة الفواتير' : 'Print invoices'}</Button>
        </div>
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        {rows.length ? <SellerOrderTable shell={shell} rows={rows} /> : <EmptyState compact icon="package-x" title={ar ? 'لا طلبات في هذه الحالة' : 'No orders in this state'} />}
      </Card>
      <Pagination page={page} pages={8} onChange={setPage} />
    </>
  );
}

function SellerCatalog({ shell, go }) {
  const ar = shell.lang === 'ar';
  const rows = CATALOG.map((p, i) => ({ ...p, sku: 'NA-' + (1040 + i), stock: [3, 42, 0, 18, 7, 61, 25, 9][i], state: [ 'active', 'active', 'draft', 'active', 'review', 'active', 'active', 'suspended'][i] }));
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag selected>{ar ? 'الكل' : 'All'}</Tag><Tag>{ar ? 'منشور' : 'Active'}</Tag><Tag>{ar ? 'مسودة' : 'Draft'}</Tag><Tag>{ar ? 'نفد المخزون' : 'Out of stock'}</Tag>
        </div>
        <Button variant="primary" size="sm" iconStart="plus" onClick={() => go('editor')}>{ar ? 'إضافة منتج' : 'Add product'}</Button>
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <DataTable rows={rows} onRowClick={() => go('editor')} columns={[
          { key: 'name', label: ar ? 'المنتج' : 'Product', render: r => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
              <ProductMedia ratio="1 / 1" style={{ width: 36, flex: '0 0 auto' }} radius="var(--radius-sm)" />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500 }}>{shell.pname(r)}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-numeric)' }}>{r.sku}</span>
              </span>
            </span>) },
          { key: 'state', label: ar ? 'الحالة' : 'State', render: r => <StatusPill status={r.state} /> },
          { key: 'stock', label: ar ? 'المخزون' : 'Stock', numeric: true, render: r => (
            <span style={{ color: r.stock === 0 ? 'var(--text-danger)' : r.stock < 10 ? 'var(--text-warning)' : 'var(--text-primary)', fontWeight: 500 }}>{r.stock}</span>) },
          { key: 'rating', label: ar ? 'التقييم' : 'Rating', render: r => <RatingStars value={r.rating} size={12} /> },
          { key: 'price', label: (ar ? 'السعر' : 'Price') + ' (' + shell.t.currency + ')', align: 'end', numeric: true, render: r => r.price.toFixed(2) },
        ]} />
      </Card>
    </>
  );
}

function SellerEditor({ shell, go }) {
  const ar = shell.lang === 'ar';
  const [live, setLive] = React.useState(true);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconButton icon="chevron-left" label="Back" onClick={() => go('catalog')} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-sm)', fontWeight: 600, letterSpacing: 'var(--tracking-heading-sm)' }}>{ar ? 'منتج جديد' : 'New product'}</span>
          <StatusPill status="draft" label={ar ? 'مسودة' : undefined} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch checked={live} onChange={setLive} label={ar ? 'منشور' : 'Visible in store'} />
          <Button variant="secondary" size="sm">{ar ? 'حفظ كمسودة' : 'Save draft'}</Button>
          <Button variant="primary" size="sm" iconStart="check">{ar ? 'نشر' : 'Publish'}</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{ar ? 'الأساسيات' : 'Basics'}</Eyebrow>
            <FormField label={ar ? 'اسم المنتج (عربي)' : 'Product name (English)'} required><Input placeholder={ar ? 'عباية كتان مطرزة' : 'Embroidered linen abaya'} /></FormField>
            <FormField label={ar ? 'اسم المنتج (إنجليزي)' : 'Product name (Arabic)'} required hint={ar ? 'كل منتج يحتاج اسمين — المتجر ثنائي اللغة' : 'Every product needs both — the store is bilingual'}><Input placeholder={ar ? 'Embroidered linen abaya' : 'عباية كتان مطرزة'} /></FormField>
            <FormField label={ar ? 'الوصف' : 'Description'}><Textarea rows={4} maxLength={600} placeholder={ar ? 'عباية من الكتان الإيطالي…' : 'Italian linen abaya with hand-worked sleeve embroidery…'} /></FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label={ar ? 'الفئة' : 'Category'} required><Select placeholder={ar ? 'اختر الفئة' : 'Choose a category'} options={ar ? ['عبايات', 'ملابس', 'حقائب', 'إكسسوارات'] : ['Abayas', 'Clothing', 'Bags', 'Accessories']} /></FormField>
              <FormField label="SKU"><Input placeholder="NA-1048" /></FormField>
            </div>
          </Card>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{ar ? 'الصور' : 'Media'}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[0, 1, 2].map(i => <ProductMedia key={i} ratio="3 / 4" />)}
              <div style={{ aspectRatio: '3 / 4', border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--radius-card-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>
                <Icon name="image-plus" size={22} strokeWidth={1.5} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11 }}>{ar ? 'أضف صورة' : 'Add image'}</span>
              </div>
            </div>
          </Card>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{ar ? 'الخيارات' : 'Variants'}</Eyebrow>
            <OptionPicker label={ar ? 'المقاسات المتاحة' : 'Available sizes'} options={['XS', 'S', 'M', 'L', 'XL']} value="M" onChange={() => {}} />
            <OptionPicker label={ar ? 'الألوان' : 'Colours'} kind="swatch" value="Plum" onChange={() => {}} options={[{ value: 'Plum', color: '#6D1B72' }, { value: 'Mauve', color: '#864596' }, { value: 'Ink', color: '#090909' }, { value: 'Bone', color: '#EBEBE9' }]} />
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{ar ? 'السعر والمخزون' : 'Price & stock'}</Eyebrow>
            <FormField label={ar ? 'السعر' : 'Price'} required><Input suffix={shell.t.currency} placeholder="249.00" inputMode="decimal" /></FormField>
            <FormField label={ar ? 'السعر قبل الخصم' : 'Compare-at price'} optional hint={ar ? 'يظهر مشطوباً وتُحسب نسبة الخصم تلقائياً' : 'Shown struck through; the discount badge is computed'}><Input suffix={shell.t.currency} placeholder="349.00" inputMode="decimal" /></FormField>
            <FormField label={ar ? 'الكمية' : 'Stock quantity'} required><Input placeholder="24" inputMode="numeric" /></FormField>
            <Checkbox checked label={ar ? 'تتبّع المخزون' : 'Track inventory'} onChange={() => {}} />
          </Card>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Eyebrow>{ar ? 'معاينة البطاقة' : 'Card preview'}</Eyebrow>
            <ProductCardPreview shell={shell} />
          </Card>
          <Alert tone="info" title={ar ? 'مراجعة قبل النشر' : 'Reviewed before publishing'}>{ar ? 'المنتجات الجديدة تُراجع خلال ٢٤ ساعة.' : 'New products are reviewed within 24 hours.'}</Alert>
        </div>
      </div>
    </>
  );
}

function ProductCardPreview({ shell }) {
  const { ProductCard } = window.TrendDesignSystem_7e8edd;
  return <ProductCard product={shell.loc({ ...CATALOG[0], price: 249, compareAt: 349 })} />;
}

Object.assign(window, { SellerOverview, SellerOrders, SellerCatalog, SellerEditor, SellerOrderTable, ORDERS, BarChart });
