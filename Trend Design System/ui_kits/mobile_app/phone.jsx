const { Icon, IconButton, Alert } = window.TrendDesignSystem_7e8edd;

/* Neutral device shell — no OS chrome recreated. Sets data-density="mobile"
   so the mobile type tier applies inside. */
function Phone({ children, label, shell, time = '9:41' }) {
  return (
    <div>
      <div className="phone" data-density="mobile">
        <div className="status">
          <span>{time}</span>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: 'var(--icon-default)' }}>
            <Icon name="signal" size={14} direction="ltr" /><Icon name={shell && shell.offline ? 'wifi-off' : 'wifi'} size={14} direction="ltr" /><Icon name="battery-full" size={16} direction="ltr" />
          </span>
        </div>
        {shell && shell.offline && <Alert tone="offline" banner title={shell.t.offline} />}
        {children}
      </div>
      {label && <div className="caption">{label}</div>}
    </div>
  );
}

/* In-app header: back · title · trailing. Back chevron mirrors via Icon. */
function AppBar({ title, onBack, trailing, large, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 10px', flex: '0 0 auto', minHeight: 48 }}>
      {onBack ? <IconButton icon="chevron-left" label="رجوع" variant="ghost" onClick={onBack} /> : <span style={{ width: 6 }} />}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: large ? 'var(--font-display)' : 'var(--font-ui)', fontSize: large ? 'var(--text-h1)' : 'var(--text-body-lg)', fontWeight: large ? 'var(--weight-h1)' : 'var(--weight-medium)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>{title}</span>
        {sub && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{sub}</span>}
      </div>
      {trailing}
    </div>
  );
}

/* Section: eyebrow-less heading row with a purple "see all" chevron link (visual direction §2). */
function MSection({ title, action, onAction, children, style }) {
  return (
    <section style={{ padding: '22px 16px 0', ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-display)', color: 'var(--text-primary)' }}>{title}</span>
        {action && <a href="#" onClick={(e) => { e.preventDefault(); onAction && onAction(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 500, textDecoration: 'none' }}>{action}<Icon name="chevron-left" size={15} /></a>}
      </div>
      {children}
    </section>
  );
}

Object.assign(window, { Phone, AppBar, MSection });
