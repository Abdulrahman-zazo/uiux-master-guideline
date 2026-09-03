import React from 'react';

const PADS = { none: 0, sm: 16, md: 24, lg: 32 };

export function Card({ children, padding = 'md', radius = 'card', elevation = 'sm', interactive, bordered = true, as: Tag = 'div', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const shadows = { none: 'none', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)', xl: 'var(--shadow-xl)' };
  return (
    <Tag
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: bordered ? '1px solid var(--border-hairline)' : 'none',
        borderRadius: radius === 'sm' ? 'var(--radius-card-sm)' : radius === 'sheet' ? 'var(--radius-sheet)' : 'var(--radius-card)',
        boxShadow: interactive && hover ? 'var(--shadow-lg)' : shadows[elevation],
        padding: PADS[padding],
        transform: interactive && hover ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }} {...rest}>
      {children}
    </Tag>
  );
}
