export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = purple fill, one per screen. outline = the paired secondary (purple-200 border, purple text). Every primary is paired with an outline or text action. */
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'subtle' | 'inverse' | 'danger';
  /** sm 36px · md 44px · lg 52px */
  size?: 'sm' | 'md' | 'lg';
  iconStart?: string;
  iconEnd?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Locked "processing" state for idempotent money-moving calls — spinner, input blocked, aria-busy. */
  loading?: boolean;
  /** Text shown while loading, e.g. "جارٍ إنشاء الطلب…". */
  processingLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
