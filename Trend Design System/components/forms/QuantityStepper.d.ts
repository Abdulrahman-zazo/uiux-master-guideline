export interface QuantityStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (next: number) => void;
  /** sm 32px · md 40px */
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;
