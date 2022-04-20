import { useRef } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

const Field = (props) => {
  const inputValue = useRef(null);
  const { handleChange, data } = props;
  const { id, label, description, ctrlType, type, value, required, options } = data;

  const fieldChangeHandler = (event) => {
    handleChange(id, event.target.value);
  };

  const clearHandler = () => {
    handleChange(id, '');
  };

  const getInput = () => {
    switch (ctrlType) {
      case "TXT":
        return (
          <TextField
            id={id}
            type={type}
            label={label}
            inputRef={inputValue}
            helperText={description}
            value={value || ""}
            onChange={fieldChangeHandler}
            fullWidth
            required={required}
          />
        );
      case "DDL":
        return (
          <TextField
            id={id}
            select
            type={type}
            label={label}
            inputRef={inputValue}
            value={value || ""}
            onChange={fieldChangeHandler}
            fullWidth
            required={required}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      default:
        return <p>Invalid Input Type</p>;
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Button onClick={clearHandler}>Clear</Button>
      {getInput()}
    </div>
  );
};

export default Field;
