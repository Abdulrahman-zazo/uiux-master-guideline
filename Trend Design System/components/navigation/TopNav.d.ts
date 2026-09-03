export interface NavLink { id: string; label: string }
/**
 * @startingPoint section="Navigation" subtitle="Sticky storefront header, dark or light" viewport="1200x160"
 */
export interface TopNavProps {
  links?: Array<string | NavLink>;
  /** id of the current link — gets a 2px underline. */
  active?: string;
  onNavigate?: (id: string) => void;
  cartCount?: number;
  /** Passing a handler renders the bag with its count badge. */
  onCart?: () => void;
  /** Passing a handler renders the inline search field. */
  onSearch?: (value: string) => void;
  search?: string;
  /** "dark" = the near-black bar that frames the light canvas (default). */
  tone?: 'dark' | 'light';
  /** Trailing pill label, e.g. "Sign in". */
  cta?: string;
  onCta?: () => void;
  /** Viewport width (px) below which the link rail collapses into a menu. Default 1024. */
  collapseAt?: number;
  assetBase?: string;
  /** Language pill label — "EN" or "ع". */
  locale?: string;
  onLocale?: () => void;
  /** Extra trailing controls, before the bag. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function TopNav(props: TopNavProps): JSX.Element;
