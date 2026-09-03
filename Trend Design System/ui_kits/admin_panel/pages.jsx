const { Card, StatCard, DataTable, StatusPill, Badge, Button, IconButton, Tabs, Tag, Eyebrow, Divider, ProgressBar, EmptyState, Alert, Avatar, Icon, SearchField, Checkbox, Select, ProductMedia, RatingStars, Modal, Textarea, Tooltip, SidebarNav } = window.TrendDesignSystem_7e8edd;

const SELLERS = [
  { id: 1, name: 'Nour Atelier', nameAr: 'نور أتيليه', city: 'Riyadh', cityAr: 'الرياض', products: 340, gmv: '184,290', rating: 4.8, status: 'active' },
  { id: 2, name: 'Bayt Oud', nameAr: 'بيت العود', city: 'Jeddah', cityAr: 'جدة', products: 86, gmv: '402,110', rating: 4.9, status: 'active' },
  { id: 3, name: 'Layl', nameAr: 'ليل', city: 'Dubai', cityAr: 'دبي', products: 122, gmv: '96,540', rating: 4.2, status: 'review' },
  { id: 4, name: 'Mishaal', nameAr: 'مشعل', city: 'Riyadh', cityAr: 'الرياض', products: 58, gmv: '71,880', rating: 4.6, status: 'active' },
  { id: 5, name: 'Sahar', nameAr: 'سحر', city: 'Dammam', cityAr: 'الدمام', products: 204, gmv: '58,300', rating: 4.7, status: 'suspended' },
  { id: 6, name: 'Qamar Studio', nameAr: 'استوديو قمر', city: 'Kuwait City', cityAr: 'الكويت', products: 41, gmv: '22,940', rating: 3.9, status: 'review' },
];

function AdminSidebar({ shell, active, go }) {
  const ar = shell.lang === 'ar';
  const items = ar
    ? [{ section: 'المنصة' }, { id: 'overview', icon: 'layout-dashboard', label: 'النظرة العامة' }, { id: 'sellers', icon: 'store', label: 'البائعون', count: 6 }, { id: 'moderation', icon: 'shield-check', label: 'المراجعة', count: 9 }, { id: 'customers', icon: 'users', label: 'العملاء' }, { section: 'العمليات' }, { id: 'orders', icon: 'package', label: 'الطلبات' }, { id: 'payouts', icon: 'wallet', label: 'التحويلات' }, { id: 'settings', icon: 'settings', label: 'الإعدادات' }]
    : [{ section: 'Platform' }, { id: 'overview', icon: 'layout-dashboard', label: 'Overview' }, { id: 'sellers', icon: 'store', label: 'Sellers', count: 6 }, { id: 'moderation', icon: 'shield-check', label: 'Moderation', count: 9 }, { id: 'customers', icon: 'users', label: 'Customers' }, { section: 'Operations' }, { id: 'orders', icon: 'package', label: 'Orders' }, { id: 'payouts', icon: 'wallet', label: 'Payouts' }, { id: 'settings', icon: 'settings', label: 'Settings' }];
  return <SidebarNav assetBase="../../assets/" title={ar ? 'مشرف' : 'Admin'} items={items} active={active} onNavigate={go}
    footer={<div style={{ padding: '10px 6px 0', borderTop: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Avatar name="Admin" size="sm" />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500 }}>{ar ? 'فريق العمليات' : 'Operations team'}</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>ops@trend.sa</span>
      </div>
    </div>} />;
}

function AdminTopBar({ shell, title }) {
  const ar = shell.lang === 'ar';
  return (
    <header style={{ height: 64, flex: '0 0 auto', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', gap: 16, paddingInline: 24 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 600, letterSpacing: 'var(--tracking-subheading)', whiteSpace: 'nowrap' }}>{title}</span>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 340 }}><SearchField size="sm" onChange={() => {}} placeholder={ar ? 'ابحث في البائعين والطلبات' : 'Search sellers, orders'} shortcut="⌘K" /></div>
      <div style={{ flex: 1 }} />
      <Badge tone="warning" dot>{ar ? '٩ بانتظار المراجعة' : '9 awaiting review'}</Badge>
      <KitControls shell={shell} tone="light" />
      <IconButton icon="bell" label="Notifications" />
      <Avatar name="Admin" />
    </header>
  );
}

function AdminOverview({ shell, go }) {
  const ar = shell.lang === 'ar';
  const regions = ar ? [['الرياض', 42], ['جدة', 28], ['الدمام', 12], ['دبي', 11], ['الكويت', 7]] : [['Riyadh', 42], ['Jeddah', 28], ['Dammam', 12], ['Dubai', 11], ['Kuwait', 7]];
  return (
    <>
      <Alert tone="warning" title={ar ? '٩ منتجات و٢ بائعين بانتظار المراجعة' : '9 products and 2 sellers are awaiting review'}
        action={<Button size="sm" variant="secondary" onClick={() => go('moderation')}>{ar ? 'فتح قائمة المراجعة' : 'Open moderation queue'}</Button>} />
      <div className="tiles">
        <StatCard label={ar ? 'إجمالي المبيعات' : 'Platform GMV'} value={ar ? '٨٤٦٬٠٦٠' : '846,060'} unit={shell.t.currency} delta={9.2} deltaLabel={ar ? 'هذا الشهر' : 'this month'} icon="chart-line" />
        <StatCard label={ar ? 'البائعون النشطون' : 'Active sellers'} value={ar ? '٤١٢' : '412'} delta={3.4} icon="store" />
        <StatCard label={ar ? 'الطلبات' : 'Orders'} value={ar ? '١٨٬٤٠٢' : '18,402'} delta={6.1} icon="package" />
        <StatCard label={ar ? 'معدل الإرجاع' : 'Return rate'} value="3.1" unit="%" delta={-0.4} icon="undo-2" />
        <StatCard label={ar ? 'العمولة' : 'Commission'} value={ar ? '١٠١٬٥٢٧' : '101,527'} unit={shell.t.currency} delta={8.8} icon="wallet" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 20 }}>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <Eyebrow>{ar ? 'المبيعات حسب المدينة' : 'GMV by city'}</Eyebrow>
            <Tabs variant="pill" active="30" onChange={() => {}} items={ar ? [{ id: '7', label: '٧ أيام' }, { id: '30', label: '٣٠ يوم' }] : [{ id: '7', label: '7 days' }, { id: '30', label: '30 days' }]} />
          </div>
          {regions.map(([city, pct]) => (
            <div key={city} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 92, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{city}</span>
              <ProgressBar value={pct} style={{ flex: 1 }} />
              <span style={{ width: 40, textAlign: 'end', fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
            </div>
          ))}
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow>{ar ? 'أعلى البائعين' : 'Top sellers'}</Eyebrow>
          {SELLERS.slice(0, 4).map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', width: 12 }}>{i + 1}</span>
              <Avatar name={ar ? s.nameAr : s.name} size="sm" shape="rounded" />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ar ? s.nameAr : s.name}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>{ar ? s.cityAr : s.city}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{s.gmv}</span>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

function AdminSellers({ shell }) {
  const ar = shell.lang === 'ar';
  const [tab, setTab] = React.useState('all');
  const rows = tab === 'all' ? SELLERS : SELLERS.filter(s => s.status === tab);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <Tabs active={tab} onChange={setTab} items={ar
          ? [{ id: 'all', label: 'الكل', count: 6 }, { id: 'active', label: 'نشط', count: 3 }, { id: 'review', label: 'قيد المراجعة', count: 2 }, { id: 'suspended', label: 'موقوف', count: 1 }]
          : [{ id: 'all', label: 'All', count: 6 }, { id: 'active', label: 'Active', count: 3 }, { id: 'review', label: 'In review', count: 2 }, { id: 'suspended', label: 'Suspended', count: 1 }]} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Select size="sm" placeholder={ar ? 'كل المدن' : 'All cities'} options={ar ? ['الرياض', 'جدة', 'الدمام', 'دبي'] : ['Riyadh', 'Jeddah', 'Dammam', 'Dubai']} style={{ width: 160 }} />
          <Button variant="secondary" size="sm" iconStart="download">{ar ? 'تصدير' : 'Export'}</Button>
        </div>
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        {rows.length ? <DataTable rows={rows} onRowClick={() => {}} columns={[
          { key: 'name', label: ar ? 'المتجر' : 'Store', render: r => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={ar ? r.nameAr : r.name} size="sm" shape="rounded" />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500 }}>{ar ? r.nameAr : r.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ar ? r.cityAr : r.city}</span>
              </span>
            </span>) },
          { key: 'status', label: ar ? 'الحالة' : 'Status', render: r => <StatusPill status={r.status} /> },
          { key: 'products', label: ar ? 'المنتجات' : 'Products', numeric: true },
          { key: 'rating', label: ar ? 'التقييم' : 'Rating', render: r => <RatingStars value={r.rating} size={12} showValue /> },
          { key: 'gmv', label: (ar ? 'المبيعات' : 'GMV') + ' (' + shell.t.currency + ')', align: 'end', numeric: true },
          { key: 'act', label: '', align: 'end', render: () => <IconButton icon="ellipsis" label="Actions" variant="ghost" size="sm" /> },
        ]} /> : <EmptyState compact icon="store" title={ar ? 'لا بائعين في هذه الحالة' : 'No sellers in this state'} />}
      </Card>
    </>
  );
}

function AdminModeration({ shell }) {
  const ar = shell.lang === 'ar';
  const [reject, setReject] = React.useState(null);
  const queue = CATALOG.slice(0, 6).map((p, i) => ({ ...p, seller: SELLERS[i % SELLERS.length], reason: i % 3 === 0 ? (ar ? 'صورة منخفضة الجودة' : 'Low-quality imagery') : i % 3 === 1 ? (ar ? 'وصف غير مكتمل' : 'Incomplete description') : (ar ? 'مراجعة أولى' : 'First submission') }));
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <Tabs active="products" onChange={() => {}} items={ar
          ? [{ id: 'products', label: 'منتجات', count: 9 }, { id: 'sellers', label: 'بائعون', count: 2 }, { id: 'reviews', label: 'تقييمات', count: 4 }]
          : [{ id: 'products', label: 'Products', count: 9 }, { id: 'sellers', label: 'Sellers', count: 2 }, { id: 'reviews', label: 'Reviews', count: 4 }]} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm">{ar ? 'رفض المحدد' : 'Reject selected'}</Button>
          <Button variant="primary" size="sm" iconStart="check">{ar ? 'قبول المحدد' : 'Approve selected'}</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
        {queue.map((p, i) => (
          <Card key={i} padding="none" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 12, padding: 14 }}>
              <ProductMedia ratio="3 / 4" style={{ width: 70, flex: '0 0 auto' }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Checkbox onChange={() => {}} />
                  <Eyebrow>{ar ? p.seller.nameAr : p.seller.name}</Eyebrow>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, lineHeight: 1.35 }}>{shell.pname(p)}</span>
                <Badge tone="warning" icon="flag">{p.reason}</Badge>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
              <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => setReject(p)}>{ar ? 'رفض' : 'Reject'}</Button>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>{ar ? 'قبول' : 'Approve'}</Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!reject} title={ar ? 'سبب الرفض' : 'Reason for rejection'} description={ar ? 'يُرسل السبب إلى البائع مباشرة.' : 'The reason is sent to the seller directly.'} onClose={() => setReject(null)}
        footer={<><Button variant="secondary" onClick={() => setReject(null)}>{ar ? 'إلغاء' : 'Cancel'}</Button><Button variant="danger" onClick={() => setReject(null)}>{ar ? 'رفض المنتج' : 'Reject product'}</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Select placeholder={ar ? 'اختر السبب' : 'Choose a reason'} options={ar ? ['صورة منخفضة الجودة', 'وصف غير مكتمل', 'سعر مضلل', 'منتج محظور'] : ['Low-quality imagery', 'Incomplete description', 'Misleading price', 'Prohibited item']} />
          <Textarea rows={3} maxLength={300} placeholder={ar ? 'ملاحظات للبائع…' : 'Notes for the seller…'} />
        </div>
      </Modal>
    </>
  );
}

function AdminCustomers({ shell }) {
  const ar = shell.lang === 'ar';
  const rows = [
    { name: 'Layla Al-Harbi', nameAr: 'ليلى الحربي', city: 'Riyadh', cityAr: 'الرياض', orders: 24, spend: '12,480', tier: 'active' },
    { name: 'Omar Nasser', nameAr: 'عمر ناصر', city: 'Jeddah', cityAr: 'جدة', orders: 9, spend: '3,120', tier: 'active' },
    { name: 'Hana Qasim', nameAr: 'هناء قاسم', city: 'Dubai', cityAr: 'دبي', orders: 41, spend: '28,900', tier: 'active' },
    { name: 'Yousef Bakr', nameAr: 'يوسف بكر', city: 'Dammam', cityAr: 'الدمام', orders: 2, spend: '340', tier: 'draft' },
    { name: 'Reem Saleh', nameAr: 'ريم صالح', city: 'Riyadh', cityAr: 'الرياض', orders: 17, spend: '7,650', tier: 'suspended' },
  ];
  return (
    <>
      <div className="tiles">
        <StatCard label={ar ? 'العملاء' : 'Customers'} value={ar ? '٤٨٬٢٩٠' : '48,290'} delta={5.2} icon="users" />
        <StatCard label={ar ? 'متوسط الإنفاق' : 'Avg. lifetime spend'} value={ar ? '٢٬٤١٠' : '2,410'} unit={shell.t.currency} delta={1.8} icon="wallet" />
        <StatCard label={ar ? 'أعضاء ترند بلس' : 'Trend Plus members'} value={ar ? '٦٬١٢٠' : '6,120'} delta={14.6} icon="crown" />
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <DataTable rows={rows} onRowClick={() => {}} columns={[
          { key: 'name', label: ar ? 'العميل' : 'Customer', render: r => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={ar ? r.nameAr : r.name} size="sm" />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500 }}>{ar ? r.nameAr : r.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ar ? r.cityAr : r.city}</span>
              </span>
            </span>) },
          { key: 'tier', label: ar ? 'الحالة' : 'Status', render: r => <StatusPill status={r.tier} /> },
          { key: 'orders', label: ar ? 'الطلبات' : 'Orders', numeric: true },
          { key: 'spend', label: (ar ? 'الإنفاق' : 'Lifetime spend') + ' (' + shell.t.currency + ')', align: 'end', numeric: true },
        ]} />
      </Card>
    </>
  );
}

Object.assign(window, { AdminSidebar, AdminTopBar, AdminOverview, AdminSellers, AdminModeration, AdminCustomers, SELLERS });
