import React, { useState } from "react";
import Field from "../Controls/Field";
import Card from "../Controls/Card";
import { Button } from "@mui/material";

const formData = [
  { id: "firstName", label: "First Name", ctrlType: "TXT", type: "text" },
  {
    id: "lastName",
    label: "Last Name",
    ctrlType: "TXT",
    type: "text",
    value: "Ibrahim",
  },
  { id: "age", label: "Age", ctrlType: "TXT", type: "number" },
];

const Form = (props) => {
  const [fieldList, setFieldList] = useState(formData);

  console.log("Form");

  const submitFormHandler = (event) => {
    event.preventDefault();

    console.log("Submitting Data");
    // Might Remove Disabled Fields Later

    let submitData = new Map();
    for (const field of fieldList) {
      submitData.set(field.id, field.value ? field.value : "");
    }
    console.log(Object.fromEntries(submitData));
  };

  const fieldChangeHanlder = (id, value) => {
    const changeFieldIndex = fieldList.findIndex((x) => x.id === id);

    let updatedFieldList = [...fieldList];
    updatedFieldList[changeFieldIndex].value = value;

    setFieldList(updatedFieldList);
    console.log(updatedFieldList);
  };

  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        {fieldList.map((data) => (
          <Field key={data.id} data={data} handleChange={fieldChangeHanlder} />
        ))}
        <div style={{ marginTop: 20 }}>
          <Button fullWidth variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
