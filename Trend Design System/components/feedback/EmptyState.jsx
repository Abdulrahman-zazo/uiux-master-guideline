import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function EmptyState({ icon = 'search-x', title, description, action, compact, style }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 10, padding: compact ? '32px 24px' : '64px 24px', ...style,
    }}>
      <span style={{
        width: compact ? 48 : 64, height: compact ? 48 : 64, borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-brand-subtle)', color: 'var(--icon-brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
      }}>
        <Icon name={icon} size={compact ? 22 : 28} strokeWidth={1.5} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 'var(--text-subheading)' : 'var(--text-heading-sm)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-heading-sm)', color: 'var(--text-primary)' }}>{title}</span>
      {description && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', maxWidth: 42 + 'ch', lineHeight: 1.5 }}>{description}</p>}
      {action && <span style={{ marginTop: 8 }}>{action}</span>}
    </div>
  );
}
