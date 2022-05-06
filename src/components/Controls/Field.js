import { React, useRef } from "react";
import {
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ClearIcon from "@mui/icons-material/Clear";

const Field = (props) => {
  const myRef = useRef();
  const { handleChange, data } = props;
  const {
    id,
    label,
    description,
    ctrlType,
    value,
    required,
    readOnly,
    disabled,
    options,
    error,
    errorMessage,
  } = data;

  const isReadOnly =
    readOnly === null || readOnly === undefined ? false : readOnly;

  const fieldChangeHandler = (event) => {
    handleChange(id, event.target.value);
  };

  const clearHandler = () => {
    handleChange(id, "");
  };

  const getInput = () => {
    if (disabled) {
      return;
    }

    switch (ctrlType) {
      case "TXT":
        return (
          <TextField
            id={id}
            type="text"
            label={label}
            inputRef={myRef}
            error={error}
            helperText={error ? errorMessage : description}
            value={value || ""}
            onChange={fieldChangeHandler}
            fullWidth
            variant="standard"
            required={required}
            InputProps={{
              readOnly: isReadOnly,
              endAdornment:
                value && value.trim().length > 0 ? (
                  <InputAdornment position="end">
                    <IconButton onClick={clearHandler} id="text-clear-btn-id">
                      <ClearIcon id="text-clear-icon-id" />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                ),
            }}
          />
        );
      case "NUM":
        return (
          <TextField
            id={id}
            type="number"
            label={label}
            inputRef={myRef}
            error={error}
            helperText={error ? errorMessage : description}
            value={value || ""}
            onChange={fieldChangeHandler}
            fullWidth
            variant="standard"
            required={required}
            InputProps={{
              readOnly: isReadOnly,
              endAdornment:
                value && value.trim().length > 0 ? (
                  <InputAdornment position="end">
                    <IconButton onClick={clearHandler} id="text-clear-btn-id">
                      <ClearIcon id="text-clear-icon-id" />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                ),
            }}
          />
        );
      case "DAT":
        const inputDate = value ? new Date(value) : "";
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              id={id}
              label={label}
              inputFormat="dd/MM/yyyy"
              value={inputDate}
              readOnly={isReadOnly}
              onChange={(newValue) => {
                handleChange(
                  id,
                  newValue !== "undefined" && newValue !== null
                    ? newValue.getTime()
                    : ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={error}
                  helperText={error ? errorMessage : description}
                  required={required}
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </LocalizationProvider>
        );
      case "CHK":
        return (
          <FormControl
            fullWidth
            component="fieldset"
            variant="standard"
            required={required}
            error={error}
          >
            <FormGroup>
              <FormControlLabel
                label={label}
                control={
                  <Checkbox
                    id={id}
                    onChange={() => {
                      handleChange(id, value ? !value : true);
                    }}
                    value={value || false}
                    checked={value || false}
                    disabled={isReadOnly}
                  />
                }
              />
            </FormGroup>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        );
      case "DDL":
        const currentValue = value
          ? options.find((option) => option.value === value)
          : null;
        return (
          <Autocomplete
            options={options}
            id={id}
            readOnly={isReadOnly}
            clearOnEscape
            getOptionLabel={(option) => option.label}
            value={currentValue}
            onChange={(event, newValue) => {
              handleChange(id, newValue ? newValue.value : "");
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                error={error}
                helperText={error ? errorMessage : description}
                required={required}
                label={label}
                variant="standard"
              />
            )}
          />
        );
      default:
        return <p>Invalid Input Type</p>;
    }
  };

  return <div style={{ marginTop: 20 }}>{getInput()}</div>;
};

export default Field;
