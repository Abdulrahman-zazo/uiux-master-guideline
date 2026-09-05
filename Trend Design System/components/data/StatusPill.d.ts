export type OrderStatus =
  | 'awaiting_payment' | 'payment_failed' | 'placed' | 'confirmed' | 'accepted' | 'rejected'
  | 'shipped' | 'delivered' | 'delivery_failed' | 'cancelled' | 'return_requested' | 'returned' | 'completed';
export interface StatusPillProps {
  /** Raw enum from the API. Unknown values render neutral grey with the raw string. */
  status: OrderStatus | string;
  /** The server-resolved label (`statusLabel`). Always pass it when you have it. */
  label?: string;
  style?: React.CSSProperties;
}
export declare function StatusPill(props: StatusPillProps): JSX.Element;
