
const Field = (props) => {
  //const [fieldValue, setFieldValue] = useState(); // Is this even needed? Will Decide Later
  const { id, label, type, name, handleChange, value} = props;

  console.log("Field Component");
  const fieldChangeHandler = (event) => {
    handleChange(name,event.target.value)
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={fieldChangeHandler}
        value={value || ''}
      />
    </div>
  );
};

export default Field;