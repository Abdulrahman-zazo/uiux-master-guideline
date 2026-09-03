import React from 'react';
import { Icon } from '../core/Icon.jsx';

const H = { sm: 36, md: 44, lg: 52 };

export function Input({ size = 'md', iconStart, iconEnd, suffix, invalid, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, height: H[size] || 44,
      paddingInline: 14, background: disabled ? 'var(--surface-sunken)' : 'var(--surface-input)',
      border: '1px solid ' + (invalid ? 'var(--text-danger)' : focus ? 'var(--border-focus)' : 'transparent'),
      borderRadius: 'var(--radius-input)', boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'var(--transition-control)', opacity: disabled ? 0.6 : 1, ...style,
    }}>
      {iconStart && <Icon name={iconStart} size={18} color="var(--icon-muted)" />}
      <input disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-ui)', fontSize: size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)',
          color: 'var(--text-primary)',
        }} {...rest} />
      {suffix && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{suffix}</span>}
      {iconEnd && <Icon name={iconEnd} size={18} color="var(--icon-muted)" />}
    </div>
  );
}
