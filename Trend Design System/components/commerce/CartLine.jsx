import React from 'react';
import { ProductMedia } from './ProductMedia.jsx';
import { Money } from './Money.jsx';
import { QuantityStepper } from '../forms/QuantityStepper.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Icon } from '../core/Icon.jsx';

/* Bound to CartItemDto / OrderLineDto: { name, variantName, unitPrice, qty,
   lineTotal, imageUrl, available }. The only warning on the wire is
   `available: false`; the `warning` prop is future-ready for price_changed. */
export function CartLine({ item = {}, onQuantity, onRemove, readOnly, warning, lang, style }) {
  const { name, variantName, unitPrice, qty = 1, lineTotal, imageUrl, available = true } = item;
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const warn = warning || (!available ? (ar ? 'هذا المنتج غير متوفر حالياً — أزله لإتمام الطلب' : 'This item is unavailable — remove it to check out') : null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBlock: 16, borderBottom: '1px solid var(--border-hairline)', ...style }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <ProductMedia src={imageUrl} alt={name} ratio="4 / 5" style={{ width: 72, flex: '0 0 auto', opacity: available ? 1 : .55 }} radius="var(--radius-sm)" />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{name}</span>
          {variantName && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>{variantName}</span>}
          {unitPrice && qty > 1 && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', display: 'inline-flex', gap: 4, alignItems: 'baseline' }}><Money value={unitPrice} size="sm" tone="muted" style={{ fontWeight: 400 }} /> × <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{qty}</bdi></span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
            {readOnly
              ? <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{ar ? 'الكمية' : 'Qty'} <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{qty}</bdi></span>
              : <QuantityStepper size="sm" value={qty} onChange={onQuantity} disabled={!available} />}
            {!readOnly && onRemove && <IconButton icon="trash-2" label={ar ? 'إزالة' : 'Remove'} variant="ghost" size="sm" onClick={onRemove} />}
          </div>
        </div>
        <Money value={lineTotal} size="md" style={{ flex: '0 0 auto', alignSelf: 'flex-start' }} />
      </div>
      {warn && (
        <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 'var(--radius-tag)', background: 'var(--surface-warning-subtle)', color: 'var(--text-warning)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', lineHeight: 1.5 }}>
          <Icon name="triangle-alert" size={14} strokeWidth={2} />{warn}
        </div>
      )}
    </div>
  );
}
