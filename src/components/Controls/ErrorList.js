import { List, ListItem, ListItemText } from "@mui/material";

const ErrorList = (props) => {
  const errorList = props.errorList;
/* 
  const goToViolation = (id) => {
    const violation = document.getElementById(id);
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth",
    });
  }; */

  return (
    <List dense={true}>
      {errorList &&
        errorList.map((list) => (
          <div key={list.fieldId}>
            <ListItem>
              <ListItemText primary={list.errorMessage} />
            </ListItem>
          </div>
        ))}
    </List>
  );
};

/* secondaryAction={
     <IconButton edge="end" aria-label="delete">
       <DeleteIcon />
     </IconButton>
   } */

export default ErrorList;
