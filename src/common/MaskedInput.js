import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
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

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
       
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

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
    
      

    return(
    <React.Fragment>
        <TextField {...props.textField} 
            className={classes.textField}
            placeholder={props.placeholder}
            label={props.label}
            
            name={props.name}
            type={props.type}
            onChange={handleChange('numberformat')}
            onBlur={props.blur}
            
            id="formatted-numberformat-input"
            InputProps={{
            inputComponent: NumberFormatCustom
            }}
        />

        
        </React.Fragment>
      
)
}