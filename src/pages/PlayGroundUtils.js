export const getBaseJson = () => {
  return JSON.stringify({
    url: "https://react-learning-a77f0-default-rtdb.firebaseio.com/user.json",
    inputs: [],
  }, null, "\t");
};

export const getDDLInput = () => {
  return {
    id: "yourInputId",
    label: "Your Drop Down List Input",
    ctrlType: "DDL",
    required: true,
    options: [
      {
        label: "Option 1",
        value: "01",
      },
      {
        label: "Option 2",
        value: "02",
      },
    ],
  };
};

export const getTextInput = () => {
  return {
    id: "textBoxId",
    label: "Text Box Input",
    ctrlType: "TXT",
    required: true,
  };
};


export const getDateInput = () => {
  return {
    "id": "dateInputId",
    "label": "Date Input",
    "ctrlType": "DAT",
    "required": true
  };
};

export const getNumberInput = () => {
  return {
    "id": "numberInputId",
    "label": "Number Input",
    "ctrlType": "NUM",
    "maxLength": 2,
  };
};

export const getCheckBoxInput = () => {
  return {
    "id": "checkBoxId",
    "label": "Check Box Input",
    "ctrlType": "CHK",
    "required": true
  };
};

