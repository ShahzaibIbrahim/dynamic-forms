import React, { useState } from "react";
import Field from "../Controls/Field";

const formData = [
  { id: "firstName", label: "First Name", type: "text"},
  { id: "lastName", label: "Last Name", type: "text", value: "Ibrahim"},
  { id: "age", label: "Age", type: "number"},
];


const Form = (props) => {
  const [fieldList, setFieldList] = useState(formData);

  console.log('Form');

  const submitFormHandler = (event) => {
    event.preventDefault();

    console.log('Submitting Data');
    // Might Remove Disabled Fields Later

    let submitData = new Map();
    for(const field of fieldList) {
        submitData.set(field.id, field.value ? field.value : '');
    }
    console.log(Object.fromEntries(submitData));
  };

  const fieldChangeHanlder = (id, value) => {
    const changeFieldIndex = fieldList.findIndex(x => x.id === id);
    
    let updatedFieldList = [...fieldList];
    updatedFieldList[changeFieldIndex].value = value;

    setFieldList(updatedFieldList);
    console.log(updatedFieldList);
  }

  return (
    <form onSubmit={submitFormHandler}>
      {fieldList.map((data) => (
        <div key={data.id} className="control-group">
          <Field
            key={data.id}
            id={data.id}
            label={data.label}
            type={data.type}
            name={data.id}
            value={data.value}
            handleChange={fieldChangeHanlder}
          />
        </div>
      ))}

      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
