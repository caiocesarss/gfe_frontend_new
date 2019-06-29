import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, change, registerField } from 'redux-form'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { defaultClass } from '../../common/Constants';
import LabelAndInput from '../../common/LabelAndInput';
import Button from '@material-ui/core/Button';

const styles = defaultClass

class AddFurtherArray extends Component {
  addNew() {
    this.props.fields.push({});
    
  }

  removeOne(index) {
    this.props.fields.remove(index);
  }

    fillCubAmount(amount, cubExRate, inputChange){
        //cubExRate = 1792;
        if (!cubExRate || cubExRate.length < 1) {
        return false;
        }
        const calc = Number(amount.replace(/[^\d,-]/g, ''))/ Number(cubExRate)
        this.props.change("SalesFormAddParty", inputChange, calc.toFixed(4));
    }

    //fillAmountRemaining (furtherAmount, parent){
    //    this.props.change("SalesFormAddParty", `${parent}.amount_remaining`, amount-entryAmount-value);
    //}

  

  render() {
    const { classes, forwardedRef, fields, parent, meta: { error, submitFailed }, ...props } = this.props;
    const saleData = this.props.saleData;

    return (
      <Grid item xs={12} md={12}>
        <br />
        <Button color="default" onClick={() => this.addNew()} size="small"variant="contained" className={classes.button}>
        <AddIcon /> Incluir Reforço Anual
        </Button>
        
       <br /><br />
        {submitFailed && error && <span>{error}</span>}

        {fields.map((member, index) => {
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
                
                <Grid item xs={12} md={11} className={classes.party_title}>
                    <b>Reforço Anual #{index + 1}:</b>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                
                <Grid item xs={12} md={3}>
                  <Field 
                    
                    name={`${member}.further_amount`}
                    textField={{fullWidth:true}}
                    component={LabelAndInput}
                    label="Valor"
                    inputProps={{ name: `${member}.further_amount` }}
                    onBlur={data => {
                                    this.fillCubAmount(data.target.value, saleData.cub_ex_rate, `${member}.further_cub_amount`)
                                    
                                   // this.fillAmountRemaining(data.target.value, parent)
                                    }
                            }
                      {...currencyMask}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Field 
                    textField={{fullWidth:true}}
                    component={LabelAndInput}
                    label="Valor em CUB"
                    name={`${member}.further_cub_amount`}
                  
                    inputProps={{ name: `${member}.further_cub_amount` }}
                    {...currencyMaskDec}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Field 
                    textField={{fullWidth:true}}
                    component={LabelAndInput}
                    label="Mês Vencimento"
                    name={`${member}.due_month`}
                
                    inputProps={{ name: `${member}.further_due_month` }}
                  
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Field 
                    textField={{fullWidth:true}}
                    component={LabelAndInput}
                    label="Dia Vencimento"
                    name={`${member}.due_day`}
                  
                    inputProps={{ name: `${member}.further_due_day` }}
                  
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Fab onClick={() => this.removeOne(index)} size="small" color="secondary" aria-label="Add" >
                      <DeleteIcon />
                    </Fab>
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

AddFurtherArray.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({
  saleData: state.salesOrders.saleData
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({change }, dispatch);

AddFurtherArray = connect(mapStateToPropos, mapDispatchToProps)(AddFurtherArray)
const Comp  =  withStyles(styles)(AddFurtherArray)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);