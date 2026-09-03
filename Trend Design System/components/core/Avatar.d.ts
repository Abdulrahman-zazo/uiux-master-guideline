export interface AvatarProps {
  src?: string;
  /** Falls back to up-to-two initials, then a user glyph. */
  name?: string;
  /** xs 24 · sm 32 · md 40 · lg 56 · xl 80 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  style?: React.CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
