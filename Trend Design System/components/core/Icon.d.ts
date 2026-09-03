export interface IconProps {
  /** Lucide icon name, kebab-case — e.g. "shopping-bag", "chevron-left". */
  name: string;
  /** Pixel box. 16 inline with body text, 20 default, 24 in nav bars. */
  size?: number;
  /** 1.75 default. 1.5 for large decorative glyphs, 2 for 16px glyphs. Use 0 with `fill` for solid glyphs. */
  strokeWidth?: number;
  /** SVG fill. "none" (default) for outline glyphs; "currentColor" for a solid glyph such as a filled star. */
  fill?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
