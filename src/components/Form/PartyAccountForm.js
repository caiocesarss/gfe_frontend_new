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

class PartyAccountForm extends Component {
    
    render (){
        const { forwardedRef, ...props } = this.props;
        const { classes } = this.props;
    return (
        <div className={classes.content} ref={forwardedRef}>
        <PageHeader 
            smallTitle="Contas de Cliente" 
            smallSubtitle="Contas e Locais de Clientes"
            linkTo="/"
            buttonType="primary"
             />
        <Grid item xs={12}>
            <form role="form" >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="name"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Nome da Conta"
                        /> 
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="legal_account_name"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Razão Social" 
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="doc1_value"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Número CNPJ"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="doc2_value"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Número"
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

PartyAccountForm.propTypes = {
    classes: PropTypes.object.isRequired
};

PartyAccountForm = reduxForm({form: 'PartyAccountForm', destroyOnUnmount: false})(PartyAccountForm);

  
//export default withStyles(styles)(PartyAccountForm)
const Comp =  withStyles(styles)(PartyAccountForm)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);