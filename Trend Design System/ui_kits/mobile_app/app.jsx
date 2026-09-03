const { BottomNav, Toast, Button } = window.TrendDesignSystem_7e8edd;

function DeviceApp({ shell, label, start }) {
  const [tab, setTab] = React.useState(start || 'home');
  const [product, setProduct] = React.useState(CATALOG[0]);
  const [lines, setLines] = React.useState([
    { ...CATALOG[0], variant: 'Plum · M', quantity: 1 },
    { ...CATALOG[3], variant: '50 ml', quantity: 1 },
  ]);
  const [toast, setToast] = React.useState(null);
  const locLines = lines.map(l => ({ ...l, name: shell.pname(l), brand: shell.pbrand(l) }));
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  const openProduct = (p) => { setProduct(p); setTab('product'); };
  const add = (p, qty, variant) => {
    setLines(ls => [...ls, { ...p, quantity: qty, variant }]);
    setToast(shell.lang === 'ar' ? 'أُضيف إلى حقيبتك' : 'Added to your bag');
    setTimeout(() => setToast(null), 3000);
  };
  const nav = shell.lang === 'ar'
    ? [{ id: 'home', icon: 'house', label: 'الرئيسية' }, { id: 'search', icon: 'search', label: 'البحث' }, { id: 'bag', icon: 'shopping-bag', label: 'الحقيبة', count }, { id: 'saved', icon: 'heart', label: 'المحفوظة' }, { id: 'me', icon: 'user', label: 'حسابي' }]
    : [{ id: 'home', icon: 'house', label: 'Home' }, { id: 'search', icon: 'search', label: 'Search' }, { id: 'bag', icon: 'shopping-bag', label: 'Bag', count }, { id: 'saved', icon: 'heart', label: 'Saved' }, { id: 'me', icon: 'user', label: 'Account' }];
  return (
    <Phone label={label}>
      {tab === 'home' && <MHome shell={shell} go={setTab} onProduct={openProduct} />}
      {tab === 'search' && <MSearch shell={shell} go={setTab} onProduct={openProduct} />}
      {tab === 'product' && <MProduct shell={shell} product={product} go={setTab} onAdd={add} />}
      {tab === 'bag' && <MBag shell={shell} lines={locLines} setQty={(i, n) => setLines(ls => ls.map((l, j) => j === i ? { ...l, quantity: n } : l))} remove={(i) => setLines(ls => ls.filter((_, j) => j !== i))} go={setTab} />}
      {tab === 'saved' && <MSearch shell={shell} go={setTab} onProduct={openProduct} />}
      {tab === 'me' && <MAccount shell={shell} />}
      <BottomNav items={nav} active={tab === 'product' ? 'home' : tab} onNavigate={setTab} />
      {toast && <div style={{ position: 'absolute', bottom: 78, insetInline: 14, display: 'flex', justifyContent: 'center' }}><Toast tone="success" message={toast} onDismiss={() => setToast(null)} style={{ width: '100%' }} /></div>}
    </Phone>
  );
}

function App() {
  const shell = useKitShell('en');
  return (
    <>
      <div style={{ maxWidth: 1180, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trend UI kit</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-.28px', color: 'var(--text-primary)' }}>{shell.lang === 'ar' ? 'تطبيق المتسوّق' : 'Shopper mobile app'}</span>
        </div>
        <KitControls shell={shell} tone="light" />
      </div>
      <div className="stage">
        <DeviceApp shell={shell} start="home" label={shell.lang === 'ar' ? 'الرئيسية' : 'Home'} />
        <DeviceApp shell={shell} start="product" label={shell.lang === 'ar' ? 'صفحة المنتج' : 'Product'} />
        <DeviceApp shell={shell} start="bag" label={shell.lang === 'ar' ? 'الحقيبة' : 'Bag'} />
        <DeviceApp shell={shell} start="me" label={shell.lang === 'ar' ? 'حسابي' : 'Account'} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
