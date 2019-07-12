import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat'
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { createSelector } from 'reselect';

import {
    setInvoice,
    getParties,
    getPartyAccounts,
    getDocumentTypes,
    getFinGroups,
    getInvoiceById
} from './PayablesActions';
import { getCustomList } from '../../common/SelectActions';
import { defaultPageStyle } from '../../common/Constants';
import PageHeader from '../template/PageHeader';
import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import DateFieldNative from '../../common/DateFieldNative';

const useStyles = defaultPageStyle();



function PayablesForm(props) {
    const { handleSubmit, match: { params } } = props;
    const classes = useStyles();
    let selectPartyAccounts = [];
    const selectParties = useSelector(state => state.payables.APPartyList);
    const selectPartyAccountList = useSelector(state => state.payables.APPartyAccountsList);
    const selectDocumentTypes = useSelector(state => state.payables.APDocumentTypesList);
    const selectFinGroups = useSelector(state => state.payables.APFinGroupsList);
    const selectConstructions = useSelector(state => state.selectInputs.list);
    const invoiceData = useSelector(state => state.payables.InvoiceById);
    const dispatch = useDispatch();
    let now = new Date();
    now = dateFormat(now, "yyyy-mm-dd")

    console.log(params.invoice_id)

    //dispatch(getInvoiceById(params.invoice_id))

   // dispatch(change("payablesForm", "invoice_date", now));
    
    const currencyMask = createNumberMask({
        prefix: 'R$ ',
        decimalPlaces: 2,
        locale: 'pt-BR',
    })

    const paymentMethods = [{ name: "À VISTA", id: "À VISTA" }, { name: "PRAZO", id: "PRAZO" }]

   // if (selectParties.length < 1) {
   //     dispatch(getParties());
   // }
   // if (selectDocumentTypes.length < 1) {
  //      dispatch(getDocumentTypes())
 //   }

   // if (selectFinGroups.length < 1) {
   //     dispatch(getFinGroups());
   // }

   // if (selectConstructions.length < 1) {
  //      dispatch(getCustomList('constructions'))
   // }

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
        return ({name: item.name, id: item.construction_id})
    }) || []

    if (selectPartyAccountList.length < 1) {
        selectPartyAccounts.push([{ name: null, id: null }])
    } else {
        selectPartyAccounts = selectPartyAccountList.map(item => {
            const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
            return ({ name: name, id: item.party_account_id })
        })
    }

    function xgetPartyAccounts(party_id) {
        dispatch(getPartyAccounts({ party_id }))
    }

    return (
        <div className={classes.content}>
            <PageHeader
                title="Contas a Pagar"
                subtitle="Cadastro de Faturas"
            />
            <Grid item xs={12}>
                <form role="form" onSubmit={handleSubmit(async data => {
                    dispatch(await setInvoice(data))
                    //this.props.history.push(`/contasClientes/${result.payload}`);
                })
                }>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={1}>
                            <Field name="invoice_number"
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
                                onChange={(e) => xgetPartyAccounts(e.target.value)}
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
                        <Grid item xs={6} md={5}>
                            <Field name="major_item"
                                textField={{ fullWidth: true }}
                                component={LabelAndInput}
                                label="Iten(s)" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Field name="invoice_details"
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

PayablesForm.propTypes = {
    classes: PropTypes.object.isRequired
};

PayablesForm = reduxForm({ form: 'payablesForm', destroyOnUnmount: false })(PayablesForm);
export default PayablesForm