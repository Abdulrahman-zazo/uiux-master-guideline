import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Logo } from '../core/Logo.jsx';

export function SidebarNav({ items = [], active, onNavigate, footer, collapsed, assetBase = '', title, style }) {
  return (
    <aside style={{
      width: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
      flex: '0 0 auto', background: 'var(--surface-card)',
      borderInlineEnd: '1px solid var(--border-hairline)',
      display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 12px',
      transition: 'width var(--duration-base) var(--ease-out)', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingInline: 8, marginBottom: 12, minHeight: 32 }}>
        <Logo variant={collapsed ? 'mark' : 'full'} height={collapsed ? 26 : 22} assetBase={assetBase} />
        {!collapsed && title && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', paddingInlineStart: 8, borderInlineStart: '1px solid var(--border-hairline)' }}>{title}</span>}
      </div>
      {items.map(it => {
        if (it.section) return <span key={it.section} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '14px 10px 4px' }}>{collapsed ? '' : it.section}</span>;
        const on = it.id === active;
        return (
          <a key={it.id} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(it.id); }}
            title={it.label}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              borderRadius: 'var(--radius-tag)', textDecoration: 'none',
              background: on ? 'var(--surface-brand-subtle)' : 'transparent',
              color: on ? 'var(--text-brand)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)',
              fontWeight: on ? 'var(--weight-medium)' : 'var(--weight-regular)',
              transition: 'var(--transition-control)', justifyContent: collapsed ? 'center' : 'flex-start',
            }}>
            {it.icon && <Icon name={it.icon} size={18} />}
            {!collapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>}
            {!collapsed && it.count != null && (
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 11, fontWeight: 'var(--weight-medium)', background: on ? 'var(--surface-brand)' : 'var(--surface-sunken)', color: on ? 'var(--text-on-brand)' : 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '1px 7px' }}>{it.count}</span>
            )}
          </a>
        );
      })}
      <div style={{ marginTop: 'auto' }}>{footer}</div>
    </aside>
  );
}
