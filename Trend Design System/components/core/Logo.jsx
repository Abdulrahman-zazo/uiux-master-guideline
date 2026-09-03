import React from 'react';

/* The supplied brand mark. Never re-typeset or redraw it. */
export function Logo({ variant = 'full', theme = 'light', height = 28, assetBase = '', style }) {
  const src = variant === 'mark'
    ? assetBase + 'logo-mark.svg'
    : theme === 'dark' ? assetBase + 'logo-trend-on-dark.svg' : assetBase + 'logo-trend.svg';
  return <img src={src} alt="Trend" style={{ height, width: 'auto', ...style }} />;
}
