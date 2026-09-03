import React from 'react';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function SectionHeader({ eyebrow, title, action, actionHref, onAction, onPrev, onNext, size = 'md', style }) {
  const fs = size === 'lg' ? 'var(--text-heading-lg-fluid)' : size === 'sm' ? 'var(--text-heading-sm)' : 'var(--text-heading-fluid)';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 24, ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: fs, fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-heading)', lineHeight: 'var(--leading-heading)', color: 'var(--text-primary)',
        }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {action && <a href={actionHref || '#'} onClick={onAction} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{action}</a>}
        {(onPrev || onNext) && (
          <div style={{ display: 'flex', gap: 4 }}>
            <IconButton icon="chevron-left" label="Previous" onClick={onPrev} />
            <IconButton icon="chevron-right" label="Next" onClick={onNext} />
          </div>
        )}
      </div>
    </div>
  );
}
