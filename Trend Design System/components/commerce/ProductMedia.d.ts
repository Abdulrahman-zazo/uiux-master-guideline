export interface ProductMediaProps {
  src?: string;
  alt?: string;
  /** CSS aspect-ratio. "3 / 4" apparel default, "1 / 1" beauty, "16 / 9" editorial. */
  ratio?: string;
  radius?: string;
  /** "brand" tints the empty frame with the purple 50 wash. */
  tint?: 'neutral' | 'brand';
  /** Overlaid badges or controls, absolutely positioned. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ProductMedia(props: ProductMediaProps): JSX.Element;
