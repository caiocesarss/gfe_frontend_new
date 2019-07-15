import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

export default props => {
    
    const {input} = props;

    const [state, setState] = React.useState({
        checked : props.checked
    });

    

    const handleChange = event => {
        setState({ ...state, checked: !state.checked });
        
      };
    return (
        <FormGroup aria-label="position" name="position" value={state.checked} onChange={handleChange} row {...input}>
            <FormControlLabel
                control={
                    <Switch color="primary" checked={input.checked} />
                }
                label={props.label}
                labelPlacement="top"
            />
        </FormGroup>
    )
}