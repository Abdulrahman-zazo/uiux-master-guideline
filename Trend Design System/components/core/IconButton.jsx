import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = { sm: 32, md: 40, lg: 48 };
const GLYPH = { sm: 16, md: 20, lg: 22 };

export function IconButton({ icon, label, variant = 'secondary', size = 'md', shape = 'circle', active, disabled, onClick, style, ...rest }) {
  const d = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const skins = {
    primary: { background: 'var(--surface-brand)', color: 'var(--text-on-brand)', border: '1px solid transparent' },
    secondary: { background: 'var(--surface-card)', color: 'var(--icon-default)', border: '1px solid var(--border-hairline)' },
    ghost: { background: 'transparent', color: 'var(--icon-default)', border: '1px solid transparent' },
    inverse: { background: 'rgba(255,255,255,.14)', color: '#fff', border: '1px solid rgba(255,255,255,.28)' },
  };
  const base = skins[variant] || skins.secondary;
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        background: active ? 'var(--surface-brand-subtle)' : hover && !disabled ? (variant === 'primary' ? 'var(--surface-brand-hover)' : 'var(--surface-sunken)') : base.background,
        color: active ? 'var(--text-brand)' : base.color,
        width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: shape === 'circle' ? 'var(--radius-pill)' : 'var(--radius-tag)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'var(--transition-control)', flex: '0 0 auto', ...style,
      }} {...rest}>
      <Icon name={icon} size={GLYPH[size] || 20} />
    </button>
  );
}
