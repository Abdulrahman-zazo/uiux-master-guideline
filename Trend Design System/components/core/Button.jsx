import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = {
  sm: { height: 36, padding: '0 16px', fontSize: 14, gap: 6, icon: 16 },
  md: { height: 44, padding: '0 24px', fontSize: 15, gap: 8, icon: 18 },
  lg: { height: 52, padding: '0 32px', fontSize: 16, gap: 10, icon: 20 },
};

function skin(variant) {
  switch (variant) {
    case 'secondary': return { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)', boxShadow: 'none' };
    case 'ghost': return { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent', boxShadow: 'none' };
    case 'subtle': return { background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)', border: '1px solid transparent', boxShadow: 'none' };
    case 'inverse': return { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)', boxShadow: 'var(--shadow-md)' };
    case 'danger': return { background: 'var(--danger-600)', color: '#fff', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' };
    default: return { background: 'var(--surface-brand)', color: 'var(--text-on-brand)', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' };
  }
}

export function Button({ children, variant = 'primary', size = 'md', iconStart, iconEnd, fullWidth, disabled, loading, type = 'button', onClick, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const base = skin(variant);
  const hoverBg = {
    primary: 'var(--surface-brand-hover)', danger: '#8E1E17',
    secondary: 'var(--surface-sunken)', ghost: 'var(--surface-brand-subtle)',
    subtle: 'var(--surface-brand-subtle-hover)', inverse: 'var(--neutral-50)',
  }[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        ...base,
        background: hover && !disabled ? hoverBg : base.background,
        boxShadow: variant === 'primary' && hover && !disabled ? 'var(--shadow-brand)' : base.boxShadow,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding, width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-ui)', fontSize: s.fontSize, fontWeight: 'var(--weight-medium)',
        lineHeight: 1, borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1, transform: press && !disabled ? 'scale(.97)' : 'scale(1)',
        transition: 'var(--transition-control)', whiteSpace: 'nowrap', ...style,
      }} {...rest}>
      {loading ? <Icon name="loader-circle" size={s.icon} style={{ animation: 'trend-spin 1s linear infinite' }} /> : iconStart ? <Icon name={iconStart} size={s.icon} /> : null}
      {children}
      {iconEnd && !loading ? <Icon name={iconEnd} size={s.icon} /> : null}
    </button>
  );
}
