export interface Product {
  name: string;
  brand?: string;
  price: number;
  compareAt?: number;
  image?: string;
  rating?: number;
  reviews?: number;
  /** Free-text flag rendered as an inverse badge, e.g. "New". */
  badge?: string;
  /** CSS aspect-ratio for the media frame. Default "3 / 4". */
  ratio?: string;
}
/**
 * @startingPoint section="Commerce" subtitle="Catalogue product card, grid and row" viewport="700x360"
 */
export interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  /** Passing a handler reveals the wishlist heart. */
  onWishlist?: () => void;
  wishlisted?: boolean;
  /** grid = vertical catalogue tile · row = compact horizontal (cart, wishlist, search) */
  layout?: 'grid' | 'row';
  style?: React.CSSProperties;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
