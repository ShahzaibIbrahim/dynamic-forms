import React from "react";
import Field from "../Controls/Field";

const formData = [
  { id: "firstName", label: "First Name", type: "text", name: 'firstName' },
  { id: "lastName", label: "Last Name", type: "text", name: 'lastName' },
];

let fieldData = new Map();

const Form = (props) => {
  const submitFormHandler = (event) => {
    event.preventDefault();

    console.log('Submitting Data');
    // Might Remove Disabled Fields Later
    console.log(Object.fromEntries(fieldData));
  };

  const fieldChangeHanlder = (name, value) => {

    fieldData.set(name, value);
    console.log(fieldData);
  }

  return (
    <form onSubmit={submitFormHandler}>
      {formData.map((data) => (
        <div key={data.key} className="control-group">
          <Field
            key={data.key}
            id={data.id}
            label={data.label}
            type={data.type}
            name={data.name}
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
