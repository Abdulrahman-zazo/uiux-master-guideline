import React from 'react';
import { Badge } from '../core/Badge.jsx';

/* The 13 order statuses (design-handoff-data.md §3.1) → tone. The label comes
   from the server (`statusLabel` / event `label`); pass it through. An
   unmapped status renders neutral with the raw string, never crashes. */
const TONE = {
  awaiting_payment: 'warning', payment_failed: 'danger',
  placed: 'warning', confirmed: 'brandSubtle', accepted: 'brandSubtle', shipped: 'brandSubtle',
  delivered: 'success', completed: 'success',
  rejected: 'danger', delivery_failed: 'danger', cancelled: 'neutral',
  return_requested: 'warning', returned: 'neutral',
  /* shipment statuses */
  created: 'neutral', picked_up: 'brandSubtle', in_transit: 'brandSubtle', failed: 'danger',
};
const FALLBACK_AR = {
  awaiting_payment: 'بانتظار الدفع', payment_failed: 'فشل الدفع', placed: 'بانتظار التأكيد', confirmed: 'مؤكّد',
  accepted: 'قيد التجهيز', rejected: 'مرفوض', shipped: 'في الطريق إليك', delivered: 'تم التوصيل',
  delivery_failed: 'فشل التوصيل', cancelled: 'ملغى', return_requested: 'طلب إرجاع', returned: 'مُرجَع', completed: 'مكتمل',
};

export function StatusPill({ status, label, style }) {
  const tone = TONE[status] || 'neutral';
  const text = label || FALLBACK_AR[status] || status;
  return <Badge tone={tone} dot style={style}>{text}</Badge>;
}
