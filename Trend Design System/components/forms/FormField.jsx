import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function FormField({ label, htmlFor, hint, error, required, optional, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={htmlFor} style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)',
          color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {label}
          {required && <span style={{ color: 'var(--text-danger)' }}>*</span>}
          {optional && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-caption)', lineHeight: 'var(--leading-caption)',
          color: error ? 'var(--text-danger)' : 'var(--text-muted)',
        }}>
          {error && <Icon name="circle-alert" size={13} strokeWidth={2} />}
          {error || hint}
        </span>
      )}
    </div>
  );
}
