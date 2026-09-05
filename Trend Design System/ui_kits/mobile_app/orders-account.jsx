const { Button, OrderCard, Timeline, StatusPill, CartLine, AddressCard, Money, Tabs, EmptyState, Card, Divider, Modal, ReasonPicker, Icon, Avatar, Badge, Eyebrow, IconButton, Radio, ErrorState, Alert } = window.TrendDesignSystem_7e8edd;

/* D1 My orders */
function MOrders({ shell, go, guest }) {
  const { t } = shell;
  const [tab, setTab] = React.useState('active');
  const ACTIVE = ['placed', 'confirmed', 'accepted', 'shipped'];
  const list = ORDERS.filter(o => tab === 'active' ? ACTIVE.includes(o.status) : !ACTIVE.includes(o.status));
  if (guest) return (<><AppBar title={t.tabs.orders} large /><EmptyState icon="user" title={t.guestPrompt} action={<Button onClick={() => go('phone')}>{t.signIn}</Button>} /></>);
  return (
    <>
      <AppBar title={t.tabs.orders} large trailing={<span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.lastUpdated} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>09:41</bdi></span>} />
      <div style={{ padding: '0 16px 12px' }}><Tabs variant="pill" active={tab} onChange={setTab} items={[{ id: 'active', label: t.active }, { id: 'done', label: t.done }]} /></div>
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length ? list.map(o => <OrderCard key={o.id} order={shell.loc(o)} onOpen={() => go('order', o)} />) : <EmptyState icon="package" title={t.noOrders} action={<Button variant="outline" onClick={() => go('markets')}>{t.browseMarkets}</Button>} />}
      </div>
    </>
  );
}

/* D2 Order detail — event timeline, snapshot, actions by status. */
function MOrder({ shell, order, go }) {
  const { t, L } = shell;
  const o = order || ORDERS[1];
  const [cancel, setCancel] = React.useState(false);
  const [reason, setReason] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const events = o.events.map(e => ({ ...e, label: L(e, 'label') }));
  return (
    <>
      <AppBar title={<bdi dir="ltr">{o.orderNumber}</bdi>} sub={L(o, 'storeName')} onBack={() => go('orders')} trailing={<StatusPill status={o.status} label={L(o, 'statusLabel')} />} />
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Timeline events={events} pending={o.status === 'placed' ? {} : null} lang={shell.lang} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.lastUpdated} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>09:41</bdi> · {shell.en ? 'refreshes every 15 s' : 'يتحدّث كل 15 ثانية'}</span>
        <div className="hair" />
        <div><Eyebrow style={{ marginBottom: 4 }}>{t.items}</Eyebrow>{o.lines.map(l => <CartLine key={l.id} item={shell.loc(l)} readOnly />)}</div>
        <AddressCard address={o.address} placeLabel={shell.geoLabel(o.address.path)} />
        <Card padding="sm" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[[shell.en ? 'Subtotal' : 'المجموع', o.itemsSubtotal], [shell.en ? 'Delivery fee' : 'رسوم التوصيل', o.deliveryFee]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}><span>{k}</span><Money value={v} size="sm" style={{ fontWeight: 500 }} /></div>)}
          <Divider spacing={2} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', fontWeight: 500 }}>{t.totals}</span><Money value={o.total} size="lg" /></div>
        </Card>
      </div>
      <div className="sticky">
        {o.cancellable && <Button variant="outline" fullWidth onClick={() => setCancel(true)}>{t.cancelOrder}</Button>}
        {(o.status === 'delivered' || o.status === 'completed') && <Button variant="primary" fullWidth iconStart="rotate-cw" onClick={() => go('cart')}>{t.reorder}</Button>}
        {!o.cancellable && o.status !== 'delivered' && o.status !== 'completed' && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>{shell.en ? 'This order can no longer be cancelled' : 'لم يعد بالإمكان إلغاء هذا الطلب'}</span>}
      </div>
      <Modal open={cancel} sheet title={t.cancelOrder} description={shell.en ? 'Choose a reason so we can improve.' : 'اختر السبب لنتحسّن.'} onClose={() => setCancel(false)}
        footer={<><Button variant="ghost" onClick={() => setCancel(false)} style={{ flex: 1 }}>{t.back}</Button><Button variant="danger" style={{ flex: 1 }} disabled={!reason.reasonCode} loading={busy} processingLabel={shell.en ? 'Cancelling…' : 'جارٍ الإلغاء…'} onClick={() => { setBusy(true); setTimeout(() => { setBusy(false); setCancel(false); go('orders'); }, 1200); }}>{t.cancelOrder}</Button></>}>
        <ReasonPicker reasons={REASONS.cancel.map(r => ({ code: r.code, label: L(r, 'label') }))} value={reason} onChange={setReason} lang={shell.lang} />
      </Modal>
    </>
  );
}

/* E1 Account */
function MAccount({ shell, go, guest }) {
  const { t, L } = shell;
  const [del, setDel] = React.useState(false);
  const [out, setOut] = React.useState(false);
  if (guest) return (<><AppBar title={t.tabs.account} large /><EmptyState icon="user" title={t.guestPrompt} action={<Button onClick={() => go('phone')}>{t.signIn}</Button>} /></>);
  const Row = ({ icon, label, meta, onClick, danger }) => (
    <button type="button" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', width: '100%', border: 0, borderTop: '1px solid var(--border-hairline)', background: 'transparent', cursor: 'pointer', textAlign: 'start' }}>
      <Icon name={icon} size={19} color={danger ? 'var(--text-danger)' : 'var(--icon-brand)'} />
      <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: danger ? 'var(--text-danger)' : 'var(--text-primary)' }}>{label}</span>
      {meta && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{meta}</span>}
      {!danger && <Icon name="chevron-left" size={17} color="var(--icon-muted)" />}
    </button>
  );
  return (
    <>
      <AppBar title={t.tabs.account} large />
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card padding="sm" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar size="lg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* No display name on the wire — phone + customer number only. */}
            <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body)', fontWeight: 500 }}>+963 9•• ••• •01</bdi>
            <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{ME.customerNumber}</bdi>
          </div>
        </Card>
        <Card padding="none" style={{ overflow: 'hidden' }}>
          <Row icon="map-pin" label={t.addresses} meta={<bdi dir="ltr">{ADDRESSES.length}</bdi>} onClick={() => go('addresses')} />
          <Row icon="languages" label={t.language} meta={shell.en ? 'English' : 'العربية'} onClick={() => go('language')} />
          <Row icon="smartphone" label={t.devices} onClick={() => setOut(true)} />
        </Card>
        <Card padding="none" style={{ overflow: 'hidden' }}>
          {PAGES.map(p => <Row key={p.slug} icon="file-text" label={L(p, 'title')} onClick={() => go('page', p)} />)}
        </Card>
        <Card padding="none" style={{ overflow: 'hidden' }}>
          <Row icon="log-out" label={t.logout} onClick={() => {}} />
          <Row icon="trash-2" label={t.deleteAccount} danger onClick={() => setDel(true)} />
        </Card>
      </div>
      <Modal open={out} title={t.logoutAll} description={shell.en ? 'You will be signed out on every device, including this one.' : 'سيتم تسجيل خروجك من كل الأجهزة، بما فيها هذا الجهاز.'} onClose={() => setOut(false)}
        footer={<><Button variant="ghost" onClick={() => setOut(false)}>{t.back}</Button><Button variant="primary" onClick={() => setOut(false)}>{t.logoutAll}</Button></>} />
      <Modal open={del} title={t.deleteAccount} description={shell.en ? 'Your phone number is removed and every session is revoked. Orders remain for the shops. This cannot be undone.' : 'يُحذف رقم هاتفك وتُنهى كل الجلسات. تبقى الطلبات لدى المحلات. لا يمكن التراجع.'} onClose={() => setDel(false)}
        footer={<><Button variant="ghost" onClick={() => setDel(false)}>{t.back}</Button><Button variant="danger" onClick={() => setDel(false)}>{t.deleteAccount}</Button></>}>
        <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>{shell.en ? 'Privacy policy' : 'سياسة الخصوصية'}</a>
      </Modal>
    </>
  );
}

/* E2 Address book */
function MAddresses({ shell, go }) {
  const { t } = shell;
  const [sheet, setSheet] = React.useState(false);
  return (
    <>
      <AppBar title={t.addresses} onBack={() => go('account')} trailing={<IconButton icon="plus" label={t.addAddress} variant="primary" size="sm" onClick={() => setSheet(true)} />} />
      <div className="screen" style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ADDRESSES.map(a => <AddressCard key={a.id} address={a} placeLabel={shell.geoLabel(a.path)} onEdit={() => setSheet(true)} onDelete={() => {}} />)}
      </div>
      <AddressSheet shell={shell} open={sheet} onClose={() => setSheet(false)} onSave={() => setSheet(false)} />
    </>
  );
}

/* E3 Language */
function MLanguage({ shell, go }) {
  const { t } = shell;
  return (
    <>
      <AppBar title={t.language} onBack={() => go('account')} />
      <div className="screen" style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[['ar', 'العربية'], ['en', 'English']].map(([code, name]) => (
          <Card key={code} padding="sm" tone={shell.lang === code ? 'tinted' : 'default'} interactive onClick={() => shell.setLang(code)} style={{ borderColor: shell.lang === code ? 'var(--border-brand)' : undefined }}>
            <Radio name="lang" value={code} checked={shell.lang === code} onChange={() => shell.setLang(code)} label={name} />
          </Card>
        ))}
      </div>
    </>
  );
}

/* E5 Static page */
function MPage({ shell, page, go }) {
  const { L } = shell;
  const p = page || PAGES[1];
  return (
    <>
      <AppBar title={L(p, 'title')} onBack={() => go('account')} />
      <div className="screen" style={{ padding: '0 16px 24px' }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)' }}>{shell.en ? 'Server Markdown renders here in a readable column. The fixture body is two short paragraphs.' : 'يُعرض هنا محتوى الصفحة من الخادم في عمود مقروء. نص التجربة فقرتان قصيرتان.'}</p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', marginTop: 14 }}>{shell.en ? 'Exchange within three days of delivery for size or colour. Delivery fees are shown before you confirm an order.' : 'استبدال خلال ثلاثة أيام من الاستلام للمقاس أو اللون. تُعرض رسوم التوصيل قبل تأكيد الطلب.'}</p>
      </div>
    </>
  );
}

/* F — error / 404 / 429 */
function MSystem({ shell, kind, go }) {
  const { RateLimitTimer } = window.TrendDesignSystem_7e8edd;
  if (kind === '404') return (<><AppBar onBack={() => go('home')} title="" /><EmptyState icon="package-x" title={shell.en ? 'Product not found' : 'المنتج غير موجود'} description={shell.en ? 'It may have been removed by the shop.' : 'ربما أزاله المحل.'} action={<Button variant="outline" onClick={() => go('home')}>{shell.t.continueShopping}</Button>} /></>);
  if (kind === '429') return (<><AppBar onBack={() => go('home')} title="" /><div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}><Icon name="hourglass" size={28} color="var(--icon-muted)" /><span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 500 }}>{shell.en ? 'Too many attempts' : 'محاولات كثيرة'}</span><RateLimitTimer seconds={45} label={shell.en ? 'Try again in' : 'حاول مرة أخرى بعد'} /></div></>);
  return (<><AppBar onBack={() => go('home')} title="" /><ErrorState problem={{ title: shell.en ? 'Something went wrong' : 'حدث خطأ ما', detail: shell.en ? 'We could not load this order.' : 'تعذّر تحميل هذا الطلب.', traceId: '01J8ZK3V9Q2M' }} onRetry={() => go('home')} retryLabel={shell.en ? 'Retry' : 'إعادة المحاولة'} supportLabel={shell.en ? 'Reference' : 'رقم المتابعة'} /></>);
}

Object.assign(window, { MOrders, MOrder, MAccount, MAddresses, MLanguage, MPage, MSystem });
