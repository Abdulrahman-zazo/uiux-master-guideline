const { Icon } = window.TrendDesignSystem_7e8edd;

/* Device shell only — no OS chrome is recreated beyond a neutral status row. */
function Phone({ children, label, time = '9:41' }) {
  return (
    <div>
      <div className="phone">
        <div className="status">
          <span>{time}</span>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: 'var(--icon-default)' }}>
            <Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-full" size={16} />
          </span>
        </div>
        {children}
      </div>
      {label && <div className="caption">{label}</div>}
    </div>
  );
}

/* In-app header: back / title / trailing action. */
function AppBar({ title, onBack, trailing, large }) {
  const { IconButton } = window.TrendDesignSystem_7e8edd;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px 10px', flex: '0 0 auto', minHeight: 48 }}>
      {onBack ? <IconButton icon="chevron-left" label="Back" variant="ghost" onClick={onBack} /> : <span style={{ width: 4 }} />}
      <span style={{ flex: 1, minWidth: 0, fontFamily: large ? 'var(--font-display)' : 'var(--font-ui)', fontSize: large ? 'var(--text-heading-sm)' : 'var(--text-body)', fontWeight: large ? 600 : 500, letterSpacing: large ? 'var(--tracking-heading-sm)' : 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      {trailing}
    </div>
  );
}

Object.assign(window, { Phone, AppBar });
