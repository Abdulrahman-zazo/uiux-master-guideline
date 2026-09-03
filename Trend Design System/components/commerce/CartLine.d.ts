export interface CartItem {
  name: string;
  brand?: string;
  price: number;
  compareAt?: number;
  image?: string;
  /** Variant summary, e.g. "Plum · Size M". */
  variant?: string;
  quantity?: number;
}
export interface CartLineProps {
  item: CartItem;
  onQuantity?: (next: number) => void;
  onRemove?: () => void;
  /** Order confirmations and invoices — swaps the stepper for "Qty N". */
  readOnly?: boolean;
  style?: React.CSSProperties;
}
export declare function CartLine(props: CartLineProps): JSX.Element;
