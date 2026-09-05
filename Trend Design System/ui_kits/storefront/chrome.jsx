const { Logo, SearchField, IconButton, Badge, Button, Icon, Select, Tag, Alert } = window.TrendDesignSystem_7e8edd;

/* Header (RTL): logo · dominant search (≥560px) · market selector · cart · account. Near-black bar frames the light canvas. */
function SiteHeader({ shell, go, cartCount, route, guest }) {
  const { t, L } = shell;
  return (
    <header style={{ background: 'var(--neutral-800)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="wrap" style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex', flex: '0 0 auto' }}><Logo theme="dark" height={24} assetBase="../../assets/" /></a>
        <div style={{ flex: '1 1 560px', minWidth: 0, maxWidth: 680 }}><SearchField placeholder={t.search} onChange={() => {}} onSubmit={() => go('search')} style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }} /></div>
        <div style={{ flex: 1 }} />
        <Select size="sm" options={MARKETS.slice(0, 6).map(m => L(m, 'name'))} placeholder={t.market} style={{ width: 150, background: 'rgba(255,255,255,.1)', display: 'none' }} />
        <KitControls shell={shell} tone="dark" />
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <IconButton icon="shopping-cart" label={t.cart} variant="inverse" onClick={() => go('cart')} />
          {cartCount > 0 && <Badge tone="brand" style={{ position: 'absolute', top: -4, insetInlineEnd: -4, padding: '1px 6px', minWidth: 18, justifyContent: 'center' }}><bdi dir="ltr">{cartCount}</bdi></Badge>}
        </span>
        {guest ? <Button variant="inverse" size="sm" onClick={() => go('login')}>{t.signIn}</Button> : <IconButton icon="user" label={t.account} variant="inverse" onClick={() => go('account')} />}
      </div>
    </header>
  );
}

/* Categories row under the header on public pages. */
function CategoryRow({ shell, go, active }) {
  const { L } = shell;
  return (
    <div style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="wrap" style={{ display: 'flex', gap: 22, height: 44, alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); go('category', c); }} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: active && active.id === c.id ? 500 : 400, color: active && active.id === c.id ? 'var(--text-brand)' : 'var(--text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap', paddingBlock: 11, borderBottom: '2px solid ' + (active && active.id === c.id ? 'var(--border-brand)' : 'transparent') }}>{L(c, 'name')}</a>)}
      </div>
    </div>
  );
}

function SiteFooter({ shell, go }) {
  const { L, t } = shell;
  const { TrustStrip } = window.TrendDesignSystem_7e8edd;
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--neutral-300)', marginTop: 'var(--section-gap)' }}>
      <div className="wrap" style={{ paddingBlock: 44, display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(2,minmax(0,1fr))', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Logo theme="dark" height={24} assetBase="../../assets/" />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', lineHeight: 1.7, maxWidth: '34ch' }}>{shell.en ? 'Damascus markets, delivered. Real shops, real photos, cash on delivery.' : 'أسواق دمشق إلى بابك. محلات حقيقية، صور حقيقية، دفع عند الاستلام.'}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--neutral-400)' }}>{t.pages}</span>
          {PAGES.map(p => <a key={p.slug} href="#" onClick={(e) => { e.preventDefault(); go('page', p); }} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--neutral-300)', textDecoration: 'none' }}>{L(p, 'title')}</a>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--neutral-400)' }}>{shell.en ? 'Our promise' : 'وعدنا'}</span>
          {(shell.en ? ['Instant size or colour exchange', 'Cash on delivery', 'We call to confirm every order'] : ['استبدال فوري للمقاس أو اللون', 'الدفع نقداً عند الاستلام', 'نتصل لتأكيد كل طلب']).map(x => <span key={x} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--neutral-300)' }}>{x}</span>)}
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 28 }}><div style={{ height: 1, background: 'var(--neutral-800)', marginBottom: 16 }} /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--neutral-500)' }}>© 2026 Trendsy</span></div>
    </footer>
  );
}

/* Web section header: heading + purple chevron link. */
function WSection({ title, action, onAction, children, eyebrow }) {
  const { Eyebrow } = window.TrendDesignSystem_7e8edd;
  return (
    <section style={{ paddingTop: 'var(--section-gap)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-display)', color: 'var(--text-primary)', lineHeight: 1.35 }}>{title}</h2>
        </div>
        {action && <a href="#" onClick={(e) => { e.preventDefault(); onAction && onAction(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, textDecoration: 'none' }}>{action}<Icon name="chevron-left" size={16} /></a>}
      </div>
      {children}
    </section>
  );
}

Object.assign(window, { SiteHeader, CategoryRow, SiteFooter, WSection });
