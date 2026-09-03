export interface SidebarItem {
  id?: string;
  label?: string;
  /** Lucide icon name. */
  icon?: string;
  /** Trailing count pill. */
  count?: number;
  /** Set instead of id/label to render an uppercase group heading. */
  section?: string;
}
export interface SidebarNavProps {
  items?: SidebarItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  /** Bottom-pinned slot — account row, theme switch, help link. */
  footer?: React.ReactNode;
  /** 72px icon-only rail. */
  collapsed?: boolean;
  assetBase?: string;
  /** Small uppercase label beside the logo, e.g. "Seller" or "Admin". */
  title?: string;
  style?: React.CSSProperties;
}
export declare function SidebarNav(props: SidebarNavProps): JSX.Element;
