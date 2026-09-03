export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  /** Required — becomes aria-label and title. */
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  /** sm 32px · md 40px · lg 48px */
  size?: 'sm' | 'md' | 'lg';
  /** "circle" for nav and carousel controls, "rounded" inside toolbars. */
  shape?: 'circle' | 'rounded';
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
