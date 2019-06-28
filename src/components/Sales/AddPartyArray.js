import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, change, registerField, FieldArray } from 'redux-form'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { defaultClass } from '../../common/Constants';

import InputSelect from '../../common/InputSelect';
import { getParties, getPartyAccounts } from './SalesOrdersActions';
import LabelAndInput from '../../common/LabelAndInput';
import AddFurtherArray from './AddFurtherArray';

const styles = defaultClass

class AddPartyArray extends Component {
  state = {
    selectPartyAccounts: [],
  }

  componentWillMount() {
    this.props.getParties();
    let tempList = this.state.selectPartyAccounts;
    tempList.push([])
    this.setState({ selectPartyAccounts: tempList });
  }

  getPartyAccounts(party_id, index) {
    this.props.getPartyAccounts({ party_id });
    setTimeout(function () {
      const tempList = this.state.selectPartyAccounts.slice();
      const newItem = this.props.salePartyAccountList;
      tempList[index] = newItem;
      this.setState({ selectPartyAccounts: tempList });
    }.bind(this), 1000)
  }

  addNew() {
    this.props.fields.push({});
    let tempList = this.state.selectPartyAccounts;
    tempList.push([])
    this.setState({ selectPartyAccounts: tempList });
  }

  removeOne(index) {
    
    let tempList = this.state.selectPartyAccounts;
    tempList.splice(index, 1);
    this.setState({ selectPartyAccounts: tempList });
    this.props.fields.remove(index);

  }

  fillAmountRemaining(value, cubExRate, entryAmount, amount, inputChange, inputChange2){
    let entryAmountArray = document.getElementsByName(entryAmount)
    let entryAmountValue = Number(entryAmountArray[0].value.replace(/[^\d,-]/g, ''));
    let amountArray = document.getElementsByName(amount)
    let amountValue = Number(amountArray[0].value.replace(/[^\d,-]/g, '')); 
    const calc = amountValue-entryAmountValue-Number(value.replace(/[^\d,-]/g, ''));
    this.props.change("SalesFormAddParty", inputChange, calc.toFixed(4));

    //cubExRate = 1792;
    const cubAmount = Number(value.replace(/[^\d,-]/g, ''))/cubExRate;
    this.props.change("SalesFormAddParty", inputChange2, cubAmount.toFixed(4));
  }

  fillMonthlyAmount(months, cubExRate, amountRemaining, inputChange, inputChange2){
    let amountRemainingArray = document.getElementsByName(amountRemaining)
    let amountRemainingValue = Number(amountRemainingArray[0].value.replace(/[^\d,-]/g, ''));
    if (!cubExRate || cubExRate.length < 1) {
      return false;
    }
    const calc = amountRemainingValue/Number(months);
    const calc2 = calc/cubExRate;
    this.props.change("SalesFormAddParty", inputChange, calc.toFixed(4));
    this.props.change("SalesFormAddParty", inputChange2, calc2.toFixed(4));
  }

  fillMonthlyParcelAmount(qt, cubExRate, monthlyAmount, inputChange, inputChange2){
    let monthlyAmountArray = document.getElementsByName(monthlyAmount)
    let monthlyAmountValue = Number(monthlyAmountArray[0].value.replace(/[^\d,-]/g, ''));
    if (!cubExRate || cubExRate.length < 1) {
      return false;
    }
    const calc = monthlyAmountValue/Number(qt);
    const calc2 = calc/cubExRate;
    this.props.change("SalesFormAddParty", inputChange, calc.toFixed(4));
    this.props.change("SalesFormAddParty", inputChange2, calc2.toFixed(4));
  }

  fillCubAmount(amount, cubExRate, inputChange){
    //cubExRate = 1792;
    if (!cubExRate || cubExRate.length < 1) {
      return false;
    }
    const calc = Number(amount.replace(/[^\d,-]/g, ''))/ Number(cubExRate)
    this.props.change("SalesFormAddParty", inputChange, calc.toFixed(4));
  }

  fillEntryCubAmount(amount, cubExRate, inputChange){
    //cubExRate = 1792;
    if (!cubExRate || cubExRate.length < 1) {
      return false;
    }
    const cubAmount = Number(amount.replace(/[^\d,-]/g, ''))/cubExRate
    this.props.change("SalesFormAddParty", inputChange, cubAmount.toFixed(4));
  }

  render() {
    const { classes, forwardedRef, fields, meta: { error, submitFailed }, ...props } = this.props;
    const { selectPartyAccounts } = this.state;
    const saleData = this.props.saleData;
    

    return (
      <Grid item xs={12} md={12}>
        <br />
        <Fab onClick={() => this.addNew()} size="small" color="primary" aria-label="Add" >
          <AddIcon />
        </Fab>&nbsp;
       <br /><br />
        {submitFailed && error && <span>{error}</span>}

        {fields.map((member, index) => {
          const selectParties = this.props.salePartyList;

          const selectPartyItems = selectParties.map(item => {
            return ({ name: item.name, id: item.party_id })
          }) || [];
          const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 0,
            locale: 'pt-BR',
          })
          const currencyMaskDec = createNumberMask({
            prefix: '',
            decimalPlaces: 4,
            locale: 'pt-BR',
          })

          return (
            <Grid item xs={12} md={12} key={index} className={classes.add_sale_detail}>
              <Grid container spacing={1}>
              <Grid item xs={12} md={12} className={classes.party_title}>
                <b>Cliente #{index + 1}:</b>
              </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Field 
                    component="input"
                    name={`${member}.entry_cub_amount`}
                    type="hidden"
                    inputProps={{ name: `${member}.entry_cub_amount` }}
                  />
                  <Field 
                    component="input"
                    name={`${member}.further_cub_amount`}
                    type="hidden"
                    inputProps={{ name: `${member}.further_cub_amount` }}
                  />
                  <Field
                    name={`${member}.party_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyItems}
                    label="Cliente"
                    inputProps={{ name: `${member}.party_id` }}
                    onChange={(e) => this.getPartyAccounts(e.target.value, index)}
                  />
                </Grid>
                
                <Grid item xs={12} md={2}>
                  <Field
                    name={`${member}.party_account_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyAccounts.length != 0 && selectPartyAccounts[index].map(item => {
                      const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
                      return ({ name: name, id: item.party_account_id })
                    })}
                    label="Local/Conta"
                    inputProps={{ name: `${member}.party_account_id` }}

                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.party_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Valor"
                      inputProps={{ name: `${member}.party_amount` }}
                      onBlur={data => this.fillCubAmount(data.target.value, saleData.cub_ex_rate, `${member}.cub_amount`)}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.cub_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Valor em CUB"
                      inputProps={{ name: `${member}.cub_amount` }}
                      
                      {...currencyMaskDec}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Field 
                      name={`${member}.entry_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      id={`${member}.entry_amount`}
                      label="Valor Entrada"
                      inputProps={{ name: `${member}.entry_amount` }}
                      onBlur={data => this.fillEntryCubAmount(data.target.value, saleData.cub_ex_rate, `${member}.entry_cub_amount`)}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.further_total_amount`}
                      id="t1"
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Total Reforços"
                      inputProps={{ name: `${member}.further_total_amount` }}
                      onBlur={data => this.fillAmountRemaining(data.target.value, saleData.cub_ex_rate, `${member}.entry_amount`, `${member}.party_amount`, `${member}.amount_remaining`, `${member}.further_cub_amount`)}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.amount_remaining`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Valor a Parcelar"
                      inputProps={{ name: `${member}.amount_remaining` }}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.months_qt`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Qt Meses"
                      inputProps={{ name: `${member}.months_qt` }}
                      onBlur={data => this.fillMonthlyAmount(data.target.value, saleData.cub_ex_rate, `${member}.amount_remaining`, `${member}.monthly_amount`, `${member}.monthly_cub_amount`)}
                      
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Valor Mensal"
                      inputProps={{ name: `${member}.monthly_amount` }}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_cub_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Vr Mensal CUB"
                      inputProps={{ name: `${member}.monthly_cub_amount` }}
                      {...currencyMaskDec}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_qt_parcel`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Qt pgtos/mês"
                      inputProps={{ name: `${member}.monthly_qt_parcel` }}
                      onBlur={data => this.fillMonthlyParcelAmount(data.target.value, saleData.cub_ex_rate, `${member}.monthly_amount`, `${member}.monthly_parcel_amount`, `${member}.monthly_parcel_cub_amount`)}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_parcel_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Vr parcela"
                      inputProps={{ name: `${member}.monthly_parcel_amount` }}
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_parcel_cub_amount`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Vr parcela CUB"
                      inputProps={{ name: `${member}.monthly_parcel_cub_amount` }}
                      {...currencyMaskDec}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Field 
                      name={`${member}.monthly_due_days`}
                      textField={{fullWidth:true}}
                      component={LabelAndInput}
                      label="Dia(s) vencto"
                      inputProps={{ name: `${member}.monthly_due_days` }}
                      
                  />
                </Grid>
                </Grid>
                
            </Grid>

          )
        }
        )
        }
      </Grid>
    )

  }
}

AddPartyArray.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({
  saleData: state.salesOrders.saleData,
  salePartyList: state.salesOrders.salePartyList,
  salePartyAccountList: state.salesOrders.salePartyAccountList
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getParties, getPartyAccounts, change }, dispatch);

AddPartyArray = connect(mapStateToPropos, mapDispatchToProps)(AddPartyArray)
const Comp  =  withStyles(styles)(AddPartyArray)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);