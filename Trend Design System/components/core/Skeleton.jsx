import React from 'react';

export function Skeleton({ width = '100%', height = 16, radius = 'var(--radius-sm)', circle, style }) {
  return (
    <span style={{
      display: 'block', width: circle ? height : width, height,
      borderRadius: circle ? 'var(--radius-pill)' : radius,
      background: 'linear-gradient(90deg, var(--surface-sunken) 0%, var(--neutral-50) 50%, var(--surface-sunken) 100%)',
      backgroundSize: '200% 100%', animation: 'trend-shimmer 1.4s var(--ease-in-out) infinite',
      ...style,
    }} />
  );
}
