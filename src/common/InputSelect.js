import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


export default props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    [props.inputProps.name]: '',
    [props.inputProps.id]: '',
  });
  //const [values, setValues] = React.useState({
  //   constructionSelect: '',
  //    nomeObra: '',
  //  });
  

  function handleChange(event) {

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));


  }
  const {
    input,
    label,
    meta: { touched, error, warning },
    ...custom
  } = props;
  const inputLabel = React.useRef(null);
  return (
    <React.Fragment>

      <TextField
        {...props.selectField}
        select
        label={props.label}
        inputProps={props.inputProps}
        className={classes.textField}
        value={values.constructionSelect}
        onChange={handleChange}
        margin={props.margin || "dense"}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
       
        variant="outlined"
        {...input}
        
      >

      
   
        <MenuItem value="">
          <em> </em>
        </MenuItem>
        {props.selectItems.map(item => {
          return (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          )
        })}

      </TextField>
    
    </React.Fragment>
  )
}