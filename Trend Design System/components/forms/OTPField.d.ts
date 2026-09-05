export interface OTPFieldProps {
  value?: string;
  onChange?: (digits: string) => void;
  /** Fires once when all boxes are filled — submit here. */
  onComplete?: (digits: string) => void;
  length?: number;
  /** Red boxes for auth.otp_invalid / auth.otp_expired. */
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}
export declare function OTPField(props: OTPFieldProps): JSX.Element;
