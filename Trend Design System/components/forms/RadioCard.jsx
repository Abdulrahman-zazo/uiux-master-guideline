import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* A selectable card with a radio affordance — payment method, delivery
   option, address choice. Selected = tinted surface + brand border. */
export function RadioCard({ checked, onSelect, title, description, icon, trailing, disabled, name, value, style }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? 'var(--surface-tinted)' : 'var(--surface-card)',
      border: '1px solid ' + (checked ? 'var(--border-brand)' : 'var(--border-hairline)'),
      borderRadius: 'var(--radius-card-sm)', opacity: disabled ? .5 : 1, transition: 'var(--transition-control)', ...style,
    }}>
      <input type="radio" name={name} value={value} checked={!!checked} disabled={disabled} onChange={() => onSelect && onSelect(value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 20, height: 20, borderRadius: '50%', flex: '0 0 auto', border: '1px solid ' + (checked ? 'var(--surface-brand)' : 'var(--border-strong)'), background: 'var(--surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-brand)', transform: checked ? 'scale(1)' : 'scale(0)', transition: 'transform var(--duration-fast) var(--ease-out)' }} />
      </span>
      {icon && <span style={{ color: 'var(--icon-brand)', display: 'inline-flex', flex: '0 0 auto' }}><Icon name={icon} size={20} direction="ltr" /></span>}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{title}</span>
        {description && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{description}</span>}
      </span>
      {trailing}
    </label>
  );
}
