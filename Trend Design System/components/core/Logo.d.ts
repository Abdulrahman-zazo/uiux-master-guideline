export interface LogoProps {
  /** "full" = wordmark + sphere mark. "mark" = sphere only, for avatars/favicons. */
  variant?: 'full' | 'mark';
  /** "dark" swaps the black letterforms to white. The sphere is unchanged. */
  theme?: 'light' | 'dark';
  /** Height in px. Minimum 20px for "full", 16px for "mark". */
  height?: number;
  /** Path prefix to the assets/ folder from the consuming page. */
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
