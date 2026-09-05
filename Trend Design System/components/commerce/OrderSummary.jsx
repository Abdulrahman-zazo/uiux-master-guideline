import React from 'react';
import { Card } from '../core/Card.jsx';
import { Divider } from '../core/Divider.jsx';
import { Money } from './Money.jsx';
import { Icon } from '../core/Icon.jsx';

function Row({ label, value, muted, absent, absentLabel }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>
      <span style={{ color: muted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{label}</span>
      {absent ? <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-caption)' }}>{absentLabel}</span> : <Money value={value} size="sm" tone={muted ? 'muted' : 'default'} style={{ fontWeight: 500 }} />}
    </div>
  );
}

/* Totals card bound to CheckoutResponseDto: itemsSubtotal, deliveryFee,
   discount, grandTotal, orders[] (one per store). Before the checkout
   response exists (cart screen) deliveryFee is ABSENT — the row shows
   "تُحسب في الخطوة التالية" and grandTotal is hidden. The confirmation-call
   line is mandatory on review. */
export function OrderSummary({ itemsSubtotal, deliveryFee, discount, grandTotal, stores = [], showCallNote, lang, children, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const T = ar
    ? { title: 'ملخص الطلب', subtotal: 'المجموع', delivery: 'رسوم التوصيل', deliveryAbsent: 'تُحسب في الخطوة التالية', discount: 'الخصم', total: 'الإجمالي', call: 'سنتصل بك لتأكيد الطلب قبل التجهيز', perStore: 'طلب من' }
    : { title: 'Order summary', subtotal: 'Subtotal', delivery: 'Delivery fee', deliveryAbsent: 'Calculated at the next step', discount: 'Discount', total: 'Total', call: 'We will call you to confirm before preparing your order', perStore: 'Order from' };
  const hasDiscount = discount && discount.amountMinor !== '0';
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-display)', color: 'var(--text-primary)' }}>{T.title}</span>
      {stores.length > 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 4 }}>
          {stores.map(s => (
            <div key={s.storeId || s.storeName} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
              <span>{T.perStore} {s.storeName} · <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{s.itemsCount}</bdi></span>
              {s.total && <Money value={s.total} size="sm" tone="muted" style={{ fontWeight: 400 }} />}
            </div>
          ))}
          <Divider spacing={2} />
        </div>
      )}
      <Row label={T.subtotal} value={itemsSubtotal} />
      <Row label={T.delivery} value={deliveryFee} absent={!deliveryFee} absentLabel={T.deliveryAbsent} />
      {hasDiscount && <Row label={T.discount} value={discount} muted />}
      {grandTotal && (
        <>
          <Divider spacing={4} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{T.total}</span>
            <Money value={grandTotal} size="lg" />
          </div>
        </>
      )}
      {showCallNote && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 'var(--radius-tag)', background: 'var(--surface-tinted)', color: 'var(--text-brand)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 1.6 }}>
          <Icon name="phone" size={16} strokeWidth={2} direction="ltr" style={{ marginTop: 3 }} />{T.call}
        </div>
      )}
      {children}
    </Card>
  );
}
