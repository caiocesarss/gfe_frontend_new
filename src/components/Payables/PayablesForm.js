import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat'
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';


import {
    setInvoice,
    getParties,
    getPartyAccounts,
    getDocumentTypes,
    getFinGroups,
    getInvoiceById,
    initializeForm
} from './PayablesActions';
import { getCustomList } from '../../common/SelectActions';
import { defaultClass } from '../../common/Constants';
import PageHeader from '../template/PageHeader';
import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import DateFieldNative from '../../common/DateFieldNative';
import InputSwitch from '../../common/InputSwitch';

const styles = defaultClass

class PayablesForm extends Component {
    state = {
        isFormInValid: false
    };

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.initializeForm();
        if (params.invoice_id) {
            this.props.getInvoiceById(params.invoice_id);
        }

        this.props.getParties({ is_vendor: 1 });
        this.props.getDocumentTypes();
        this.props.getFinGroups();
        this.props.getCustomList('constructions')
    }

    componentDidMount() {

    }

    togglePaymentStatus(item, checked){
        let paymentDate = document.getElementsByName('payment_date')
        paymentDate = paymentDate[0].value;
        if (checked && !paymentDate){
            this.setState({ isFormInValid: true });
            //this.props.change("payablesForm", 'submit', 'disabled');
        } else {
         
            this.setState({ isFormInValid: false });
        }
    }

    togglePaymentDate(item, value){
        if (value) {
            this.setState({ isFormInValid: false });
        }
    }

    getPartyAccounts(party_id) {
        this.props.getPartyAccounts({ party_id })
    }


    render() {
        const { classes, handleSubmit } = this.props;
        const selectParties = this.props.APPartyList;
        const selectPartyAccountList = this.props.APPartyAccountsList;
        const selectDocumentTypes = this.props.APDocumentTypesList;
        const selectFinGroups = this.props.APFinGroupsList;
        const selectConstructions = this.props.constructionsList;
        const InvoiceById = this.props.InvoiceById;

        const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 2,
            locale: 'pt-BR',
        })

        const paymentMethods = [{ name: "À VISTA", id: "À VISTA" }, { name: "PRAZO", id: "PRAZO" }]

        const selectPartyItems = selectParties.map(item => {
            return ({ name: item.name, id: item.party_id })
        }) || [];

        const selectDocTypesItems = selectDocumentTypes.map(item => {
            return ({ name: item.type_name, id: item.document_type_id })
        }) || [];

        const selectFinGroupsItems = selectFinGroups.map(item => {
            return ({ name: item.name, id: item.group_id }) || []
        })

        const selectConstructionsItems = selectConstructions.map(item => {
            return ({ name: item.name, id: item.construction_id })
        }) || []


        const selectPartyAccounts = selectPartyAccountList.map(item => {
            const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
            return ({ name: name, id: item.party_account_id })
        }) || [];


        return (
            <div className={classes.content}>
                <PageHeader
                    title="Contas a Pagar"
                    subtitle="Cadastro de Faturas"
                />
                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        (await this.props.setInvoice(data))
                        this.props.history.push("/payables");
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={1}>
                                <Field name="invoice_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field name="invoice_number"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Núm. Doc." />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="document_type_id"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectDocTypesItems}
                                    label="Tipo de Documento"
                                    inputProps={{ name: "documentTypeSelect", id: "documentTypeSelect" }}

                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field name="amount"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Valor"
                                    {...currencyMask} />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="invoice_date"
                                    label="Data Emissão"
                                    textField={{ fullWidth: true }}
                                    component={DateFieldNative}

                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="party_id"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectPartyItems}
                                    label="Fornecedor"
                                    inputProps={{ name: "partySelect", id: "partySelect" }}
                                    onChange={(e) => this.getPartyAccounts(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <Field
                                    name="party_account_id"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectPartyAccounts}
                                    label="Local/Conta"
                                    inputProps={{ name: "partyAccountSelect", id: "pselid" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="due_date"
                                    label="Data Vencimento"
                                    textField={{ fullWidth: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="payment_method"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={paymentMethods}
                                    label="Forma de Pagamento"
                                    inputProps={{ name: "paymentMethod", id: "paymentMethod" }}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Field name="payment_details"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Detalhes Pgto." />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Field
                                    name="group_id"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectFinGroupsItems}
                                    label="Grupo de Despesas"
                                    inputProps={{ name: "group", id: "group" }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Field name="major_item"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Iten(s)" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Field name="invoice_details"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Detalhes" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Field
                                    name="construction_id"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectConstructionsItems}
                                    label="Obra"
                                    inputProps={{ name: "construction", id: "construction" }}
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field
                                    name="payment_date"
                                
                                    label="Data Pagamento"
                                    onChange={(item, value) => this.togglePaymentDate(item, value)}
                                    textField={{ fullWidth: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <Field name="payment_status"
                                    type="checkbox"
                                    component={InputSwitch}
                                    onChange={(value, checked) => this.togglePaymentStatus(value, checked)}
                                    label="Pago" />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Button disabled={this.state.isFormInValid} size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
        )
    }
}

PayablesForm = reduxForm({ form: 'payablesForm', destroyOnUnmount: false })(PayablesForm);

const mapStateToPropos = state => ({
    APPartyList: state.payables.APPartyList,
    APPartyAccountsList: state.payables.APPartyAccountsList,
    APDocumentTypesList: state.payables.APDocumentTypesList,
    APFinGroupsList: state.payables.APFinGroupsList,
    constructionsList: state.selectInputs.list,
    InvoiceById: state.payables.InvoiceById
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setInvoice,
        getParties,
        getPartyAccounts,
        getDocumentTypes,
        getFinGroups,
        getInvoiceById,
        getCustomList,
        change,
        initializeForm
    }, dispatch);

PayablesForm = connect(mapStateToPropos, mapDispatchToProps)(PayablesForm)

const Comp = withStyles(styles)(PayablesForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);