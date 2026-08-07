import type { SearchInputProps } from "../../types/commonTypes";


const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  return (
    <input
      type="text"
      className="form-control"
      style={{ maxWidth: "300px" }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;