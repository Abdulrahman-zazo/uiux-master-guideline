import React from 'react';
import { Icon } from '../core/Icon.jsx';

const ICONS = { info: 'info', success: 'circle-check', warning: 'triangle-alert', danger: 'circle-alert' };
const COLORS = { info: 'var(--purple-300)', success: '#6FBF9A', warning: '#D9A84E', danger: '#F08A83' };

export function Toast({ tone = 'info', message, action, onDismiss, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
      background: 'var(--neutral-900)', color: 'var(--neutral-25)',
      borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-xl)',
      animation: 'trend-fade-up var(--duration-base) var(--ease-entrance)',
      maxWidth: 420, ...style,
    }}>
      <span style={{ display: 'flex', color: COLORS[tone], flex: '0 0 auto' }}><Icon name={ICONS[tone]} size={18} strokeWidth={2} /></span>
      <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>{message}</span>
      {action}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss"
          style={{ border: 0, background: 'transparent', color: 'rgba(255,255,255,.6)', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <Icon name="x" size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
