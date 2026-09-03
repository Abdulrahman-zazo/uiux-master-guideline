export interface FormFieldProps {
  label?: string;
  /** Should match the control's id. */
  htmlFor?: string;
  /** Helper copy below the control. Hidden while `error` is set. */
  hint?: string;
  /** Replaces the hint, turns it red and prepends an alert glyph. */
  error?: string;
  required?: boolean;
  /** Renders a muted "(optional)" after the label. */
  optional?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FormField(props: FormFieldProps): JSX.Element;
