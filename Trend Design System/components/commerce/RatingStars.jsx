import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function RatingStars({ value = 0, count, size = 14, showValue, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} style={{ display: 'inline-flex', color: i <= Math.round(value) ? 'var(--purple-600)' : 'var(--border-strong)' }}>
            <Icon name="star" size={size}
              fill={i <= Math.round(value) ? 'currentColor' : 'none'}
              strokeWidth={i <= Math.round(value) ? 0 : 1.75} />
          </span>
        ))}
      </span>
      {showValue && <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{value.toFixed(1)}</span>}
      {count != null && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>({count})</span>}
    </span>
  );
}
