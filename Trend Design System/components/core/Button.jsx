import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = {
  sm: { height: 36, padding: '0 16px', fontSize: 14, gap: 6, icon: 16 },
  md: { height: 44, padding: '0 24px', fontSize: 15, gap: 8, icon: 18 },
  lg: { height: 52, padding: '0 32px', fontSize: 16, gap: 10, icon: 20 },
};

/* No shadow on any button; hover is a tint shift; press is a sunken fill.
   Source: trendsy-visual-direction.md §2 ("Buttons", "Hover / press"). */
function skin(variant) {
  switch (variant) {
    case 'outline': return { background: 'transparent', color: 'var(--text-brand)', border: '1px solid var(--border-outline-brand)' };
    case 'secondary': return { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)' };
    case 'ghost': return { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' };
    case 'subtle': return { background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)', border: '1px solid transparent' };
    case 'inverse': return { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)' };
    case 'danger': return { background: 'var(--danger-600)', color: '#fff', border: '1px solid transparent' };
    default: return { background: 'var(--surface-brand)', color: 'var(--text-on-brand)', border: '1px solid transparent' };
  }
}
const HOVER = {
  primary: 'var(--surface-brand-hover)', danger: '#8E1E17',
  outline: 'var(--surface-tinted)', secondary: 'var(--surface-sunken)', ghost: 'var(--surface-sunken)',
  subtle: 'var(--surface-brand-subtle-hover)', inverse: 'var(--neutral-50)',
};
const PRESS = { primary: 'var(--purple-900)', danger: '#7A1913', outline: 'var(--purple-100)', secondary: 'var(--neutral-200)', ghost: 'var(--neutral-200)', subtle: 'var(--purple-100)', inverse: 'var(--neutral-100)' };

export function Button({ children, variant = 'primary', size = 'md', iconStart, iconEnd, fullWidth, disabled, loading, processingLabel, type = 'button', onClick, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const base = skin(variant);
  const off = disabled || loading;
  return (
    <button type={type} onClick={onClick} disabled={off} aria-busy={loading || undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        ...base,
        background: press && !off ? PRESS[variant] : hover && !off ? HOVER[variant] : base.background,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding, width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-ui)', fontSize: s.fontSize, fontWeight: 'var(--weight-medium)',
        lineHeight: 1, borderRadius: 'var(--radius-pill)', cursor: off ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1, boxShadow: 'none',
        transition: 'var(--transition-control)', whiteSpace: 'nowrap', ...style,
      }} {...rest}>
      {loading ? <Icon name="loader-circle" size={s.icon} style={{ animation: 'trend-spin 1s linear infinite' }} /> : iconStart ? <Icon name={iconStart} size={s.icon} /> : null}
      {loading && processingLabel ? processingLabel : children}
      {iconEnd && !loading ? <Icon name={iconEnd} size={s.icon} /> : null}
    </button>
  );
}
