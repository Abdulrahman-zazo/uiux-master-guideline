import type { MoneyValue } from './Money';
export interface CartLineItem { id?: string; productId?: string; variantId?: string; name: string; variantName?: string; unitPrice: MoneyValue; qty: number; lineTotal: MoneyValue; imageUrl?: string; available?: boolean }
export interface CartLineProps {
  /** CartItemDto (cart) or OrderLineDto (order snapshot). */
  item: CartLineItem;
  onQuantity?: (next: number) => void;
  onRemove?: () => void;
  /** Order snapshots — swaps the stepper for "الكمية N". */
  readOnly?: boolean;
  /** Inline warning text; `available: false` renders its own. Reserved for future price_changed. */
  warning?: string;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function CartLine(props: CartLineProps): JSX.Element;
