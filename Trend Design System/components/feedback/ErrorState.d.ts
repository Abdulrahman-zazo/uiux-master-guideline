export interface Problem { code?: string; title?: string; detail?: string; status?: number; traceId?: string; requestId?: string }
export interface ErrorStateProps {
  /** The problem+json body. `title` is shown as-is (server-localised). */
  problem?: Problem;
  onRetry?: () => void;
  retryLabel?: string;
  supportLabel?: string;
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function ErrorState(props: ErrorStateProps): JSX.Element;
