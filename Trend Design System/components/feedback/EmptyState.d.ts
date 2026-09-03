export interface EmptyStateProps {
  /** Lucide icon name inside the purple-tint circle. */
  icon?: string;
  title: string;
  description?: string;
  /** Slot for the recovery Button. */
  action?: React.ReactNode;
  /** Tighter padding for in-card empties. */
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
