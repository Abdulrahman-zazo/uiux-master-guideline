export interface BadgeProps {
  children?: React.ReactNode;
  /** brand for promos, success/warning/danger for order + stock states. */
  tone?: 'brand' | 'brandSubtle' | 'neutral' | 'inverse' | 'success' | 'warning' | 'danger' | 'outline';
  /** Lucide icon name rendered at 12px before the label. */
  icon?: string;
  /** Shows a 6px status dot instead of an icon. */
  dot?: boolean;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
