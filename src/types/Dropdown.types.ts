import { ReactElement } from 'react';

export interface Option {
  key: string;
  label: string;
  value: string;
  icon?: ReactElement;
}

export interface DropdownProps {
  options: Option[];
  defaultOption?: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}
