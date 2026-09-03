const { Logo, IconButton, SearchField, Tag, ProductCard, ProductMedia, PriceBlock, RatingStars, OptionPicker, QuantityStepper, Button, Badge, Card, Divider, Eyebrow, BottomNav, CartLine, OrderSummary, Avatar, StatusPill, EmptyState, Alert, StockStatus, Switch, Icon, Modal, SectionHeader, ProgressBar } = window.TrendDesignSystem_7e8edd;

/* 1 — Home */
function MHome({ shell, go, onProduct }) {
  const { t } = shell;
  const cats = shell.lang === 'ar' ? ['عبايات', 'ملابس', 'حقائب', 'إكسسوارات', 'الجمال'] : ['Abayas', 'Clothing', 'Bags', 'Accessories', 'Beauty'];
  return (
    <div className="screen" style={{ paddingBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 16px 12px' }}>
        <Logo height={20} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} style={{ flex: 1 }} />
        <IconButton icon="bell" label="Notifications" variant="ghost" size="sm" />
        <IconButton icon="heart" label="Saved" variant="ghost" size="sm" />
      </div>
      <div style={{ paddingInline: 16 }}><SearchField placeholder={t.search} onChange={() => {}} /></div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 16px 4px' }}>
        {cats.map((c, i) => <Tag key={c} selected={i === 0} onClick={() => go('search')}>{c}</Tag>)}
      </div>
      <div style={{ padding: '14px 16px 0' }}>
        <Card padding="none" bordered={false} radius="sm" style={{ background: 'var(--brand-wash-deep)', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Eyebrow tone="inverse">{t.saleEyebrow}</Eyebrow>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{t.saleTitle}</span>
          <Button variant="inverse" size="sm" iconEnd="arrow-right" style={{ alignSelf: 'flex-start', marginTop: 4 }} onClick={() => go('search')}>{t.explore}</Button>
        </Card>
      </div>
      <div style={{ padding: '22px 16px 0' }}>
        <SectionHeader eyebrow={t.newEyebrow} title={t.newTitle} size="sm" action={t.explore} onAction={e => { e.preventDefault(); go('search'); }} style={{ marginBottom: 14 }} />
        <div className="mgrid">
          {CATALOG.slice(0, 4).map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} onWishlist={() => {}} />)}
        </div>
      </div>
      <div style={{ padding: '24px 16px 0' }}>
        <SectionHeader eyebrow={shell.lang === 'ar' ? 'الأكثر مبيعاً' : 'Most wanted'} title={shell.lang === 'ar' ? 'يتصدر الرغبات' : 'Topping wishlists'} size="sm" style={{ marginBottom: 14 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CATALOG.slice(4, 7).map(p => <ProductCard key={p.id} layout="row" product={shell.loc(p)} onClick={() => onProduct(p)} />)}
        </div>
      </div>
    </div>
  );
}

/* 2 — Search & results with filter sheet */
function MSearch({ shell, go, onProduct }) {
  const { t } = shell;
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const recent = shell.lang === 'ar' ? ['عباية كتان', 'عطر عود', 'حقيبة جلد'] : ['linen abaya', 'oud perfume', 'leather tote'];
  return (
    <>
      <div className="screen">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 10px' }}>
          <IconButton icon="chevron-left" label="Back" variant="ghost" onClick={() => go('home')} />
          <SearchField value={q} onChange={setQ} placeholder={t.search} style={{ flex: 1 }} />
        </div>
        {!q && (
          <div style={{ padding: '4px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Eyebrow>{shell.lang === 'ar' ? 'بحث سابق' : 'Recent searches'}</Eyebrow>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{recent.map(r => <Tag key={r} removable onClick={() => setQ(r)}>{r}</Tag>)}</div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '16px 16px 12px' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{shell.money(248)} {t.results}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="sm" iconStart="sliders-horizontal" onClick={() => setOpen(true)}>{t.filters}</Button>
            <Button variant="ghost" size="sm" iconStart="arrow-up-down">{t.sort}</Button>
          </div>
        </div>
        <div className="mgrid" style={{ padding: '0 16px 8px' }}>
          {[...CATALOG, ...CATALOG.slice(0, 2)].map((p, i) => <ProductCard key={i} product={shell.loc(p)} onClick={() => onProduct(p)} onWishlist={() => {}} />)}
        </div>
      </div>
      <Modal open={open} sheet title={t.filters} onClose={() => setOpen(false)}
        footer={<><Button variant="ghost" onClick={() => setOpen(false)} style={{ flex: 1 }}>{shell.lang === 'ar' ? 'مسح الكل' : 'Clear all'}</Button><Button variant="primary" onClick={() => setOpen(false)} style={{ flex: 1 }}>{shell.lang === 'ar' ? 'عرض النتائج' : 'Show results'}</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <OptionPicker label={t.size} options={['XS', 'S', 'M', 'L', 'XL']} value="M" onChange={() => {}} />
          <OptionPicker label={t.colour} kind="swatch" value="Plum" onChange={() => {}} options={[{ value: 'Plum', color: '#6D1B72' }, { value: 'Mauve', color: '#864596' }, { value: 'Ink', color: '#090909' }, { value: 'Bone', color: '#EBEBE9' }]} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Eyebrow>{shell.lang === 'ar' ? 'السعر' : 'Price'}</Eyebrow>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['0–200', '200–400', '400–800', '800+'].map(r => <Tag key={r}>{r}</Tag>)}</div>
          </div>
          <Switch checked label={shell.lang === 'ar' ? 'شحن مجاني فقط' : 'Free shipping only'} onChange={() => {}} />
        </div>
      </Modal>
    </>
  );
}

/* 3 — Product detail */
function MProduct({ shell, product, go, onAdd }) {
  const { t } = shell;
  const p = product || CATALOG[0];
  const [size, setSize] = React.useState('M');
  const [qty, setQty] = React.useState(1);
  return (
    <>
      <div className="screen">
        <ProductMedia ratio="1 / 1" radius="0">
          <div style={{ position: 'absolute', top: 12, insetInlineStart: 12 }}><IconButton icon="chevron-left" label="Back" onClick={() => go('home')} style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} /></div>
          <div style={{ position: 'absolute', top: 12, insetInlineEnd: 12, display: 'flex', gap: 8 }}>
            <IconButton icon="heart" label="Save" style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} />
            <IconButton icon="share-2" label="Share" style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 12, insetInlineStart: 12 }}><Badge tone="brand">-30%</Badge></div>
          <div style={{ position: 'absolute', bottom: 14, insetInlineEnd: 14, display: 'flex', gap: 5 }}>
            {[0, 1, 2, 3].map(i => <span key={i} style={{ width: i === 0 ? 16 : 6, height: 6, borderRadius: 3, background: i === 0 ? 'var(--purple-700)' : 'rgba(9,9,9,.2)' }} />)}
          </div>
        </ProductMedia>
        <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Eyebrow>{shell.pbrand(p)}</Eyebrow>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, lineHeight: shell.lang === 'ar' ? 1.4 : 1.2, letterSpacing: shell.lang === 'ar' ? 0 : '-.24px', color: 'var(--text-primary)' }}>{shell.pname(p)}</span>
            <RatingStars value={p.rating} count={p.reviews} showValue />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <PriceBlock amount={p.price} compareAt={p.compareAt} size="lg" currency={t.currency} />
            <StockStatus level="low" count={3} />
          </div>
          <Divider spacing={2} />
          <OptionPicker label={t.size} options={['XS', 'S', 'M', { value: 'L', soldOut: true }, 'XL']} value={size} onChange={setSize} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.qty}</span>
            <QuantityStepper value={qty} onChange={setQty} max={3} />
          </div>
          <Alert tone="info" title={shell.lang === 'ar' ? 'توصيل ٢–٤ أيام' : 'Delivery 2–4 days'}>{shell.lang === 'ar' ? 'إرجاع مجاني ٣٠ يوماً.' : 'Free 30-day returns.'}</Alert>
          <Card padding="sm" elevation="none" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={shell.pbrand(p)} shape="rounded" size="sm" />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{shell.pbrand(p)}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{shell.lang === 'ar' ? '٤.٨ · ٣٤٠ منتج' : '4.8 · 340 products'}</span>
            </div>
            <Icon name="chevron-right" size={18} color="var(--icon-muted)" />
          </Card>
          <div style={{ paddingBottom: 8 }}>
            <Eyebrow>{t.reviews}</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 34, fontWeight: 600, lineHeight: 1 }}>4.6</span>
              <div style={{ flex: 1 }}><ProgressBar value={90} size="sm" /><ProgressBar value={62} size="sm" style={{ marginTop: 5 }} /><ProgressBar value={18} size="sm" style={{ marginTop: 5 }} /></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: '0 0 auto', padding: 14, borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-card)', display: 'flex', gap: 10 }}>
        <IconButton icon="heart" label="Save" size="lg" />
        <Button variant="primary" size="lg" iconStart="shopping-bag" fullWidth onClick={() => onAdd(p, qty, size)}>{t.addToBag}</Button>
      </div>
    </>
  );
}

/* 4 — Bag */
function MBag({ shell, lines, setQty, remove, go }) {
  const { t } = shell;
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  return (
    <>
      <AppBar title={t.bag} large trailing={<Badge tone="neutral">{lines.length}</Badge>} />
      <div className="screen" style={{ paddingInline: 16 }}>
        {lines.length === 0
          ? <EmptyState icon="shopping-bag" title={shell.lang === 'ar' ? 'حقيبتك فارغة' : 'Your bag is empty'} action={<Button onClick={() => go('home')}>{shell.lang === 'ar' ? 'ابدئي التسوق' : 'Start shopping'}</Button>} />
          : <>
            {lines.map((l, i) => <CartLine key={i} item={l} onQuantity={(n) => setQty(i, n)} onRemove={() => remove(i)} />)}
            <OrderSummary subtotal={subtotal} shipping={subtotal >= 300 ? 0 : 35} discount={0} tax={+(subtotal * 0.15).toFixed(2)} currency={t.currency} freeShippingAt={300} style={{ marginTop: 20, marginBottom: 12 }} />
          </>}
      </div>
      {lines.length > 0 && (
        <div style={{ flex: '0 0 auto', padding: 14, borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}>
          <Button variant="primary" size="lg" fullWidth iconEnd="arrow-right">{t.checkout}</Button>
        </div>
      )}
    </>
  );
}

/* 5 — Account */
function MAccount({ shell }) {
  const rows = shell.lang === 'ar'
    ? [['package', 'طلباتي', '٣ نشطة'], ['heart', 'قائمة الرغبات', '١٢'], ['map-pin', 'العناوين', '٢'], ['credit-card', 'طرق الدفع', 'مدى ••٤٢'], ['bell', 'الإشعارات', ''], ['circle-help', 'المساعدة', '']]
    : [['package', 'My orders', '3 active'], ['heart', 'Wishlist', '12'], ['map-pin', 'Addresses', '2'], ['credit-card', 'Payment methods', 'Mada ••42'], ['bell', 'Notifications', ''], ['circle-help', 'Help centre', '']];
  return (
    <>
      <AppBar title={shell.lang === 'ar' ? 'حسابي' : 'Account'} large trailing={<IconButton icon="settings" label="Settings" variant="ghost" size="sm" />} />
      <div className="screen" style={{ paddingInline: 16 }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={shell.lang === 'ar' ? 'ليلى الحربي' : 'Layla Al-Harbi'} size="lg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', fontWeight: 500 }}>{shell.lang === 'ar' ? 'ليلى الحربي' : 'Layla Al-Harbi'}</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>layla@example.com</span>
            <Badge tone="brandSubtle" icon="crown" style={{ alignSelf: 'flex-start', marginTop: 3 }}>{shell.lang === 'ar' ? 'عضوية ترند بلس' : 'Trend Plus member'}</Badge>
          </div>
        </Card>
        <Card padding="none" style={{ marginTop: 14, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Eyebrow>{shell.lang === 'ar' ? 'الطلب الأخير' : 'Latest order'}</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>#TR-4821</span>
              <StatusPill status="shipped" label={shell.lang === 'ar' ? 'تم الشحن' : undefined} />
            </div>
            <ProgressBar value={66} label={shell.lang === 'ar' ? 'في الطريق إليك' : 'On its way to you'} />
          </div>
        </Card>
        <Card padding="none" style={{ marginTop: 14, overflow: 'hidden', marginBottom: 12 }}>
          {rows.map(([ic, label, meta], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? '1px solid var(--border-hairline)' : 'none', cursor: 'pointer' }}>
              <Icon name={ic} size={19} color="var(--icon-brand)" />
              <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{label}</span>
              {meta && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{meta}</span>}
              <Icon name="chevron-right" size={17} color="var(--icon-muted)" />
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

Object.assign(window, { MHome, MSearch, MProduct, MBag, MAccount });
