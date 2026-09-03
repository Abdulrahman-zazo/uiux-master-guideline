import React from 'react';

export function Eyebrow({ children, tone = 'muted', style }) {
  const colors = { muted: 'var(--text-muted)', brand: 'var(--text-brand)', inverse: 'rgba(255,255,255,.72)' };
  return (
    <span style={{
      display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase', color: colors[tone], lineHeight: 1.4, ...style,
    }}>{children}</span>
  );
}
