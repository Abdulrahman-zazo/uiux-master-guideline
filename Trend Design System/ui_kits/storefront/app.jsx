const { TopNav, Toast } = window.TrendDesignSystem_7e8edd;

function App() {
  const shell = useKitShell('en');
  const [route, setRoute] = React.useState('home');
  const [product, setProduct] = React.useState(CATALOG[0]);
  const [lines, setLines] = React.useState([
    { ...CATALOG[0], variant: 'Plum · Size M', quantity: 1 },
    { ...CATALOG[3], variant: '50 ml', quantity: 1 },
  ]);
  const [toast, setToast] = React.useState(null);
  const [q, setQ] = React.useState('');

  const go = (r) => { setRoute(r); window.scrollTo(0, 0); };
  const openProduct = (p) => { setProduct(p); go('product'); };
  const add = (p, qty, variant) => {
    setLines(ls => [...ls, { ...p, quantity: qty, variant }]);
    setToast(shell.lang === 'ar' ? 'أُضيف إلى حقيبتك' : 'Added to your bag');
    setTimeout(() => setToast(null), 3200);
  };
  const setQty = (i, n) => setLines(ls => ls.map((l, j) => j === i ? { ...l, quantity: n } : l));
  const remove = (i) => setLines(ls => ls.filter((_, j) => j !== i));

  /* Localise cart lines so the bag follows the language toggle. */
  const locLines = lines.map(l => ({ ...l, name: shell.pname(l), brand: shell.pbrand(l) }));
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  return (
    <>
      {route !== 'checkout' && (
        <TopNav assetBase="../../assets/" links={shell.t.nav} active="new" onNavigate={() => go('catalog')}
          search={q} onSearch={(v) => { setQ(v); }} cartCount={count} onCart={() => go('bag')}
          cta={shell.t.signIn} onCta={() => {}} tone="dark">
          <KitControls shell={shell} tone="dark" />
        </TopNav>
      )}
      {route === 'home' && <HomeScreen shell={shell} go={go} onProduct={openProduct} />}
      {route === 'catalog' && <><CatalogScreen shell={shell} onProduct={openProduct} /><Footer shell={shell} /></>}
      {route === 'product' && <ProductScreen shell={shell} product={product} onAdd={add} onProduct={openProduct} />}
      {route === 'bag' && <BagScreen shell={shell} lines={locLines} setQty={setQty} remove={remove} go={go} />}
      {route === 'checkout' && <CheckoutScreen shell={shell} lines={locLines} go={go} />}
      {route === 'done' && <><ConfirmScreen shell={shell} lines={locLines} go={go} /><Footer shell={shell} /></>}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, insetInlineStart: '50%', transform: 'translateX(-50%)', zIndex: 200 }}>
          <Toast tone="success" message={toast} onDismiss={() => setToast(null)} />
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
