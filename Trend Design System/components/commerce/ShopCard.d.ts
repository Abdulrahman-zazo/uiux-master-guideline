export interface StoreData { id: string; slug: string; name: string; marketCode: string; marketName?: string; geoPath?: string; isFoundingPartner?: boolean; logoUrl?: string; description?: string }
export interface ShopCardProps {
  /** StoreResponseDto or the embedded ProductStoreCardDto. */
  store: StoreData;
  /** Resolved market name when the DTO only carries marketCode. */
  marketName?: string;
  /** Location inside the market, resolved from geoPath, e.g. "دمشق القديمة". */
  locationLabel?: string;
  /** Renders the trailing chevron and makes the card tappable. */
  onOpen?: () => void;
  compact?: boolean;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function ShopCard(props: ShopCardProps): JSX.Element;
