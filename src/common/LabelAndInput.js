import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
//import TextField from 'redux-form-material-ui';


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
    const [values, setValues] = React.useState({
      fieldvalue: '',
    });
    const classes = useStyles(pWidth);
    const {
      input,
      label,
      meta: { touched, error },
      ...custom
    } = props
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
  
    return(
    <React.Fragment>
    
        <TextField {...props.textField} 
            variant="outlined"
            onChange={handleChange('fieldvalue')}
            label={props.label}
            className={classes.textField}
            placeholder={props.placeholder}
            name={props.name}
            onBlur={props.onBlur}
            type={props.type}
            margin={props.margin || "dense"}
            {...input}
            
             />
        
        </React.Fragment>
      
)
}