import { useState } from "react";
import { Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

const StyledSelect = styled(Select)({
  width: "240px",
  height: "40px",
  borderRadius: "8px",
  backgroundColor: grey[50],
  "& .MuiSelect-icon": {
    color: "#000",
  },
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

export type DropdownProps = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const Dropdown = (props: DropdownProps) => {
  const { options, onChange } = props;
  const [selectedOption, setSelectedOption] = useState<string>("all");

  // Handle change of the selected option
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string; // Assert the type
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <StyledSelect
      id="simple-select"
      value={selectedOption}
      onChange={(event) => handleChange(event)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Typography variant="body1">{option.label}</Typography>
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default Dropdown;
