export interface TrustItem { icon: string; text: string }
export interface TrustStripProps {
  /** Override the three default promises. */
  items?: TrustItem[];
  lang?: 'ar' | 'en';
  /** row on web/PDP; stack in a narrow sidebar. */
  layout?: 'row' | 'stack';
  style?: React.CSSProperties;
}
export declare function TrustStrip(props: TrustStripProps): JSX.Element;
