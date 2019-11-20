import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';


import {
    initializeForm,
    setInvoicePayment,
    getRpaymentsList
} from './ReceivablesActions';
import { defaultClass } from '../../common/Constants';
import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import DateFieldNative from '../../common/DateFieldNative';

const styles = defaultClass

class PaymentForm extends Component {

    componentWillMount() {
        //const { match: { params } } = this.props;
        this.props.initializeForm();
    }

    fillAmountByInterest(interestAmount, baseAmount){
        let penaltyAmountArray = document.getElementsByName('penalty_amount');
        let penaltyAmountValue = Number(penaltyAmountArray[0].value.replace(/[^\d,-]/g, '').replace(',', '.'));
        let interestAmountValue = Number(interestAmount.replace(/[^\d,-]/g, '').replace(',', '.'));
        let calc = Number(baseAmount)+interestAmountValue+penaltyAmountValue;
        this.props.change("amount", calc.toFixed(4));
        
      }

      fillAmountByPenalty(penaltyAmount, baseAmount){
        let interestAmountArray = document.getElementsByName('interest_amount');
        let interestAmountValue = Number(interestAmountArray[0].value.replace(/[^\d,-]/g, '').replace(',', '.'));
        let penaltyAmountValue = Number(penaltyAmount.replace(/[^\d,-]/g, '').replace(',', '.'));
        let calc = Number(baseAmount)+penaltyAmountValue+interestAmountValue;
        this.props.change("amount", calc.toFixed(4));
      }
    

    render() {
        const { classes, handleSubmit, baseAmount, history, invoiceId } = this.props;
        this.props.change('invoice_id', invoiceId)

        const paymentMethods = [{ name: "À VISTA", id: "À VISTA" }, { name: "PRAZO", id: "PRAZO" }]

        const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 2,
            locale: 'pt-BR',
        })


        return (
            <div className={classes.content}>

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        (await this.props.setInvoicePayment(data));
                        this.props.getRpaymentsList(invoiceId)
                        //history.push(`/receivables/registrarpgto/${invoiceId}`);
                    })
                    }>
                        <Grid container spacing={1}
                            alignItems="center"
                            justify="center">
                            <Grid item xs={6} md={2}>
                                <Field name="invoice_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field name="payment_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field
                                    name="payment_date"
                                    label="Data Pgto"
                                    textField={{ fullWidth: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Field
                                    name="payment_method"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    component={LabelAndInput}
                                    label="Forma de Pagamento"
                                    inputProps={{ name: "paymentMethod", id: "paymentMethod" }}
                                />
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Field name="interest_amount"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Juros"
                                    onBlur={data => this.fillAmountByInterest(data.target.value, baseAmount)}
                                    {...currencyMask} />
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Field name="penalty_amount"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Multa"
                                    onBlur={data => this.fillAmountByPenalty(data.target.value, baseAmount)}
                                    {...currencyMask} />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field name="amount"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Valor"
                                    inputProps={{ name: 'amount' }}
                                    {...currencyMask}
                                     />
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>

                        </Grid>

                    </form>
                </Grid>
            </div>
        )
    }
}

PaymentForm = reduxForm({ form: 'paymentForm', destroyOnUnmount: false })(PaymentForm);

const mapStateToPropos = state => ({
    InvoiceById: state.payables.InvoiceById
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setInvoicePayment,
        change,
        initializeForm,
        getRpaymentsList
    }, dispatch);

PaymentForm = connect(mapStateToPropos, mapDispatchToProps)(PaymentForm)

const Comp = withStyles(styles)(PaymentForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);