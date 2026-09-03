import React from 'react';
import { Logo } from '../core/Logo.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Button } from '../core/Button.jsx';
import { SearchField } from '../forms/SearchField.jsx';
import { Badge } from '../core/Badge.jsx';

/* Collapses the inline rail below `breakpoint` and moves the links into a
   toggled second row, so nothing is ever silently clipped. */
function useCompact(breakpoint) {
  const [compact, setCompact] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: ' + (breakpoint - 1) + 'px)');
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [breakpoint]);
  return compact;
}

export function TopNav({ links = [], active, onNavigate, cartCount = 0, onCart, onSearch, search, tone = 'dark', cta, onCta, assetBase = '', locale = 'EN', onLocale, collapseAt = 1024, children, style }) {
  const dark = tone === 'dark';
  const fg = dark ? '#fff' : 'var(--text-primary)';
  const compact = useCompact(collapseAt);
  const tiny = useCompact(640);
  const [open, setOpen] = React.useState(false);
  const linkStyle = (on) => ({
    fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)',
    color: on ? fg : dark ? 'rgba(255,255,255,.7)' : 'var(--text-secondary)',
    textDecoration: 'none', whiteSpace: 'nowrap', paddingBlock: 6,
    borderBottom: '2px solid ' + (on ? (dark ? '#fff' : 'var(--border-brand)') : 'transparent'),
    transition: 'var(--transition-control)',
  });
  return (
    <header style={{
      background: dark ? 'var(--neutral-800)' : 'var(--surface-card)',
      borderBottom: dark ? 'none' : '1px solid var(--border-hairline)',
      color: fg, position: 'sticky', top: 0, zIndex: 40, ...style,
    }}>
      <div style={{
        maxWidth: 'var(--page-max-wide)', margin: '0 auto', paddingInline: 'var(--page-gutter)',
        height: 'var(--header-height)', display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} style={{ display: 'flex', flex: '0 0 auto' }}>
          <Logo height={24} theme={dark ? 'dark' : 'light'} assetBase={assetBase} />
        </a>
        {compact
          ? (links.length > 0 && <div style={{ flex: 1 }} />)
          : (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {links.map(l => {
                const id = typeof l === 'string' ? l : l.id;
                const label = typeof l === 'string' ? l : l.label;
                return (
                  <a key={id} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(id); }}
                    style={linkStyle(id === active)}>{label}</a>
                );
              })}
            </nav>
          )}
        {onSearch && !tiny && <div style={{ flex: '0 1 300px', minWidth: 0 }}><SearchField size="sm" value={search} onChange={onSearch} placeholder="Search" style={dark ? { background: 'rgba(255,255,255,.1)' } : undefined} /></div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
          {compact && links.length > 0 && (
            <IconButton icon={open ? 'x' : 'menu'} label="Menu" variant={dark ? 'inverse' : 'secondary'}
              active={open} onClick={() => setOpen(o => !o)} />
          )}
          {onLocale && (
            <button type="button" onClick={onLocale} style={{
              background: 'transparent', border: '1px solid ' + (dark ? 'rgba(255,255,255,.28)' : 'var(--border-hairline)'),
              color: fg, borderRadius: 'var(--radius-pill)', height: 32, paddingInline: 12,
              fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-eyebrow)', cursor: 'pointer',
            }}>{locale}</button>
          )}
          {children}
          {onCart && (
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <IconButton icon="shopping-bag" label="Cart" variant={dark ? 'inverse' : 'secondary'} onClick={onCart} />
              {cartCount > 0 && <Badge tone="brand" style={{ position: 'absolute', top: -4, insetInlineEnd: -4, padding: '1px 6px', minWidth: 18, justifyContent: 'center' }}>{cartCount}</Badge>}
            </span>
          )}
          {onSearch && tiny && <IconButton icon="search" label="Search" variant={dark ? 'inverse' : 'secondary'} onClick={() => onSearch('')} />}
          {cta && !tiny && <Button variant={dark ? 'inverse' : 'primary'} size="sm" onClick={onCta}>{cta}</Button>}
          {cta && tiny && <IconButton icon="user" label={cta} variant={dark ? 'inverse' : 'secondary'} onClick={onCta} />}
        </div>
      </div>
      {compact && open && links.length > 0 && (
        <nav style={{
          borderTop: '1px solid ' + (dark ? 'rgba(255,255,255,.14)' : 'var(--border-hairline)'),
          paddingInline: 'var(--page-gutter)', paddingBlock: 8,
          display: 'flex', flexDirection: 'column', gap: 2,
          animation: 'trend-fade-in var(--duration-fast) var(--ease-out)',
        }}>
          {links.map(l => {
            const id = typeof l === 'string' ? l : l.id;
            const label = typeof l === 'string' ? l : l.label;
            return (
              <a key={id} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate && onNavigate(id); }}
                style={{ ...linkStyle(id === active), borderBottom: 'none', padding: '10px 2px' }}>{label}</a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
