export type HeaderSize = 'sm' | 'md' | 'lg';

export interface HeaderProps {
  title: string;
  size?: HeaderSize;
  extra?: React.ReactNode;
}
