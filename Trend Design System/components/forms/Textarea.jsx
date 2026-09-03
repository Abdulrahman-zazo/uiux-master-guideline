import React from 'react';

export function Textarea({ rows = 4, invalid, disabled, maxLength, value, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <textarea rows={rows} disabled={disabled} maxLength={maxLength} value={value}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          padding: '12px 14px', background: disabled ? 'var(--surface-sunken)' : 'var(--surface-input)',
          border: '1px solid ' + (invalid ? 'var(--text-danger)' : focus ? 'var(--border-focus)' : 'transparent'),
          borderRadius: 'var(--radius-input)', boxShadow: focus ? 'var(--focus-ring)' : 'none',
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
          color: 'var(--text-primary)', outline: 'none', resize: 'vertical',
          transition: 'var(--transition-control)', ...style,
        }} {...rest} />
      {maxLength && (
        <span style={{ alignSelf: 'flex-end', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
          {String(value || '').length}/{maxLength}
        </span>
      )}
    </div>
  );
}
