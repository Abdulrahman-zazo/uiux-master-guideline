export interface BottomNavItem { id: string; label: string; icon: string; count?: number }
export interface BottomNavProps {
  /** 4–5 items. More than 5 breaks the 44px touch target. */
  items?: BottomNavItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function BottomNav(props: BottomNavProps): JSX.Element;
