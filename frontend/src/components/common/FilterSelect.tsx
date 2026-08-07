import type { FilterSelectProps } from "../../types/commonTypes";

const FilterSelect = ({
  value,
  onChange,
  options,
}: FilterSelectProps) => {
  return (
    <select
      className="form-select"
      style={{ width: "200px" }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;