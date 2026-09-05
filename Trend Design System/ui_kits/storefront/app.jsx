const { Toast, Alert, Button } = window.TrendDesignSystem_7e8edd;

function groupByStore(items) { const m = new Map(); for (const it of items) { if (!m.has(it.storeId)) m.set(it.storeId, { storeId: it.storeId, storeName: it.storeName, items: [] }); m.get(it.storeId).items.push(it); } return [...m.values()]; }
Object.assign(window, { groupByStore });

const ROUTES = ['home', 'search', 'category', 'markets', 'market', 'store', 'product', 'cart', 'login', 'checkout', 'created', 'orders', 'order', 'addresses', 'language', 'sessions', 'page', '404', 'error', '429'];

function App() {
  const shell = useKitShell('ar');
  const [route, setRoute] = React.useState('home');
  const [ctx, setCtx] = React.useState(null);
  const [cart, setCart] = React.useState(CART);
  const [guest, setGuest] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const go = (r, c) => { setRoute(r); if (c !== undefined) setCtx(c); window.scrollTo(0, 0); };
  const setQty = (id, n) => setCart(c => ({ ...c, items: c.items.map(it => it.id === id ? { ...it, qty: n, lineTotal: M(Number(it.unitPrice.amountMinor) * n) } : it) }));
  const remove = (id) => setCart(c => { const items = c.items.filter(it => it.id !== id); return { ...c, items, itemsCount: items.length, itemsSubtotal: M(items.reduce((s, it) => s + Number(it.lineTotal.amountMinor), 0)) }; });
  const add = (p, v, qty) => { setCart(c => { const it = { id: ID('05' + Math.floor(Math.random() * 90 + 10)), productId: p.id, variantId: v.id, name: p.name, nameEn: p.nameEn, variantName: v.name, variantNameEn: v.nameEn, unitPrice: v.price, qty, lineTotal: M(Number(v.price.amountMinor) * qty), imageUrl: '', available: true, storeId: p.storeId, storeName: p.storeName }; const items = [...c.items, it]; return { ...c, items, itemsCount: items.length, itemsSubtotal: M(items.reduce((s, x) => s + Number(x.lineTotal.amountMinor), 0)) }; }); setToast(shell.en ? 'Added to cart' : 'أُضيف إلى السلة'); setTimeout(() => setToast(null), 2600); };
  const pub = ['home', 'search', 'category', 'markets', 'market', 'store', 'product'];
  const chrome = route !== 'login';
  return (
    <>
      {shell.offline && <Alert tone="offline" banner title={shell.t.offline} />}
      {chrome && <SiteHeader shell={shell} go={go} cartCount={cart.itemsCount} route={route} guest={guest} />}
      {chrome && pub.includes(route) && <CategoryRow shell={shell} go={go} active={route === 'category' ? ctx : null} />}
      {route === 'home' && <WHome shell={shell} go={go} onProduct={(p) => go('product', p)} />}
      {route === 'search' && <WCategory shell={shell} go={go} onProduct={(p) => go('product', p)} query="q" />}
      {route === 'category' && <WCategory shell={shell} go={go} onProduct={(p) => go('product', p)} category={ctx && ctx.children ? ctx : CATEGORIES[0]} />}
      {route === 'markets' && <WMarkets shell={shell} go={go} />}
      {route === 'market' && <WMarket shell={shell} market={ctx && ctx.code ? ctx : MARKETS[0]} go={go} onProduct={(p) => go('product', p)} />}
      {route === 'store' && <WStore shell={shell} store={ctx && ctx.geoPath ? ctx : STORES[0]} go={go} onProduct={(p) => go('product', p)} />}
      {route === 'product' && <WProduct shell={shell} product={ctx && ctx.variants ? ctx : PRODUCTS[0]} go={go} onAdd={add} onStore={(s) => go('store', s)} />}
      {route === 'cart' && <WCart shell={shell} cart={cart} setQty={setQty} remove={remove} go={go} guest={guest} />}
      {route === 'login' && <WLogin shell={shell} go={(r) => { setGuest(false); go(r); }} />}
      {route === 'checkout' && <WCheckout shell={shell} cart={cart} go={go} onPlaced={() => go('created')} />}
      {route === 'created' && <WCreated shell={shell} go={go} />}
      {route === 'orders' && <WOrders shell={shell} go={go} />}
      {route === 'order' && <WOrder shell={shell} order={ctx && ctx.orderNumber ? ctx : ORDERS[1]} go={go} />}
      {route === 'account' && <WOrders shell={shell} go={go} />}
      {route === 'addresses' && <WAddresses shell={shell} go={go} />}
      {route === 'language' && <WLanguage shell={shell} go={go} />}
      {route === 'sessions' && <WSessions shell={shell} go={go} />}
      {route === 'page' && <WPage shell={shell} page={ctx && ctx.slug ? ctx : PAGES[1]} go={go} />}
      {['404', 'error', '429'].includes(route) && <WSystem shell={shell} kind={route} go={go} />}
      {chrome && <SiteFooter shell={shell} go={go} />}
      {toast && <div style={{ position: 'fixed', bottom: 24, insetInlineStart: '50%', transform: 'translateX(-50%)', zIndex: 200 }}><Toast tone="success" message={toast} onDismiss={() => setToast(null)} /></div>}
      {/* Kit-only route jumper */}
      <div style={{ position: 'fixed', bottom: 16, insetInlineEnd: 16, zIndex: 150, display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 420, justifyContent: 'flex-end' }}>
        {ROUTES.map(r => <button key={r} type="button" onClick={() => go(r)} style={{ border: '1px solid var(--border-hairline)', background: route === r ? 'var(--surface-brand)' : 'var(--surface-card)', color: route === r ? '#fff' : 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '3px 9px', fontFamily: 'var(--font-numeric)', fontSize: 11, cursor: 'pointer' }}>{r}</button>)}
        <button type="button" onClick={() => setGuest(g => !g)} style={{ border: '1px solid var(--border-hairline)', background: guest ? 'var(--surface-tinted)' : 'var(--surface-card)', color: 'var(--text-brand)', borderRadius: 'var(--radius-pill)', padding: '3px 9px', fontFamily: 'var(--font-numeric)', fontSize: 11, cursor: 'pointer' }}>guest: {guest ? 'on' : 'off'}</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
