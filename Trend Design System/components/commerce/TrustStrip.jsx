import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* The three promises that answer "is this real?": exchange · cash on delivery ·
   confirmation call. Hairline top and bottom; no card chrome. */
const DEFAULT = {
  ar: [
    { icon: 'refresh-cw', text: 'استبدال فوري للمقاس أو اللون' },
    { icon: 'banknote', text: 'الدفع نقداً عند الاستلام' },
    { icon: 'phone', text: 'سنتصل بك لتأكيد الطلب' },
  ],
  en: [
    { icon: 'refresh-cw', text: 'Instant size or colour exchange' },
    { icon: 'banknote', text: 'Cash on delivery' },
    { icon: 'phone', text: 'We call to confirm your order' },
  ],
};

export function TrustStrip({ items, lang, layout = 'row', style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  const list = items || DEFAULT[ar ? 'ar' : 'en'];
  return (
    <div style={{
      display: layout === 'row' ? 'flex' : 'grid', gap: layout === 'row' ? 24 : 12, flexWrap: 'wrap',
      paddingBlock: 14, borderBlock: '1px solid var(--border-hairline)', ...style,
    }}>
      {list.map(it => (
        <span key={it.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', flex: layout === 'row' ? '1 1 auto' : undefined }}>
          <Icon name={it.icon} size={17} color="var(--icon-brand)" direction="ltr" />{it.text}
        </span>
      ))}
    </div>
  );
}
