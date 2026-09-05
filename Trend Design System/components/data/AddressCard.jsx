import React from 'react';
import { Card } from '../core/Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Icon } from '../core/Icon.jsx';

/* Bound to AddressDto. The API stores four node ids; the caller resolves them
   through the cached geo tree and passes `placeLabel`. */
export function AddressCard({ address = {}, placeLabel, onEdit, onDelete, onSelect, selected, lang, style }) {
  const ar = (lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'ar').startsWith('ar');
  return (
    <Card padding="sm" tone={selected ? 'tinted' : 'default'} interactive={!!onSelect} onClick={onSelect}
      style={{ display: 'flex', gap: 12, alignItems: 'flex-start', borderColor: selected ? 'var(--border-brand)' : undefined, ...style }}>
      <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', background: selected ? 'var(--surface-card)' : 'var(--surface-brand-subtle)', color: 'var(--icon-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
        <Icon name="map-pin" size={17} />
      </span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{address.label || (ar ? 'عنوان' : 'Address')}</span>
          {address.isDefault && <Badge tone="brandSubtle">{ar ? 'الافتراضي' : 'Default'}</Badge>}
        </div>
        {placeLabel && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>{placeLabel}</span>}
        {address.description && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{address.description}</span>}
        {address.phone && <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>{address.phone}</bdi>}
      </div>
      {(onEdit || onDelete) && (
        <div style={{ display: 'flex', gap: 2, flex: '0 0 auto' }} onClick={e => e.stopPropagation()}>
          {onEdit && <IconButton icon="pencil" label={ar ? 'تعديل' : 'Edit'} variant="ghost" size="sm" onClick={onEdit} />}
          {onDelete && <IconButton icon="trash-2" label={ar ? 'حذف' : 'Delete'} variant="ghost" size="sm" onClick={onDelete} />}
        </div>
      )}
    </Card>
  );
}
