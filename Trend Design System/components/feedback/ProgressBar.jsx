import React from 'react';

export function ProgressBar({ value = 0, max = 100, label, showValue, tone = 'brand', size = 'md', style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const h = size === 'sm' ? 4 : size === 'lg' ? 10 : 6;
  const fill = { brand: 'var(--surface-brand)', success: 'var(--success-600)', warning: 'var(--warning-600)', danger: 'var(--danger-600)' }[tone];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)' }}>
          {label && <span style={{ color: 'var(--text-secondary)' }}>{label}</span>}
          {showValue && <span style={{ fontFamily: 'var(--font-numeric)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <span style={{ display: 'block', height: h, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        <span style={{ display: 'block', height: '100%', width: pct + '%', background: fill, borderRadius: 'var(--radius-pill)', transition: 'width var(--duration-slow) var(--ease-out)' }} />
      </span>
    </div>
  );
}
