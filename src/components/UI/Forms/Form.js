import React, { useState } from "react";
import Field from "../Controls/Field";
import Card from "../Controls/Card";
import { Button } from "@mui/material";

const Form = (props) => {
  const [fieldList, setFieldList] = useState(props.formData);

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

    executeValidations(updatedFieldList);

    setFieldList(updatedFieldList);
  };

  const executeValidations = (fieldsList) => {
    for(const field of fieldsList) {
      if(field.validations) {
        if(field.validations.requiredOn) {
          const dependentField = getFieldValue(field.validations.requiredOn.fieldId);
          field.required = isRequired(field.validations.requiredOn, dependentField);
        }
      }
    }
  }

  const isRequired = (requiredOnObject, dependentField) => {
    let isRequired = false;
    if(dependentField.value && requiredOnObject.value) {

      switch (requiredOnObject.operator) {
        case '>': 
          isRequired = +dependentField.value > +requiredOnObject.value;
          break;
        case '<':  
          isRequired = +dependentField.value < +requiredOnObject.value;
          break; 
        default:
          isRequired = requiredOnObject.value === dependentField.value;
      }
    }

    return isRequired;
  }

  const getFieldValue = (fieldId) => {
    const field = fieldList.find((x) => x.id === fieldId);
    return field;
  }

  return (
    <Card>
      <form>
        {fieldList.map((data) => (
          <Field key={data.id} data={data} handleChange={fieldChangeHanlder} />
        ))}
        <div style={{ marginTop: 20 }}>
          <Button onClick={submitFormHandler} fullWidth variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
