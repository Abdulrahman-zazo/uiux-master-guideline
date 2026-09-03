const { Card, Logo, Button, Input, FormField, Checkbox, Divider, Eyebrow, Icon, Badge, ProgressBar, Select, Alert, Avatar } = window.TrendDesignSystem_7e8edd;

function AuthShell({ shell, children, aside }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.85fr)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(28px,5vw,72px)', background: 'var(--surface-card)' }}>
        <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Logo height={26} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} />
          {children}
        </div>
      </div>
      <div style={{ background: 'var(--brand-wash-deep)', padding: 'clamp(28px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {aside}
      </div>
    </div>
  );
}

function SocialRow({ shell }) {
  const ar = shell.lang === 'ar';
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button variant="secondary" fullWidth iconStart="apple">Apple</Button>
      <Button variant="secondary" fullWidth iconStart="chrome">Google</Button>
    </div>
  );
}

function SignInScreen({ shell, go }) {
  const ar = shell.lang === 'ar';
  return (
    <AuthShell shell={shell} aside={
      <>
        <Eyebrow tone="inverse">{ar ? 'ترند للبائعين' : 'Trend for sellers'}</Eyebrow>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-lg-fluid)', fontWeight: 600, color: '#fff', letterSpacing: ar ? 0 : 'var(--tracking-heading-lg)', lineHeight: ar ? 1.3 : 1.08 }}>{ar ? 'كل طلباتك في مكان واحد' : 'Every order in one place'}</span>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: ar ? 1.8 : 1.6, color: 'rgba(255,255,255,.78)', maxWidth: '40ch' }}>{ar ? '٤١٢ أتيليه تدير مخزونها وطلباتها وتحويلاتها من لوحة ترند.' : '412 ateliers run their stock, orders and payouts from the Trend dashboard.'}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
          <Badge tone="inverse" icon="shield-check">{ar ? 'مصادقة ثنائية' : '2-factor auth'}</Badge>
          <Badge tone="inverse" icon="wallet">{ar ? 'تحويلات أسبوعية' : 'Weekly payouts'}</Badge>
        </div>
      </>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-sm)', fontWeight: 600, letterSpacing: ar ? 0 : 'var(--tracking-heading-sm)', color: 'var(--text-primary)' }}>{ar ? 'تسجيل الدخول' : 'Sign in'}</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{ar ? 'لا تملكين حساباً؟' : 'No account yet?'} <a href="#" onClick={e => { e.preventDefault(); go('signup'); }}>{ar ? 'ابدئي البيع' : 'Start selling'}</a></p>
      </div>
      <SocialRow shell={shell} />
      <Divider label={ar ? 'أو بالبريد الإلكتروني' : 'or with email'} spacing={2} />
      <FormField label={ar ? 'البريد الإلكتروني' : 'Email'} required><Input iconStart="mail" type="email" placeholder="you@atelier.sa" /></FormField>
      <FormField label={ar ? 'كلمة المرور' : 'Password'} required><Input iconStart="lock" iconEnd="eye" type="password" placeholder="••••••••" /></FormField>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Checkbox checked label={ar ? 'أبقني مسجلة' : 'Keep me signed in'} onChange={() => {}} />
        <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>{ar ? 'نسيت كلمة المرور؟' : 'Forgot password?'}</a>
      </div>
      <Button variant="primary" size="lg" fullWidth onClick={() => go('onboarding')}>{ar ? 'تسجيل الدخول' : 'Sign in'}</Button>
      <span style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
        <Icon name="lock" size={13} />{ar ? 'اتصال مشفّر' : 'Encrypted connection'}
      </span>
    </AuthShell>
  );
}

function SignUpScreen({ shell, go }) {
  const ar = shell.lang === 'ar';
  return (
    <AuthShell shell={shell} aside={
      <>
        <Eyebrow tone="inverse">{ar ? 'الانضمام مجاني' : 'Joining is free'}</Eyebrow>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-lg-fluid)', fontWeight: 600, color: '#fff', letterSpacing: ar ? 0 : 'var(--tracking-heading-lg)', lineHeight: ar ? 1.3 : 1.08 }}>{ar ? 'متجرك جاهز في ٢٤ ساعة' : 'Your store, live in 24 hours'}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
          {(ar ? ['بدون رسوم إعداد أو رسوم شهرية', 'عمولة ١٢٪ على المبيعات فقط', 'تحويلات كل خميس', 'إلغاء في أي وقت']
                : ['No setup or monthly fee', '12% commission on sales only', 'Payouts every Thursday', 'Cancel any time']).map(l => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'rgba(255,255,255,.86)' }}>
              <Icon name="check" size={16} strokeWidth={2.25} color="#C89AD1" />{l}
            </span>
          ))}
        </div>
      </>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-sm)', fontWeight: 600, letterSpacing: ar ? 0 : 'var(--tracking-heading-sm)' }}>{ar ? 'أنشئي حساب بائع' : 'Create a seller account'}</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{ar ? 'لديك حساب؟' : 'Already have one?'} <a href="#" onClick={e => { e.preventDefault(); go('signin'); }}>{ar ? 'تسجيل الدخول' : 'Sign in'}</a></p>
      </div>
      <FormField label={ar ? 'اسم المتجر' : 'Store name'} required hint={ar ? 'هذا ما يراه المتسوّقون' : 'This is what shoppers see'}><Input placeholder={ar ? 'نور أتيليه' : 'Nour Atelier'} /></FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormField label={ar ? 'البريد الإلكتروني' : 'Email'} required><Input iconStart="mail" type="email" placeholder="you@atelier.sa" /></FormField>
        <FormField label={ar ? 'رقم الجوال' : 'Mobile'} required><Input iconStart="phone" placeholder="+966 5X XXX XXXX" /></FormField>
      </div>
      <FormField label={ar ? 'المدينة' : 'City'} required><Select placeholder={ar ? 'اختاري المدينة' : 'Choose a city'} options={ar ? ['الرياض', 'جدة', 'الدمام', 'دبي', 'الكويت'] : ['Riyadh', 'Jeddah', 'Dammam', 'Dubai', 'Kuwait City']} /></FormField>
      <FormField label={ar ? 'كلمة المرور' : 'Password'} required hint={ar ? '٨ أحرف على الأقل' : 'At least 8 characters'}><Input iconStart="lock" iconEnd="eye" type="password" placeholder="••••••••" /></FormField>
      <Checkbox checked onChange={() => {}} label={ar ? 'أوافق على شروط البائعين وسياسة الخصوصية' : 'I agree to the seller terms and privacy policy'} />
      <Button variant="primary" size="lg" fullWidth iconEnd="arrow-right" onClick={() => go('onboarding')}>{ar ? 'إنشاء المتجر' : 'Create my store'}</Button>
    </AuthShell>
  );
}

function OnboardingScreen({ shell, go }) {
  const ar = shell.lang === 'ar';
  const [step, setStep] = React.useState(2);
  const steps = ar ? ['بيانات المتجر', 'التوثيق', 'الشحن', 'أول منتج'] : ['Store details', 'Verification', 'Shipping', 'First product'];
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-canvas)' }}>
      <div style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="wrap" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <Logo height={22} assetBase="../../assets/" theme={shell.theme === 'dark' ? 'dark' : 'light'} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <KitControls shell={shell} tone="light" />
            <Button variant="ghost" size="sm" onClick={() => go('landing')}>{ar ? 'إكمال لاحقاً' : 'Finish later'}</Button>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBlock: 40, maxWidth: 760 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Eyebrow>{ar ? `الخطوة ${step} من ٤` : `Step ${step} of 4`}</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-fluid)', fontWeight: 600, letterSpacing: ar ? 0 : 'var(--tracking-heading)', lineHeight: 1.15 }}>{ar ? 'وثّقي متجرك' : 'Verify your store'}</h1>
            <ProgressBar value={(step / 4) * 100} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {steps.map((s, i) => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: i + 1 <= step ? 'var(--text-brand)' : 'var(--text-muted)' }}>
                  <Icon name={i + 1 < step ? 'circle-check' : 'circle'} size={14} strokeWidth={2} />{s}
                </span>
              ))}
            </div>
          </div>
          <Alert tone="info" title={ar ? 'المراجعة تستغرق أقل من ٢٤ ساعة' : 'Review takes under 24 hours'}>{ar ? 'يمكنك رفع منتجاتك أثناء المراجعة.' : 'You can upload products while we review.'}</Alert>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow>{ar ? 'السجل التجاري' : 'Commercial registration'}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label={ar ? 'رقم السجل' : 'Registration number'} required><Input placeholder="1010XXXXXX" /></FormField>
              <FormField label={ar ? 'الرقم الضريبي' : 'VAT number'} optional><Input placeholder="3000XXXXXXXXXX3" /></FormField>
            </div>
            <div style={{ border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--radius-card-sm)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
              <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-pill)', background: 'var(--surface-brand-subtle)', color: 'var(--icon-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="upload" size={19} /></span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>{ar ? 'ارفعي صورة السجل التجاري' : 'Upload your registration document'}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{ar ? 'PDF أو JPG · حتى ١٠ ميجابايت' : 'PDF or JPG · up to 10 MB'}</span>
            </div>
          </Card>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow>{ar ? 'الحساب البنكي للتحويلات' : 'Payout bank account'}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label={ar ? 'اسم صاحب الحساب' : 'Account holder'} required><Input placeholder={ar ? 'نورة الشمري' : 'Noura Al-Shammari'} /></FormField>
              <FormField label="IBAN" required><Input placeholder="SA00 0000 0000 0000 0000 0000" /></FormField>
            </div>
            <Checkbox checked onChange={() => {}} label={ar ? 'أؤكد أن البيانات صحيحة' : 'I confirm these details are correct'} />
          </Card>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="lg" onClick={() => setStep(Math.max(1, step - 1))}>{ar ? 'رجوع' : 'Back'}</Button>
            <Button variant="primary" size="lg" iconEnd="arrow-right" onClick={() => setStep(Math.min(4, step + 1))}>{ar ? 'التالي' : 'Continue'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SignInScreen, SignUpScreen, OnboardingScreen, AuthShell });
