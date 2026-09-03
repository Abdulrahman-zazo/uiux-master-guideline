import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function SearchField({ value = '', onChange, onSubmit, placeholder = 'Search', size = 'md', shortcut, style }) {
  const [focus, setFocus] = React.useState(false);
  const H = { sm: 36, md: 44, lg: 52 };
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, height: H[size] || 44, paddingInline: 16,
        background: 'var(--surface-input)', borderRadius: 'var(--radius-pill)',
        border: '1px solid ' + (focus ? 'var(--border-focus)' : 'transparent'),
        boxShadow: focus ? 'var(--focus-ring)' : 'none', transition: 'var(--transition-control)', ...style,
      }}>
      <Icon name="search" size={18} color="var(--icon-muted)" />
      <input value={value} placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', color: 'var(--text-primary)' }} />
      {value ? (
        <span onClick={() => onChange && onChange('')} style={{ display: 'flex', cursor: 'pointer', color: 'var(--icon-muted)' }}>
          <Icon name="x" size={16} strokeWidth={2} />
        </span>
      ) : shortcut ? (
        <kbd style={{
          fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)',
          border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-xs)',
          padding: '2px 6px', background: 'var(--surface-card)',
        }}>{shortcut}</kbd>
      ) : null}
    </form>
  );
}
