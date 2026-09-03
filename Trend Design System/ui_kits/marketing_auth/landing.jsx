const { Button, Eyebrow, Card, Badge, SectionHeader, Icon, Logo, Divider, Avatar, RatingStars, StatCard, Tag, ProgressBar } = window.TrendDesignSystem_7e8edd;

function MarketingNav({ shell, go }) {
  const ar = shell.lang === 'ar';
  const links = ar ? ['لماذا ترند', 'الأسعار', 'قصص النجاح', 'المساعدة'] : ['Why Trend', 'Pricing', 'Success stories', 'Help'];
  return (
    <header style={{ background: 'var(--neutral-800)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="wrap" style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', gap: 28 }}>
        <Logo theme="dark" height={24} assetBase="../../assets/" />
        <nav style={{ display: 'flex', gap: 24, flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'rgba(255,255,255,.72)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>)}
        </nav>
        <KitControls shell={shell} tone="dark" />
        <Button variant="ghost" size="sm" style={{ color: '#fff' }} onClick={() => go('signin')}>{ar ? 'تسجيل الدخول' : 'Sign in'}</Button>
        <Button variant="inverse" size="sm" onClick={() => go('signup')}>{ar ? 'ابدأ البيع' : 'Start selling'}</Button>
      </div>
    </header>
  );
}

function MarketingHero({ shell, go }) {
  const ar = shell.lang === 'ar';
  return (
    <section style={{ background: 'var(--brand-wash)', paddingBlock: 'clamp(56px,8vw,112px)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.85fr)', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Eyebrow tone="brand">{ar ? 'بيعي على ترند' : 'Sell on Trend'}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-fluid)', fontWeight: 600, letterSpacing: ar ? 0 : 'var(--tracking-display)', lineHeight: ar ? 1.2 : 1.02, color: 'var(--text-on-wash)', textWrap: 'pretty' }}>{ar ? 'أتيليهك أمام مليون متسوّق' : 'Your atelier, in front of a million shoppers'}</h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: ar ? 1.8 : 1.55, color: 'var(--text-on-wash-soft)', maxWidth: '48ch' }}>{ar ? 'افتحي متجرك في أقل من ٢٤ ساعة. عمولة ١٢٪ فقط، بدون رسوم شهرية، وتحويلات كل أسبوع.' : 'Open your store in under 24 hours. 12% commission, no monthly fee, weekly payouts.'}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
            <Button variant="primary" size="lg" iconEnd="arrow-right" onClick={() => go('signup')}>{ar ? 'ابدئي البيع' : 'Start selling'}</Button>
            <Button variant="secondary" size="lg" style={{ borderColor: 'var(--border-on-wash)', color: 'var(--text-on-wash)' }}>{ar ? 'احسبي أرباحك' : 'Estimate my earnings'}</Button>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 12, flexWrap: 'wrap' }}>
            {(ar ? [['٤١٢', 'أتيليه'], ['١.٢م', 'متسوّق'], ['٢–٤', 'أيام توصيل']] : [['412', 'ateliers'], ['1.2M', 'shoppers'], ['2–4', 'day delivery']]).map(([v, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 26, fontWeight: 600, color: 'var(--text-on-wash)', lineHeight: 1.1 }}>{v}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-on-wash-soft)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <Card elevation="xl" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Eyebrow>{ar ? 'لوحة البائع' : 'Seller dashboard'}</Eyebrow>
          <StatCard chrome={false} label={ar ? 'الإيرادات' : 'Revenue'} value={ar ? '١٨٤٬٢٩٠' : '184,290'} unit={shell.t.currency} delta={12.4} deltaLabel={ar ? 'هذا الشهر' : 'this month'} />
          <Divider spacing={0} />
          <ProgressBar value={82} label={ar ? 'اكتمال ملف المتجر' : 'Store profile completion'} showValue />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge tone="success" dot>{ar ? '٩ طلبات جديدة' : '9 new orders'}</Badge>
            <Badge tone="brandSubtle" icon="wallet">{ar ? 'تحويل الخميس' : 'Payout Thursday'}</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
}

function ValueGrid({ shell }) {
  const ar = shell.lang === 'ar';
  const items = ar
    ? [['store', 'متجر في ٢٤ ساعة', 'ارفعي منتجاتك وابدئي البيع في اليوم نفسه — بدون بناء موقع.'],
       ['wallet', 'تحويلات أسبوعية', 'أرباحك تصل كل خميس، وتتابعينها لحظة بلحظة من لوحة البائع.'],
       ['truck', 'شحن ولوجستيات', 'نتولى الاستلام والتغليف والتوصيل في الخليج، أو اشحني بنفسك.'],
       ['chart-line', 'تحليلات حقيقية', 'اعرفي ما يُباع، ومن يشتري، ومتى ترفعين السعر.'],
       ['shield-check', 'حماية من الاحتيال', 'كل عملية دفع مؤمّنة ومراجعة قبل التحويل.'],
       ['megaphone', 'حملات مشتركة', 'ندعم أفضل القطع في الصفحة الرئيسية والبريد والحملات.']]
    : [['store', 'A store in 24 hours', 'Upload your products and start selling the same day — no website to build.'],
       ['wallet', 'Weekly payouts', 'Earnings land every Thursday, tracked live from your dashboard.'],
       ['truck', 'Shipping handled', 'We collect, pack and deliver across the Gulf — or ship it yourself.'],
       ['chart-line', 'Real analytics', 'See what sells, who buys, and when to raise your price.'],
       ['shield-check', 'Fraud protection', 'Every payment is secured and reviewed before payout.'],
       ['megaphone', 'Co-marketing', 'We feature strong pieces on the homepage, in email and in campaigns.']];
  return (
    <div className="wrap" style={{ paddingBlock: 'var(--section-gap)' }}>
      <SectionHeader eyebrow={ar ? 'لماذا ترند' : 'Why Trend'} title={ar ? 'كل ما تحتاجينه للبيع' : 'Everything you need to sell'} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
        {items.map(([ic, h, b]) => (
          <Card key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-pill)', background: 'var(--surface-brand-subtle)', color: 'var(--icon-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={ic} size={20} strokeWidth={1.75} /></span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 600, letterSpacing: ar ? 0 : 'var(--tracking-subheading)', color: 'var(--text-primary)' }}>{h}</span>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: ar ? 1.75 : 1.55, color: 'var(--text-secondary)' }}>{b}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PricingBand({ shell, go }) {
  const ar = shell.lang === 'ar';
  const plans = ar
    ? [['أساسي', '٠', 'شهرياً', ['عمولة ١٢٪', 'حتى ٥٠ منتج', 'تحويل أسبوعي', 'دعم بالبريد'], false],
       ['متقدم', '٢٩٩', 'شهرياً', ['عمولة ٨٪', 'منتجات غير محدودة', 'تحويل أسبوعي', 'دعم مخصص', 'ظهور في الحملات'], true],
       ['مؤسسات', 'تواصلي', '', ['عمولة مخصصة', 'مدير حساب', 'تكامل API', 'اتفاقية مستوى خدمة'], false]]
    : [['Basic', '0', 'per month', ['12% commission', 'Up to 50 products', 'Weekly payouts', 'Email support'], false],
       ['Growth', '299', 'per month', ['8% commission', 'Unlimited products', 'Weekly payouts', 'Dedicated support', 'Campaign placement'], true],
       ['Enterprise', 'Talk to us', '', ['Custom commission', 'Account manager', 'API integration', 'Service-level agreement'], false]];
  return (
    <div style={{ background: 'var(--surface-card)', borderBlock: '1px solid var(--border-hairline)' }}>
      <div className="wrap" style={{ paddingBlock: 'var(--section-gap)' }}>
        <SectionHeader eyebrow={ar ? 'الأسعار' : 'Pricing'} title={ar ? 'بدون رسوم مفاجئة' : 'No surprise fees'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, alignItems: 'start' }}>
          {plans.map(([name, price, per, feats, featured]) => (
            <Card key={name} elevation={featured ? 'xl' : 'sm'} style={{ display: 'flex', flexDirection: 'column', gap: 16, borderColor: featured ? 'var(--border-brand)' : 'var(--border-hairline)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <Eyebrow tone={featured ? 'brand' : 'muted'}>{name}</Eyebrow>
                {featured && <Badge tone="brand">{ar ? 'الأكثر اختياراً' : 'Most chosen'}</Badge>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 40, fontWeight: 600, letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: 1 }}>{price}</span>
                {per && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{shell.t.currency} · {per}</span>}
              </div>
              <Divider spacing={0} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {feats.map(ft => (
                  <span key={ft} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>
                    <Icon name="check" size={15} strokeWidth={2.25} color="var(--icon-brand)" />{ft}
                  </span>
                ))}
              </div>
              <Button variant={featured ? 'primary' : 'secondary'} fullWidth onClick={() => go('signup')} style={{ marginTop: 'auto' }}>{ar ? 'ابدئي' : 'Get started'}</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonial({ shell }) {
  const ar = shell.lang === 'ar';
  const quote = ar
    ? '«في أول تسعين يوماً بعنا أكثر من كل سنة ٢٠٢٥ مجتمعة. لم نضطر لبناء موقع ولا لتوظيف أحد.»'
    : '"In our first ninety days we sold more than in all of 2025 combined. We never built a website or hired anyone."';
  return (
    <div className="wrap" style={{ paddingBlock: 'var(--section-gap)', maxWidth: 860, textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, lineHeight: ar ? 1.5 : 1.2, letterSpacing: ar ? 0 : 'var(--tracking-heading)', color: 'var(--text-primary)', textWrap: 'balance' }}>{quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <Avatar name={ar ? 'نور أتيليه' : 'Nour Atelier'} shape="rounded" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{ar ? 'نورة الشمري' : 'Noura Al-Shammari'}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{ar ? 'مؤسسة نور أتيليه، الرياض' : 'Founder, Nour Atelier · Riyadh'}</span>
        </div>
      </div>
    </div>
  );
}

function ClosingCta({ shell, go }) {
  const ar = shell.lang === 'ar';
  return (
    <div className="wrap" style={{ paddingBottom: 'var(--section-gap)' }}>
      <Card padding="none" bordered={false} style={{ background: 'var(--brand-wash-deep)', overflow: 'hidden' }}>
        <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <Eyebrow tone="inverse">{ar ? 'بدون رسوم إعداد' : 'No setup fee'}</Eyebrow>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, color: '#fff', letterSpacing: ar ? 0 : 'var(--tracking-heading)', lineHeight: 1.15 }}>{ar ? 'افتحي متجرك اليوم' : 'Open your store today'}</span>
          </div>
          <Button variant="inverse" size="lg" iconEnd="arrow-right" onClick={() => go('signup')}>{ar ? 'ابدئي البيع' : 'Start selling'}</Button>
        </div>
      </Card>
    </div>
  );
}

function LandingScreen({ shell, go }) {
  return (
    <>
      <MarketingHero shell={shell} go={go} />
      <ValueGrid shell={shell} />
      <PricingBand shell={shell} go={go} />
      <Testimonial shell={shell} />
      <ClosingCta shell={shell} go={go} />
    </>
  );
}

Object.assign(window, { MarketingNav, LandingScreen, MarketingHero, ValueGrid, PricingBand, Testimonial, ClosingCta });
