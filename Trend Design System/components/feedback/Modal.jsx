import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Modal({ open, title, description, children, footer, onClose, width = 480, sheet, style }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'var(--surface-overlay)',
      backdropFilter: 'blur(6px)', display: 'flex',
      alignItems: sheet ? 'flex-end' : 'center', justifyContent: 'center',
      padding: sheet ? 0 : 24, animation: 'trend-fade-in var(--duration-fast) var(--ease-out)',
    }}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true"
        style={{
          background: 'var(--surface-card)', width: sheet ? '100%' : '100%', maxWidth: sheet ? 'none' : width,
          borderRadius: sheet ? 'var(--radius-sheet) var(--radius-sheet) 0 0' : 'var(--radius-card)',
          boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-hairline)',
          maxHeight: sheet ? '88vh' : '86vh', display: 'flex', flexDirection: 'column',
          animation: (sheet ? 'trend-sheet-up' : 'trend-fade-up') + ' var(--duration-base) var(--ease-entrance)',
          ...style,
        }}>
        {sheet && <span style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border-strong)', margin: '10px auto 0', flex: '0 0 auto' }} />}
        {(title || onClose) && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 24px 0' }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-sm)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-heading-sm)', color: 'var(--text-primary)' }}>{title}</h3>}
              {description && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{description}</p>}
            </div>
            {onClose && !sheet && <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} />}
          </div>
        )}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '16px 24px 24px', display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap', borderTop: '1px solid var(--border-hairline)' }}>{footer}</div>}
      </div>
    </div>
  );
}
