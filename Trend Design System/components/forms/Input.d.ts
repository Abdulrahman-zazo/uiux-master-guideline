export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  /** sm 36 · md 44 · lg 52 — match the Button beside it. */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name at the leading edge. */
  iconStart?: string;
  /** Lucide icon name at the trailing edge. */
  iconEnd?: string;
  /** Static trailing text — a unit or currency, e.g. "SAR". */
  suffix?: string;
  /** Red border. Pair with FormField's `error`. */
  invalid?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
