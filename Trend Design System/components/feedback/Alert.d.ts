export interface AlertProps {
  /** offline = the global connectivity banner ("لا يوجد اتصال — سلتك محفوظة"). */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'offline';
  title?: string;
  children?: React.ReactNode;
  /** Slot for a small Button below the copy. */
  action?: React.ReactNode;
  onDismiss?: () => void;
  /** Full-width edge-to-edge strip (no radius) for the top-of-screen offline/stale banner. */
  banner?: boolean;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
