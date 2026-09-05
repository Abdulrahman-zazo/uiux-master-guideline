const { BottomNav, Toast } = window.TrendDesignSystem_7e8edd;

/* One device = one independent app instance. `start` picks the first screen. */
function DeviceApp({ shell, label, start = 'home', guest = false, variant }) {
  const [route, setRoute] = React.useState(start);
  const [ctx, setCtx] = React.useState(null);
  const [cart, setCart] = React.useState(CART);
  const [toast, setToast] = React.useState(null);
  const { t } = shell;
  const go = (r, c) => { setRoute(r); if (c !== undefined) setCtx(c); };
  const setQty = (id, n) => setCart(c => ({ ...c, items: c.items.map(it => it.id === id ? { ...it, qty: n, lineTotal: M(Number(it.unitPrice.amountMinor) * n) } : it) }));
  const remove = (id) => setCart(c => { const items = c.items.filter(it => it.id !== id); return { ...c, items, itemsCount: items.length, itemsSubtotal: M(items.reduce((s, it) => s + Number(it.lineTotal.amountMinor), 0)) }; });
  const add = (p, v, qty) => {
    setCart(c => { const it = { id: ID('05' + Math.floor(Math.random() * 90 + 10)), productId: p.id, variantId: v.id, name: p.name, nameEn: p.nameEn, variantName: v.name, variantNameEn: v.nameEn, unitPrice: v.price, qty, lineTotal: M(Number(v.price.amountMinor) * qty), imageUrl: '', available: true, storeId: p.storeId, storeName: p.storeName }; const items = [...c.items, it]; return { ...c, items, itemsCount: items.length, itemsSubtotal: M(items.reduce((s, x) => s + Number(x.lineTotal.amountMinor), 0)) }; });
    setToast(shell.en ? 'Added to cart' : 'أُضيف إلى السلة'); setTimeout(() => setToast(null), 2600);
  };
  const tabRoutes = { home: 'home', results: 'home', product: 'home', markets: 'markets', market: 'markets', store: 'markets', cart: 'cart', checkout: 'cart', phone: 'cart', otp: 'cart', name: 'cart', created: 'orders', orders: 'orders', order: 'orders', account: 'account', addresses: 'account', language: 'account', page: 'account' };
  const showNav = !['onboarding', 'checkout', 'phone', 'otp', 'name', 'created', 'sys'].includes(route);
  const nav = [{ id: 'home', icon: 'house', label: t.tabs.home }, { id: 'markets', icon: 'store', label: t.tabs.markets }, { id: 'cart', icon: 'shopping-cart', label: t.tabs.cart, count: cart.itemsCount }, { id: 'orders', icon: 'package', label: t.tabs.orders }, { id: 'account', icon: 'user', label: t.tabs.account }];
  return (
    <Phone label={label} shell={shell}>
      {route === 'onboarding' && <MOnboarding shell={shell} go={go} />}
      {route === 'home' && <MHome shell={shell} go={go} onProduct={(p) => go('product', p)} onMarket={(m) => go('market', m)} />}
      {route === 'results' && <MResults shell={shell} go={go} onProduct={(p) => go('product', p)} market={ctx && ctx.code ? ctx : null} />}
      {route === 'markets' && <MMarkets shell={shell} onMarket={(m) => go('market', m)} />}
      {route === 'market' && <MMarket shell={shell} market={ctx || MARKETS[0]} go={go} onProduct={(p) => go('product', p)} onStore={(s) => go('store', s)} />}
      {route === 'store' && <MStore shell={shell} store={ctx || STORES[0]} go={go} onProduct={(p) => go('product', p)} inactive={variant === 'store_inactive'} />}
      {route === 'product' && <MProduct shell={shell} product={ctx && ctx.variants ? ctx : PRODUCTS[0]} go={go} onAdd={add} onStore={(s) => go('store', s)} />}
      {route === 'cart' && <MCart shell={shell} cart={cart} setQty={setQty} remove={remove} go={go} guest={guest} />}
      {route === 'phone' && <MPhone shell={shell} go={go} cooldown={variant === 'cooldown' ? 38 : 0} />}
      {route === 'otp' && <MOtp shell={shell} go={go} error={variant === 'otp_invalid' ? 'auth.otp_invalid' : null} />}
      {route === 'name' && <MName shell={shell} go={go} />}
      {route === 'checkout' && <MCheckout shell={shell} cart={cart} go={go} onPlaced={() => go('created')} />}
      {route === 'created' && <MOrdersCreated shell={shell} go={go} />}
      {route === 'orders' && <MOrders shell={shell} go={go} guest={guest} />}
      {route === 'order' && <MOrder shell={shell} order={ctx && ctx.orderNumber ? ctx : ORDERS[1]} go={go} />}
      {route === 'account' && <MAccount shell={shell} go={go} guest={guest} />}
      {route === 'addresses' && <MAddresses shell={shell} go={go} />}
      {route === 'language' && <MLanguage shell={shell} go={go} />}
      {route === 'page' && <MPage shell={shell} page={ctx && ctx.slug ? ctx : PAGES[1]} go={go} />}
      {route === 'sys' && <MSystem shell={shell} kind={variant} go={go} />}
      {showNav && <BottomNav items={nav} active={tabRoutes[route] || 'home'} onNavigate={(id) => go(id)} />}
      {toast && <div style={{ position: 'absolute', bottom: 78, insetInline: 14, display: 'flex', justifyContent: 'center' }}><Toast tone="success" message={toast} onDismiss={() => setToast(null)} style={{ width: '100%' }} /></div>}
    </Phone>
  );
}

function App() {
  const shell = useKitShell('ar');
  const ar = !shell.en;
  const devices = [
    ['home', ar ? 'B1 الرئيسية' : 'B1 Home'],
    ['product', ar ? 'B7 صفحة المنتج' : 'B7 Product'],
    ['cart', ar ? 'C1 السلة' : 'C1 Cart'],
    ['checkout', ar ? 'C2–C4 إتمام الطلب' : 'C2–C4 Checkout'],
    ['created', ar ? 'C5 تم استلام الطلب' : 'C5 Orders created'],
    ['orders', ar ? 'D1 طلباتي' : 'D1 My orders'],
    ['order', ar ? 'D2 تفاصيل الطلب' : 'D2 Order detail'],
    ['account', ar ? 'E1 حسابي' : 'E1 Account'],
    ['markets', ar ? 'B4 الأسواق' : 'B4 Markets'],
    ['results', ar ? 'B3 النتائج' : 'B3 Results'],
    ['phone', ar ? 'A3 رقم الهاتف' : 'A3 Phone entry'],
    ['otp', ar ? 'A4 التحقق' : 'A4 OTP verify', 'otp_invalid'],
    ['onboarding', ar ? 'A2 التعريف' : 'A2 Onboarding'],
    ['cart', ar ? 'C1 السلة — زائر' : 'C1 Cart — guest', null, true],
    ['sys', ar ? 'F خطأ' : 'F Error', 'error'],
    ['sys', ar ? 'F 429' : 'F Rate-limited', '429'],
  ];
  return (
    <>
      <div style={{ maxWidth: 1260, margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)' }}>Trendsy UI kit · 390×844</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>{ar ? 'تطبيق المتسوّق' : 'Buyer mobile app'}</span>
        </div>
        <KitControls shell={shell} tone="light" />
      </div>
      <div className="stage">
        {devices.map(([start, label, variant, guest], i) => <DeviceApp key={i + shell.lang} shell={shell} start={start} label={label} variant={variant} guest={!!guest} />)}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
