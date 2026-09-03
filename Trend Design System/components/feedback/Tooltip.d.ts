export interface TooltipProps {
  label: string;
  children?: React.ReactNode;
  /** start/end are logical — they flip under dir="rtl". */
  placement?: 'top' | 'bottom' | 'start' | 'end';
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
