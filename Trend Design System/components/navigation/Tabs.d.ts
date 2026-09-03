export interface TabItem { id: string; label: string; icon?: string; count?: number }
export interface TabsProps {
  items?: Array<string | TabItem>;
  active?: string;
  onChange?: (id: string) => void;
  /** underline = page-level sections · pill = filter switch inside a card */
  variant?: 'underline' | 'pill';
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
