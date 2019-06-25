import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';

import { reduxForm, Field, formValueSelector } from 'redux-form';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
//import TextField from '@material-ui/core/TextField';

import PageHeader from '../template/PageHeader';
import PartyAccountForm from '../Form/PartyAccountForm';
import LocationForm from './LocationForm';


const styles = defaultClass

const selectItems = [
{key: 1,
    value: 'J',
label: 'J'}
,
{key:2,
    value: 'F',
label: 'F'}
]

class Partyform extends Component {
    
    render (){
        const { classes } = this.props;
    return (
        <div className={classes.content}>
            <PageHeader 
                title="Clientes" 
                subtitle="Cadastro de Clientes"
                linkTo="/clientes/detalhes"
                buttonType="primary"
            />
            <Grid item xs={12}>
                <form role="form">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Field name="name"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Nome" /> 
                    </Grid>

                    <Grid item xs={6}>
                        <Field name="type"
                            component={InputSelect}
                            label="Tipo"
                            inputProps={{name: 'constructionSelect', id:'selconst'}}
                            selectItems={selectItems} /> 
                    </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12}>
                <PartyAccountForm />
            </Grid>
            <Grid item xs={12}>
                <LocationForm />
            </Grid>
        </div>
    )
    }
}

Partyform.propTypes = {
    classes: PropTypes.object.isRequired
};

Partyform = reduxForm({form: 'partyForm', destroyOnUnmount: false})(Partyform);

  
export default withStyles(styles)(Partyform)