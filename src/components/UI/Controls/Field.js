import { TextField } from "@mui/material";

const Field = (props) => {
  const { handleChange, data } = props;
  const { id, label, ctrlType, type, value} = data;

  const fieldChangeHandler = (event) => {
    handleChange(id, event.target.value);
  };

  const getInput = () => {
    switch (ctrlType) {
      case "TXT":
        return (
          <TextField
            id={id}
            type={type}
            label={label}
            value={value || ""}
            onChange={fieldChangeHandler}
            fullWidth
          />
        );
        break;
      default: 
       return;
    }
  };

  return (
    <div style={{marginTop:20}}>
      {getInput()}
    </div>
  );
};

export default Field;
