import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import { reduxForm, Field, formValueSelector } from 'redux-form';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
//import TextField from '@material-ui/core/TextField';

import PageHeader from '../template/PageHeader';

const styles = defaultClass

const selectItems = [
{value: 'CPF',
label: 'CPF'}
,
{value: 'CNPJ',
label: 'CNPJ'}
]

class LocationForm extends Component {
    
    render (){
        const { forwardedRef, ...props } = this.props;
        const { classes } = this.props;
    return (
        <div className={classes.content} ref={forwardedRef}>
        <PageHeader 
            smallTitle="Locais" 
            smallSubtitle="Endereço"
            linkTo="/"
            buttonType="primary"
           
             />
        <Grid item xs={12}>
            <form role="form" >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="adress_line"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Rua/Logradouro"
                        /> 
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="number"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Número" 
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Field 
                            name="complement"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Complemento"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Field 
                            name="district"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Bairro"
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="district"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="UF"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="district"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Cidade"
                        />
                    </Grid>
                    
                </Grid>
            </form>
        </Grid>
        <Grid item xs={12}>
            
        </Grid>
        </div>
    )
    }
}

LocationForm.propTypes = {
    classes: PropTypes.object.isRequired
};

LocationForm = reduxForm({form: 'LocationForm', destroyOnUnmount: false})(LocationForm);

  
//export default withStyles(styles)(LocationForm)
const Comp =  withStyles(styles)(LocationForm)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);