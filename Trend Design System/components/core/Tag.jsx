import React from 'react';
import { Icon } from './Icon.jsx';

export function Tag({ children, selected, removable, onRemove, onClick, icon, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px',
        borderRadius: 'var(--radius-tag)',
        background: selected ? 'var(--surface-brand)' : hover ? 'var(--surface-sunken)' : 'var(--surface-card)',
        color: selected ? 'var(--text-on-brand)' : 'var(--text-primary)',
        border: '1px solid ' + (selected ? 'transparent' : 'var(--border-hairline)'),
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)',
        lineHeight: 1.2, cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition-control)', whiteSpace: 'nowrap', ...style,
      }}>
      {icon && <Icon name={icon} size={14} />}
      {children}
      {removable && (
        <span onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}
          style={{ display: 'inline-flex', cursor: 'pointer', opacity: .7, marginInlineEnd: -2 }}>
          <Icon name="x" size={13} strokeWidth={2.25} />
        </span>
      )}
    </span>
  );
}
