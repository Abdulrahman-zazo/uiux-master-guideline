export interface CardProps {
  children?: React.ReactNode;
  /** none for full-bleed media cards, md (24px) default. */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** card 24px · sm 16px (small media cards) · sheet 28px (mobile sheets) */
  radius?: 'card' | 'sm' | 'sheet';
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Adds hover lift + deeper shadow. Use on clickable cards only. */
  interactive?: boolean;
  bordered?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
