export interface OptionItem { value: string; color?: string; soldOut?: boolean }
export interface OptionPickerProps {
  /** e.g. "Size" — the chosen value is appended in bold. */
  label?: string;
  options?: Array<string | OptionItem>;
  value?: string;
  onChange?: (value: string) => void;
  /** "text" for size/length chips, "swatch" for colour circles. */
  kind?: 'text' | 'swatch';
  style?: React.CSSProperties;
}
export declare function OptionPicker(props: OptionPickerProps): JSX.Element;
