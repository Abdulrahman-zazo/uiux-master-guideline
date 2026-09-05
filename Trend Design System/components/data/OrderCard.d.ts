import type { MoneyValue } from '../commerce/Money';
export interface OrderSummaryData { id: string; orderNumber: string; storeId?: string; storeName: string; status: string; statusLabel?: string; itemsCount: number; total: MoneyValue; createdAt: string }
export interface OrderCardProps {
  /** OrderSummaryDto. */
  order: OrderSummaryData;
  /** First line's imageUrl when known (detail only — the summary has no thumb). */
  thumbUrl?: string;
  onOpen?: () => void;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function OrderCard(props: OrderCardProps): JSX.Element;
