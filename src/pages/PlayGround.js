import { useState } from "react";
import { Grid, Paper, Box, Button } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Form from "../components/Forms/Form";

const PlayGround = () => {
  const [code, setCode] = useState();
  const [error, setError] = useState(false);
  const [generateForm, setGenerateForm] = useState(false);

  const codeChangeHandler = (event) => {
    try {
      console.log(code);
      setGenerateForm(false);
      setError(false);
      setCode(JSON.parse(event.target.value));
      console.log(JSON.parse(event.target.value));
    } catch (error) {
      setError(true);
    }
  };

  const generateFormHandler = () => {
    if (!error) {
      setGenerateForm(true);
    }
  };

  return (
    <div>
      <Grid container spacing={5} justifyContent="center">
        <Grid item direction="column" justifyContent="center" xs={6}>
          <Paper>
            <Box p={5} overflow="clip">
              <CodeEditor
                value={JSON.stringify(code, null, 2)}
                onChange={codeChangeHandler}
                language="json"
                placeholder="Please enter JSON code."
                padding={15}
                style={{
                  fontSize: 12,
                  overflow: "scroll",
                  height: "550px",
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
              {error && <p>Invalid JSON</p>}
              <Button onClick={generateFormHandler} fullWidth variant="outlined">
                Generate Form
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box height="100vh" p={5} overflow="scroll">
              {generateForm && code && code.inputs && (
                <Form formData={code.inputs} postUrl={code.url} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayGround;
