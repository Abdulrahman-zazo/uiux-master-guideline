import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function StockStatus({ level = 'in', count, style }) {
  const map = {
    in: { color: 'var(--text-success)', icon: 'check', text: 'In stock' },
    low: { color: 'var(--text-warning)', icon: 'triangle-alert', text: count != null ? 'Only ' + count + ' left' : 'Low stock' },
    out: { color: 'var(--text-danger)', icon: 'circle-x', text: 'Out of stock' },
    preorder: { color: 'var(--text-brand)', icon: 'clock', text: 'Pre-order' },
  };
  const s = map[level] || map.in;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: s.color, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', ...style }}>
      <Icon name={s.icon} size={14} strokeWidth={2} />{s.text}
    </span>
  );
}
