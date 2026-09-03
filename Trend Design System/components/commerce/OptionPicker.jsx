import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function OptionPicker({ label, options = [], value, onChange, kind = 'text', style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>
          {label}{value ? <strong style={{ color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)', marginInlineStart: 6 }}>{value}</strong> : null}
        </span>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          const on = v === value;
          const soldOut = typeof o === 'object' && o.soldOut;
          if (kind === 'swatch') {
            return (
              <button key={v} type="button" onClick={() => !soldOut && onChange && onChange(v)} title={v}
                style={{
                  width: 34, height: 34, borderRadius: 'var(--radius-pill)', padding: 3, cursor: soldOut ? 'not-allowed' : 'pointer',
                  border: '1.5px solid ' + (on ? 'var(--border-brand)' : 'var(--border-hairline)'),
                  background: 'transparent', opacity: soldOut ? 0.4 : 1, transition: 'var(--transition-control)',
                }}>
                <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%', background: (typeof o === 'object' && o.color) || 'var(--surface-sunken)' }} />
              </button>
            );
          }
          return (
            <button key={v} type="button" onClick={() => !soldOut && onChange && onChange(v)}
              style={{
                minWidth: 46, height: 40, paddingInline: 14, borderRadius: 'var(--radius-tag)',
                border: '1px solid ' + (on ? 'var(--surface-brand)' : 'var(--border-hairline)'),
                background: on ? 'var(--surface-brand)' : 'var(--surface-card)',
                color: on ? 'var(--text-on-brand)' : soldOut ? 'var(--text-muted)' : 'var(--text-primary)',
                fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)',
                cursor: soldOut ? 'not-allowed' : 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'var(--transition-control)',
              }}>
              {v}
              {/* A thin diagonal rule, not a glyph over the letter: the label must stay readable. */}
              {soldOut && <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', top: '50%', left: '-10%', width: '120%', height: 1.5, background: 'var(--border-strong)', transform: 'rotate(-24deg)', transformOrigin: 'center' }} />
              </span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
