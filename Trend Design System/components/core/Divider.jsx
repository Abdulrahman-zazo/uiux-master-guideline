import React from 'react';

export function Divider({ orientation = 'horizontal', label, spacing = 24, style }) {
  if (orientation === 'vertical') {
    return <span style={{ width: 1, alignSelf: 'stretch', background: 'var(--border-hairline)', marginInline: spacing, flex: '0 0 auto', ...style }} />;
  }
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBlock: spacing, ...style }}>
        <span style={{ height: 1, flex: 1, background: 'var(--border-hairline)' }} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-caption)' }}>{label}</span>
        <span style={{ height: 1, flex: 1, background: 'var(--border-hairline)' }} />
      </div>
    );
  }
  return <hr style={{ border: 0, height: 1, background: 'var(--border-hairline)', marginBlock: spacing, ...style }} />;
}
