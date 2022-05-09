import { Grid, Paper, TextField, Button } from "@mui/material";

const PlayGround = () => {
  return (
    <div>
      <Paper  elevation={5} variant="outlined" sx={{ padding: "50px" }}>
        <Grid container spacing={3}>
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            item xs={5}>
            <TextField
              fullWidth
              placeholder="Enter JSON"
              multiline
              rows={20}
              maxRows={1000}
            
            />
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            item
            xs={1}
          >
            <Button>Convert</Button>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PlayGround;
