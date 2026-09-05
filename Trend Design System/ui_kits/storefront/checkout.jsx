const { Button, CartLine, OrderSummary, Money, EmptyState, Alert, Eyebrow, Card, RadioCard, AddressCard, GeoSelect, FormField, Input, Textarea, Modal, TrustStrip, OrderCard, Icon, Logo, OTPField, RateLimitTimer, Badge } = window.TrendDesignSystem_7e8edd;

/* W7 Cart — grouped by store, sticky summary, delivery fee absent. */
function WCart({ shell, cart, setQty, remove, go, guest }) {
  const { t, L } = shell;
  const groups = groupByStore(cart.items);
  return (
    <div className="wrap" style={{ paddingBlock: 28, minHeight: '60vh' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', marginBottom: 22 }}>{t.cart}</h1>
      {!cart.items.length ? <EmptyState icon="shopping-cart" title={t.emptyCart} action={<Button variant="primary" onClick={() => go('markets')}>{t.browseMarkets}</Button>} /> : (
        <div className="two">
          <div>
            {groups.map(g => (
              <Card key={g.storeId} padding="none" style={{ paddingInline: 20, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBlock: 14 }}><Icon name="store" size={16} color="var(--icon-brand)" /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{L(storeById(g.storeId), 'name')}</span><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>· {shell.marketName(storeById(g.storeId).marketCode)}</span></div>
                <div className="hair" />
                {g.items.map(it => <CartLine key={it.id} item={shell.loc(it)} onQuantity={(n) => setQty(it.id, n)} onRemove={() => remove(it.id)} />)}
              </Card>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}><Icon name="info" size={14} />{t.feeNote}</div>
          </div>
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 16px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <OrderSummary itemsSubtotal={cart.itemsSubtotal}>
              <Button variant="primary" size="lg" fullWidth iconEnd="arrow-left" disabled={shell.offline} onClick={() => go(guest ? 'login' : 'checkout')} style={{ marginTop: 6 }}>{t.checkout}</Button>
              <Button variant="ghost" fullWidth onClick={() => go('home')}>{t.continueShopping}</Button>
            </OrderSummary>
            <TrustStrip layout="stack" />
          </div>
        </div>
      )}
    </div>
  );
}

/* W8 Login — phone + OTP, one centred card, two steps. */
function WLogin({ shell, go }) {
  const { t } = shell;
  const [step, setStep] = React.useState(1);
  const [code, setCode] = React.useState('');
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Card padding="lg" style={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Logo height={24} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} />
        {step === 1 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-h1)' }}>{t.phoneEntry}</h1>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.phoneWhy}</p>
            </div>
            <FormField label={shell.en ? 'Mobile number' : 'رقم الجوال'} required><Input dir="ltr" inputMode="tel" size="lg" iconStart="phone" defaultValue="+963 9" style={{ fontFamily: 'var(--font-numeric)' }} /></FormField>
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)}>{t.sendCode}</Button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-h1)' }}>{shell.en ? 'Enter the code' : 'أدخل الرمز'}</h1>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.codeSent} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', color: 'var(--text-primary)', fontWeight: 500 }}>+963 900 000 001</bdi></p>
            </div>
            <OTPField value={code} onChange={setCode} onComplete={() => go('checkout')} autoFocus />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}><RateLimitTimer seconds={294} label={t.expiresIn} compact /><RateLimitTimer seconds={52} label={t.resendIn} compact doneLabel={t.resend} /></div>
            <Button variant="primary" size="lg" fullWidth disabled={code.length < 6} onClick={() => go('checkout')}>{t.verify}</Button>
            <Button variant="ghost" fullWidth onClick={() => setStep(1)}>{t.back}</Button>
          </>
        )}
      </Card>
    </div>
  );
}

/* W9 Checkout — one page, three collapsible linear steps, summary sticky. */
function WCheckout({ shell, cart, go, onPlaced }) {
  const { t, L } = shell;
  const [step, setStep] = React.useState(1);
  const [addr, setAddr] = React.useState(ADDRESSES[0].id);
  const [sheet, setSheet] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const groups = groupByStore(cart.items);
  const Step = ({ n, title, children, summary }) => (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 26, height: 26, borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: n <= step ? 'var(--surface-brand)' : 'var(--surface-sunken)', color: n <= step ? 'var(--text-on-brand)' : 'var(--text-muted)', fontFamily: 'var(--font-numeric)', fontSize: 12, fontWeight: 600 }}>{n < step ? <Icon name="check" size={13} strokeWidth={2.5} /> : n}</span>
        <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-display)', color: n <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{title}</span>
        {n < step && <Button variant="ghost" size="sm" onClick={() => setStep(n)}>{shell.en ? 'Edit' : 'تعديل'}</Button>}
      </div>
      {n === step && children}
      {n < step && summary && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', paddingInlineStart: 38 }}>{summary}</span>}
    </Card>
  );
  const a = ADDRESSES.find(x => x.id === addr);
  return (
    <div className="wrap" style={{ paddingBlock: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', marginBottom: 22 }}>{t.checkout}</h1>
      <div className="two">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Step n={1} title={t.address} summary={a.label + ' · ' + shell.geoLabel(a.path)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ADDRESSES.map(x => <AddressCard key={x.id} address={x} placeLabel={shell.geoLabel(x.path)} selected={addr === x.id} onSelect={() => setAddr(x.id)} />)}
              <Button variant="outline" iconStart="plus" onClick={() => setSheet(true)} style={{ alignSelf: 'flex-start' }}>{t.addAddress}</Button>
              <Button variant="primary" onClick={() => setStep(2)} style={{ alignSelf: 'flex-end' }}>{t.next}</Button>
            </div>
          </Step>
          <Step n={2} title={t.payment} summary={L(PAYMENT_METHODS[0], 'name')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PAYMENT_METHODS.map(pm => <RadioCard key={pm.code} name="pay" value={pm.code} checked icon="banknote" title={L(pm, 'name')} description={L(pm, 'description')} />)}
              <Button variant="primary" onClick={() => setStep(3)} style={{ alignSelf: 'flex-end' }}>{t.next}</Button>
            </div>
          </Step>
          <Step n={3} title={t.review}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {groups.map(g => (
                <div key={g.storeId}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 6 }}><Icon name="store" size={15} color="var(--icon-brand)" /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{L(storeById(g.storeId), 'name')}</span></div>
                  {g.items.map(it => <CartLine key={it.id} item={shell.loc(it)} readOnly style={{ paddingBlock: 12 }} />)}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => go('cart')} disabled={busy}>{t.backToCart}</Button>
                <Button variant="primary" size="lg" iconStart="check" loading={busy} processingLabel={t.processing} onClick={() => { setBusy(true); setTimeout(() => { setBusy(false); onPlaced(); }, 1400); }}>{t.confirm}</Button>
              </div>
            </div>
          </Step>
        </div>
        <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 16px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {step < 3
            ? <OrderSummary itemsSubtotal={cart.itemsSubtotal} showCallNote />
            : <OrderSummary itemsSubtotal={CHECKOUT.itemsSubtotal} deliveryFee={CHECKOUT.deliveryFee} discount={CHECKOUT.discount} grandTotal={CHECKOUT.grandTotal} stores={CHECKOUT.orders} showCallNote />}
          <TrustStrip layout="stack" />
        </div>
      </div>
      <WAddressSheet shell={shell} open={sheet} onClose={() => setSheet(false)} />
    </div>
  );
}

function WAddressSheet({ shell, open, onClose }) {
  const { t } = shell;
  const [geo, setGeo] = React.useState({ governorate: 'SY.DMS', city: 'SY.DMS.DMC' });
  return (
    <Modal open={open} title={t.addAddress} onClose={onClose} width={560} footer={<><Button variant="ghost" onClick={onClose}>{t.back}</Button><Button variant="primary" onClick={onClose}>{shell.en ? 'Save address' : 'حفظ العنوان'}</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <GeoSelect tree={GEO} value={geo} onChange={setGeo} lang={shell.lang} />
        <FormField label={t.landmark} required hint={t.landmarkHint}><Textarea rows={2} maxLength={500} /></FormField>
        <FormField label={t.phone} required><Input inputMode="tel" dir="ltr" iconStart="phone" defaultValue="+963 9" /></FormField>
      </div>
    </Modal>
  );
}

/* W10 Orders created — list, print-friendly. */
function WCreated({ shell, go }) {
  const { t } = shell;
  return (
    <div className="wrap" style={{ paddingBlock: 48, maxWidth: 720 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 'var(--radius-pill)', background: 'var(--surface-success-subtle)', color: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={24} strokeWidth={2.5} /></span>
          <div><h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)' }}>{t.ordersCreated}</h1><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{shell.en ? 'Two orders were created, one per shop.' : 'تم إنشاء طلبَين، طلب لكل محل.'}</span></div>
        </div>
        <Card tone="tinted" padding="sm" style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Icon name="phone" size={18} color="var(--icon-brand)" direction="ltr" /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>{t.callSoon}</span></Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{CHECKOUT.orders.map(o => <OrderCard key={o.id} order={shell.loc(o)} onOpen={() => go('order', o)} />)}</div>
        <TrustStrip />
        <div style={{ display: 'flex', gap: 10 }}><Button variant="primary" size="lg" onClick={() => go('orders')}>{t.trackOrders}</Button><Button variant="outline" size="lg" onClick={() => go('home')}>{t.continueShopping}</Button></div>
      </div>
    </div>
  );
}

Object.assign(window, { WCart, WLogin, WCheckout, WCreated, WAddressSheet });
