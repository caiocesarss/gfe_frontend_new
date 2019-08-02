import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector, change } from 'redux-form';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import InputSwitch from '../../common/InputSwitch';
import { setInvoice, getInvoiceById, initializeForm } from './ReceivablesActions';
import DateFieldNative from '../../common/DateFieldNative';

const styles = defaultClass

class ARDetail extends Component {
    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.initializeForm();
        if (params.invoice_id) {
            this.props.getInvoiceById(params.invoice_id);
        }
        this.props.dispatch(change("ARForm", "invoice_id", params.invoice_id));
    }

    render() {
        const { forwardedRef } = this.props;
        const { classes, handleSubmit } = this.props;
        const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 2,
            locale: 'pt-BR',
        })
        const decMask = createNumberMask({

            decimalPlaces: 4,
            locale: 'pt-BR',
        })

        return (
            <div className={classes.content}>
                <PageHeader
                    title="Contas a Receber"
                    subtitle="Registro"

                    buttonType="primary"
                />

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        const result = await this.props.setInvoice(data)
                        this.props.redirectPage(`/contasPessoa/${result.payload}`)
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={1}>
                                <Field name="invoice_id"
                                    component="input"
                                    type="hidden"
                                />
                                <Field name="amount"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Valor"
                                    {...currencyMask}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="reference_amount"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Valor Referência"
                                    {...currencyMask}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="cub_amount"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Valor em CUB"
                                    {...decMask}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="invoice_type"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Tipo"
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field name="invoice_status"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Status" />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="invoice_date"
                                    label="Data"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="due_date"
                                    label="Data Vencto"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field name="parcel_no"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Num Parcela" />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field name="parcel_qt"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Qt Parcelas" />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field name="party_name"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Cliente" />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field name="construction_name"
                                    textField={{ fullWidth: true, disabled: true }}
                                    component={LabelAndInput}
                                    label="Obra" />
                            </Grid>

                            <Grid item xs={6} md={1}>
                                <Field name="payment_status"
                                    type="checkbox"
                                    component={InputSwitch}

                                    label="Pago" />
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

ARDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

ARDetail = reduxForm({ form: 'ARForm', destroyOnUnmount: false })(ARDetail);
const mapStateToPropos = state => ({
    InvoiceById: state.receivables.InvoiceById
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        initializeForm,
        getInvoiceById,
        setInvoice,
        change
    }, dispatch);

ARDetail = connect(mapStateToPropos, mapDispatchToProps)(ARDetail)

const Comp = withStyles(styles)(ARDetail)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);