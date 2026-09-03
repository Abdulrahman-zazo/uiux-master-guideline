import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

export function Avatar({ src, name = '', size = 'md', shape = 'circle', style }) {
  const d = SIZES[size] || SIZES.md;
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <span style={{
      width: d, height: d, borderRadius: shape === 'circle' ? 'var(--radius-pill)' : 'var(--radius-tag)',
      background: src ? 'var(--surface-sunken)' : 'var(--surface-brand-subtle)',
      color: 'var(--text-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flex: '0 0 auto', fontFamily: 'var(--font-ui)',
      fontSize: Math.round(d * 0.38), fontWeight: 'var(--weight-medium)', letterSpacing: '.02em',
      border: '1px solid var(--border-hairline)', ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : initials || <Icon name="user" size={Math.round(d * 0.5)} />}
    </span>
  );
}
