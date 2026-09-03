export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  /** Right-aligned percentage above the track. */
  showValue?: boolean;
  tone?: 'brand' | 'success' | 'warning' | 'danger';
  /** sm 4px · md 6px · lg 10px */
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
