import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Breadcrumb({ items = [], onNavigate, style }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', ...style }}>
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label;
        const last = i === items.length - 1;
        return (
          <React.Fragment key={label + i}>
            {last
              ? <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)' }}>{label}</span>
              : <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(typeof it === 'string' ? it : it.id, i); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{label}</a>}
            {!last && <span style={{ display: 'inline-flex', color: 'var(--icon-muted)' }}><Icon name="chevron-right" size={14} /></span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
