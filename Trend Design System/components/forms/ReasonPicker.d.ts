export interface OrderReason { code: string; label: string }
export interface ReasonValue { reasonCode?: string; note?: string }
export interface ReasonPickerProps {
  /** `reasons` from GET public/order-reasons?kind=cancel. */
  reasons?: OrderReason[];
  value?: ReasonValue;
  onChange?: (next: ReasonValue) => void;
  noteLabel?: string;
  notePlaceholder?: string;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function ReasonPicker(props: ReasonPickerProps): JSX.Element;
