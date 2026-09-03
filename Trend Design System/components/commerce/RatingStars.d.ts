export interface RatingStarsProps {
  /** 0–5. Rounded to the nearest whole star for display. */
  value?: number;
  /** Review count, shown in parentheses. */
  count?: number;
  /** Glyph size in px. 14 in cards, 18 on the PDP. */
  size?: number;
  /** Prints the numeric score beside the stars. */
  showValue?: boolean;
  style?: React.CSSProperties;
}
export declare function RatingStars(props: RatingStarsProps): JSX.Element;
