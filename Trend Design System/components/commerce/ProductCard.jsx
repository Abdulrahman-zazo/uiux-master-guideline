import React from 'react';
import { Card } from '../core/Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { Icon } from '../core/Icon.jsx';
import { ProductMedia } from './ProductMedia.jsx';
import { Money } from './Money.jsx';

/* Catalogue tile bound to ProductCardDto: { id, slug, name, price, imageUrl,
   storeId, storeName, categoryId } (+ optional marketName resolved by the
   client from the store). 16px radius, hairline, no shadow, image top, 12px
   text block. No wishlist (not in MVP), no rating (Slice 3). */
export function ProductCard({ product = {}, marketName, shopShot = true, onClick, layout = 'grid', lang, style }) {
  const { name, price, imageUrl, storeName, available = true } = product;
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const storeLine = [storeName, marketName].filter(Boolean).join(' · ');
  if (layout === 'row') {
    return (
      <Card padding="sm" radius="sm" interactive onClick={onClick} style={{ display: 'flex', gap: 12, alignItems: 'center', ...style }}>
        <ProductMedia src={imageUrl} alt={name} ratio="1 / 1" style={{ width: 72, flex: '0 0 auto' }} radius="var(--radius-sm)" />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          {storeLine && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{storeLine}</span>}
          <Money value={price} size="sm" />
        </div>
      </Card>
    );
  }
  return (
    <Card padding="none" radius="sm" interactive onClick={onClick} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: available ? 1 : .6, ...style }}>
      <ProductMedia src={imageUrl} alt={name} ratio="4 / 5" radius="0">
        {shopShot && (
          <span style={{ position: 'absolute', bottom: 8, insetInlineStart: 8, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-capsule)', color: 'var(--icon-on-capsule)', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 'var(--weight-medium)' }}>
            <Icon name="map-pin" size={11} strokeWidth={2} />{ar ? 'صُوِّر في المحل' : 'Shot in store'}
          </span>
        )}
        {!available && <Badge tone="neutral" style={{ position: 'absolute', top: 8, insetInlineStart: 8 }}>{ar ? 'غير متوفر' : 'Unavailable'}</Badge>}
      </ProductMedia>
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', lineHeight: 1.45, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{name}</span>
        {storeLine && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{storeLine}</span>}
        <Money value={price} size="md" style={{ marginTop: 2 }} />
      </div>
    </Card>
  );
}
