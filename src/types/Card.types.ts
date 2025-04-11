export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  size?: CardSize;
  title: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
