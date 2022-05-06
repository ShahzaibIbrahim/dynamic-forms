import React from "react";
import { Modal, Fade, Backdrop, Box} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 48,
  pt: 2,
  px: 4,
  pb: 3,
};

const AppModal = (props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={{ ...style }}>{props.children}</Box>
      </Fade>
    </Modal>
  );
};

export default AppModal;
