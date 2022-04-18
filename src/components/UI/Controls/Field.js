import { useState } from "react";

const Field = (props) => {
  const [fieldValue, setFieldValue] = useState(); // Is this even needed? Will Decide Later
  const { id, label, type, name, handleChange} = props;

  const fieldChangeHandler = (event) => {
    setFieldValue(event.target.value)
    handleChange(name,event.target.value)
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={fieldChangeHandler}
        value={fieldValue}
      />
    </div>
  );
};

export default Field;