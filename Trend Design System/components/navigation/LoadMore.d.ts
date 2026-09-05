export interface LoadMoreProps {
  /** From the paginated envelope. false renders the end-of-list rule. */
  hasMore?: boolean;
  loading?: boolean;
  /** Inline error with retry — never a full-screen error for a page fetch. */
  error?: string | boolean;
  onLoad?: () => void;
  onRetry?: () => void;
  label?: string;
  endLabel?: string;
  retryLabel?: string;
  style?: React.CSSProperties;
}
export declare function LoadMore(props: LoadMoreProps): JSX.Element;
