/**
 * @startingPoint section="Core" subtitle="Pill buttons in every variant and size" viewport="700x220"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = the purple fill, one per view. inverse = white pill on dark/imagery. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle' | 'inverse' | 'danger';
  /** sm 36px · md 44px · lg 52px */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name placed before the label. */
  iconStart?: string;
  /** Lucide icon name placed after the label. */
  iconEnd?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Swaps the leading icon for a spinner and blocks input. */
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
