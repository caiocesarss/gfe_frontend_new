import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { reduxForm, Field, formValueSelector, formValues, change, FieldArray } from 'redux-form';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import dateFormat from 'dateformat'
import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import { getList, getCustomList} from '../../common/SelectActions';
import {createNewSale, createNewSaleInit} from './SalesOrdersActions';

import DateFieldNative from '../../common/DateFieldNative';

const styles = defaultClass

class SalesForm extends Component {

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.getCustomList('constructions');
        let now = new Date();
        now = dateFormat(now, "yyyy-mm-dd")
        this.props.dispatch(change("SalesForm", "ordered_date", now));
      }
    
    updateCubAmount(cubValue, amount){
       
        const cubStrip = Number(cubValue.replace(/[^\d,-]/g, '')); 
        const cubAmount = amount/cubStrip;
        if (cubAmount) {
        this.props.change('cub_amount', cubAmount);
        }

    }

    createNewSaleInit(data){
        
        this.props.createNewSaleInit(data);
        this.props.createNewSale(data)

    }
    
    render (){
        const { forwardedRef, ...props } = this.props;
        const { classes, amount, handleSubmit } = this.props;
        const selectObras = this.props.list;
      
        const selectItems = selectObras.map(item => {
            return ({name: item.name, id: item.construction_id})
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
        let now = new Date();
        now = dateFormat(now, "yyyy-mm-dd")
  
    return (
        <div className={classes.content} ref={forwardedRef}>
        <PageHeader 
            title="Vendas" 
            subtitle="Cadastro de Vendas"
            linkTo="/"
            buttonType="primary"
             />
        <Grid item xs={12}>
            <form role="form" onSubmit={handleSubmit(data => this.createNewSaleInit(data))} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="construction_id"
                            selectField={{fullWidth:true}}
                            component={InputSelect}
                            selectItems={selectItems}
                            label="Obra"
                            inputProps={{name: 'constructionSelect', id:'selconst'}}
                        /> 
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Field 
                            name="room_number"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Unidade(s)" 
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="amount"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Valor"
                            {...currencyMask}
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="cub_ex_rate"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="CUB utilizado"
                            {...currencyMask}
                            onBlur={data => this.updateCubAmount(data.target.value, amount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="cub_amount"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Valor em CUB"
                            {...currencyMaskDec}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Field 
                            name="ordered_date"
                            label="Data"
                            textField={{fullWidth:true}}
                            component={DateFieldNative}
                        />
                    </Grid>
                    
                    {/*
                    USAR FIELD ARRAY
                    <Grid item xs={12} md={12}>
                        <FieldArray name="accounts" component={AddPartyArray} {...classes} />
                    </Grid>
                    */}
                    
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Field 
                            name="details"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Detalhes" 
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field 
                            name="payment_details"
                            textField={{fullWidth:true}}
                            component={LabelAndInput}
                            label="Detalhes do Pagamento" 
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={2}>
                       
                       <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                      
                   </Grid>
                </Grid>
            </form>
        </Grid>
        <Grid item xs={12}>
            <br />
            
            
        </Grid>
        </div>
    )
    }
}

SalesForm.propTypes = {
    classes: PropTypes.object.isRequired
};

SalesForm = reduxForm({form: 'SalesForm', destroyOnUnmount: false})(SalesForm);
const selector = formValueSelector('SalesForm')

const mapStateToPropos = state => ({
     list: state.selectInputs.list,
     amount: selector(state, 'amount') 
    });
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({
      getList, 
      getCustomList, 
      createNewSale: itm => dispatch(createNewSale(itm, ownProps)), 
      createNewSaleInit,
      change
    }, dispatch);

 SalesForm = connect(mapStateToPropos, mapDispatchToProps)(SalesForm)

//export default withStyles(styles)(SalesForm)
const Comp =  withStyles(styles)(SalesForm)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);