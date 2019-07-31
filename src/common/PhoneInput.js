import React from 'react';
import MaskedInput from 'react-text-mask'

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

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
    let phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    let pval = props.value.search(/(\([0-9][0-9]\))+( [9]+)+/);
    if (pval > -1) {
        phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={phoneMask}
            placeholderChar={'\u2000'}
            showMask
            keepCharPositions={true}
        />
    );
}

export default props => {
    const pWidth = { pWidth: props.width };
    const { input, label, type, meta: { touched, error, warning }, ...custom } = props;
    const { ...other } = props;
    const [values, setValues] = React.useState({
        fieldvalue: '',
    });
    const classes = useStyles(pWidth);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <>
            <TextField {...props.textField}
                variant="outlined"
                onChange={handleChange('fieldvalue')}
                label={props.label}
                className={classes.textField}
                placeholder={props.placeholder}
                name={props.name}
                autoFocus={true}
                onBlur={props.onBlur}
                type={props.type}
                margin={props.margin || "dense"}

                {...input}
                error={touched && error}
                InputProps={{
                    inputComponent: TextMaskCustom,
                }}
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </>

    )
}