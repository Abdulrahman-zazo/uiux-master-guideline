import React from 'react';
import { ProductMedia } from './ProductMedia.jsx';
import { PriceBlock } from './PriceBlock.jsx';
import { QuantityStepper } from '../forms/QuantityStepper.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function CartLine({ item = {}, onQuantity, onRemove, readOnly, style }) {
  const { name, brand, price, compareAt, image, variant, quantity = 1 } = item;
  return (
    <div style={{ display: 'flex', gap: 16, paddingBlock: 20, borderBottom: '1px solid var(--border-hairline)', ...style }}>
      <ProductMedia src={image} alt={name} ratio="3 / 4" style={{ width: 84, flex: '0 0 auto' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {brand && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase' }}>{brand}</span>}
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{name}</span>
        {variant && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>{variant}</span>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
          {readOnly
            ? <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>Qty {quantity}</span>
            : <QuantityStepper size="sm" value={quantity} onChange={onQuantity} />}
          {!readOnly && onRemove && <IconButton icon="trash-2" label="Remove" variant="ghost" size="sm" onClick={onRemove} />}
        </div>
      </div>
      <PriceBlock amount={price * quantity} compareAt={compareAt ? compareAt * quantity : undefined} align="end" style={{ flex: '0 0 auto', alignSelf: 'flex-start' }} />
    </div>
  );
}
