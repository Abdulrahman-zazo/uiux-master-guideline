export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Centres a caption in the rule — e.g. "or continue with". */
  label?: string;
  /** Margin on the block axis (or inline axis when vertical). Default 24. */
  spacing?: number;
  style?: React.CSSProperties;
}
export declare function Divider(props: DividerProps): JSX.Element;
