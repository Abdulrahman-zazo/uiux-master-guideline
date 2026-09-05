const { ProductCard, ProductMedia, Money, Button, Card, Icon, Tag, Eyebrow, ShopCard, TrustStrip, LoadMore, Breadcrumb, Checkbox, Select, EmptyState, Alert, QuantityStepper, Divider } = window.TrendDesignSystem_7e8edd;

/* W1 Home — search bar in the header is the hero; wash allowed behind the search here only. */
function WHome({ shell, go, onProduct }) {
  const { t, L } = shell;
  return (
    <>
      <div style={{ background: 'var(--brand-wash)' }}>
        <div className="wrap" style={{ paddingBlock: 40, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Eyebrow tone="brand">home_hero</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)', fontWeight: 'var(--weight-h1)', color: 'var(--text-on-wash)', lineHeight: 1.3 }}>{shell.en ? 'Damascus markets, in your pocket' : 'أسواق دمشق في جيبك'}</h1>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-on-wash-soft)', maxWidth: '46ch' }}>{shell.en ? 'Real shops, photographed in place. Final prices. Cash when it arrives.' : 'محلات حقيقية مصوّرة في مكانها. أسعار نهائية. الدفع عند الوصول.'}</p>
            <div style={{ display: 'flex', gap: 10 }}><Button variant="primary" size="lg" onClick={() => go('search')}>{shell.en ? 'Start shopping' : 'ابدأ التسوق'}</Button><Button variant="outline" size="lg" onClick={() => go('markets')}>{t.markets}</Button></div>
          </div>
          <ProductMedia ratio="16 / 9" radius="var(--radius-card)" tint="brand" />
        </div>
      </div>
      <div className="wrap">
        <WSection title={t.categories}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} type="button" onClick={() => go('category', c)} style={{ border: '1px solid var(--border-hairline)', background: 'var(--surface-card)', borderRadius: 'var(--radius-card-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '18px 8px', cursor: 'pointer' }}>
                <span style={{ width: 52, height: 52, borderRadius: 'var(--radius-pill)', background: 'var(--surface-tinted)', color: 'var(--icon-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={c.icon} size={24} /></span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)', textAlign: 'center' }}>{L(c, 'name')}</span>
              </button>
            ))}
          </div>
        </WSection>
        <WSection title={t.markets} action={t.seeAll} onAction={() => go('markets')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>{MARKETS.filter(m => m.isFeatured).map(m => <WMarketTile key={m.id} market={m} shell={shell} onOpen={() => go('market', m)} />)}</div>
        </WSection>
        <WSection title={t.newArrivals} action={t.seeAll} onAction={() => go('search')}>
          <div className="grid">{PRODUCTS.slice(0, 8).map(p => <ProductCard key={p.id} product={shell.loc(p)} marketName={shell.marketName(p.store.marketCode)} onClick={() => onProduct(p)} />)}</div>
          <LoadMore hasMore onLoad={() => {}} />
        </WSection>
      </div>
    </>
  );
}

function WMarketTile({ market, shell, onOpen }) {
  const { t, L } = shell;
  const glyph = { souk: 'store', mall: 'building-2', street: 'route' }[market.kind];
  return (
    <Card tone="tinted" padding="sm" radius="sm" interactive onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', color: 'var(--icon-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={glyph} size={18} /></span>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{L(market, 'name')}</span>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.kinds[market.kind]} · {shell.geoName(market.nodePath)}</span>
    </Card>
  );
}

/* W2/W3 Results & category — left rail filters (desktop), "تحميل المزيد", no page numbers. */
function WCategory({ shell, go, onProduct, category, query }) {
  const { t, L } = shell;
  const [mk, setMk] = React.useState(null);
  const cat = category || CATEGORIES[0];
  let list = query ? PRODUCTS : PRODUCTS.filter(p => cat.children.some(c => c.id === p.categoryId) || p.categoryId === cat.id);
  if (mk) list = list.filter(p => p.store.marketCode === mk);
  return (
    <div className="wrap" style={{ paddingBlock: 24, minHeight: '60vh' }}>
      <Breadcrumb items={[t.tabs.home, query ? (shell.en ? 'Search' : 'البحث') : L(cat, 'name')]} onNavigate={() => go('home')} />
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBlock: '14px 22px', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)' }}>{query ? (shell.en ? 'Results for “cotton shirt”' : 'نتائج «قميص قطني»') : L(cat, 'name')}</h1>
        <Select size="sm" options={shell.en ? ['Newest', 'Price: low to high', 'Price: high to low'] : ['الأحدث', 'السعر: من الأقل', 'السعر: من الأعلى']} style={{ width: 190 }} />
      </div>
      {!query && cat.children.length > 0 && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>{cat.children.map(c => <Tag key={c.id}>{L(c, 'name')}</Tag>)}</div>}
      <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
        <aside style={{ width: 220, flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Eyebrow>{t.market}</Eyebrow>{MARKETS.slice(0, 7).map(m => <Checkbox key={m.code} checked={mk === m.code} onChange={() => setMk(mk === m.code ? null : m.code)} label={L(m, 'name')} />)}</div>
          <div className="hair" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Eyebrow>{t.price}</Eyebrow><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['< 50,000', '50–150k', '150–300k', '> 300k'].map(r => <Tag key={r}><bdi dir="ltr">{r}</bdi></Tag>)}</div></div>
        </aside>
        <div style={{ flex: 1, minWidth: 0 }}>
          {list.length ? <><div className="grid">{list.map(p => <ProductCard key={p.id} product={shell.loc(p)} marketName={shell.marketName(p.store.marketCode)} onClick={() => onProduct(p)} />)}</div><LoadMore hasMore={list.length > 6} onLoad={() => {}} /></>
            : <EmptyState icon="search-x" title={t.noResults} action={<Button variant="outline" onClick={() => setMk(null)}>{t.clearMarket}</Button>} />}
        </div>
      </div>
    </div>
  );
}

/* W4 Markets index + market page */
function WMarkets({ shell, go }) {
  const { t } = shell;
  return (
    <div className="wrap" style={{ paddingBlock: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', marginBottom: 22 }}>{t.markets}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>{MARKETS.map(m => <WMarketTile key={m.id} market={m} shell={shell} onOpen={() => go('market', m)} />)}</div>
    </div>
  );
}
function WMarket({ shell, market, go, onProduct }) {
  const { t, L } = shell;
  const m = market || MARKETS[0];
  const stores = STORES.filter(s => s.marketCode === m.code), products = PRODUCTS.filter(p => p.store.marketCode === m.code);
  return (
    <div className="wrap" style={{ paddingBlock: 24 }}>
      <Breadcrumb items={[t.tabs.home, t.markets, L(m, 'name')]} onNavigate={(id, i) => go(i === 0 ? 'home' : 'markets')} />
      <div style={{ marginBlock: '14px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)' }}>{L(m, 'name')}</h1>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.kinds[m.kind]} · {shell.geoLabel(m.nodePath, 2)}</span>
        {/* No hero photo or description exists on the API — block collapses. */}
      </div>
      <WSection title={shell.en ? 'Shops' : 'المحلات'}>
        {stores.length ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>{stores.map(s => <ShopCard key={s.id} store={shell.loc(s)} marketName={L(m, 'name')} locationLabel={shell.geoName(s.geoPath)} onOpen={() => go('store', s)} />)}</div> : <EmptyState compact icon="store" title={shell.en ? 'No shops listed yet' : 'لا محلات مدرجة بعد'} />}
      </WSection>
      {products.length > 0 && <WSection title={shell.en ? 'Products from this market' : 'منتجات من هذا السوق'}><div className="grid">{products.map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} />)}</div></WSection>}
    </div>
  );
}

/* W5 Shop page */
function WStore({ shell, store, go, onProduct }) {
  const { t, L } = shell;
  const s = store || STORES[0];
  const products = PRODUCTS.filter(p => p.storeId === s.id);
  return (
    <div className="wrap" style={{ paddingBlock: 24 }}>
      <Breadcrumb items={[t.tabs.home, shell.marketName(s.marketCode), L(s, 'name')]} onNavigate={(id, i) => go(i === 0 ? 'home' : 'market', marketByCode(s.marketCode))} />
      <div className="two" style={{ marginTop: 16, gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ShopCard store={shell.loc(s)} locationLabel={shell.geoName(s.geoPath)} />
          {L(s, 'description') && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)' }}>{L(s, 'description')}</p>}
          <TrustStrip layout="stack" />
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>{products.map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} />)}</div>
      </div>
    </div>
  );
}

/* W6 PDP — two columns: gallery 5/12 (start side), buy box 7/12 sticky. */
function WProduct({ shell, product, go, onAdd, onStore }) {
  const { t, L } = shell;
  const p = product || PRODUCTS[0];
  const [v, setV] = React.useState(p.variants.find(x => x.inStock) || p.variants[0]);
  const [qty, setQty] = React.useState(1);
  const store = storeById(p.storeId);
  const cat = CATEGORIES.find(c => c.children.some(x => x.id === p.categoryId) || c.id === p.categoryId);
  return (
    <div className="wrap" style={{ paddingBlock: 24 }}>
      <Breadcrumb items={[t.tabs.home, L(cat, 'name'), L(p, 'name')]} onNavigate={(id, i) => go(i === 0 ? 'home' : 'category', cat)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 40, marginTop: 18, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ProductMedia ratio="4 / 5" radius="var(--radius-card)">
            <span style={{ position: 'absolute', bottom: 14, insetInlineStart: 14, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-capsule)', color: 'var(--icon-on-capsule)', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500 }}><Icon name="map-pin" size={12} strokeWidth={2} />{t.shotInStore}</span>
          </ProductMedia>
          <div style={{ display: 'flex', gap: 8 }}>{[0, 1, 2].map(i => <ProductMedia key={i} ratio="1 / 1" radius="var(--radius-sm)" style={{ width: 72, border: '1.5px solid ' + (i === 0 ? 'var(--border-brand)' : 'transparent') }} />)}</div>
        </div>
        <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 16px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Money value={v.price} size="xl" />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-display)', lineHeight: 1.35 }}>{L(p, 'name')}</h1>
          <div className="hair" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.variant}: <b style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{L(v, 'name')}</b></span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{p.variants.map(x => <Tag key={x.id} selected={x.id === v.id} onClick={() => x.inStock && setV(x)} style={{ opacity: x.inStock ? 1 : .55 }}>{L(x, 'name')}{!x.inStock && ' · ' + t.outOfStock}</Tag>)}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <QuantityStepper value={qty} onChange={setQty} />
            <Button variant="primary" size="lg" iconStart="shopping-cart" style={{ flex: 1 }} onClick={() => onAdd(p, v, qty)}>{t.addToCart}</Button>
          </div>
          <div className="hair" />
          <ShopCard compact store={shell.loc(store)} locationLabel={shell.geoName(store.geoPath)} onOpen={() => onStore(store)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}><Icon name="truck" size={17} color="var(--icon-brand)" />{t.chooseArea}</div>
          <TrustStrip />
        </div>
      </div>
      <div style={{ maxWidth: 720, marginTop: 'var(--section-gap)', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div><Eyebrow style={{ marginBottom: 8 }}>{t.description}</Eyebrow><p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)' }}>{L(p, 'description')}</p></div>
        {p.attributes.length > 0 && <div><Eyebrow style={{ marginBottom: 6 }}>{t.details}</Eyebrow>{p.attributes.map(a => <div key={a.code} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBlock: 11, borderTop: '1px solid var(--border-hairline)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}><span style={{ color: 'var(--text-muted)' }}>{L(a, 'name')}</span><bdi>{L(a, 'value')}</bdi></div>)}</div>}
      </div>
      <WSection title={t.fromStore}><div className="grid">{PRODUCTS.filter(x => x.id !== p.id).slice(0, 4).map(x => <ProductCard key={x.id} product={shell.loc(x)} onClick={() => go('product', x)} />)}</div></WSection>
    </div>
  );
}

Object.assign(window, { WHome, WMarketTile, WCategory, WMarkets, WMarket, WStore, WProduct });
