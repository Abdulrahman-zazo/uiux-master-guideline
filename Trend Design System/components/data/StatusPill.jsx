import React from 'react';
import { Badge } from '../core/Badge.jsx';

const MAP = {
  pending: { tone: 'warning', label: 'Pending' },
  processing: { tone: 'brandSubtle', label: 'Processing' },
  shipped: { tone: 'brandSubtle', label: 'Shipped' },
  delivered: { tone: 'success', label: 'Delivered' },
  cancelled: { tone: 'neutral', label: 'Cancelled' },
  refunded: { tone: 'neutral', label: 'Refunded' },
  failed: { tone: 'danger', label: 'Failed' },
  active: { tone: 'success', label: 'Active' },
  draft: { tone: 'neutral', label: 'Draft' },
  review: { tone: 'warning', label: 'In review' },
  suspended: { tone: 'danger', label: 'Suspended' },
};

export function StatusPill({ status, label, style }) {
  const m = MAP[status] || { tone: 'neutral', label: status };
  return <Badge tone={m.tone} dot style={style}>{label || m.label}</Badge>;
}
