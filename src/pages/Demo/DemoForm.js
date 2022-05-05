import Form from "../../components/Forms/Form";
import formData from '../../data/Form.json';

const DemoForm = () => {
  return (
    <div className="container">
      <Form formData={formData.inputs} postUrl={formData.url}/>
    </div>
  );
};

export default DemoForm;