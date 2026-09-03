export interface StockStatusProps {
  level?: 'in' | 'low' | 'out' | 'preorder';
  /** With level="low", prints "Only N left". */
  count?: number;
  style?: React.CSSProperties;
}
export declare function StockStatus(props: StockStatusProps): JSX.Element;
