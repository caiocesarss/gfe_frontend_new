import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector, change, focus } from 'redux-form';
import Button from '@material-ui/core/Button';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import { setPartyContact, initializeForm, getPartyContactById } from './PartyActions';

import { RedirectPage } from '../../common/Util';
import PhoneInput from '../../common/PhoneInput';
const styles = defaultClass

const selectItems = [
    { name: 'Telefone', id: 'PHONE' },
    { name: 'E-mail', id: 'EMAIL' },
    { name: 'E-mail Cobrança', id: 'BILLING_EMAIL' }
]

class PartyContactsForm extends Component {
    state = {
        fieldName: 'Selecione o tipo do contato'
    }
    componentDidMount() {
        const { match: { params } } = this.props;

        this.props.dispatch(change("partyContactsForm", "party_account_id", params.party_account_id));
        this.props.dispatch(change("partyContactsForm", "party_id", params.party_id));
        this.props.initializeForm();
        if (params.contact_id) {
            this.props.getPartyContactById(params.contact_id);

        }
    }

    setFieldName(value) {
        this.setState({ fieldName: value === 'PHONE' ? 'Número' : 'Endereço de E-mail' })
        const input = document.querySelectorAll('[name="contact_value"]')
        if (input.length > 0) {
            input[0].focus();
        }
    }

    varComponent(type, data) {
        if (data && data.contact_type === 'PHONE') {
            return PhoneInput
        }
        return (type === 'Número' ? PhoneInput : LabelAndInput)
    }


    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, handleSubmit, contactById } = this.props;
        const { match: { params } } = this.props;

        return (
            <div className={classes.content} ref={forwardedRef}>
                <PageHeader
                    title="Contatos"
                    subtitle="Cadastro de Contatos do Cliente"
                />

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        const result = await this.props.setPartyContact(data)
                        RedirectPage(this.props, `/contasPessoa/contatos/${params.party_account_id}`)
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={2}>
                                <Field name="party_account_id"
                                    component="input"
                                    type="hidden"
                                />
                                <Field name="party_id"
                                    component="input"
                                    type="hidden"
                                />
                                <Field name="contact_type"
                                    component={InputSelect}
                                    selectField={{ fullWidth: true }}
                                    label="Tipo"
                                    inputProps={{ name: 'type', id: 'seltype' }}
                                    selectItems={selectItems}
                                    onChange={data => this.setFieldName(data.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Field name="contact_value"
                                    textField={{ fullWidth: true }}
                                    component={this.varComponent(this.state.fieldName, contactById)}
                                    label={this.state.fieldName} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>


            </div>
        )
    }
}

PartyContactsForm.propTypes = {
    classes: PropTypes.object.isRequired
};

PartyContactsForm = reduxForm({ form: 'partyContactsForm', destroyOnUnmount: false })(PartyContactsForm);
const mapStateToPropos = state => ({
    contactById: state.party.contactById
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        setPartyContact,
        change,
        initializeForm,
        focus,
        getPartyContactById
    }, dispatch);

PartyContactsForm = connect(mapStateToPropos, mapDispatchToProps)(PartyContactsForm)

const Comp = withStyles(styles)(PartyContactsForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);