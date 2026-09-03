export interface Column {
  key: string;
  label: string;
  /** "end" right-aligns (or left-aligns in RTL) — use for amounts. */
  align?: 'start' | 'end';
  /** Tabular figures + numeric font. */
  numeric?: boolean;
  /** Renders the cell in secondary text colour. */
  muted?: boolean;
  /** Allow the cell to wrap. Default: nowrap. */
  wrap?: boolean;
  /** Custom cell renderer — return a StatusPill, Avatar, Button, etc. */
  render?: (row: any) => React.ReactNode;
}
export interface DataTableProps {
  columns?: Column[];
  rows?: any[];
  onRowClick?: (row: any) => void;
  dense?: boolean;
  /** Node rendered in place of rows when `rows` is empty — pass an EmptyState. */
  empty?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
