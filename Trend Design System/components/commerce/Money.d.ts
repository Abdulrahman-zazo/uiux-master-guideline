export interface MoneyValue { amountMinor: string; currency: string; display: string }
export interface MoneyProps {
  /** The backend Money object. `display` is rendered verbatim. */
  value: MoneyValue;
  /** Override the currency symbol; defaults to ل.س (ar) / SYP (en) for SYP. */
  symbol?: string;
  /** sm 14 · md 16 · lg 20 · xl 28 (PDP). */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** discount = --text-discount (red, Slice 2). Price is never purple. */
  tone?: 'default' | 'discount' | 'muted' | 'positive';
  strike?: boolean;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function Money(props: MoneyProps): JSX.Element | null;
