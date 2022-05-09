import { useState } from "react";
import { Grid, Paper, Button } from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Form from "../components/Forms/Form";

const PlayGround = () => {
  const [code, setCode] = useState({ inputs: [{}] });
  const [error, setError] = useState(false);

  const codeChangeHandler = (event) => {
    try {
      console.log(code);
      setError(false);
      setCode(JSON.parse(event.target.value));
      console.log(JSON.parse(event.target.value));
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      <Paper elevation={3} sx={{ padding: "100px" }}>
        <Grid container spacing={3}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            item
            xs={6}
          >
            {error && <p>Invalid JSON</p>}
            <CodeEditor
              value={JSON.stringify(code, null, 2)}
              language="json"
              placeholder="Please enter JSON code."
              onChange={codeChangeHandler}
              padding={15}
              style={{
                fontSize: 12,
                overflow: "auto",
                height: "550px",
                width: "550px",
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {code && code.inputs && (
              <Form formData={code.inputs} postUrl={code.url} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PlayGround;
