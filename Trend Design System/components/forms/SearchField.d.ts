export interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Keyboard hint pill, e.g. "⌘K". Hidden once the field has a value. */
  shortcut?: string;
  style?: React.CSSProperties;
}
export declare function SearchField(props: SearchFieldProps): JSX.Element;
