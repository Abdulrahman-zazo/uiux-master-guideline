import React from 'react';

export function Switch({ checked, onChange, label, size = 'md', disabled, style }) {
  const w = size === 'sm' ? 36 : 44, h = size === 'sm' ? 20 : 24, k = h - 6;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <span onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: w, height: h, borderRadius: 'var(--radius-pill)', flex: '0 0 auto',
          background: checked ? 'var(--surface-brand)' : 'var(--border-strong)',
          padding: 3, display: 'inline-flex', alignItems: 'center',
          transition: 'background-color var(--duration-base) var(--ease-out)',
        }}>
        <span style={{
          width: k, height: k, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-sm)',
          transform: checked ? 'translateX(' + (w - h) + 'px)' : 'translateX(0)',
          transition: 'transform var(--duration-base) var(--ease-out)',
        }} />
      </span>
      {label && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
