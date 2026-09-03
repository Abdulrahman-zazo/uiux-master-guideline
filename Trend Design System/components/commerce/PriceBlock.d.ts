export interface PriceBlockProps {
  amount: number;
  /** Original price. When higher than `amount`, the price turns purple and the old value is struck through. */
  compareAt?: number;
  /** Currency code shown at 62% of the price size. Default "SAR". */
  currency?: string;
  /** sm 15 · md 18 · lg 24 · xl 36 (PDP) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'end';
  style?: React.CSSProperties;
}
export declare function PriceBlock(props: PriceBlockProps): JSX.Element;
