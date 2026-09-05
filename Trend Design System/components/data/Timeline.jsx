import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* OrderEvent[] → vertical timeline, newest at top. Bound to OrderEventDto
   { seq, status, label, occurredAt, note }. Timestamps rendered in
   Asia/Damascus with Latin digits. The "waiting for confirmation call" step
   is shown explicitly while status is `placed`. */
const ICON = { placed: 'receipt', confirmed: 'phone-call', accepted: 'package-check', shipped: 'truck', delivered: 'house', cancelled: 'x', rejected: 'x', delivery_failed: 'triangle-alert', completed: 'check', returned: 'undo-2', return_requested: 'undo-2' };

function fmt(iso, lang) {
  try { return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY-u-nu-latn' : 'en-GB', { timeZone: 'Asia/Damascus', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso)); }
  catch (e) { return iso; }
}

export function Timeline({ events = [], pending, lang, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const list = [...events].sort((a, b) => (b.seq ?? 0) - (a.seq ?? 0));
  const rows = pending ? [{ pending: true, label: pending.label || (ar ? 'بانتظار مكالمة التأكيد' : 'Awaiting confirmation call'), note: pending.note || (ar ? 'سنتصل بك خلال ساعات العمل' : 'We will call during working hours') }, ...list] : list;
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', ...style }}>
      {rows.map((ev, i) => {
        const latest = pending ? i === 1 : i === 0;
        const isPending = !!ev.pending;
        return (
          <li key={ev.seq ?? 'p' + i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', columnGap: 14, position: 'relative', paddingBottom: i === rows.length - 1 ? 0 : 22 }}>
            {i < rows.length - 1 && <span style={{ position: 'absolute', insetInlineStart: 13.5, top: 28, bottom: 0, width: 1, background: 'var(--border-hairline)', borderInlineStart: isPending ? '1px dashed var(--border-strong)' : 'none' }} />}
            <span style={{
              width: 28, height: 28, borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', zIndex: 1,
              background: isPending ? 'var(--surface-card)' : latest ? 'var(--surface-brand)' : 'var(--surface-sunken)',
              color: isPending ? 'var(--icon-muted)' : latest ? 'var(--text-on-brand)' : 'var(--icon-default)',
              border: '1px solid ' + (isPending ? 'var(--border-strong)' : latest ? 'transparent' : 'var(--border-hairline)'),
            }}>
              <Icon name={isPending ? 'phone' : (ICON[ev.status] || 'circle')} size={14} strokeWidth={2} direction="ltr" />
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 3, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: latest || isPending ? 'var(--weight-medium)' : 'var(--weight-regular)', color: isPending ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{ev.label || ev.status}</span>
              {ev.occurredAt && <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums', alignSelf: 'flex-start' }}>{fmt(ev.occurredAt, ar ? 'ar' : 'en')}</bdi>}
              {ev.note && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ev.note}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
