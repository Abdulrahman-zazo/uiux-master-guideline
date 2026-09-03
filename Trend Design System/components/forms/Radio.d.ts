export interface RadioProps {
  checked?: boolean;
  onChange?: (value?: string) => void;
  label?: string;
  description?: string;
  /** Shared across the group. */
  name?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
