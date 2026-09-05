import React from 'react';

const PADS = { none: 0, sm: 16, md: 24, lg: 32 };

/* Hairline always, shadow never. Depth is a tint step, not a lift.
   Source: trendsy-visual-direction.md §2 ("Cards"). */
export function Card({ children, padding = 'md', radius = 'card', tone = 'default', interactive, bordered = true, as: Tag = 'div', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const bg = tone === 'tinted' ? 'var(--surface-tinted)' : tone === 'sunken' ? 'var(--surface-sunken)' : 'var(--surface-card)';
  return (
    <Tag
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: interactive && hover ? (tone === 'tinted' ? 'var(--purple-100)' : 'var(--surface-canvas)') : bg,
        border: bordered ? '1px solid var(--border-hairline)' : 'none',
        borderRadius: radius === 'sm' ? 'var(--radius-card-sm)' : radius === 'sheet' ? 'var(--radius-sheet)' : 'var(--radius-card)',
        boxShadow: 'none',
        padding: PADS[padding],
        transition: 'background-color var(--duration-fast) var(--ease-out)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }} {...rest}>
      {children}
    </Tag>
  );
}
