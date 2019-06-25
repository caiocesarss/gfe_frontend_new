import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector, formValues, registerField, change, FieldArray, Form } from 'redux-form';
import CurrencyFormat from 'react-currency-format';
import TextField from '@material-ui/core/TextField';

import { getList } from '../../common/SelectActions';
import AddPartyArray from './AddPartyArray';
import { createSaleParty } from './SalesOrdersActions';
import { Button } from '@material-ui/core';


const styles = defaultClass



class SalesFormAddParty extends Component {
    componentDidMount(){
        this.props.dispatch(registerField("SalesFormAddParty", "order_id", "Field"));
    }



    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, amount, handleSubmit } = this.props;
        const { match: { params } } = this.props;
        const saleData = this.props.saleData;
        this.props.dispatch(change("SalesFormAddParty", "order_id", params.order_id));
        const curFormat = value => {
            return <CurrencyFormat value={1192929} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
        }

       

        return (
            <div className={classes.content} ref={forwardedRef}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <h1>Venda</h1>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            disabled
                            label="Obra"
                            defaultValue={saleData.construction_name}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <TextField
                            fullWidth
                            disabled
                            label="Unidade"
                            defaultValue={saleData.room_number}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CurrencyFormat 
                            customInput={TextField} 
                            label="Valor" 
                            disabled 
                            value={saleData.amount} 
                            fullWidth 
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={'R$ '}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CurrencyFormat 
                            customInput={TextField} 
                            label="CUB Utilizado" 
                            disabled 
                            value={saleData.cub_ex_rate} 
                            fullWidth 
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={'R$ '}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CurrencyFormat 
                            customInput={TextField} 
                            label="Valor em CUB" 
                            disabled 
                            value={saleData.cub_amount} 
                            fullWidth 
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                        />
                        
                    </Grid>
                    
                    <Grid item xs={12} md={12}>
                        <Form role="form" onSubmit={handleSubmit(this.props.createSaleParty)}>
                            
                            <FieldArray name="accounts" component={AddPartyArray} {...classes} />
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

SalesFormAddParty.propTypes = {
    classes: PropTypes.object.isRequired
};

SalesFormAddParty = reduxForm({ form: 'SalesFormAddParty', destroyOnUnmount: false })(SalesFormAddParty);
const selector = formValueSelector('SalesFormAddParty')

const mapStateToPropos = state => ({
    saleData: state.salesOrders.saleData,
    amount: selector(state, 'amount')
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ getList, change, createSaleParty }, dispatch);

SalesFormAddParty = connect(mapStateToPropos, mapDispatchToProps)(SalesFormAddParty)

//export default withStyles(styles)(SalesFormAddParty)
const Comp = withStyles(styles)(SalesFormAddParty)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);