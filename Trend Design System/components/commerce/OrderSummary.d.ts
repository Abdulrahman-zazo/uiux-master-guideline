export interface OrderSummaryProps {
  subtotal?: number;
  /** 0 renders as a green "Free". */
  shipping?: number;
  discount?: number;
  tax?: number;
  currency?: string;
  /** Threshold for the "N away from free shipping" nudge. Omit to hide it. */
  freeShippingAt?: number;
  /** Slot below the total — typically the checkout Button and trust copy. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function OrderSummary(props: OrderSummaryProps): JSX.Element;
