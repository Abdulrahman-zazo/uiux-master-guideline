import React from 'react';
import { Card } from '../core/Card.jsx';
import { Icon } from '../core/Icon.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';

export function StatCard({ label, value, unit, delta, deltaLabel, icon, chrome = true, style }) {
  const up = delta != null && delta >= 0;
  const body = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Eyebrow>{label}</Eyebrow>
        {icon && <span style={{ color: 'var(--icon-muted)', display: 'flex' }}><Icon name={icon} size={18} /></span>}
      </div>
      <span style={{
        fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-heading)', fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
      }}>
        {value}{unit && <span style={{ fontSize: 'var(--text-subheading)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginInlineStart: 5 }}>{unit}</span>}
      </span>
      {delta != null && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: up ? 'var(--text-success)' : 'var(--text-danger)', fontWeight: 'var(--weight-medium)' }}>
            <Icon name={up ? 'trending-up' : 'trending-down'} size={13} strokeWidth={2} />
            {up ? '+' : ''}{delta}%
          </span>
          {deltaLabel && <span style={{ color: 'var(--text-muted)' }}>{deltaLabel}</span>}
        </span>
      )}
    </div>
  );
  return chrome ? <Card style={style}>{body}</Card> : <div style={style}>{body}</div>;
}
