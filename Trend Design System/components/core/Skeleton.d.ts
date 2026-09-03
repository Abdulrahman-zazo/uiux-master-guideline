export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** Renders a circle of diameter = height. */
  circle?: boolean;
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
