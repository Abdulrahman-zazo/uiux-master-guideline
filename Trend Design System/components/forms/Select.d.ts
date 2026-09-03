export interface SelectOption { value: string; label: string }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  /** Strings, or {value,label} pairs. */
  options?: Array<string | SelectOption>;
  size?: 'sm' | 'md' | 'lg';
  /** Rendered as a leading empty-value option. */
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
