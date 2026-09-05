export interface OrderEvent { seq: number; status: string; label: string; occurredAt: string; note: string | null }
export interface TimelineProps {
  /** OrderEventDto[] from GET buyer/orders/{id}/events (any order; sorted by seq desc here). */
  events?: OrderEvent[];
  /** Renders a dashed "awaiting confirmation call" step above the latest event while status is `placed`. */
  pending?: { label?: string; note?: string } | null;
  lang?: 'ar' | 'en';
  style?: React.CSSProperties;
}
export declare function Timeline(props: TimelineProps): JSX.Element;
