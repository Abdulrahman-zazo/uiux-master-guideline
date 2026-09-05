import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* Counts down from `seconds` (e.g. the Retry-After header on 429 /
   auth.otp_cooldown) and fires onDone. Digits stay Latin. */
export function RateLimitTimer({ seconds = 60, label, doneLabel, onDone, compact, style }) {
  const [left, setLeft] = React.useState(seconds);
  React.useEffect(() => { setLeft(seconds); }, [seconds]);
  React.useEffect(() => {
    if (left <= 0) { onDone && onDone(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  return (
    <span role="timer" aria-live="off" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: compact ? 'var(--text-caption)' : 'var(--text-body-sm)', color: left > 0 ? 'var(--text-muted)' : 'var(--text-secondary)', ...style }}>
      <Icon name="clock" size={compact ? 13 : 15} direction="ltr" />
      {left > 0 ? <>{label}<bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontVariantNumeric: 'tabular-nums', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{mm}:{ss}</bdi></> : (doneLabel || null)}
    </span>
  );
}
