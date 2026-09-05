import React from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';

/* Cursor-list footer. Page numbers are forbidden (master plan §2); this is the
   only paging control. hasMore/nextCursor come straight from the paginated envelope. */
export function LoadMore({ hasMore, loading, error, onLoad, onRetry, endLabel = 'هذه كل النتائج', label = 'تحميل المزيد', retryLabel = 'إعادة المحاولة', style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingBlock: 28, ...style }}>
      {error ? (
        <>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text-danger)' }}>
            <Icon name="circle-alert" size={16} strokeWidth={2} />{typeof error === 'string' ? error : 'تعذّر تحميل المزيد'}
          </span>
          <Button variant="outline" size="sm" iconStart="rotate-cw" onClick={onRetry || onLoad}>{retryLabel}</Button>
        </>
      ) : hasMore ? (
        <Button variant="outline" size="md" loading={loading} processingLabel="جارٍ التحميل…" onClick={onLoad}>{label}</Button>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
          <span style={{ width: 24, height: 1, background: 'var(--border-hairline)' }} />{endLabel}<span style={{ width: 24, height: 1, background: 'var(--border-hairline)' }} />
        </span>
      )}
    </div>
  );
}
