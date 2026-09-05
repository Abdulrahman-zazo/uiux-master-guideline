const { Button, CartLine, OrderSummary, Money, EmptyState, Alert, Eyebrow, Card, RadioCard, AddressCard, GeoSelect, FormField, Input, Textarea, Modal, TrustStrip, OrderCard, Icon, Divider, Badge } = window.TrendDesignSystem_7e8edd;

/* Group cart lines by store (the wire doesn't). */
function groupByStore(items) {
  const m = new Map();
  for (const it of items) { if (!m.has(it.storeId)) m.set(it.storeId, { storeId: it.storeId, storeName: it.storeName, items: [] }); m.get(it.storeId).items.push(it); }
  return [...m.values()];
}

/* C1 Cart */
function MCart({ shell, cart, setQty, remove, go, guest }) {
  const { t, L } = shell;
  const groups = groupByStore(cart.items);
  return (
    <>
      <AppBar title={t.cart} large trailing={cart.items.length ? <Badge tone="neutral"><bdi dir="ltr">{cart.itemsCount}</bdi></Badge> : null} />
      <div className="screen" style={{ paddingInline: 16 }}>
        {!cart.items.length ? (
          <EmptyState icon="shopping-cart" title={t.emptyCart} action={<Button variant="primary" onClick={() => go('markets')}>{t.browseMarkets}</Button>} />
        ) : (
          <>
            {groups.map(g => (
              <div key={g.storeId} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBlock: 10 }}>
                  <Icon name="store" size={16} color="var(--icon-brand)" />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{L(storeById(g.storeId), 'name')}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>· {shell.marketName(storeById(g.storeId).marketCode)}</span>
                </div>
                {g.items.map(it => <CartLine key={it.id} item={shell.loc(it)} onQuantity={(n) => !shell.offline && setQty(it.id, n)} onRemove={() => !shell.offline && remove(it.id)} />)}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBlock: 12, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}><Icon name="info" size={14} />{t.feeNote}</div>
            <OrderSummary itemsSubtotal={cart.itemsSubtotal} style={{ marginBottom: 12 }} />
            <TrustStrip layout="stack" style={{ marginBottom: 12 }} />
          </>
        )}
      </div>
      {cart.items.length > 0 && <div className="sticky"><Button variant="primary" size="lg" fullWidth iconEnd="arrow-left" disabled={shell.offline} onClick={() => go(guest ? 'phone' : 'checkout')}>{t.checkout}</Button></div>}
    </>
  );
}

/* Address form sheet — GeoSelect + landmark + phone. */
function AddressSheet({ shell, open, onClose, onSave }) {
  const { t } = shell;
  const [geo, setGeo] = React.useState({ governorate: 'SY.DMS', city: 'SY.DMS.DMC' });
  return (
    <Modal open={open} sheet title={t.addAddress} onClose={onClose}
      footer={<><Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>{t.back}</Button><Button variant="primary" onClick={onSave} style={{ flex: 1 }}>{shell.en ? 'Save address' : 'حفظ العنوان'}</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <FormField label={shell.en ? 'Label' : 'الاسم'} optional><div style={{ display: 'flex', gap: 8 }}>{(shell.en ? ['Home', 'Work'] : ['المنزل', 'العمل']).map((l, i) => <Badge key={l} tone={i === 0 ? 'brand' : 'outline'} style={{ padding: '6px 12px', fontSize: 13 }}>{l}</Badge>)}</div></FormField>
        <GeoSelect tree={GEO} value={geo} onChange={setGeo} lang={shell.lang} style={{ gridTemplateColumns: '1fr 1fr' }} />
        <FormField label={t.landmark} required hint={t.landmarkHint}><Textarea rows={2} maxLength={500} placeholder={shell.en ? 'Al-Yasmin building, 3rd floor, near Shaalan pharmacy' : 'بناء الياسمين، طابق ٣، قرب صيدلية الشعلان'} /></FormField>
        <FormField label={t.phone} required><Input inputMode="tel" dir="ltr" iconStart="phone" defaultValue="+963 9" /></FormField>
        <Button variant="outline" iconStart="map-pin" fullWidth>{shell.en ? 'Pin on map (optional)' : 'تحديد على الخريطة (اختياري)'}</Button>
      </div>
    </Modal>
  );
}

/* C2–C4 Checkout: three linear steps in one flow. */
function MCheckout({ shell, cart, go, onPlaced }) {
  const { t, L } = shell;
  const [step, setStep] = React.useState(1);
  const [addr, setAddr] = React.useState(ADDRESSES[0].id);
  const [sheet, setSheet] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const titles = [t.address, t.payment, t.review];
  const groups = groupByStore(cart.items);
  const place = () => { setBusy(true); setTimeout(() => { setBusy(false); onPlaced(); }, 1400); };
  return (
    <>
      <AppBar title={titles[step - 1]} sub={(shell.en ? 'Step ' : 'الخطوة ') + step + (shell.en ? ' of 3' : ' من 3')} onBack={() => step === 1 ? go('cart') : setStep(step - 1)} />
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 14px' }}>{[1, 2, 3].map(i => <span key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'var(--surface-brand)' : 'var(--surface-sunken)' }} />)}</div>
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step === 1 && (
          <>
            {ADDRESSES.map(a => <AddressCard key={a.id} address={a} placeLabel={shell.geoLabel(a.path)} selected={addr === a.id} onSelect={() => setAddr(a.id)} />)}
            <Button variant="outline" iconStart="plus" fullWidth onClick={() => setSheet(true)}>{t.addAddress}</Button>
          </>
        )}
        {step === 2 && (
          <>
            {PAYMENT_METHODS.map(pm => <RadioCard key={pm.code} name="pay" value={pm.code} checked icon="banknote" title={L(pm, 'name')} description={L(pm, 'description')} />)}
            {/* ShamCash / Paymera: hidden by flag, not drawn as ghosts (master plan §2). */}
            <Alert tone="info" title={shell.en ? 'Cash only in this phase' : 'الدفع نقداً فقط في هذه المرحلة'}>{shell.en ? 'Pay the courier when your order arrives.' : 'ادفع لمندوب التوصيل عند استلام طلبك.'}</Alert>
          </>
        )}
        {step === 3 && (
          <>
            {groups.map(g => (
              <Card key={g.storeId} padding="sm" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}><Icon name="store" size={15} color="var(--icon-brand)" /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{L(storeById(g.storeId), 'name')}</span></div>
                {g.items.map(it => <CartLine key={it.id} item={shell.loc(it)} readOnly style={{ paddingBlock: 12 }} />)}
              </Card>
            ))}
            <AddressCard address={ADDRESSES.find(a => a.id === addr)} placeLabel={shell.geoLabel(ADDRESSES.find(a => a.id === addr).path)} />
            <OrderSummary itemsSubtotal={CHECKOUT.itemsSubtotal} deliveryFee={CHECKOUT.deliveryFee} discount={CHECKOUT.discount} grandTotal={CHECKOUT.grandTotal} stores={CHECKOUT.orders} showCallNote />
            <TrustStrip layout="stack" />
          </>
        )}
      </div>
      <div className="sticky">
        {step < 3
          ? <><Button variant="outline" onClick={() => step === 1 ? go('cart') : setStep(step - 1)}>{t.back}</Button><Button variant="primary" size="lg" fullWidth onClick={() => setStep(step + 1)}>{t.next}</Button></>
          : <><Button variant="outline" onClick={() => go('cart')} disabled={busy}>{t.backToCart}</Button><Button variant="primary" size="lg" fullWidth iconStart="check" loading={busy} processingLabel={t.processing} onClick={place}>{t.confirm}</Button></>}
      </div>
      <AddressSheet shell={shell} open={sheet} onClose={() => setSheet(false)} onSave={() => setSheet(false)} />
    </>
  );
}

/* C5 Orders created — one card per order. */
function MOrdersCreated({ shell, go }) {
  const { t } = shell;
  return (
    <>
      <div className="screen" style={{ padding: '24px 16px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
          <span style={{ width: 56, height: 56, borderRadius: 'var(--radius-pill)', background: 'var(--surface-success-subtle)', color: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={26} strokeWidth={2.5} /></span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', color: 'var(--text-primary)' }}>{t.ordersCreated}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{shell.en ? 'Two orders were created, one per shop.' : 'تم إنشاء طلبَين، طلب لكل محل.'}</span>
        </div>
        <Card tone="tinted" padding="sm" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="phone" size={18} color="var(--icon-brand)" style={{ marginTop: 2 }} direction="ltr" />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 1.6, color: 'var(--text-primary)' }}>{t.callSoon}</span>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{CHECKOUT.orders.map(o => <OrderCard key={o.id} order={shell.loc(o)} onOpen={() => go('order', o)} />)}</div>
        <TrustStrip layout="stack" />
      </div>
      <div className="sticky" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => go('orders')}>{t.trackOrders}</Button>
        <Button variant="ghost" fullWidth onClick={() => go('home')}>{t.continueShopping}</Button>
      </div>
    </>
  );
}

Object.assign(window, { MCart, MCheckout, MOrdersCreated, AddressSheet, groupByStore });
