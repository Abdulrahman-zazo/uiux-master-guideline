import React from 'react';

/* Renders the backend Money `display` string verbatim. No arithmetic, no
   formatting, no digit conversion — the server owns all of that
   (design-handoff-data.md §2.0). Bidi-isolated so a Latin-digit price sits
   correctly inside an Arabic sentence. Currency symbol comes from
   `GET public/currencies`: ل.س in ar, SYP in en. */
const SYMBOL = { SYP: { ar: 'ل.س', en: 'SYP' } };

export function Money({ value, symbol, size = 'md', tone = 'default', strike, lang, style }) {
  if (!value || typeof value.display !== 'string') return null;
  const S = { sm: 14, md: 16, lg: 20, xl: 28 }[size] || 16;
  const l = lang || (typeof document !== 'undefined' && (document.documentElement.lang || 'ar').slice(0, 2)) || 'ar';
  const sym = symbol ?? (SYMBOL[value.currency] ? SYMBOL[value.currency][l] || SYMBOL[value.currency].ar : value.currency);
  const color = tone === 'discount' ? 'var(--text-discount)' : tone === 'muted' ? 'var(--text-muted)' : tone === 'positive' ? 'var(--text-success)' : 'var(--text-price)';
  return (
    <bdi style={{
      display: 'inline-flex', alignItems: 'baseline', gap: Math.max(3, Math.round(S * 0.2)),
      fontFamily: 'var(--font-numeric)', fontSize: S, fontWeight: 'var(--weight-semibold)',
      fontVariantNumeric: 'tabular-nums', fontFeatureSettings: 'var(--numeric-features)',
      color, lineHeight: 1.2, textDecoration: strike ? 'line-through' : 'none', whiteSpace: 'nowrap', ...style,
    }}>
      <span dir="ltr">{value.display}</span>
      <span style={{ fontSize: Math.round(S * 0.62), fontWeight: 'var(--weight-medium)', color: tone === 'default' ? 'var(--text-secondary)' : 'inherit' }}>{sym}</span>
    </bdi>
  );
}
