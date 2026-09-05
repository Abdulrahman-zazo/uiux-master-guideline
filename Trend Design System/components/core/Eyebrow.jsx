import React from 'react';

/* Latin: 12px / 500 / +0.05em / uppercase. Arabic: same size and weight,
   no tracking, no transform — set by [lang=ar] on an ancestor or via `lang`. */
export function Eyebrow({ children, tone = 'muted', lang, style }) {
  const colors = { muted: 'var(--text-muted)', brand: 'var(--text-brand)', inverse: 'rgba(255,255,255,.72)' };
  const isAr = lang === 'ar' || (!lang && typeof document !== 'undefined' && (document.documentElement.lang || '').startsWith('ar'));
  return (
    <span lang={lang} style={{
      display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)', letterSpacing: isAr ? 0 : 'var(--tracking-eyebrow)',
      textTransform: isAr ? 'none' : 'uppercase', color: colors[tone], lineHeight: 1.4, ...style,
    }}>{children}</span>
  );
}
