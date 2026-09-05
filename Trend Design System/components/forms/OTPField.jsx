import React from 'react';

/* 6 boxes, SMS autofill (single hidden input with autocomplete="one-time-code"),
   digits only. Expiry / resend countdowns are rendered by the caller with
   RateLimitTimer so this stays a pure input. */
export function OTPField({ value = '', onChange, onComplete, length = 6, invalid, disabled, autoFocus, style }) {
  const ref = React.useRef(null);
  const [focus, setFocus] = React.useState(false);
  const digits = value.replace(/\D/g, '').slice(0, length);
  const set = (v) => {
    const clean = v.replace(/\D/g, '').slice(0, length);
    onChange && onChange(clean);
    if (clean.length === length && onComplete) onComplete(clean);
  };
  return (
    <div dir="ltr" onClick={() => ref.current && ref.current.focus()} style={{ position: 'relative', display: 'flex', gap: 8, justifyContent: 'center', cursor: 'text', ...style }}>
      <input ref={ref} value={digits} onChange={(e) => set(e.target.value)} disabled={disabled} autoFocus={autoFocus}
        inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]*" maxLength={length} aria-label="رمز التحقق"
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, border: 0, fontSize: 16 }} />
      {Array.from({ length }).map((_, i) => {
        const active = focus && i === Math.min(digits.length, length - 1);
        return (
          <span key={i} aria-hidden="true" style={{
            width: 46, height: 54, borderRadius: 'var(--radius-input)',
            background: disabled ? 'var(--surface-sunken)' : 'var(--surface-input)',
            border: '1px solid ' + (invalid ? 'var(--text-danger)' : active ? 'var(--border-focus)' : 'transparent'),
            boxShadow: active ? 'var(--focus-ring)' : 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-numeric)', fontSize: 22, fontWeight: 'var(--weight-semibold)', fontVariantNumeric: 'tabular-nums',
            color: 'var(--text-primary)', transition: 'var(--transition-control)',
          }}>{digits[i] || (active ? <span style={{ width: 1.5, height: 22, background: 'var(--border-focus)', animation: 'trend-caret 1s steps(1) infinite' }} /> : '')}</span>
        );
      })}
    </div>
  );
}
