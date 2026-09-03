export interface SectionHeaderProps {
  /** Wide-tracked uppercase marker above the title. */
  eyebrow?: string;
  title: string;
  /** Trailing text link, e.g. "Explore more". */
  action?: string;
  actionHref?: string;
  onAction?: (e: React.MouseEvent) => void;
  /** Passing either handler renders the paired 40px carousel arrows. */
  onPrev?: () => void;
  onNext?: () => void;
  /** sm 24px · md fluid 26–36px · lg fluid 32–48px */
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
