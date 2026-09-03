import React from 'react';

export function DataTable({ columns = [], rows = [], onRowClick, dense, empty, style }) {
  const pad = dense ? '10px 14px' : '14px 16px';
  return (
    <div style={{ width: '100%', overflowX: 'auto', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{
                textAlign: c.align === 'end' ? 'end' : 'start', padding: pad,
                fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
                fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-hairline)', whiteSpace: 'nowrap',
                background: 'var(--surface-card)',
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} style={{ padding: 0 }}>{empty}</td></tr>
          )}
          {rows.map((r, i) => (
            <tr key={r.id || i} onClick={() => onRowClick && onRowClick(r)}
              style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background-color var(--duration-fast) var(--ease-out)' }}
              onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.background = 'var(--surface-canvas)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              {columns.map(c => (
                <td key={c.key} style={{
                  padding: pad, borderBottom: '1px solid var(--border-hairline)',
                  textAlign: c.align === 'end' ? 'end' : 'start',
                  color: c.muted ? 'var(--text-secondary)' : 'var(--text-primary)',
                  fontFamily: c.numeric ? 'var(--font-numeric)' : 'inherit',
                  fontVariantNumeric: c.numeric ? 'tabular-nums' : 'normal',
                  whiteSpace: c.wrap ? 'normal' : 'nowrap',
                }}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
