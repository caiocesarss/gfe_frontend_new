import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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
    const [values, setValues] = React.useState({
        numberformat: '',
      });

    const handleChange = name => event => {
        setValues({
          ...values,
          [name]: event.target.value,
        });
      };
    
      const {input} = props;

    return(
    <React.Fragment>
    <MaskedInput {...props.textField} 
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  className={classes.textField}
  placeholder={props.placeholder}
  label={props.label}
  name={props.name}
            type={props.type}
 
  guide={false}
  id="my-input-id"
  onBlur={props.blur}
  onChange={handleChange('numberformat')}
  {...input}
/>
     

        
        </React.Fragment>
      
)
}