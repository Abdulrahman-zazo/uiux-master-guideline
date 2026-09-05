export interface GeoNode { id: string; code: string; kind: 'country' | 'governorate' | 'city' | 'area' | 'neighborhood'; path: string; name: string; lat: number | null; lng: number | null; children: GeoNode[] }
export interface GeoSelection { governorate?: string; city?: string; area?: string; neighborhood?: string }
export interface GeoSelectProps {
  /** The `nodes` array from GET public/geo/tree (country at the root). */
  tree?: GeoNode[];
  /** Selected node `path` per level. Deeper levels reset when a parent changes. */
  value?: GeoSelection;
  onChange?: (next: GeoSelection) => void;
  /** problem+json errors[]; matched on governorateNodeId / cityNodeId / areaNodeId / neighborhoodNodeId. */
  errors?: Array<{ field: string; message: string }>;
  lang?: 'ar' | 'en';
  required?: boolean;
  style?: React.CSSProperties;
}
export declare function GeoSelect(props: GeoSelectProps): JSX.Element;
