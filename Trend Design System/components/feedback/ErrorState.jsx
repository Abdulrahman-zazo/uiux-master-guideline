import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';

/* Renders a problem+json document. Title comes from `problem.title` (already
   localised by the server); the traceId is copyable so support can find the
   request. Per-request retry — this is never a full-screen wall for a list
   page (use LoadMore's inline error there). */
export function ErrorState({ problem = {}, onRetry, retryLabel = 'إعادة المحاولة', supportLabel = 'رقم المتابعة', compact, style }) {
  const [copied, setCopied] = React.useState(false);
  const title = problem.title || 'حدث خطأ ما';
  const detail = problem.detail;
  const trace = problem.traceId || problem.requestId;
  const copy = () => { try { navigator.clipboard.writeText(trace); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) {} };
  return (
    <div role="alert" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, padding: compact ? '28px 20px' : '56px 24px', ...style }}>
      <span style={{ width: compact ? 44 : 56, height: compact ? 44 : 56, borderRadius: 'var(--radius-pill)', background: 'var(--surface-danger-subtle)', color: 'var(--text-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="circle-alert" size={compact ? 20 : 26} strokeWidth={1.75} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 'var(--text-h3)' : 'var(--text-h2)', fontWeight: 'var(--weight-display)', color: 'var(--text-primary)' }}>{title}</span>
      {detail && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-body-sm)', color: 'var(--text-secondary)', maxWidth: '44ch' }}>{detail}</p>}
      {onRetry && <Button variant="outline" iconStart="rotate-cw" onClick={onRetry} style={{ marginTop: 6 }}>{retryLabel}</Button>}
      {trace && (
        <button type="button" onClick={copy} style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>
          {supportLabel}: <bdi dir="ltr" style={{ fontFamily: 'var(--font-numeric)' }}>{trace}</bdi>
          <Icon name={copied ? 'check' : 'copy'} size={13} />
        </button>
      )}
    </div>
  );
}
