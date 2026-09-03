export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  rows?: number;
  invalid?: boolean;
  disabled?: boolean;
  /** Showing maxLength turns on the character counter. */
  maxLength?: number;
  style?: React.CSSProperties;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
