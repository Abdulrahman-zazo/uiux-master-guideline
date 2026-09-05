import type { MoneyValue } from './Money';
export interface ProductCardData {
  id: string; slug: string; name: string; price: MoneyValue; imageUrl?: string;
  storeId: string; storeName: string; categoryId: string;
  /** Client-side flag (from cart `available` or store_inactive); dims the tile. */
  available?: boolean;
}
export interface ProductCardProps {
  /** A ProductCardDto from GET public/products. Price renders via Money — never formatted client-side. */
  product: ProductCardData;
  /** Market name resolved from the store; appended after the store name. */
  marketName?: string;
  /** Shows the "صُوِّر في المحل" chip (on by default — all fixtures are shop-shot). */
  shopShot?: boolean;
  onClick?: () => void;
  layout?: 'grid' | 'row';
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
