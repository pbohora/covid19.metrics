export interface Option {
  key: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: Option[];
  defaultOption?: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}
