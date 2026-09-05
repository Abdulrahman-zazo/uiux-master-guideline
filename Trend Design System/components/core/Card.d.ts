export interface CardProps {
  children?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** card 24px · sm 16px (media/product) · sheet 28px */
  radius?: 'card' | 'sm' | 'sheet';
  /** default white · tinted purple-50 (shop card, selected radio card, confirmation-call panel) · sunken */
  tone?: 'default' | 'tinted' | 'sunken';
  /** Hover shifts the background tint. No lift, no shadow. */
  interactive?: boolean;
  bordered?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
