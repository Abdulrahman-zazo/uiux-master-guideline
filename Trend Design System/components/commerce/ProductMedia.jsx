import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* Product photography placeholder. Trend supplied no imagery, so every
   product visual in this system renders as a neutral tinted frame until a
   real `src` is passed. Never substitute stock or generated imagery. */
export function ProductMedia({ src, alt = '', ratio = '3 / 4', radius = 'var(--radius-card-sm)', tint = 'neutral', children, style }) {
  const bg = tint === 'brand' ? 'var(--surface-brand-subtle)' : 'var(--surface-sunken)';
  return (
    <div style={{
      position: 'relative', aspectRatio: ratio, width: '100%', background: bg,
      borderRadius: radius, overflow: 'hidden', ...style,
    }}>
      {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--icon-muted)' }}>
            <Icon name="image" size={26} strokeWidth={1.5} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase' }}>Product image</span>
          </span>}
      {children}
    </div>
  );
}
