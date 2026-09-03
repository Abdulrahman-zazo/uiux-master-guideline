import React from 'react';
import { Icon } from '../core/Icon.jsx';

const H = { sm: 36, md: 44, lg: 52 };

export function Select({ options = [], size = 'md', placeholder, invalid, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center', height: H[size] || 44,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-input)',
      border: '1px solid ' + (invalid ? 'var(--text-danger)' : focus ? 'var(--border-focus)' : 'transparent'),
      borderRadius: 'var(--radius-input)', boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'var(--transition-control)', opacity: disabled ? 0.6 : 1, ...style,
    }}>
      <select disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          appearance: 'none', WebkitAppearance: 'none', width: '100%', height: '100%',
          paddingInlineStart: 14, paddingInlineEnd: 40, border: 0, outline: 'none',
          background: 'transparent', fontFamily: 'var(--font-ui)',
          fontSize: size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)',
          color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer',
        }} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <span style={{ position: 'absolute', insetInlineEnd: 14, display: 'flex', pointerEvents: 'none' }}>
        <Icon name="chevron-down" size={18} color="var(--icon-muted)" />
      </span>
    </div>
  );
}
