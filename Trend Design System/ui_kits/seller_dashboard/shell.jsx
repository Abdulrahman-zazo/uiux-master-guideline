const { SidebarNav, IconButton, SearchField, Avatar, Badge, Divider, Icon, Button, Eyebrow } = window.TrendDesignSystem_7e8edd;

function DashTopBar({ shell, title, children }) {
  return (
    <header style={{ height: 64, flex: '0 0 auto', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', gap: 16, paddingInline: 24 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 600, letterSpacing: 'var(--tracking-subheading)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{title}</span>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 340 }}>
        <SearchField size="sm" onChange={() => {}} placeholder={shell.lang === 'ar' ? 'ابحث في الطلبات والمنتجات' : 'Search orders, products'} shortcut="⌘K" />
      </div>
      <div style={{ flex: 1 }} />
      {children}
      <KitControls shell={shell} tone="light" />
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <IconButton icon="bell" label="Notifications" />
        <Badge tone="brand" style={{ position: 'absolute', top: -3, insetInlineEnd: -3, padding: '1px 5px' }}>4</Badge>
      </span>
      <Avatar name={shell.lang === 'ar' ? 'نور أتيليه' : 'Nour Atelier'} shape="rounded" />
    </header>
  );
}

function SellerSidebar({ shell, active, go }) {
  const items = shell.lang === 'ar'
    ? [{ section: 'البيع' }, { id: 'overview', icon: 'layout-dashboard', label: 'النظرة العامة' }, { id: 'orders', icon: 'package', label: 'الطلبات', count: 12 }, { id: 'catalog', icon: 'shirt', label: 'الكتالوج' }, { id: 'editor', icon: 'square-pen', label: 'إضافة منتج' }, { section: 'النمو' }, { id: 'promos', icon: 'megaphone', label: 'العروض' }, { id: 'insights', icon: 'chart-line', label: 'التحليلات' }, { section: 'الحساب' }, { id: 'payouts', icon: 'wallet', label: 'التحويلات' }, { id: 'settings', icon: 'settings', label: 'الإعدادات' }]
    : [{ section: 'Sell' }, { id: 'overview', icon: 'layout-dashboard', label: 'Overview' }, { id: 'orders', icon: 'package', label: 'Orders', count: 12 }, { id: 'catalog', icon: 'shirt', label: 'Catalogue' }, { id: 'editor', icon: 'square-pen', label: 'Add product' }, { section: 'Grow' }, { id: 'promos', icon: 'megaphone', label: 'Promotions' }, { id: 'insights', icon: 'chart-line', label: 'Insights' }, { section: 'Account' }, { id: 'payouts', icon: 'wallet', label: 'Payouts' }, { id: 'settings', icon: 'settings', label: 'Settings' }];
  return (
    <SidebarNav assetBase="../../assets/" title={shell.lang === 'ar' ? 'بائع' : 'Seller'} items={items} active={active} onNavigate={go}
      footer={<div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 6px 0', borderTop: '1px solid var(--border-hairline)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingInline: 6 }}>
          <Avatar name={shell.lang === 'ar' ? 'نور أتيليه' : 'Nour Atelier'} size="sm" shape="rounded" />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shell.lang === 'ar' ? 'نور أتيليه' : 'Nour Atelier'}</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>{shell.lang === 'ar' ? 'بائع موثّق' : 'Verified seller'}</span>
          </div>
          <Icon name="chevrons-up-down" size={15} color="var(--icon-muted)" />
        </div>
      </div>} />
  );
}

Object.assign(window, { DashTopBar, SellerSidebar });
