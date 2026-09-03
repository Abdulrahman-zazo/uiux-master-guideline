import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Tabs({ items = [], active, onChange, variant = 'underline', style }) {
  const pill = variant === 'pill';
  return (
    <div role="tablist" style={{
      display: 'flex', alignItems: 'center', gap: pill ? 6 : 28,
      borderBottom: pill ? 'none' : '1px solid var(--border-hairline)',
      background: pill ? 'var(--surface-sunken)' : 'transparent',
      borderRadius: pill ? 'var(--radius-pill)' : 0, padding: pill ? 4 : 0,
      overflowX: 'auto', ...style,
    }}>
      {items.map(it => {
        const id = typeof it === 'string' ? it : it.id;
        const label = typeof it === 'string' ? it : it.label;
        const count = typeof it === 'object' ? it.count : undefined;
        const icon = typeof it === 'object' ? it.icon : undefined;
        const on = id === active;
        return (
          <button key={id} role="tab" aria-selected={on} type="button" onClick={() => onChange && onChange(id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, border: 0, cursor: 'pointer',
              background: pill ? (on ? 'var(--surface-card)' : 'transparent') : 'transparent',
              boxShadow: pill && on ? 'var(--shadow-sm)' : 'none',
              borderRadius: pill ? 'var(--radius-pill)' : 0,
              padding: pill ? '8px 16px' : '0 0 12px',
              borderBottom: pill ? 'none' : '2px solid ' + (on ? 'var(--border-brand)' : 'transparent'),
              marginBottom: pill ? 0 : -1,
              color: on ? (pill ? 'var(--text-primary)' : 'var(--text-brand)') : 'var(--text-secondary)',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)',
              fontWeight: on ? 'var(--weight-medium)' : 'var(--weight-regular)',
              whiteSpace: 'nowrap', transition: 'var(--transition-control)',
            }}>
            {icon && <Icon name={icon} size={16} />}
            {label}
            {count != null && <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 11, background: 'var(--surface-sunken)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '1px 7px' }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
