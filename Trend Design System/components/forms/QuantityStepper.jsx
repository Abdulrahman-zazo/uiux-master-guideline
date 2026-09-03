import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, size = 'md', disabled, style }) {
  const h = size === 'sm' ? 32 : 40;
  const set = (n) => onChange && onChange(Math.max(min, Math.min(max, n)));
  const btn = (icon, delta, off) => (
    <button type="button" disabled={disabled || off} onClick={() => set(value + delta)}
      style={{
        width: h, height: h, border: 0, background: 'transparent', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', color: off ? 'var(--text-disabled)' : 'var(--icon-default)',
        cursor: off || disabled ? 'not-allowed' : 'pointer', borderRadius: 'var(--radius-pill)',
        transition: 'var(--transition-control)',
      }}>
      <Icon name={icon} size={16} strokeWidth={2.25} />
    </button>
  );
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: h,
      border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      {btn('minus', -1, value <= min)}
      <span style={{
        minWidth: 28, textAlign: 'center', fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)',
        fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)',
      }}>{value}</span>
      {btn('plus', 1, value >= max)}
    </span>
  );
}
