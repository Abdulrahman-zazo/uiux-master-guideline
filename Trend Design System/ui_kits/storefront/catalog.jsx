const { Breadcrumb, ProductCard, Tag, Select, Checkbox, Divider, Pagination, Button, Eyebrow, IconButton, Card, RatingStars } = window.TrendDesignSystem_7e8edd;

function FilterPanel({ shell }) {
  const [free, setFree] = React.useState(true);
  const heads = shell.lang === 'ar'
    ? { cat: 'الفئة', price: 'السعر', size: 'المقاس', rating: 'التقييم', free: 'شحن مجاني فقط' }
    : { cat: 'Category', price: 'Price', size: 'Size', rating: 'Rating', free: 'Free shipping only' };
  const cats = shell.lang === 'ar' ? ['عبايات', 'ملابس', 'حقائب', 'إكسسوارات', 'الجمال'] : ['Abayas', 'Clothing', 'Bags', 'Accessories', 'Beauty'];
  const [picked, setPicked] = React.useState([]);
  const toggle = (c) => setPicked(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  return (
    <aside style={{ width: 232, flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Eyebrow>{heads.cat}</Eyebrow>
        {cats.map(c => <Checkbox key={c} checked={picked.includes(c)} onChange={() => toggle(c)} label={c} />)}
      </div>
      <Divider spacing={0} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Eyebrow>{heads.price}</Eyebrow>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['0–200', '200–400', '400–800', '800+'].map(r => <Tag key={r}>{r}</Tag>)}
        </div>
      </div>
      <Divider spacing={0} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Eyebrow>{heads.size}</Eyebrow>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['XS', 'S', 'M', 'L', 'XL'].map(s => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <Divider spacing={0} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Eyebrow>{heads.rating}</Eyebrow>
        {[4, 3].map(r => <span key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Checkbox onChange={() => {}} /><RatingStars value={r} /><span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>&amp; up</span></span>)}
      </div>
      <Divider spacing={0} />
      <Checkbox checked={free} onChange={setFree} label={heads.free} />
    </aside>
  );
}

function CatalogScreen({ shell, onProduct }) {
  const { t } = shell;
  const [page, setPage] = React.useState(1);
  const sorts = shell.lang === 'ar' ? ['الأحدث', 'الأقل سعراً', 'الأعلى سعراً', 'الأعلى تقييماً'] : ['Newest', 'Price: low to high', 'Price: high to low', 'Top rated'];
  const crumbs = shell.lang === 'ar' ? ['الرئيسية', 'نساء', 'عبايات'] : ['Home', 'Women', 'Abayas'];
  return (
    <div className="wrap" style={{ paddingBlock: 28, minHeight: '70vh' }}>
      <Breadcrumb items={crumbs} />
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBlock: '18px 26px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, letterSpacing: shell.lang === 'ar' ? 0 : 'var(--tracking-heading)', color: 'var(--text-primary)' }}>{crumbs[2]}</h1>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{shell.money(248)} {t.results}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Select size="sm" options={sorts} style={{ width: 190 }} />
          <IconButton icon="layout-grid" label="Grid" active />
          <IconButton icon="list" label="List" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <FilterPanel shell={shell} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="grid">
            {[...CATALOG, ...CATALOG.slice(0, 4)].map((p, i) => <ProductCard key={i} product={shell.loc(p)} onClick={() => onProduct(p)} onWishlist={() => {}} />)}
          </div>
          <Pagination page={page} pages={12} onChange={setPage} style={{ marginTop: 40 }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CatalogScreen, FilterPanel });
