import React from 'react';

export function Radio({ checked, onChange, label, description, name, value, disabled, style }) {
  return (
    <label style={{
      display: 'flex', alignItems: description ? 'flex-start' : 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      <input type="radio" name={name} value={value} checked={!!checked} disabled={disabled}
        onChange={() => onChange && onChange(value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 20, height: 20, flex: '0 0 auto', borderRadius: '50%',
        border: '1px solid ' + (checked ? 'var(--surface-brand)' : 'var(--border-strong)'),
        background: 'var(--surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'var(--transition-control)', marginTop: description ? 2 : 0,
      }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-brand)',
          transform: checked ? 'scale(1)' : 'scale(0)', transition: 'transform var(--duration-fast) var(--ease-out)',
        }} />
      </span>
      {label && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{label}</span>
          {description && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
