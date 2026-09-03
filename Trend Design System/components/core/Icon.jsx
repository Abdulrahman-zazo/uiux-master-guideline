import React, { useEffect, useRef } from 'react';

/* Lucide, loaded from CDN. See readme.md → ICONOGRAPHY: the brand sources
   shipped no icon set, so Lucide is a flagged substitution (geometric,
   1.5–2px stroke) chosen to match the wordmark's clean geometry.

   Lucide's generated <svg> carries hard fill="none" / stroke-width attributes,
   so filled or custom-weight glyphs must be set on the svg itself after the
   icons are drawn — inherited CSS loses to those attributes. */
export function Icon({ name, size = 20, strokeWidth = 1.75, fill = 'none', color = 'currentColor', className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const apply = () => {
      if (!ref.current) return;
      if (window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current });
      const svg = ref.current.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('fill', fill);
      svg.setAttribute('stroke-width', strokeWidth);
    };
    apply();
    const t = setTimeout(apply, 300);
    return () => clearTimeout(t);
  }, [name, size, strokeWidth, fill]);
  return (
    <span ref={ref} className={className} aria-hidden="true"
      style={{ display: 'inline-flex', width: size, height: size, color, flex: '0 0 auto', ...style }}>
      <i data-lucide={name} style={{ width: size, height: size }}></i>
    </span>
  );
}
