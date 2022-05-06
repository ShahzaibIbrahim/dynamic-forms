import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemButton,
  Divider
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AppModal from "../UI/Modal/AppModal";

const ErrorList = (props) => {
  const errorList = props.errorList;

  
  const goToViolation = (ref) => {
    props.handleModalClose();
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <AppModal open={props.modalIsOpen} handleClose={props.handleModalClose}>
      <Typography gutterBottom variant="h5" component="div" >
        <ErrorOutlineIcon fontSize="large"/> {errorList.length} Errors
      </Typography>
      <Divider />
      <List dense={true}>
        {errorList &&
          errorList.map((list) => (
            <div key={list.fieldId}>
              <ListItem sx={{ margin: 0.01 }} onClick={props.handleModalClose}>
                <ListItemButton>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.errorMessage} />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
      </List>
    </AppModal>
  );
};

/* secondaryAction={
     <IconButton edge="end" aria-label="delete">
       <DeleteIcon />
     </IconButton>
   } */

export default ErrorList;
