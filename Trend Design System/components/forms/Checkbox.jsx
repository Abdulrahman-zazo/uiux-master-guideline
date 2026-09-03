import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ checked, indeterminate, onChange, label, description, disabled, style }) {
  const on = checked || indeterminate;
  return (
    <label style={{
      display: 'flex', alignItems: description ? 'flex-start' : 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      <span onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 20, height: 20, flex: '0 0 auto', borderRadius: 'var(--radius-xs)',
          background: on ? 'var(--surface-brand)' : 'var(--surface-card)',
          border: '1px solid ' + (on ? 'var(--surface-brand)' : 'var(--border-strong)'),
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-on-brand)', transition: 'var(--transition-control)',
          marginTop: description ? 2 : 0,
        }}>
        {indeterminate ? <Icon name="minus" size={14} strokeWidth={2.5} /> : checked ? <Icon name="check" size={14} strokeWidth={2.75} /> : null}
      </span>
      {label && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{label}</span>
          {description && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
