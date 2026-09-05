import type { MoneyValue } from './Money';
export interface StoreBlock { storeId?: string; storeName: string; itemsCount: number; total?: MoneyValue }
export interface OrderSummaryProps {
  itemsSubtotal?: MoneyValue;
  /** Omit on the cart screen — the row renders "تُحسب في الخطوة التالية". Present only after POST buyer/checkouts. */
  deliveryFee?: MoneyValue;
  /** Hidden when amountMinor is "0". */
  discount?: MoneyValue;
  /** Omit until the checkout response exists. */
  grandTotal?: MoneyValue;
  /** One block per store (one checkout → one order per store). Shown when > 1. */
  stores?: StoreBlock[];
  /** Mandatory on checkout review and order-created. */
  showCallNote?: boolean;
  lang?: 'ar' | 'en';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function OrderSummary(props: OrderSummaryProps): JSX.Element;
