import React from 'react';

export function Tooltip({ label, children, placement = 'top', style }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: '100%', insetInlineStart: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', insetInlineStart: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    start: { insetInlineEnd: '100%', top: '50%', transform: 'translateY(-50%)', marginInlineEnd: 8 },
    end: { insetInlineStart: '100%', top: '50%', transform: 'translateY(-50%)', marginInlineStart: 8 },
  }[placement];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', ...pos, zIndex: 60, whiteSpace: 'nowrap',
          background: 'var(--neutral-900)', color: 'var(--neutral-25)',
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', lineHeight: 1.4,
          padding: '6px 10px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
          animation: 'trend-fade-in var(--duration-fast) var(--ease-out)', pointerEvents: 'none',
        }}>{label}</span>
      )}
    </span>
  );
}
