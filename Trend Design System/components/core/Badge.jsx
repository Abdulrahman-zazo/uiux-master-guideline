import React from 'react';
import { Icon } from './Icon.jsx';

const TONES = {
  brand: { background: 'var(--surface-brand)', color: 'var(--text-on-brand)' },
  brandSubtle: { background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)' },
  neutral: { background: 'var(--surface-sunken)', color: 'var(--text-secondary)' },
  /* --text-on-inverse is the paired foreground for --surface-inverse; both flip together. */
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)' },
  success: { background: 'var(--surface-success-subtle)', color: 'var(--text-success)' },
  warning: { background: 'var(--surface-warning-subtle)', color: 'var(--text-warning)' },
  danger: { background: 'var(--surface-danger-subtle)', color: 'var(--text-danger)' },
  outline: { background: 'transparent', color: 'var(--text-secondary)', boxShadow: 'inset 0 0 0 1px var(--border-hairline)' },
};

export function Badge({ children, tone = 'neutral', icon, dot, style }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      ...t, display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-medium)',
      lineHeight: 1.5, whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flex: '0 0 auto' }} />}
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}
