/**
 * @startingPoint section="Dashboard" subtitle="Metric tile with delta" viewport="700x180"
 */
export interface StatCardProps {
  /** Eyebrow-cased metric name. */
  label: string;
  value: string | number;
  /** Trailing unit at subheading size, e.g. "SAR". */
  unit?: string;
  /** Percentage change. Negative flips the arrow and colour. */
  delta?: number;
  /** Context after the delta, e.g. "vs last week". */
  deltaLabel?: string;
  icon?: string;
  /** false drops the card shell — for stats inside an existing card. */
  chrome?: boolean;
  style?: React.CSSProperties;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
