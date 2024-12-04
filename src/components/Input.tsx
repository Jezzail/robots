import { ChangeEvent, useEffect, useState } from "react";
import { TextField } from "@mui/material";

export type InputProps = {
  value: string;
  onChange: (val: string) => void;
};

const Input = (props: InputProps) => {
  const { onChange: onChangeProp } = props;
  const [value, setValue] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeProp(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      label="Search robot or location"
      value={value}
      onChange={handleChange}
      sx={{
        width: "240px",
        "& .MuiInputBase-root": {
          height: "40px",
        },
      }}
    />
  );
};

export default Input;
