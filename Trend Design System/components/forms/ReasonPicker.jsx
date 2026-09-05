import React from 'react';
import { RadioCard } from './RadioCard.jsx';
import { Textarea } from './Textarea.jsx';
import { FormField } from './FormField.jsx';

/* Single-select from GET public/order-reasons?kind=cancel + optional note
   (≤500). Emits { reasonCode, note } for CancelOrderDto. */
export function ReasonPicker({ reasons = [], value = {}, onChange, noteLabel, notePlaceholder, lang, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const set = (patch) => onChange && onChange({ ...value, ...patch });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {reasons.map(r => (
        <RadioCard key={r.code} name="reason" value={r.code} checked={value.reasonCode === r.code} onSelect={(v) => set({ reasonCode: v })} title={r.label} />
      ))}
      <FormField label={noteLabel || (ar ? 'ملاحظة' : 'Note')} optional style={{ marginTop: 6 }}>
        <Textarea rows={3} maxLength={500} value={value.note || ''} onChange={(e) => set({ note: e.target.value })} placeholder={notePlaceholder || (ar ? 'اختياري — أي تفاصيل تساعدنا' : 'Optional — anything that helps us')} />
      </FormField>
    </div>
  );
}
