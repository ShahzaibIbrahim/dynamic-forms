

export const isRequired = (requiredOnObject, dependentField) => {
    let isRequired = false;
    if (dependentField.value && requiredOnObject.value) {
        isRequired = resolveExpression(dependentField.value, requiredOnObject.operator, requiredOnObject.value);
    }
    return isRequired;
  };

  
export const isReadOnly = (readOnlyOnObject, dependentField) => {
    let isReadOnly = false;
    if (dependentField.value && readOnlyOnObject.value) {
        isReadOnly = resolveExpression(dependentField.value, readOnlyOnObject.operator, readOnlyOnObject.value);
    }

    return isReadOnly;
  };

export const isDisabled = (disableOnObject, dependentField) => {
    let isDisabled = false;
    if (dependentField.value && disableOnObject.value) {
        isDisabled = resolveExpression(dependentField.value, disableOnObject.operator, disableOnObject.value);
    }

    return isDisabled;
  };
  
export const isEnabled = (enableOnObject, dependentField) => {
    let isEnabled = false;
    if (dependentField.value && enableOnObject.value) {
        isEnabled = resolveExpression(dependentField.value, enableOnObject.operator, enableOnObject.value);
    }

    return isEnabled;
  };

const resolveExpression = (value1, operator, value2) => {
        let condition = false;
        switch (operator) {
            case ">":
                condition = +value1 > +value2;
            break;
            case "<":
                condition = +value1 < +value2;
            break;
            default:
                condition = value1 === value2;
        }  
        return condition;
};