export interface ToastProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** One line. Longer than ~60 characters belongs in an Alert. */
  message: string;
  /** Small inline text action. */
  action?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
