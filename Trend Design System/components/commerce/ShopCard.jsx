import React from 'react';
import { Card } from '../core/Card.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { Badge } from '../core/Badge.jsx';
import { Icon } from '../core/Icon.jsx';

/* The trust surface global platforms cannot copy: store name · market ·
   location in market · founding-partner badge · rating placeholder.
   Bound to StoreResponseDto / ProductStoreCardDto. No phone, no WhatsApp (R4). */
export function ShopCard({ store = {}, marketName, locationLabel, onOpen, compact, lang, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const market = marketName || store.marketName;
  return (
    <Card tone="tinted" padding={compact ? 'sm' : 'md'} interactive={!!onOpen} onClick={onOpen} style={{ display: 'flex', alignItems: 'center', gap: 14, ...style }}>
      <Avatar src={store.logoUrl} name={store.name} size={compact ? 'md' : 'lg'} shape="rounded" style={{ background: 'var(--surface-card)' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{store.name}</span>
          {store.isFoundingPartner && <Badge tone="brand" icon="award">{ar ? 'شريك مؤسس' : 'Founding partner'}</Badge>}
        </div>
        {(market || locationLabel) && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>
            <Icon name="map-pin" size={14} color="var(--icon-brand)" />
            {[market, locationLabel].filter(Boolean).join(' · ')}
          </span>
        )}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
          <Icon name="star" size={13} />{ar ? 'لا تقييمات بعد' : 'No ratings yet'}
        </span>
      </div>
      {onOpen && <Icon name="chevron-left" size={18} color="var(--icon-muted)" direction={ar ? 'ltr' : 'rtl'} />}
    </Card>
  );
}
