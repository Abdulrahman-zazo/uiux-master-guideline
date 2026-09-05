export interface RateLimitTimerProps {
  /** Seconds to count down — pass the Retry-After value. */
  seconds?: number;
  /** Text before the clock, e.g. "إعادة الإرسال بعد". */
  label?: string;
  /** Shown at zero. Omit to render nothing when done. */
  doneLabel?: string;
  onDone?: () => void;
  compact?: boolean;
  style?: React.CSSProperties;
}
export declare function RateLimitTimer(props: RateLimitTimerProps): JSX.Element;
