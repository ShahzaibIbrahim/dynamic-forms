

export const isRequired = (requiredOnObject, dependentField) => {
    let isRequired = false;
    if (dependentField.value && requiredOnObject.value) {
      switch (requiredOnObject.operator) {
        case ">":
          isRequired = +dependentField.value > +requiredOnObject.value;
          break;
        case "<":
          isRequired = +dependentField.value < +requiredOnObject.value;
          break;
        default:
          isRequired = requiredOnObject.value === dependentField.value;
      }
    }
    return isRequired;
  };

  
export const isReadOnly = (readOnlyOnObject, dependentField) => {
    let isReadOnly = false;
    if (dependentField.value && readOnlyOnObject.value) {
      switch (readOnlyOnObject.operator) {
        case ">":
          isReadOnly = +dependentField.value > +readOnlyOnObject.value;
          break;
        case "<":
          isReadOnly = +dependentField.value < +readOnlyOnObject.value;
          break;
        default:
          isReadOnly = readOnlyOnObject.value === dependentField.value;
      }
    }

    return isReadOnly;
  };

export const isDisabled = (disableOnObject, dependentField) => {
    let isDisabled = false;
    if (dependentField.value && disableOnObject.value) {
      switch (disableOnObject.operator) {
        case ">":
            isDisabled = +dependentField.value > +disableOnObject.value;
          break;
        case "<":
            isDisabled = +dependentField.value < +disableOnObject.value;
          break;
        default:
            isDisabled = disableOnObject.value === dependentField.value;
      }
    }

    return isDisabled;
  };
  
export const isEnabled = (enableOnObject, dependentField) => {
    let isEnabled = false;
    if (dependentField.value && enableOnObject.value) {
      switch (enableOnObject.operator) {
        case ">":
            isEnabled = +dependentField.value > +enableOnObject.value;
          break;
        case "<":
            isEnabled = +dependentField.value < +enableOnObject.value;
          break;
        default:
            isEnabled = enableOnObject.value === dependentField.value;
      }
    }

    return isEnabled;
  };