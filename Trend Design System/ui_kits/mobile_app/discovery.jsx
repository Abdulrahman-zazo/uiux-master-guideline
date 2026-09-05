const { Logo, IconButton, SearchField, Tag, ProductCard, ProductMedia, Money, Button, Badge, Card, Divider, Eyebrow, ShopCard, TrustStrip, Icon, Modal, Skeleton, EmptyState, Alert, LoadMore } = window.TrendDesignSystem_7e8edd;

/* B1 Home — search is the hero; flat canvas; no wash on mobile. */
function MHome({ shell, go, onProduct, onMarket }) {
  const { t, L } = shell;
  return (
    <div className="screen" style={{ paddingBottom: 12 }}>
      <div style={{ padding: '6px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo height={20} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} />
          <IconButton icon="bell" label="الإشعارات" variant="ghost" size="sm" />
        </div>
        <SearchField placeholder={t.search} onChange={() => {}} onSubmit={() => go('results')} />
      </div>
      <div className="hair" />
      {/* Banner slot — admin-driven 16:9, max 3; API fixture has home_hero. No image exists → labelled frame. */}
      <div style={{ padding: '16px 16px 0' }}>
        <ProductMedia ratio="16 / 9" radius="var(--radius-card-sm)" tint="brand">
          <div style={{ position: 'absolute', inset: 0, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6 }}>
            <Eyebrow tone="brand">home_hero</Eyebrow>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-display)', color: 'var(--text-primary)' }}>{shell.en ? 'Damascus markets, in your pocket' : 'أسواق دمشق في جيبك'}</span>
          </div>
        </ProductMedia>
      </div>
      <MSection title={t.categories}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} type="button" onClick={() => go('results')} style={{ border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer' }}>
              <span style={{ width: 56, height: 56, borderRadius: 'var(--radius-pill)', background: 'var(--surface-tinted)', color: 'var(--icon-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={c.icon} size={24} strokeWidth={1.75} /></span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.4 }}>{L(c, 'name')}</span>
            </button>
          ))}
        </div>
      </MSection>
      <MSection title={t.markets} action={t.seeAll} onAction={() => go('markets')}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -16px', padding: '0 16px 4px', scrollbarWidth: 'none' }}>
          {MARKETS.filter(m => m.isFeatured).map(m => <MarketTile key={m.id} market={m} shell={shell} onOpen={() => onMarket(m)} style={{ width: 150, flex: '0 0 auto' }} />)}
        </div>
      </MSection>
      <MSection title={t.newArrivals} action={t.seeAll} onAction={() => go('results')}>
        <div className="grid2">{PRODUCTS.slice(0, 6).map(p => <ProductCard key={p.id} product={shell.loc(p)} marketName={shell.marketName(p.store.marketCode)} onClick={() => onProduct(p)} />)}</div>
        <LoadMore hasMore={false} endLabel={shell.en ? 'That is everything for now' : 'هذه كل المنتجات حالياً'} />
      </MSection>
    </div>
  );
}

/* Market tile — API has no market image or description, so the tile is name · kind glyph · neighbourhood on a tinted surface. */
function MarketTile({ market, shell, onOpen, style }) {
  const { t, L } = shell;
  const glyph = { souk: 'store', mall: 'building-2', street: 'route' }[market.kind];
  const shops = STORES.filter(s => s.marketCode === market.code).length;
  return (
    <Card tone="tinted" padding="sm" radius="sm" interactive onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', color: 'var(--icon-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={glyph} size={18} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{L(market, 'name')}</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.kinds[market.kind]} · {shell.geoName(market.nodePath)}</span>
        {shops > 0 && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}><bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{shops}</bdi> {t.shopsCount}</span>}
      </div>
    </Card>
  );
}

/* B3 Results + filter sheet */
function MResults({ shell, go, onProduct, market }) {
  const { t, L } = shell;
  const [open, setOpen] = React.useState(false);
  const [mk, setMk] = React.useState(market ? market.code : null);
  const list = mk ? PRODUCTS.filter(p => p.store.marketCode === mk) : PRODUCTS;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 10px' }}>
        <IconButton icon="chevron-left" label="رجوع" variant="ghost" onClick={() => go('home')} />
        <SearchField value={shell.en ? 'cotton shirt' : 'قميص قطني'} onChange={() => {}} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <Tag icon="sliders-horizontal" onClick={() => setOpen(true)}>{t.filters}</Tag>
        <Tag icon="arrow-up-down">{t.sort}</Tag>
        {mk && <Tag selected removable onRemove={() => setMk(null)}>{shell.marketName(mk)}</Tag>}
        {CATEGORIES[4].children.map(c => <Tag key={c.id}>{L(c, 'name')}</Tag>)}
      </div>
      <div className="screen">
        {list.length ? (
          <>
            <div className="grid2" style={{ padding: '0 16px' }}>{list.map(p => <ProductCard key={p.id} product={shell.loc(p)} marketName={shell.marketName(p.store.marketCode)} onClick={() => onProduct(p)} />)}</div>
            <LoadMore hasMore={false} endLabel={shell.en ? 'End of results' : 'هذه كل النتائج'} />
          </>
        ) : <EmptyState icon="search-x" title={t.noResults} action={<Button variant="outline" onClick={() => setMk(null)}>{t.clearMarket}</Button>} />}
      </div>
      <Modal open={open} sheet title={t.filters} onClose={() => setOpen(false)}
        footer={<><Button variant="ghost" onClick={() => { setMk(null); setOpen(false); }} style={{ flex: 1 }}>{shell.en ? 'Clear' : 'مسح'}</Button><Button variant="primary" onClick={() => setOpen(false)} style={{ flex: 1 }}>{shell.en ? 'Show results' : 'عرض النتائج'}</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Eyebrow>{t.market}</Eyebrow><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{MARKETS.slice(0, 6).map(m => <Tag key={m.code} selected={mk === m.code} onClick={() => setMk(m.code)}>{L(m, 'name')}</Tag>)}</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Eyebrow>{t.price}</Eyebrow><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['< 50,000', '50,000 – 150,000', '150,000 – 300,000', '> 300,000'].map(r => <Tag key={r}><bdi dir="ltr">{r}</bdi></Tag>)}</div></div>
        </div>
      </Modal>
    </>
  );
}

/* B4 Markets list */
function MMarkets({ shell, onMarket }) {
  const { t } = shell;
  return (
    <>
      <AppBar title={t.tabs.markets} large />
      <div className="screen" style={{ padding: '0 16px 16px' }}>
        <div className="grid2">{MARKETS.map(m => <MarketTile key={m.id} market={m} shell={shell} onOpen={() => onMarket(m)} />)}</div>
      </div>
    </>
  );
}

/* B5 Market page — no hero photo/description on the API; header collapses to name · kind · neighbourhood. */
function MMarket({ shell, market, go, onProduct, onStore }) {
  const { t, L } = shell;
  const stores = STORES.filter(s => s.marketCode === market.code);
  const products = PRODUCTS.filter(p => p.store.marketCode === market.code);
  return (
    <>
      <AppBar title={L(market, 'name')} sub={t.kinds[market.kind] + ' · ' + shell.geoLabel(market.nodePath, 3)} onBack={() => go('markets')} />
      <div className="screen">
        <MSection title={shell.en ? 'Shops' : 'المحلات'} style={{ paddingTop: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stores.map(s => <ShopCard key={s.id} compact store={shell.loc(s)} marketName={L(market, 'name')} locationLabel={shell.geoName(s.geoPath)} onOpen={() => onStore(s)} />)}
            {!stores.length && <EmptyState compact icon="store" title={shell.en ? 'No shops listed yet' : 'لا محلات مدرجة بعد'} />}
          </div>
        </MSection>
        {products.length > 0 && <MSection title={shell.en ? 'Products from this market' : 'منتجات من هذا السوق'}><div className="grid2">{products.map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} />)}</div></MSection>}
      </div>
    </>
  );
}

/* B6 Shop page */
function MStore({ shell, store, go, onProduct, inactive }) {
  const { t, L } = shell;
  const products = PRODUCTS.filter(p => p.storeId === store.id);
  return (
    <>
      <AppBar title={L(store, 'name')} onBack={() => go('markets')} />
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {inactive && <Alert tone="warning" title={t.storeInactive} />}
        <ShopCard store={shell.loc(store)} locationLabel={shell.geoName(store.geoPath)} />
        {L(store, 'description') && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)' }}>{L(store, 'description')}</p>}
        <div className="hair" />
        <div className="grid2">{products.map(p => <ProductCard key={p.id} product={{ ...shell.loc(p), available: !inactive }} onClick={() => !inactive && onProduct(p)} />)}</div>
      </div>
    </>
  );
}

/* B7 PDP — the most important screen. Order per master plan §7 B7. */
function MProduct({ shell, product, go, onAdd, onStore }) {
  const { t, L } = shell;
  const p = product || PRODUCTS[0];
  const [v, setV] = React.useState(p.variants.find(x => x.inStock) || p.variants[0]);
  const [qty, setQty] = React.useState(1);
  const store = storeById(p.storeId);
  const { QuantityStepper } = window.TrendDesignSystem_7e8edd;
  return (
    <>
      <div className="screen">
        <ProductMedia ratio="4 / 5" radius="0">
          <div style={{ position: 'absolute', top: 12, insetInlineStart: 12 }}><IconButton icon="chevron-left" label="رجوع" onClick={() => go('home')} style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} /></div>
          <div style={{ position: 'absolute', top: 12, insetInlineEnd: 12 }}><IconButton icon="share-2" label="مشاركة" style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} /></div>
          <span style={{ position: 'absolute', bottom: 12, insetInlineStart: 12, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-capsule)', color: 'var(--icon-on-capsule)', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500 }}><Icon name="map-pin" size={12} strokeWidth={2} />{t.shotInStore}</span>
          <div style={{ position: 'absolute', bottom: 16, insetInlineEnd: 14, display: 'flex', gap: 5 }}>{p.media.map((_, i) => <span key={i} style={{ width: i === 0 ? 16 : 6, height: 6, borderRadius: 3, background: i === 0 ? 'var(--purple-700)' : 'rgba(9,9,9,.2)' }} />)}</div>
        </ProductMedia>
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Money value={v.price} size="xl" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-display)', lineHeight: 1.35, color: 'var(--text-primary)' }}>{L(p, 'name')}</span>
          <div className="hair" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.variant}: <b style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{L(v, 'name')}</b></span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.variants.map(x => <Tag key={x.id} selected={x.id === v.id} onClick={() => x.inStock && setV(x)} style={{ opacity: x.inStock ? 1 : .55, cursor: x.inStock ? 'pointer' : 'not-allowed' }}>{L(x, 'name')}{!x.inStock && ' · ' + t.outOfStock}</Tag>)}
            </div>
          </div>
          <div className="hair" />
          <ShopCard compact store={shell.loc(store)} locationLabel={shell.geoName(store.geoPath)} onOpen={() => onStore(store)} />
          {/* Delivery estimate slot — no endpoint exists; guest sees "choose your area", otherwise the block collapses. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}><Icon name="truck" size={17} color="var(--icon-brand)" />{t.chooseArea}</div>
          <TrustStrip layout="stack" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Eyebrow>{t.description}</Eyebrow>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)' }}>{L(p, 'description')}</p>
          </div>
          {p.attributes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Eyebrow style={{ marginBottom: 6 }}>{t.details}</Eyebrow>
              {p.attributes.map(a => <div key={a.code} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBlock: 10, borderTop: '1px solid var(--border-hairline)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}><span style={{ color: 'var(--text-muted)' }}>{L(a, 'name')}</span><bdi style={{ color: 'var(--text-primary)' }}>{L(a, 'value')}</bdi></div>)}
            </div>
          )}
        </div>
        <MSection title={t.fromStore} style={{ paddingBottom: 16 }}>
          <div className="grid2">{PRODUCTS.filter(x => x.storeId === p.storeId && x.id !== p.id).concat(PRODUCTS.filter(x => x.storeId !== p.storeId)).slice(0, 2).map(x => <ProductCard key={x.id} product={shell.loc(x)} onClick={() => go('product', x)} />)}</div>
        </MSection>
      </div>
      <div className="sticky">
        <QuantityStepper value={qty} onChange={setQty} />
        <Button variant="primary" size="lg" iconStart="shopping-cart" fullWidth disabled={shell.offline} onClick={() => onAdd(p, v, qty)}>{t.addToCart}</Button>
      </div>
    </>
  );
}

Object.assign(window, { MHome, MarketTile, MResults, MMarkets, MMarket, MStore, MProduct });
