import React from 'react';
import { Card } from '../core/Card.jsx';
import { Divider } from '../core/Divider.jsx';
import { PriceBlock } from './PriceBlock.jsx';
import { Badge } from '../core/Badge.jsx';

function Row({ label, value, muted, positive }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>
      <span style={{ color: muted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-numeric)', fontVariantNumeric: 'tabular-nums', fontWeight: 'var(--weight-medium)', color: positive ? 'var(--text-success)' : 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

export function OrderSummary({ subtotal = 0, shipping = 0, discount = 0, tax = 0, currency = 'SAR', freeShippingAt, children, style }) {
  const total = subtotal + shipping + tax - discount;
  const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n) + ' ' + currency;
  const away = freeShippingAt ? Math.max(0, freeShippingAt - subtotal) : 0;
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-subheading)', color: 'var(--text-primary)' }}>Order summary</span>
      <Row label="Subtotal" value={fmt(subtotal)} />
      <Row label="Shipping" value={shipping === 0 ? 'Free' : fmt(shipping)} positive={shipping === 0} />
      {discount > 0 && <Row label="Discount" value={'-' + fmt(discount)} positive />}
      {tax > 0 && <Row label="VAT (15%)" value={fmt(tax)} muted />}
      <Divider spacing={4} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>Total</span>
        <PriceBlock amount={total} currency={currency} size="lg" />
      </div>
      {away > 0 && <Badge tone="brandSubtle" icon="truck" style={{ alignSelf: 'flex-start' }}>{fmt(away)} away from free shipping</Badge>}
      {children}
    </Card>
  );
}
