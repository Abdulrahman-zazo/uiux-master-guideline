import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Pagination({ page = 1, pages = 1, onChange, style }) {
  const list = [];
  const push = (n) => list.push(n);
  if (pages <= 7) { for (let i = 1; i <= pages; i++) push(i); }
  else {
    push(1);
    if (page > 3) push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) push(i);
    if (page < pages - 2) push('…');
    push(pages);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', ...style }}>
      <IconButton icon="chevron-left" label="Previous page" size="sm" disabled={page <= 1} onClick={() => onChange && onChange(page - 1)} />
      {list.map((n, i) => n === '…'
        ? <span key={'e' + i} style={{ width: 32, textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>…</span>
        : <button key={n} type="button" onClick={() => onChange && onChange(n)}
            style={{
              minWidth: 32, height: 32, borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              border: '1px solid ' + (n === page ? 'transparent' : 'var(--border-hairline)'),
              background: n === page ? 'var(--surface-brand)' : 'var(--surface-card)',
              color: n === page ? 'var(--text-on-brand)' : 'var(--text-primary)',
              fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)',
              fontWeight: n === page ? 'var(--weight-medium)' : 'var(--weight-regular)',
              transition: 'var(--transition-control)',
            }}>{n}</button>)}
      <IconButton icon="chevron-right" label="Next page" size="sm" disabled={page >= pages} onClick={() => onChange && onChange(page + 1)} />
    </div>
  );
}
