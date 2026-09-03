export interface CheckboxProps {
  checked?: boolean;
  /** Renders a dash — for a partially-selected group parent. */
  indeterminate?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  /** Second line of muted copy under the label. */
  description?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
