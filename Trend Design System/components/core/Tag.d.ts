export interface TagProps {
  children?: React.ReactNode;
  /** Selected tags fill with brand purple. */
  selected?: boolean;
  /** Adds a trailing × affordance. */
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  /** Lucide icon name rendered at 14px before the label. */
  icon?: string;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
