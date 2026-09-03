import React from 'react';
import { Icon } from '../core/Icon.jsx';

const TONES = {
  info: { bg: 'var(--surface-brand-subtle)', fg: 'var(--text-brand)', icon: 'info' },
  success: { bg: 'var(--surface-success-subtle)', fg: 'var(--text-success)', icon: 'circle-check' },
  warning: { bg: 'var(--surface-warning-subtle)', fg: 'var(--text-warning)', icon: 'triangle-alert' },
  danger: { bg: 'var(--surface-danger-subtle)', fg: 'var(--text-danger)', icon: 'circle-alert' },
};

export function Alert({ tone = 'info', title, children, action, onDismiss, style }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '14px 16px', background: t.bg,
      borderRadius: 'var(--radius-card-sm)', ...style,
    }}>
      <span style={{ color: t.fg, display: 'flex', flex: '0 0 auto', marginTop: 1 }}><Icon name={t.icon} size={18} strokeWidth={2} /></span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {title && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{title}</span>}
        {children && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{children}</span>}
        {action && <span style={{ marginTop: 6 }}>{action}</span>}
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss"
          style={{ border: 0, background: 'transparent', color: 'var(--icon-muted)', cursor: 'pointer', display: 'flex', flex: '0 0 auto', padding: 0 }}>
          <Icon name="x" size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
