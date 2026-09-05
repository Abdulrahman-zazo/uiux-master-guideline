export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: 'muted' | 'brand' | 'inverse';
  /** Force script rules; defaults to <html lang>. Arabic drops tracking and uppercase. */
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
