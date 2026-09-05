import React from 'react';

export function PriceBlock({ amount, compareAt, currency = 'SAR', size = 'md', align = 'start', style }) {
  const S = { sm: 15, md: 18, lg: 24, xl: 36 }[size] || 18;
  const fmt = (n) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
  const off = compareAt && compareAt > amount ? Math.round((1 - amount / compareAt) * 100) : 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, justifyContent: align === 'end' ? 'flex-end' : 'flex-start', flexWrap: 'wrap', ...style }}>
      <span style={{
        fontFamily: 'var(--font-numeric)', fontSize: S, fontWeight: 'var(--weight-semibold)',
        letterSpacing: S >= 24 ? '-.02em' : '0', color: 'var(--text-price)',
        fontVariantNumeric: 'tabular-nums', lineHeight: 1.15,
      }}>
        {fmt(amount)}<span style={{ fontSize: Math.round(S * 0.62), fontWeight: 'var(--weight-medium)', marginInlineStart: 4, color: 'var(--text-secondary)' }}>{currency}</span>
      </span>
      {off > 0 && (
        <span style={{
          fontFamily: 'var(--font-numeric)', fontSize: Math.max(12, Math.round(S * 0.72)),
          color: 'var(--text-discount)', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums',
        }}>{fmt(compareAt)}</span>
      )}
    </span>
  );
}
