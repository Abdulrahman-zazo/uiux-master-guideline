const { Button, OrderCard, Timeline, StatusPill, CartLine, AddressCard, Money, Tabs, EmptyState, Card, Divider, Modal, ReasonPicker, Icon, Avatar, Radio, ErrorState, DataTable, SidebarNav, RateLimitTimer } = window.TrendDesignSystem_7e8edd;

/* W11 My orders — table on desktop. */
function WOrders({ shell, go }) {
  const { t, L } = shell;
  const [tab, setTab] = React.useState('active');
  const ACTIVE = ['placed', 'confirmed', 'accepted', 'shipped'];
  const rows = ORDERS.filter(o => tab === 'active' ? ACTIVE.includes(o.status) : !ACTIVE.includes(o.status)).map(o => shell.loc(o));
  return (
    <AccountShell shell={shell} go={go} active="orders" title={t.tabs.orders}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <Tabs variant="pill" active={tab} onChange={setTab} items={[{ id: 'active', label: t.active }, { id: 'done', label: t.done }]} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.lastUpdated} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>09:41</bdi></span>
      </div>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <DataTable rows={rows} onRowClick={(r) => go('order', ORDERS.find(o => o.id === r.id))} empty={<EmptyState compact icon="package" title={t.noOrders} />} columns={[
          { key: 'orderNumber', label: shell.en ? 'Order' : 'الطلب', numeric: true },
          { key: 'storeName', label: shell.en ? 'Shop' : 'المحل' },
          { key: 'createdAt', label: shell.en ? 'Date' : 'التاريخ', muted: true, render: r => <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Damascus', day: 'numeric', month: 'short' }).format(new Date(r.createdAt))}</bdi> },
          { key: 'status', label: shell.en ? 'Status' : 'الحالة', render: r => <StatusPill status={r.status} label={r.statusLabel} /> },
          { key: 'total', label: t.totals, align: 'end', render: r => <Money value={r.total} size="sm" /> },
        ]} />
      </Card>
    </AccountShell>
  );
}

/* W12 Order detail — timeline start side, summary end side. */
function WOrder({ shell, order, go }) {
  const { t, L } = shell;
  const o = order || ORDERS[1];
  const [cancel, setCancel] = React.useState(false);
  const [reason, setReason] = React.useState({});
  return (
    <div className="wrap" style={{ paddingBlock: 28 }}>
      <Button variant="ghost" size="sm" iconStart="chevron-left" onClick={() => go('orders')}>{t.tabs.orders}</Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBlock: '10px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)' }}><bdi dir="ltr">{o.orderNumber}</bdi></h1>
        <StatusPill status={o.status} label={L(o, 'statusLabel')} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{L(o, 'storeName')}</span>
        <div style={{ flex: 1 }} />
        {o.cancellable && <Button variant="outline" onClick={() => setCancel(true)}>{t.cancelOrder}</Button>}
        {(o.status === 'delivered' || o.status === 'completed') && <Button variant="primary" iconStart="rotate-cw" onClick={() => go('cart')}>{t.reorder}</Button>}
      </div>
      <div className="two" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Timeline events={o.events.map(e => ({ ...e, label: L(e, 'label') }))} pending={o.status === 'placed' ? {} : null} lang={shell.lang} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{t.lastUpdated} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>09:41</bdi> · {shell.en ? 'refreshes every 15 s' : 'يتحدّث كل 15 ثانية'}</span>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="none" style={{ paddingInline: 20 }}>{o.lines.map(l => <CartLine key={l.id} item={shell.loc(l)} readOnly />)}</Card>
          <AddressCard address={o.address} placeLabel={shell.geoLabel(o.address.path)} />
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[[shell.en ? 'Subtotal' : 'المجموع', o.itemsSubtotal], [shell.en ? 'Delivery fee' : 'رسوم التوصيل', o.deliveryFee]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}><span>{k}</span><Money value={v} size="sm" style={{ fontWeight: 500 }} /></div>)}
            <Divider spacing={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontFamily: 'var(--font-ui)', fontWeight: 500 }}>{t.totals}</span><Money value={o.total} size="lg" /></div>
          </Card>
        </div>
      </div>
      <Modal open={cancel} title={t.cancelOrder} description={shell.en ? 'Choose a reason so we can improve.' : 'اختر السبب لنتحسّن.'} onClose={() => setCancel(false)}
        footer={<><Button variant="ghost" onClick={() => setCancel(false)}>{t.back}</Button><Button variant="danger" disabled={!reason.reasonCode} onClick={() => { setCancel(false); go('orders'); }}>{t.cancelOrder}</Button></>}>
        <ReasonPicker reasons={REASONS.cancel.map(r => ({ code: r.code, label: L(r, 'label') }))} value={reason} onChange={setReason} lang={shell.lang} />
      </Modal>
    </div>
  );
}

/* W13–W16 Account shell with sidebar. */
function AccountShell({ shell, go, active, title, children }) {
  const { t } = shell;
  const items = [{ id: 'orders', icon: 'package', label: t.tabs.orders }, { id: 'addresses', icon: 'map-pin', label: t.addresses }, { id: 'language', icon: 'languages', label: t.language }, { id: 'sessions', icon: 'smartphone', label: t.devices }, { section: t.pages }, ...PAGES.map(p => ({ id: 'page:' + p.slug, icon: 'file-text', label: shell.L(p, 'title') }))];
  return (
    <div className="wrap" style={{ paddingBlock: 28, display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', gap: 32, alignItems: 'start' }}>
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-hairline)' }}>
          <Avatar />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>+963 9•• ••• •01</bdi>
            <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{ME.customerNumber}</bdi>
          </div>
        </div>
        <SidebarNav items={items} active={active} onNavigate={(id) => id.startsWith('page:') ? go('page', PAGES.find(p => p.slug === id.slice(5))) : go(id)} assetBase="../../assets/" style={{ width: '100%', border: 0, padding: '8px 8px 4px' }} footer={<div style={{ padding: '8px 4px 4px', display: 'flex', flexDirection: 'column', gap: 4 }}><Button variant="ghost" size="sm" iconStart="log-out" style={{ justifyContent: 'flex-start' }}>{t.logout}</Button><Button variant="ghost" size="sm" iconStart="trash-2" style={{ justifyContent: 'flex-start', color: 'var(--text-danger)' }}>{t.deleteAccount}</Button></div>} />
      </Card>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', marginBottom: 20 }}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

function WAddresses({ shell, go }) {
  const { t } = shell;
  const [sheet, setSheet] = React.useState(false);
  return (
    <AccountShell shell={shell} go={go} active="addresses" title={t.addresses}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }}>
        {ADDRESSES.map(a => <AddressCard key={a.id} address={a} placeLabel={shell.geoLabel(a.path)} onEdit={() => setSheet(true)} onDelete={() => {}} />)}
        <button type="button" onClick={() => setSheet(true)} style={{ border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--radius-card)', background: 'transparent', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-brand)', fontWeight: 500 }}><Icon name="plus" size={18} />{t.addAddress}</button>
      </div>
      <WAddressSheet shell={shell} open={sheet} onClose={() => setSheet(false)} />
    </AccountShell>
  );
}

function WLanguage({ shell, go }) {
  const { t } = shell;
  return (
    <AccountShell shell={shell} go={go} active="language" title={t.language}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
        {[['ar', 'العربية'], ['en', 'English']].map(([code, name]) => <Card key={code} padding="sm" tone={shell.lang === code ? 'tinted' : 'default'} interactive onClick={() => shell.setLang(code)} style={{ borderColor: shell.lang === code ? 'var(--border-brand)' : undefined }}><Radio name="lang" value={code} checked={shell.lang === code} onChange={() => shell.setLang(code)} label={name} /></Card>)}
      </div>
    </AccountShell>
  );
}

function WSessions({ shell, go }) {
  const { t } = shell;
  const [open, setOpen] = React.useState(false);
  return (
    <AccountShell shell={shell} go={go} active="sessions" title={t.devices}>
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{shell.en ? 'Signed in somewhere you don’t recognise? Sign out everywhere and sign back in here.' : 'مسجّل الدخول من جهاز لا تعرفه؟ سجّل الخروج من كل الأجهزة ثم ادخل من جديد.'}</p>
        <Button variant="outline" iconStart="log-out" onClick={() => setOpen(true)} style={{ alignSelf: 'flex-start' }}>{t.logoutAll}</Button>
        {/* No device list: the backend has no sessions-list endpoint for buyers in Slice 1. */}
      </Card>
      <Modal open={open} title={t.logoutAll} description={shell.en ? 'You will be signed out on every device, including this one.' : 'سيتم تسجيل خروجك من كل الأجهزة، بما فيها هذا الجهاز.'} onClose={() => setOpen(false)} footer={<><Button variant="ghost" onClick={() => setOpen(false)}>{t.back}</Button><Button variant="primary" onClick={() => setOpen(false)}>{t.logoutAll}</Button></>} />
    </AccountShell>
  );
}

function WPage({ shell, page, go }) {
  const { L } = shell;
  const p = page || PAGES[1];
  return (
    <div className="wrap" style={{ paddingBlock: 40, maxWidth: 760 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', marginBottom: 18 }}>{L(p, 'title')}</h1>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)' }}>{shell.en ? 'Server Markdown renders here in a readable column. The fixture body is two short paragraphs.' : 'يُعرض هنا محتوى الصفحة من الخادم في عمود مقروء. نص التجربة فقرتان قصيرتان.'}</p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)', marginTop: 16 }}>{shell.en ? 'Exchange within three days of delivery for size or colour. Delivery fees are shown before you confirm an order.' : 'استبدال خلال ثلاثة أيام من الاستلام للمقاس أو اللون. تُعرض رسوم التوصيل قبل تأكيد الطلب.'}</p>
    </div>
  );
}

function WSystem({ shell, kind, go }) {
  if (kind === '404') return <div className="wrap" style={{ paddingBlock: 60 }}><EmptyState icon="package-x" title={shell.en ? 'Page not found' : 'الصفحة غير موجودة'} action={<Button variant="outline" onClick={() => go('home')}>{shell.t.tabs.home}</Button>} /></div>;
  if (kind === '429') return <div className="wrap" style={{ paddingBlock: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}><Icon name="hourglass" size={28} color="var(--icon-muted)" /><span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 500 }}>{shell.en ? 'Too many attempts' : 'محاولات كثيرة'}</span><RateLimitTimer seconds={45} label={shell.en ? 'Try again in' : 'حاول مرة أخرى بعد'} /></div>;
  return <div className="wrap" style={{ paddingBlock: 40 }}><ErrorState problem={{ title: shell.en ? 'Something went wrong' : 'حدث خطأ ما', detail: shell.en ? 'We could not load this page.' : 'تعذّر تحميل هذه الصفحة.', traceId: '01J8ZK3V9Q2M' }} onRetry={() => go('home')} retryLabel={shell.en ? 'Retry' : 'إعادة المحاولة'} supportLabel={shell.en ? 'Reference' : 'رقم المتابعة'} /></div>;
}

Object.assign(window, { WOrders, WOrder, AccountShell, WAddresses, WLanguage, WSessions, WPage, WSystem });
