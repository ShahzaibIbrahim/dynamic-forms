import React, { useState } from "react";
import Field from "../Controls/Field";
import Card from "../Controls/Card";
import { Button } from "@mui/material";
import { isRequired, isReadOnly, isDisabled, isEnabled } from "./FormValidationHelper";

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
    for (const field of fieldsList) {
      if (field.validations) {
        if (field.validations.requiredOn) {
          const dependentField = getFieldValue(
            field.validations.requiredOn.fieldId
          );
          field.required = isRequired(
            field.validations.requiredOn,
            dependentField
          );
        }
        if (field.validations.readOnlyOn) {
          const dependentField = getFieldValue(
            field.validations.readOnlyOn.fieldId
          );
          field.readOnly = isReadOnly(
            field.validations.readOnlyOn,
            dependentField
          );
        }
        if (field.validations.disableOn) {
          const dependentField = getFieldValue(
            field.validations.disableOn.fieldId
          );
          field.disabled = isDisabled(
            field.validations.disableOn,
            dependentField
          );
        }
        if (field.validations.enableOn) {
          const dependentField = getFieldValue(
            field.validations.enableOn.fieldId
          );
          field.disabled = !isEnabled(
            field.validations.enableOn,
            dependentField
          );
        }
      }
    }
  };

  const getFieldValue = (fieldId) => {
    const field = fieldList.find((x) => x.id === fieldId);
    return field;
  };

  return (
    <Card>
      <form>
        {fieldList.map((data) => (
          <Field key={data.id} data={data} handleChange={fieldChangeHanlder} />
        ))}
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={submitFormHandler}
            fullWidth
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
