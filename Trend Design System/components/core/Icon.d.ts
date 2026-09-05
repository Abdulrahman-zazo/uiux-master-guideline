export interface IconProps {
  /** Lucide icon name, kebab-case — e.g. "shopping-cart", "chevron-left". */
  name: string;
  /** Pixel box. 16 inline with body text, 20 default, 24 in nav bars, 28 in empty-state circles. */
  size?: number;
  /** 1.75 default; 2 at 16px and below; 0 with `fill` for solid glyphs. */
  strokeWidth?: number;
  /** "none" for outline glyphs; "currentColor" for a solid glyph such as a filled star. */
  fill?: string;
  color?: string;
  /** "auto" mirrors directional glyphs (chevrons, arrows, undo, send) when <html dir="rtl">. "ltr"/"rtl" force. */
  direction?: 'auto' | 'ltr' | 'rtl';
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
