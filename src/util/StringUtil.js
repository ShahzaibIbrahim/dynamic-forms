

export const isValidString = (stringValue) => {
    const isValid = false;
    if(stringValue && stringValue !== 'undefined' && stringValue !== null && stringValue.trim().length > 0) {
        isValid= true;
    }

    return isValid;
}