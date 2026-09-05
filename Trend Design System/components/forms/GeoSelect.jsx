import React from 'react';
import { Select } from './Select.jsx';
import { FormField } from './FormField.jsx';

/* Cascading picker over the cached `GET public/geo/tree` document.
   Depth varies by branch: Damascus city goes governorate → city → area →
   neighbourhood; every other city is a leaf, so the form accepts a two-level
   pick there (design-handoff-data.md §2.3, §5.1). Keys on `path`, never id. */
const KIND_LABEL = {
  ar: { governorate: 'المحافظة', city: 'المدينة', area: 'المنطقة', neighborhood: 'الحي' },
  en: { governorate: 'Governorate', city: 'City', area: 'Area', neighborhood: 'Neighbourhood' },
};
const ORDER = ['governorate', 'city', 'area', 'neighborhood'];

export function GeoSelect({ tree = [], value = {}, onChange, errors, lang = 'ar', required = true, style }) {
  const labels = KIND_LABEL[lang] || KIND_LABEL.ar;
  const country = tree[0];
  const levels = [];
  let pool = country ? country.children : tree;
  for (const kind of ORDER) {
    if (!pool || !pool.length) break;
    const selected = pool.find(n => n.path === value[kind]);
    levels.push({ kind, options: pool, selected });
    pool = selected ? selected.children : null;
  }
  const pick = (kind, path) => {
    const next = { ...value, [kind]: path || undefined };
    for (const k of ORDER.slice(ORDER.indexOf(kind) + 1)) delete next[k];
    onChange && onChange(next);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, ...style }}>
      {levels.map(({ kind, options, selected }) => (
        <FormField key={kind} label={labels[kind]} name={kind + 'NodeId'} errors={errors} required={required && (kind === 'governorate' || kind === 'city')}>
          <Select value={selected ? selected.path : ''} onChange={(e) => pick(kind, e.target.value)}
            placeholder={lang === 'ar' ? 'اختر' : 'Choose'} options={options.map(n => ({ value: n.path, label: n.name }))} />
        </FormField>
      ))}
    </div>
  );
}
