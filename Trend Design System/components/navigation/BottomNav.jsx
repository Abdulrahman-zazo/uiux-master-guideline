import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function BottomNav({ items = [], active, onNavigate, style }) {
  return (
    <nav style={{
      height: 'var(--bottom-nav-height)', flex: '0 0 auto',
      background: 'var(--surface-card)', borderTop: '1px solid var(--border-hairline)',
      display: 'flex', alignItems: 'stretch', ...style,
    }}>
      {items.map(it => {
        const on = it.id === active;
        return (
          <button key={it.id} type="button" onClick={() => onNavigate && onNavigate(it.id)}
            style={{
              flex: 1, border: 0, background: 'transparent', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer',
              color: on ? 'var(--text-brand)' : 'var(--text-muted)', position: 'relative',
              transition: 'var(--transition-control)', minHeight: 48,
            }}>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon name={it.icon} size={22} strokeWidth={on ? 2 : 1.75} />
              {it.count > 0 && <span style={{ position: 'absolute', top: -3, insetInlineEnd: -6, minWidth: 15, height: 15, borderRadius: 'var(--radius-pill)', background: 'var(--surface-brand)', color: 'var(--text-on-brand)', fontFamily: 'var(--font-numeric)', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{it.count}</span>}
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: on ? 'var(--weight-medium)' : 'var(--weight-regular)', letterSpacing: '.01em' }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
