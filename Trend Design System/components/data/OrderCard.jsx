import React from 'react';
import { Card } from '../core/Card.jsx';
import { StatusPill } from './StatusPill.jsx';
import { Money } from '../commerce/Money.jsx';
import { ProductMedia } from '../commerce/ProductMedia.jsx';
import { Icon } from '../core/Icon.jsx';

function fmtDate(iso, ar) {
  try { return new Intl.DateTimeFormat(ar ? 'ar-SY-u-nu-latn' : 'en-GB', { timeZone: 'Asia/Damascus', day: 'numeric', month: 'long' }).format(new Date(iso)); } catch (e) { return iso; }
}

/* Bound to OrderSummaryDto: { orderNumber, storeName, status, statusLabel,
   itemsCount, total, createdAt } + optional first line thumb. One card per
   ORDER (one checkout → one order per store). */
export function OrderCard({ order = {}, thumbUrl, onOpen, lang, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  return (
    <Card padding="sm" interactive={!!onOpen} onClick={onOpen} style={{ display: 'flex', gap: 14, alignItems: 'center', ...style }}>
      <ProductMedia src={thumbUrl} alt="" ratio="1 / 1" style={{ width: 56, flex: '0 0 auto' }} radius="var(--radius-sm)" />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{order.orderNumber}</bdi>
          <StatusPill status={order.status} label={order.statusLabel} />
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.storeName}</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
          {order.createdAt && fmtDate(order.createdAt, ar)} · <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{order.itemsCount}</bdi> {ar ? (order.itemsCount === 1 ? 'منتج' : 'منتجات') : (order.itemsCount === 1 ? 'item' : 'items')}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flex: '0 0 auto' }}>
        <Money value={order.total} size="md" />
        {onOpen && <Icon name="chevron-left" size={16} color="var(--icon-muted)" direction={ar ? 'ltr' : 'rtl'} />}
      </div>
    </Card>
  );
}
