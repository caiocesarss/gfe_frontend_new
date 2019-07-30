import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import Button from '@material-ui/core/Button';

import LabelAndInput from '../../common/LabelAndInput';
import { initializeForm, getPartyAccountById, setPartyAccount } from './PartyActions';
import LocationForm from '../Location/LocationForm';
import { getCitiesByUF } from '../Location/LocationActions';
import PageHeader from '../template/PageHeader';

const styles = defaultClass

const selectItems = [
    {
        value: 'CPF',
        label: 'CPF'
    }
    ,
    {
        value: 'CNPJ',
        label: 'CNPJ'
    }
]

class PartyAccountForm extends Component {

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.initializeForm(null, "partyAccountsForm");
        if (params.account_id) {
            this.props.getPartyAccountById(params.account_id);

        }
    }

    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, handleSubmit, partyType } = this.props;

        const labelDoc1Number = partyType === 'J' ? 'CNPJ' : 'CPF';
        const labelDoc2Number = partyType === 'J' ? 'I.E.' : 'R.G.';

        const patternMask = partyType === 'J' ? '99.999.999/9999-99' : '999.999.999-99'
        const DocMask = createTextMask({
            pattern: patternMask,
            stripMask: false,
            guide: false
        });

        return (
            <main className={classes.content} ref={forwardedRef}>
                <PageHeader
                    title="Contato"
                    subtitle="Editar Contato"
                    buttonType="primary"
                />
                <h4>Conta</h4>
                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        (await this.props.setPartyAccount(data))
                        this.props.history.push("/pessoa/cliente");
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3}>
                                <Field name="party_account_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field
                                    name="account_alias_name"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Nome da Conta"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Field
                                    name="legal_account_name"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Razão Social"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Field
                                    name="doc1_value"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label={`Número ${labelDoc1Number}`}
                                    {...DocMask}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Field
                                    name="doc2_value"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label={`Número ${labelDoc2Number}`}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <LocationForm />
                            </Grid>


                            <Grid item xs={12} md={12}>
                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </main>
        )
    }
}

PartyAccountForm = reduxForm({ form: 'partyAccountsForm', destroyOnUnmount: false })(PartyAccountForm);


PartyAccountForm.propTypes = {
    classes: PropTypes.object.isRequired
};

const selector = formValueSelector('partyForm')
const mapStateToPropos = state => ({
    partyType: selector(state, 'type')
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getPartyAccountById,
        change,
        initializeForm,
        getCitiesByUF,
        setPartyAccount
    }, dispatch);

PartyAccountForm = connect(mapStateToPropos, mapDispatchToProps)(PartyAccountForm)

const Comp = withStyles(styles)(PartyAccountForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);