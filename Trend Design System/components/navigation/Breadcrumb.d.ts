export interface BreadcrumbItem { id?: string; label: string }
export interface BreadcrumbProps {
  items?: Array<string | BreadcrumbItem>;
  onNavigate?: (id: string | undefined, index: number) => void;
  style?: React.CSSProperties;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
