export interface FormFieldProps {
  label?: string;
  /** Should match the control's id. */
  htmlFor?: string;
  /** Field key used to pick the matching entry from `errors`. */
  name?: string;
  /** The problem+json `errors[]` array from a 422 — `{ field, message }[]`. */
  errors?: Array<{ field: string; message: string; code?: string }>;
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
