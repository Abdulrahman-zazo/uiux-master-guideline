export interface ModalProps {
  open?: boolean;
  title?: string;
  /** Muted supporting line under the title. */
  description?: string;
  children?: React.ReactNode;
  /** Action row, right-aligned above a hairline. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Max width in px. Ignored when `sheet`. */
  width?: number;
  /** Mobile bottom sheet: full width, 28px top corners, grab handle. */
  sheet?: boolean;
  style?: React.CSSProperties;
}
export declare function Modal(props: ModalProps): JSX.Element;
