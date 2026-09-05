const { Logo, Button, Input, FormField, OTPField, RateLimitTimer, Alert, Icon, Eyebrow } = window.TrendDesignSystem_7e8edd;

/* A2 Onboarding — 3 cards, skippable, no sign-in ask. */
function MOnboarding({ shell, go }) {
  const [i, setI] = React.useState(0);
  const cards = shell.en
    ? [['store', 'Damascus markets, in your pocket', 'Real shops from Al-Hamidiyah to Al-Salihiyah.'], ['camera', 'Real photos from inside the shop', 'Every product is photographed at the stall.'], ['banknote', 'Pay on delivery', 'Cash to the courier. We call to confirm first.']]
    : [['store', 'أسواق دمشق في جيبك', 'محلات حقيقية من الحميدية إلى الصالحية.'], ['camera', 'صور حقيقية من داخل المحل', 'كل منتج مصوّر في مكانه.'], ['banknote', 'ادفع عند الاستلام', 'نقداً لمندوب التوصيل، بعد مكالمة تأكيد.']];
  const [ic, h, b] = cards[i];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '4px 12px' }}><Button variant="ghost" size="sm" onClick={() => go('home')}>{shell.en ? 'Skip' : 'تخطّي'}</Button></div>
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32, gap: 18 }}>
        <span style={{ width: 120, height: 120, borderRadius: 'var(--radius-pill)', background: 'var(--surface-tinted)', color: 'var(--icon-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={ic} size={48} strokeWidth={1.5} /></span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)', fontWeight: 'var(--weight-h1)', lineHeight: 1.3, color: 'var(--text-primary)' }}>{h}</span>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', maxWidth: '30ch' }}>{b}</p>
        <div style={{ display: 'flex', gap: 6 }}>{cards.map((_, n) => <span key={n} style={{ width: n === i ? 18 : 6, height: 6, borderRadius: 3, background: n === i ? 'var(--surface-brand)' : 'var(--border-strong)' }} />)}</div>
      </div>
      <div className="sticky"><Button variant="primary" size="lg" fullWidth onClick={() => i < 2 ? setI(i + 1) : go('home')}>{i < 2 ? (shell.en ? 'Next' : 'التالي') : (shell.en ? 'Start shopping' : 'ابدأ التسوق')}</Button></div>
    </>
  );
}

/* A3 Phone entry */
function MPhone({ shell, go, cooldown }) {
  const { t } = shell;
  return (
    <>
      <AppBar onBack={() => go('cart')} title="" />
      <div className="screen" style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Logo height={22} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', lineHeight: 1.35 }}>{t.phoneEntry}</span>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-body-sm)', color: 'var(--text-secondary)' }}>{t.phoneWhy}</p>
        </div>
        <FormField label={shell.en ? 'Mobile number' : 'رقم الجوال'} required>
          <Input dir="ltr" inputMode="tel" size="lg" iconStart="phone" defaultValue="+963 9" placeholder="+963 9__ ___ ___" style={{ fontFamily: 'var(--font-numeric)' }} />
        </FormField>
        {cooldown && <Alert tone="warning" title={shell.en ? 'Please wait before requesting another code' : 'انتظر قبل طلب رمز جديد'}><RateLimitTimer seconds={cooldown} label={shell.en ? 'Available in' : 'يتاح بعد'} compact /></Alert>}
        {/* Social sign-in slots hidden by feature flag — not drawn as ghosts (master plan §2). */}
      </div>
      <div className="sticky"><Button variant="primary" size="lg" fullWidth disabled={!!cooldown} onClick={() => go('otp')}>{t.sendCode}</Button></div>
    </>
  );
}

/* A4 OTP verify */
function MOtp({ shell, go, error }) {
  const { t } = shell;
  const [code, setCode] = React.useState(error ? '482913' : '');
  const [resend, setResend] = React.useState(false);
  const msg = { 'auth.otp_invalid': shell.en ? 'That code is not right. 2 attempts left.' : 'الرمز غير صحيح. بقيت محاولتان.', 'auth.otp_expired': shell.en ? 'This code has expired — request a new one.' : 'انتهت صلاحية الرمز — اطلب رمزاً جديداً.' }[error];
  return (
    <>
      <AppBar onBack={() => go('phone')} title="" />
      <div className="screen" style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', lineHeight: 1.35 }}>{shell.en ? 'Enter the code' : 'أدخل الرمز'}</span>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{t.codeSent} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', color: 'var(--text-primary)', fontWeight: 500 }}>+963 900 000 001</bdi></p>
        </div>
        <OTPField value={code} onChange={setCode} onComplete={() => !error && go('name')} invalid={!!error} autoFocus />
        {msg && <span role="alert" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-danger)' }}><Icon name="circle-alert" size={15} strokeWidth={2} />{msg}</span>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <RateLimitTimer seconds={287} label={t.expiresIn} compact />
          {resend ? <Button variant="ghost" size="sm" onClick={() => setResend(false)}>{t.resend}</Button> : <RateLimitTimer seconds={42} label={t.resendIn} compact onDone={() => setResend(true)} />}
        </div>
      </div>
      <div className="sticky"><Button variant="primary" size="lg" fullWidth disabled={code.length < 6} onClick={() => go('name')}>{t.verify}</Button></div>
    </>
  );
}

/* A5 Welcome / name (new users) — never blocks. */
function MName({ shell, go }) {
  const { t } = shell;
  return (
    <>
      <div className="screen" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ width: 56, height: 56, borderRadius: 'var(--radius-pill)', background: 'var(--surface-success-subtle)', color: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={26} strokeWidth={2.5} /></span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-h1)', lineHeight: 1.35 }}>{shell.en ? 'Welcome to Trendsy' : 'أهلاً بك في ترندسي'}</span>
        <FormField label={t.yourName} optional><Input placeholder={shell.en ? 'Rania' : 'رانيا'} size="lg" /></FormField>
      </div>
      <div className="sticky" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => go('checkout')}>{t.continueBtn}</Button>
        <Button variant="ghost" fullWidth onClick={() => go('checkout')}>{shell.en ? 'Skip' : 'تخطّي'}</Button>
      </div>
    </>
  );
}

Object.assign(window, { MOnboarding, MPhone, MOtp, MName });
