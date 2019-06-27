import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      
      width: props => props.pWidth,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  }));

export default props => {
    const pWidth   = { pWidth: props.width };
    const classes = useStyles(pWidth);
    const {
      input,
      label,
      meta: { touched, error },
      ...custom
    } = props
    
    return(
    <React.Fragment>
    
        <TextField {...props.textField} 
            variant="outlined"
            label={props.label}
            className={classes.textField}
            placeholder={props.placeholder}
            name={props.name}
            onBlur={props.onBlur}
            type="date"
            margin={props.margin || "dense"}
            {...input}
             />
        
        </React.Fragment>
      
)
}