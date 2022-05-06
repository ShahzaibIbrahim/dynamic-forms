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
import ScrollIntoView from 'react-scroll-into-view'

const ErrorList = (props) => {
  const errorList = props.errorList;
  
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
              <ScrollIntoView smooth onClick={props.handleModalClose} selector={'#'+ list.fieldId}>
              <ListItem sx={{ margin: 0.01 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.errorMessage} />
                </ListItemButton>
              </ListItem>
              
              </ScrollIntoView>
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
