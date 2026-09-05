export interface RadioCardProps {
  checked?: boolean;
  onSelect?: (value?: string) => void;
  title: string;
  description?: string;
  /** Lucide glyph on the leading edge, e.g. "banknote" for COD. */
  icon?: string;
  /** Trailing slot — a Money, a Badge. */
  trailing?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
}
export declare function RadioCard(props: RadioCardProps): JSX.Element;
