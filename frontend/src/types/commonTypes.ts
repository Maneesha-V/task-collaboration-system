export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type Option = {
  label: string;
  value: string;
};

export type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};