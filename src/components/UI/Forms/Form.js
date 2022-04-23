import React, { useState } from "react";
import Field from "../Controls/Field";
import Card from "../Controls/Card";
import { Button } from "@mui/material";
import AppModal from '../Modal/AppModal';
import ErrorList from "../Controls/ErrorList";
import {
  isRequired,
  isReadOnly,
  isDisabled,
  isEnabled,
} from "./FormValidationHelper";

const Form = (props) => {
  const [fieldList, setFieldList] = useState(props.formData);
  const [errorList, setErrorList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    // Might Remove Disabled Fields Later
    setErrorList([]);
    let errors = [];

    let submitData = new Map();
    for (const field of fieldList) {
      if ( field.required && (field.value === undefined || field.value === null || field.value === "")) {
        const errorMessage = `${field.label} is required`;
        const newError = {
          fieldId: field.id,
          errorMessage: errorMessage,
        };
        field.error = true;
        field.errorMessage = errorMessage;
        errors.push(newError);
      }
      submitData.set(field.id, field.value ? field.value : "");
    }

    
    if (errors.length > 0) {
      console.log("Errors");
      console.log(errors);
      setErrorList((prevErrors) => {
        return [...prevErrors, ...errors];
      });
      setModalIsOpen(true);
    } else {
      console.log("Submitting Data");
      console.log(Object.fromEntries(submitData));
    }
  };

  const fieldChangeHanlder = (id, value) => {
    const changeFieldIndex = fieldList.findIndex((x) => x.id === id);
    let updatedFieldList = [...fieldList];
    updatedFieldList[changeFieldIndex].value = value;
    updatedFieldList[changeFieldIndex].error = false;

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
      <AppModal open={modalIsOpen} handleClose={handleModalClose}><ErrorList errorList={errorList}/></AppModal>
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
