export interface AddressData { id?: string; label?: string | null; governorateNodeId?: string; cityNodeId?: string; areaNodeId?: string | null; neighborhoodNodeId?: string | null; description: string; phone: string; lat?: number | null; lng?: number | null; isDefault?: boolean }
export interface AddressCardProps {
  address: AddressData;
  /** Resolved "المحافظة › المدينة › المنطقة › الحي" text from the geo tree. */
  placeLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  /** Makes the card a radio-style selectable row (checkout). */
  onSelect?: () => void;
  selected?: boolean;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function AddressCard(props: AddressCardProps): JSX.Element;
