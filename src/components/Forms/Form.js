import React, { useState } from "react";
import Field from "../Controls/Field";
import Card from "../UI/Card/Card";
import { Button, LinearProgress, Alert } from "@mui/material";
import AppModal from '../UI/Modal/AppModal';
import ErrorList from "../Controls/ErrorList";
import { postFormData } from '../../lib/api.js';
import useHttp from "../../hooks/use-http";
import {
  isRequired,
  isReadOnly,
  isDisabled,
  isEnabled,
  fetchErrorList,
} from "./FormValidationHelper";

const Form = (props) => {
  const [fieldList, setFieldList] = useState(props.formData);
  const [errorList, setErrorList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {sendRequest, status, error } = useHttp(postFormData);

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    
    setErrorList([]);
    let errors = [];
    let submitData = new Map();

    fetchErrorList(fieldList, submitData, errors);
    
    if (errors.length > 0) {
      setErrorList((prevErrors) => {
        return [...prevErrors, ...errors];
      });
      setModalIsOpen(true);
    } else {
      console.log(Object.fromEntries(submitData));
      sendRequest(props.postUrl, Object.fromEntries(submitData));
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
        if (field.validations.copyTo) {
          const dependentField = getFieldValue(
            field.validations.copyTo.fieldId
          );
          dependentField.value = field.value;
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
      {error !== null && <Alert severity="error">{error}</Alert>}
      {status === 'completed' && error===null && <Alert severity="success">Data Submitted Successfully!</Alert>}
      {status === 'pending' ? <LinearProgress/> : null}
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
