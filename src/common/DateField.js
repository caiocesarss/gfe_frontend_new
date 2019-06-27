import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
  } from '@material-ui/pickers';
  import Grid from '@material-ui/core/Grid';


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
    const [selectedDate, setSelectedDate] = React.useState(new Date());
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
    function dateHandleDateChange(date) {
        setSelectedDate(date);
      }
  
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
          <DatePicker
          variant="outlined"
            margin="normal"
            id="mui-pickers-date"
            label="Date picker"
            value={selectedDate}
            onChange={dateHandleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        
      </MuiPickersUtilsProvider>
      
)
}