import React from 'react';
import { Card } from '../core/Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { ProductMedia } from './ProductMedia.jsx';
import { PriceBlock } from './PriceBlock.jsx';
import { RatingStars } from './RatingStars.jsx';

export function ProductCard({ product = {}, onClick, onWishlist, wishlisted, layout = 'grid', style }) {
  const { name, brand, price, compareAt, image, rating, reviews, badge, ratio = '3 / 4' } = product;
  const off = compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;
  if (layout === 'row') {
    return (
      <Card padding="sm" interactive onClick={onClick} style={{ display: 'flex', gap: 14, alignItems: 'center', ...style }}>
        <ProductMedia src={image} alt={name} ratio="1 / 1" style={{ width: 84, flex: '0 0 auto' }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {brand && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase' }}>{brand}</span>}
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          <PriceBlock amount={price} compareAt={compareAt} size="sm" />
        </div>
      </Card>
    );
  }
  return (
    <Card padding="none" radius="sm" interactive onClick={onClick} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...style }}>
      <ProductMedia src={image} alt={name} ratio={ratio} radius="0">
        <div style={{ position: 'absolute', top: 12, insetInlineStart: 12, display: 'flex', gap: 6 }}>
          {off > 0 && <Badge tone="brand">-{off}%</Badge>}
          {badge && <Badge tone="inverse">{badge}</Badge>}
        </div>
        {onWishlist && (
          <div style={{ position: 'absolute', top: 10, insetInlineEnd: 10 }} onClick={(e) => { e.stopPropagation(); onWishlist(); }}>
            <IconButton icon="heart" label="Save" size="sm"
              style={{ background: 'var(--surface-capsule)', border: 'none', color: wishlisted ? 'var(--purple-700)' : 'var(--icon-on-capsule)' }} />
          </div>
        )}
      </ProductMedia>
      <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {brand && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase' }}>{brand}</span>}
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', lineHeight: 1.4, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{name}</span>
        {rating != null && <RatingStars value={rating} count={reviews} />}
        <PriceBlock amount={price} compareAt={compareAt} style={{ marginTop: 2 }} />
      </div>
    </Card>
  );
}
