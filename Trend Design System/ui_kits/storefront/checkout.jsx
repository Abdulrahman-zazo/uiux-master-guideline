const { Card, CartLine, OrderSummary, Button, Input, Select, FormField, Radio, Checkbox, Divider, Eyebrow, EmptyState, Badge, Alert, Icon, Tabs, ProgressBar, StatusPill, Breadcrumb, Logo } = window.TrendDesignSystem_7e8edd;

function BagScreen({ shell, lines, setQty, remove, go }) {
  const { t } = shell;
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  if (!lines.length) {
    return (
      <div className="wrap" style={{ paddingBlock: 60, minHeight: '60vh' }}>
        <EmptyState icon="shopping-bag" title={shell.lang === 'ar' ? 'حقيبتك فارغة' : 'Your bag is empty'}
          description={shell.lang === 'ar' ? 'القطع المحفوظة تنتظرك في قائمة الرغبات.' : 'Saved items are waiting in your wishlist.'}
          action={<Button variant="primary" onClick={() => go('home')}>{shell.lang === 'ar' ? 'ابدئي التسوق' : 'Start shopping'}</Button>} />
      </div>
    );
  }
  return (
    <div className="wrap" style={{ paddingBlock: 28, minHeight: '60vh' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, letterSpacing: shell.lang === 'ar' ? 0 : 'var(--tracking-heading)', color: 'var(--text-primary)', marginBottom: 24 }}>{t.bag}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,.9fr)', gap: 40, alignItems: 'start' }}>
        <Card padding="none" style={{ paddingInline: 24 }}>
          {lines.map((l, i) => <CartLine key={i} item={l} onQuantity={(n) => setQty(i, n)} onRemove={() => remove(i)} />)}
        </Card>
        <OrderSummary subtotal={subtotal} shipping={subtotal >= 300 ? 0 : 35} discount={0} tax={+(subtotal * 0.15).toFixed(2)} currency={t.currency} freeShippingAt={300}>
          <Button variant="primary" size="lg" fullWidth iconEnd="arrow-right" onClick={() => go('checkout')} style={{ marginTop: 8 }}>{t.checkout}</Button>
          <Button variant="ghost" fullWidth onClick={() => go('home')}>{t.continueShopping}</Button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
            <Icon name="shield-check" size={14} />{shell.lang === 'ar' ? 'دفع آمن ومشفّر' : 'Secure encrypted payment'}
          </span>
        </OrderSummary>
      </div>
      <Footer shell={shell} />
    </div>
  );
}

function CheckoutScreen({ shell, lines, go }) {
  const { t } = shell;
  const [step, setStep] = React.useState(1);
  const [pay, setPay] = React.useState('mada');
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const steps = shell.lang === 'ar' ? [t.contact, t.delivery, t.payment] : [t.contact, t.delivery, t.payment];
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-canvas)' }}>
      <div style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="wrap" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <a href="#" onClick={e => { e.preventDefault(); go('home'); }} style={{ display: 'flex' }}><Logo height={22} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} /></a>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
            <Icon name="lock" size={13} />{shell.lang === 'ar' ? 'إتمام شراء آمن' : 'Secure checkout'}
          </span>
        </div>
      </div>
      <div className="wrap" style={{ paddingBlock: 32, display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,.9fr)', gap: 44, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: i + 1 <= step ? 'var(--surface-brand)' : 'var(--surface-sunken)', color: i + 1 <= step ? 'var(--text-on-brand)' : 'var(--text-muted)', fontFamily: 'var(--font-numeric)', fontSize: 11, fontWeight: 600 }}>{i + 1}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: i + 1 === step ? 500 : 400, color: i + 1 <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                </span>
                {i < 2 && <span style={{ width: 26, height: 1, background: 'var(--border-hairline)' }} />}
              </React.Fragment>
            ))}
          </div>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{t.contact}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label={shell.lang === 'ar' ? 'الاسم الكامل' : 'Full name'} required><Input placeholder={shell.lang === 'ar' ? 'ليلى الحربي' : 'Layla Al-Harbi'} /></FormField>
              <FormField label={shell.lang === 'ar' ? 'رقم الجوال' : 'Mobile'} required><Input iconStart="phone" placeholder="+966 5X XXX XXXX" /></FormField>
              <FormField label={shell.lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} style={{ gridColumn: '1 / -1' }}><Input iconStart="mail" placeholder="you@example.com" /></FormField>
            </div>
          </Card>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{t.delivery}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label={shell.lang === 'ar' ? 'المدينة' : 'City'} required><Select placeholder={shell.lang === 'ar' ? 'اختاري المدينة' : 'Choose a city'} options={shell.lang === 'ar' ? ['الرياض', 'جدة', 'الدمام'] : ['Riyadh', 'Jeddah', 'Dammam']} /></FormField>
              <FormField label={shell.lang === 'ar' ? 'الحي' : 'District'}><Input placeholder={shell.lang === 'ar' ? 'الملقا' : 'Al Malqa'} /></FormField>
              <FormField label={shell.lang === 'ar' ? 'العنوان' : 'Street address'} style={{ gridColumn: '1 / -1' }}><Input placeholder={shell.lang === 'ar' ? 'شارع الأمير محمد بن سلمان' : 'Prince Mohammed bin Salman Rd'} /></FormField>
            </div>
            <Checkbox checked label={shell.lang === 'ar' ? 'حفظ هذا العنوان كافتراضي' : 'Save this address as my default'} onChange={() => {}} />
            <Divider spacing={2} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(shell.lang === 'ar'
                ? [['std', 'توصيل قياسي', '٢–٤ أيام عمل', 'مجاني'], ['exp', 'توصيل سريع', 'اليوم التالي', '٣٥ ر.س']]
                : [['std', 'Standard delivery', '2–4 working days', 'Free'], ['exp', 'Express delivery', 'Next day', '35 SAR']]
              ).map(([id, name, sub, price]) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 14px', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-tag)' }}>
                  <Radio name="ship" value={id} checked={id === 'std'} onChange={() => {}} label={name} description={sub} />
                  <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: price === 'Free' || price === 'مجاني' ? 'var(--text-success)' : 'var(--text-primary)' }}>{price}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Eyebrow>{t.payment}</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(shell.lang === 'ar'
                ? [['mada', 'مدى', 'تأكيد فوري'], ['card', 'بطاقة ائتمانية', 'فيزا، ماستركارد'], ['tabby', 'تابي', 'قسّمي على ٤ دفعات'], ['cod', 'الدفع عند الاستلام', 'رسوم ١٥ ر.س']]
                : [['mada', 'Mada debit', 'Instant confirmation'], ['card', 'Credit card', 'Visa, Mastercard'], ['tabby', 'Tabby', 'Split into 4 payments'], ['cod', 'Cash on delivery', '15 SAR fee']]
              ).map(([id, name, sub]) => (
                <div key={id} onClick={() => setPay(id)} style={{ padding: '12px 14px', border: '1px solid ' + (pay === id ? 'var(--border-brand)' : 'var(--border-hairline)'), background: pay === id ? 'var(--surface-brand-subtle)' : 'transparent', borderRadius: 'var(--radius-tag)', cursor: 'pointer', transition: 'var(--transition-control)' }}>
                  <Radio name="pay" value={id} checked={pay === id} onChange={setPay} label={name} description={sub} />
                </div>
              ))}
            </div>
            {pay === 'card' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 12 }}>
                <FormField label={shell.lang === 'ar' ? 'رقم البطاقة' : 'Card number'}><Input iconStart="credit-card" placeholder="4242 4242 4242 4242" /></FormField>
                <FormField label={shell.lang === 'ar' ? 'الانتهاء' : 'Expiry'}><Input placeholder="MM/YY" /></FormField>
                <FormField label="CVC"><Input placeholder="123" /></FormField>
              </div>
            )}
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 24 }}>
          <Card padding="none" style={{ paddingInline: 20 }}>
            {lines.map((l, i) => <CartLine key={i} item={l} readOnly />)}
          </Card>
          <OrderSummary subtotal={subtotal} shipping={subtotal >= 300 ? 0 : 35} discount={75} tax={+(subtotal * 0.15).toFixed(2)} currency={t.currency}>
            <Button variant="primary" size="lg" fullWidth iconStart="lock" onClick={() => go('done')} style={{ marginTop: 8 }}>{t.placeOrder}</Button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}

function ConfirmScreen({ shell, lines, go }) {
  const { t } = shell;
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  return (
    <div className="wrap" style={{ paddingBlock: 56, minHeight: '70vh', maxWidth: 680 }}>
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center', alignItems: 'center' }}>
        <span style={{ width: 60, height: 60, borderRadius: 'var(--radius-pill)', background: 'var(--surface-success-subtle)', color: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={28} strokeWidth={2.5} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{t.orderPlaced}</h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.thanks}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Badge tone="neutral">#TR-4821</Badge><StatusPill status="processing" label={shell.lang === 'ar' ? 'قيد التجهيز' : undefined} />
        </div>
        <Divider spacing={0} style={{ alignSelf: 'stretch' }} />
        <div style={{ alignSelf: 'stretch', textAlign: 'start' }}>
          {lines.map((l, i) => <CartLine key={i} item={l} readOnly />)}
        </div>
        <ProgressBar value={25} label={shell.lang === 'ar' ? 'تم التأكيد · التجهيز · الشحن · التوصيل' : 'Confirmed · Packing · Shipped · Delivered'} style={{ alignSelf: 'stretch' }} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" iconStart="package-search">{shell.lang === 'ar' ? 'تتبّع الطلب' : 'Track order'}</Button>
          <Button variant="secondary" onClick={() => go('home')}>{t.continueShopping}</Button>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { BagScreen, CheckoutScreen, ConfirmScreen });
