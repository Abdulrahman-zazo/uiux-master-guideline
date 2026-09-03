export type TrendStatus =
  | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'failed'
  | 'active' | 'draft' | 'review' | 'suspended';
export interface StatusPillProps {
  status: TrendStatus | string;
  /** Override the default English label — pass the Arabic string in AR views. */
  label?: string;
  style?: React.CSSProperties;
}
export declare function StatusPill(props: StatusPillProps): JSX.Element;
