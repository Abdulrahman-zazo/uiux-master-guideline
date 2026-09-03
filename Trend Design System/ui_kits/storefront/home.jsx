const { Button, Eyebrow, Card, Badge, SectionHeader, ProductCard, Icon, Logo, Divider, Tag } = window.TrendDesignSystem_7e8edd;

function Hero({ shell, onShop }) {
  const { t } = shell;
  return (
    <section style={{ background: 'var(--brand-wash)', paddingBlock: 'clamp(56px,8vw,104px)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.8fr)', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
          <Eyebrow tone="brand">{t.heroEyebrow}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-fluid)', fontWeight: 600, letterSpacing: shell.lang === 'ar' ? '0' : 'var(--tracking-display)', lineHeight: shell.lang === 'ar' ? 1.2 : 1.02, color: 'var(--text-on-wash)', textWrap: 'pretty' }}>{t.heroTitle}</h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: shell.lang === 'ar' ? 1.75 : 1.55, color: 'var(--text-on-wash-soft)', maxWidth: '46ch' }}>{t.heroBody}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
            <Button variant="primary" size="lg" iconEnd="arrow-right" onClick={onShop}>{t.heroCta}</Button>
            <Button variant="secondary" size="lg" style={{ borderColor: 'var(--border-on-wash)', color: 'var(--text-on-wash)' }}>{t.heroCta2}</Button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, minWidth: 0 }}>
          {[0, 3].map(i => <ProductCard key={i} product={shell.loc(CATALOG[i])} onClick={onShop} />)}
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ shell }) {
  const items = shell.lang === 'ar'
    ? [['truck', 'توصيل ٢–٤ أيام'], ['undo-2', 'إرجاع مجاني ٣٠ يوم'], ['shield-check', 'دفع آمن'], ['store', '٤٠٠+ أتيليه']]
    : [['truck', '2–4 day delivery'], ['undo-2', 'Free 30-day returns'], ['shield-check', 'Secure payment'], ['store', '400+ ateliers']];
  return (
    <div style={{ background: 'var(--surface-card)', borderBlock: '1px solid var(--border-hairline)' }}>
      <div className="wrap" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between', paddingBlock: 18 }}>
        {items.map(([ic, label]) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>
            <Icon name={ic} size={17} color="var(--icon-brand)" />{label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryRail({ shell, onPick }) {
  const cats = shell.lang === 'ar'
    ? [['abayas', 'عبايات'], ['clothing', 'ملابس'], ['bags', 'حقائب'], ['accessories', 'إكسسوارات'], ['beauty', 'الجمال']]
    : [['abayas', 'Abayas'], ['clothing', 'Clothing'], ['bags', 'Bags'], ['accessories', 'Accessories'], ['beauty', 'Beauty']];
  return (
    <div className="wrap" style={{ paddingBlock: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {cats.map(([id, label]) => <Tag key={id} onClick={() => onPick(id)}>{label}</Tag>)}
    </div>
  );
}

function SaleBanner({ shell, onShop }) {
  const { t } = shell;
  return (
    <div className="wrap" style={{ paddingBlock: 8 }}>
      <Card padding="none" bordered={false} style={{ background: 'var(--brand-wash-deep)', overflow: 'hidden' }}>
        <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <Eyebrow tone="inverse">{t.saleEyebrow}</Eyebrow>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, color: '#fff', letterSpacing: shell.lang === 'ar' ? 0 : 'var(--tracking-heading)', lineHeight: 1.15 }}>{t.saleTitle}</h3>
          </div>
          <Button variant="inverse" size="lg" iconEnd="arrow-right" onClick={onShop}>{t.explore}</Button>
        </div>
      </Card>
    </div>
  );
}

function EditorialStatement({ shell }) {
  const text = shell.lang === 'ar'
    ? 'نعمل مع الأتيليهات الصغيرة في الرياض وجدة ودبي — كل قطعة تُصنع بكميات محدودة.'
    : 'We work with small ateliers across Riyadh, Jeddah and Dubai — every piece is made in limited runs.';
  return (
    <div className="wrap" style={{ paddingBlock: 'var(--section-gap)', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, lineHeight: shell.lang === 'ar' ? 1.4 : 1.15, letterSpacing: shell.lang === 'ar' ? 0 : 'var(--tracking-heading)', color: 'var(--text-primary)', maxWidth: '22ch', margin: '0 auto', textWrap: 'balance' }}>{text}</p>
    </div>
  );
}

function Footer({ shell }) {
  const cols = shell.lang === 'ar'
    ? [['تسوّقي', ['وصل حديثاً', 'التخفيضات', 'المصممون', 'بطاقات الهدايا']], ['المساعدة', ['الشحن', 'الإرجاع', 'دليل المقاسات', 'اتصلي بنا']], ['ترند', ['من نحن', 'بيعي معنا', 'الوظائف', 'الاستدامة']]]
    : [['Shop', ['New in', 'Sale', 'Designers', 'Gift cards']], ['Help', ['Shipping', 'Returns', 'Size guide', 'Contact us']], ['Trend', ['About', 'Sell with us', 'Careers', 'Sustainability']]];
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--neutral-300)', marginTop: 'var(--section-gap)' }}>
      <div className="wrap" style={{ paddingBlock: 48, display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(3,minmax(0,1fr))', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Logo theme="dark" height={24} assetBase="../../assets/" />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', lineHeight: 1.7, maxWidth: '30ch' }}>{shell.lang === 'ar' ? 'منصة تسوّق للأزياء والجمال في الخليج.' : 'A fashion and beauty marketplace for the Gulf.'}</p>
        </div>
        {cols.map(([head, links]) => (
          <div key={head} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--neutral-400)' }}>{head}</span>
            {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--neutral-300)', textDecoration: 'none' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div className="wrap" style={{ paddingBottom: 32 }}>
        <div style={{ height: 1, background: 'var(--neutral-800)', marginBottom: 18 }} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--neutral-500)' }}>© 2026 Trend. {shell.lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
      </div>
    </footer>
  );
}

function HomeScreen({ shell, go, onProduct }) {
  const { t } = shell;
  return (
    <>
      <Hero shell={shell} onShop={() => go('catalog')} />
      <TrustStrip shell={shell} />
      <CategoryRail shell={shell} onPick={() => go('catalog')} />
      <div className="wrap">
        <SectionHeader eyebrow={t.newEyebrow} title={t.newTitle} action={t.explore} onAction={e => { e.preventDefault(); go('catalog'); }} onPrev={() => {}} onNext={() => {}} />
        <div className="grid">{CATALOG.slice(0, 4).map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} onWishlist={() => {}} />)}</div>
      </div>
      <div style={{ height: 'var(--section-gap)' }} />
      <SaleBanner shell={shell} onShop={() => go('catalog')} />
      <div className="wrap" style={{ paddingTop: 'var(--section-gap)' }}>
        <SectionHeader eyebrow={shell.lang === 'ar' ? 'الأكثر مبيعاً' : 'Most wanted'} title={shell.lang === 'ar' ? 'يتصدر قوائم الرغبات' : 'Topping the wishlists'} action={t.explore} />
        <div className="grid">{CATALOG.slice(4).map(p => <ProductCard key={p.id} product={shell.loc(p)} onClick={() => onProduct(p)} onWishlist={() => {}} />)}</div>
      </div>
      <EditorialStatement shell={shell} />
      <Footer shell={shell} />
    </>
  );
}

Object.assign(window, { HomeScreen, Footer, TrustStrip });
