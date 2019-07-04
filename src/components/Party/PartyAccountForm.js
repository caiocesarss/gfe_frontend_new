import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
import If from '../../common/If';

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
        const { classes,  partyType} = this.props;

        const labelDoc1Number = partyType == 'J' ? 'CNPJ' : 'CPF';
        const labelDoc2Number = partyType == 'J' ? 'I.E.' : 'R.G.';

        const header = val => {
            return {
                marginTop: `${val}px`
            }
        } 

    return (
        <div style={header(10)} className={classes.content} ref={forwardedRef}>
        <h4>Conta</h4>
        <Grid item xs={12}>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="account_alias_name"
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
                            label={`Número ${labelDoc1Number}`}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="doc2_value"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label={`Número ${labelDoc2Number}`}
                        />
                    </Grid>
                </Grid>
                
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

const selector = formValueSelector('partyForm')
const mapStateToPropos = state => ({
    partyType: selector(state, 'type')
});


PartyAccountForm = connect(mapStateToPropos, null)(PartyAccountForm)
  
//export default withStyles(styles)(PartyAccountForm)
const Comp =  withStyles(styles)(PartyAccountForm)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);