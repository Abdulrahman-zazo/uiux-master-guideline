const { Breadcrumb, ProductMedia, PriceBlock, RatingStars, OptionPicker, StockStatus, QuantityStepper, Button, IconButton, Badge, Tabs, Card, Divider, Avatar, Eyebrow, ProgressBar, SectionHeader, ProductCard, Alert } = window.TrendDesignSystem_7e8edd;

function Gallery({ shell }) {
  const [i, setI] = React.useState(0);
  return (
    <div style={{ display: 'flex', gap: 14, minWidth: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '0 0 auto' }}>
        {[0, 1, 2, 3].map(n => (
          <button key={n} type="button" onClick={() => setI(n)} style={{
            width: 66, padding: 0, border: '1.5px solid ' + (i === n ? 'var(--border-brand)' : 'var(--border-hairline)'),
            borderRadius: 'var(--radius-tag)', overflow: 'hidden', cursor: 'pointer', background: 'transparent',
          }}>
            <ProductMedia ratio="3 / 4" radius="0" />
          </button>
        ))}
      </div>
      <ProductMedia ratio="3 / 4" radius="var(--radius-card)" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ position: 'absolute', top: 16, insetInlineStart: 16, display: 'flex', gap: 6 }}>
          <Badge tone="brand">-30%</Badge>
        </div>
        <div style={{ position: 'absolute', top: 14, insetInlineEnd: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <IconButton icon="heart" label="Save" style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} />
          <IconButton icon="share-2" label="Share" style={{ background: 'var(--surface-capsule)', border: 'none', color: 'var(--icon-on-capsule)' }} />
        </div>
      </ProductMedia>
    </div>
  );
}

function ReviewSummary({ shell }) {
  const bars = [[5, 72], [4, 18], [3, 6], [2, 2], [1, 2]];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 48, fontWeight: 600, letterSpacing: '-1.2px', lineHeight: 1, color: 'var(--text-primary)' }}>4.6</span>
        <RatingStars value={4.6} size={16} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>128 {shell.lang === 'ar' ? 'تقييم' : 'reviews'}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 320 }}>
        {bars.map(([star, pct]) => (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 12, color: 'var(--text-muted)', width: 10 }}>{star}</span>
            <ProgressBar value={pct} size="sm" style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 12, color: 'var(--text-muted)', width: 30, textAlign: 'end' }}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewList({ shell }) {
  const rows = shell.lang === 'ar'
    ? [['ليلى الحربي', 5, 'الخامة ممتازة والتطريز دقيق جداً. المقاس مطابق.'], ['هناء قاسم', 4, 'جميلة جداً لكن التوصيل تأخر يوماً.'], ['عمر ناصر', 5, 'اشتريتها هدية ونالت إعجاباً كبيراً.']]
    : [['Layla Al-Harbi', 5, 'The linen is excellent and the embroidery is very fine. True to size.'], ['Hana Qasim', 4, 'Beautiful piece, though delivery ran a day late.'], ['Omar Nasser', 5, 'Bought it as a gift and it landed perfectly.']];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map(([name, stars, body], i) => (
        <div key={name} style={{ display: 'flex', gap: 14, paddingBlock: 18, borderTop: i ? '1px solid var(--border-hairline)' : 'none' }}>
          <Avatar name={name} size="sm" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
              <RatingStars value={stars} size={12} />
              <Badge tone="success" icon="check">{shell.lang === 'ar' ? 'شراء موثّق' : 'Verified purchase'}</Badge>
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: shell.lang === 'ar' ? 1.7 : 1.55, color: 'var(--text-secondary)' }}>{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductScreen({ shell, product, onAdd, onProduct }) {
  const { t } = shell;
  const p = product || CATALOG[0];
  const [size, setSize] = React.useState('M');
  const [col, setCol] = React.useState(shell.lang === 'ar' ? 'برقوقي' : 'Plum');
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('desc');
  const colours = shell.lang === 'ar'
    ? [{ value: 'برقوقي', color: '#6D1B72' }, { value: 'موف', color: '#864596' }, { value: 'حبري', color: '#090909' }, { value: 'عاجي', color: '#EBEBE9' }]
    : [{ value: 'Plum', color: '#6D1B72' }, { value: 'Mauve', color: '#864596' }, { value: 'Ink', color: '#090909' }, { value: 'Bone', color: '#EBEBE9' }];
  const desc = shell.lang === 'ar'
    ? 'عباية من الكتان الإيطالي بتطريز يدوي على الأكمام وحاشية من الحرير. تُصنع بكميات محدودة في أتيليه نور بالرياض.'
    : 'Italian linen abaya with hand-worked sleeve embroidery and a silk trim. Made in limited runs at the Nour atelier in Riyadh.';
  const specs = shell.lang === 'ar'
    ? [['الخامة', '١٠٠٪ كتان'], ['الحاشية', 'حرير طبيعي'], ['العناية', 'تنظيف جاف'], ['المنشأ', 'الرياض']]
    : [['Material', '100% linen'], ['Trim', 'Mulberry silk'], ['Care', 'Dry clean only'], ['Made in', 'Riyadh']];
  return (
    <div className="wrap" style={{ paddingBlock: 28 }}>
      <Breadcrumb items={shell.lang === 'ar' ? ['الرئيسية', 'نساء', 'عبايات', shell.pname(p)] : ['Home', 'Women', 'Abayas', shell.pname(p)]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 48, marginTop: 22, alignItems: 'start' }}>
        <Gallery shell={shell} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Eyebrow>{shell.pbrand(p)}</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-lg-fluid)', fontWeight: 600, letterSpacing: shell.lang === 'ar' ? 0 : 'var(--tracking-heading-lg)', lineHeight: shell.lang === 'ar' ? 1.3 : 1.08, color: 'var(--text-primary)', textWrap: 'pretty' }}>{shell.pname(p)}</h1>
            <RatingStars value={p.rating} count={p.reviews} showValue />
          </div>
          <PriceBlock amount={p.price} compareAt={p.compareAt} size="xl" currency={t.currency} />
          <StockStatus level="low" count={3} />
          <Divider spacing={2} />
          <OptionPicker label={t.size} options={['XS', 'S', 'M', { value: 'L', soldOut: true }, 'XL']} value={size} onChange={setSize} />
          <OptionPicker label={t.colour} kind="swatch" options={colours} value={col} onChange={setCol} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
            <QuantityStepper value={qty} onChange={setQty} max={3} />
            <Button variant="primary" size="lg" iconStart="shopping-bag" onClick={() => onAdd(p, qty, col + ' · ' + size)} style={{ flex: 1, minWidth: 200 }}>{t.addToBag}</Button>
            <IconButton icon="heart" label="Save" size="lg" />
          </div>
          <Alert tone="info" title={shell.lang === 'ar' ? 'توصيل ٢–٤ أيام عمل' : 'Delivery in 2–4 working days'}>{shell.lang === 'ar' ? 'إرجاع مجاني خلال ٣٠ يوماً.' : 'Free returns within 30 days.'}</Alert>
          <Card padding="sm" elevation="none" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={shell.pbrand(p)} shape="rounded" />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{shell.pbrand(p)}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{shell.lang === 'ar' ? '٤.٨ تقييم البائع · ٣٤٠ منتج' : '4.8 seller rating · 340 products'}</span>
            </div>
            <Button variant="secondary" size="sm">{shell.lang === 'ar' ? 'زيارة المتجر' : 'Visit store'}</Button>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 'var(--section-gap)' }}>
        <Tabs active={tab} onChange={setTab} items={[{ id: 'desc', label: t.description }, { id: 'rev', label: t.reviews, count: p.reviews }, { id: 'ship', label: t.shipping }]} />
        <div style={{ paddingTop: 26, maxWidth: 760 }}>
          {tab === 'desc' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: shell.lang === 'ar' ? 1.8 : 1.6, color: 'var(--text-secondary)', maxWidth: '62ch' }}>{desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
                {specs.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Eyebrow>{k}</Eyebrow>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'rev' && <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}><ReviewSummary shell={shell} /><ReviewList shell={shell} /></div>}
          {tab === 'ship' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(shell.lang === 'ar'
                ? [['توصيل قياسي', '٢–٤ أيام عمل · مجاني فوق ٣٠٠ ر.س'], ['توصيل سريع', 'اليوم التالي · ٣٥ ر.س'], ['الإرجاع', 'مجاني خلال ٣٠ يوماً من الاستلام']]
                : [['Standard delivery', '2–4 working days · free over 300 SAR'], ['Express delivery', 'Next day · 35 SAR'], ['Returns', 'Free within 30 days of delivery']]
              ).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, paddingBlock: 12, borderBottom: '1px solid var(--border-hairline)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 'var(--section-gap)' }}>
        <SectionHeader eyebrow={shell.lang === 'ar' ? 'قد يعجبك' : 'You may also like'} title={shell.lang === 'ar' ? 'من الأتيليه نفسه' : 'From the same atelier'} size="sm" onPrev={() => {}} onNext={() => {}} />
        <div className="grid">{CATALOG.slice(1, 5).map(x => <ProductCard key={x.id} product={shell.loc(x)} onClick={() => onProduct(x)} onWishlist={() => {}} />)}</div>
      </div>
      <Footer shell={shell} />
    </div>
  );
}

Object.assign(window, { ProductScreen, Gallery, ReviewSummary, ReviewList });
