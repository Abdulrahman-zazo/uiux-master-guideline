function App() {
  const shell = useKitShell('en');
  const [route, setRoute] = React.useState('landing');
  const go = (r) => { setRoute(r); window.scrollTo(0, 0); };
  const chrome = route === 'landing';
  return (
    <>
      {chrome && <MarketingNav shell={shell} go={go} />}
      {route === 'landing' && <LandingScreen shell={shell} go={go} />}
      {route === 'signin' && <SignInScreen shell={shell} go={go} />}
      {route === 'signup' && <SignUpScreen shell={shell} go={go} />}
      {route === 'onboarding' && <OnboardingScreen shell={shell} go={go} />}
      {chrome && <Footer2 shell={shell} />}
    </>
  );
}

function Footer2({ shell }) {
  const { Logo } = window.TrendDesignSystem_7e8edd;
  const ar = shell.lang === 'ar';
  const cols = ar
    ? [['البيع', ['ابدئي البيع', 'الأسعار', 'الشحن', 'قصص النجاح']], ['ترند', ['من نحن', 'الوظائف', 'الصحافة', 'الاستدامة']], ['المساعدة', ['مركز البائعين', 'اتصلي بنا', 'الشروط', 'الخصوصية']]]
    : [['Selling', ['Start selling', 'Pricing', 'Shipping', 'Success stories']], ['Trend', ['About', 'Careers', 'Press', 'Sustainability']], ['Help', ['Seller centre', 'Contact us', 'Terms', 'Privacy']]];
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--neutral-300)' }}>
      <div className="wrap" style={{ paddingBlock: 48, display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(3,minmax(0,1fr))', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Logo theme="dark" height={24} assetBase="../../assets/" />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', lineHeight: 1.7, maxWidth: '30ch' }}>{ar ? 'منصة تسوّق للأزياء والجمال في الخليج.' : 'A fashion and beauty marketplace for the Gulf.'}</p>
        </div>
        {cols.map(([head, links]) => (
          <div key={head} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--neutral-400)' }}>{head}</span>
            {links.map(l => <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--neutral-300)', textDecoration: 'none' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div className="wrap" style={{ paddingBottom: 32 }}>
        <div style={{ height: 1, background: 'var(--neutral-800)', marginBottom: 18 }} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--neutral-500)' }}>© 2026 Trend.</span>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
