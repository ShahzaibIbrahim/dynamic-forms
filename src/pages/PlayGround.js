import { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Alert,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import Form from "../components/Forms/Form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDDLInput, getBaseJson, getTextInput } from "./PlayGroundUtils";

const PlayGround = () => {
  const [code, setCode] = useState();
  const [inputJson, setInputJson] = useState(getBaseJson());
  const [error, setError] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);

  const codeChangeHandler = (event) => {
    setError(false);
    setCode(null);
    setInputJson(event.target.value);
  };

  const generateFormHandler = () => {
    try {
      setCode(JSON.parse(inputJson));
    } catch (error) {
      setError(false);
    }
  };

  // Region Helper Methods

  const clearJsonHandler = () => {
    setInputJson(getBaseJson());
  };

  const formatJsonHandler = () => {
    try {
      setInputJson(JSON.stringify(JSON.parse(inputJson), null, "\t"));
    } catch (error) {
      setError(true);
    }
  };

  const ddlInputHandler = () => {
    addFieldHandler(getDDLInput());
  };

  const textInputHandler = () => {
    addFieldHandler(getTextInput());
  };

  const addFieldHandler = (newInputObj) => {
    const formObj = JSON.parse(inputJson);
    const inputCount = formObj.inputs.length + 1;
    newInputObj.id = 'input' + inputCount;
    
    const newInputs = formObj.inputs.concat(newInputObj);
    formObj.inputs = newInputs;

    setInputJson(JSON.stringify(formObj, null, "\t"));
    setCode(formObj);
    handleFieldAddedAlert();
  }


  const handleFieldAddedAlert = () => {
    setCopyAlert(true);

    setTimeout(() => {
      setCopyAlert(false);
    }, 600);
  };

  return (
    <div>
      <Grid container spacing={5} justifyContent="center">
        <Grid item justifyContent="center" xs={6}>
          <Paper>
            {copyAlert && (
              <Alert severity="success" color="info">
                Field Added 
              </Alert>
            )}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Helper Functions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex">
                  <Button p={2} onClick={ddlInputHandler} variant="contained">
                    Add DDL Input
                  </Button>
                  <Button m={5} p={2} onClick={textInputHandler} variant="contained">
                    Add Text Input
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Box p={5}>
              {error && (
                <Alert variant="filled" severity="error">
                  Invalid JSON
                </Alert>
              )}
              <TextField
                id="outlined-multiline-static"
                multiline
                padding={10}
                rows={20}
                fullWidth
                value={inputJson}
                placeholder="Please enter JSON code."
                style={{
                  fontSize: 12,
                  overflow: "scroll",
                  height: "550px",
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
                onChange={codeChangeHandler}
              />
              <Box sx={{ xs: 4 }}>
                <Button p={2} onClick={clearJsonHandler} variant="contained">
                  Clear
                </Button>
                <Button p={5} onClick={formatJsonHandler} variant="contained">
                  Format JSON
                </Button>
              </Box>
            </Box>
            <Box p={2} overflow="clip">
              <Button
                onClick={generateFormHandler}
                fullWidth
                variant="outlined"
              >
                Generate Form
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box height="100vh" p={5} overflow="scroll">
              {!error && code && code.inputs && (
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
