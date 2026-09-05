import React, { useEffect, useRef } from 'react';

/* Lucide (adopted icon set — master plan §9.6), loaded from unpkg (cdnjs does not mirror the UMD build).
   Directional glyphs mirror under dir="rtl"; x, check, clock, phone and
   numbers never do. Lucide's generated <svg> carries hard fill / stroke-width
   attributes, so they are set on the svg after draw. */
const MIRRORED = /^(chevron-(left|right)|chevrons-(left|right)|arrow-(left|right)|arrow-(up|down)-(left|right)|undo-2|redo-2|send|reply|corner-.*|list-indent|log-out|log-in|external-link|panel-(left|right).*)$/;

export function Icon({ name, size = 20, strokeWidth = 1.75, fill = 'none', color = 'currentColor', direction = 'auto', className = '', style }) {
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
  const isRtl = direction === 'rtl' || (direction === 'auto' && typeof document !== 'undefined' && document.documentElement.dir === 'rtl');
  const mirror = isRtl && MIRRORED.test(name);
  return (
    <span ref={ref} className={className} aria-hidden="true"
      style={{ display: 'inline-flex', width: size, height: size, color, flex: '0 0 auto', transform: mirror ? 'scaleX(-1)' : 'none', ...style }}>
      <i data-lucide={name} style={{ width: size, height: size }}></i>
    </span>
  );
}
