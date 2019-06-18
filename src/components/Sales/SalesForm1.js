import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { reduxForm, Field, formValueSelector, formValues } from 'redux-form';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import { getList, getCustomList} from '../../common/SelectActions';
import MaskedInput from '../../common/MaskedInput';

const styles = defaultClass

class SalesForm extends Component {

    componentWillMount() {
      
        this.props.getCustomList('constructions');
      }
    
    updateCubAmount(data, cubv){
        const value = data.replace(/[^\d,-]/g, ''); 

    }


    render (){
        const { forwardedRef, ...props } = this.props;
        const { classes, cubValue, handleSubmit } = this.props;
        const selectObras = this.props.list;
      
        const selectItems = selectObras.map(item => {
            return ({nomeObra: item.name, idObra: item.construction_id})
        }) || [];
  
    return (
        <div className={classes.content} ref={forwardedRef}>
        <PageHeader 
            title="Vendas" 
            subtitle="Cadastro de Vendas"
            linkTo="/"
            buttonType="primary"
             />
        <Grid item xs={12}>
            <form role="form" onSubmit={handleSubmit} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="construction"
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
                    <Grid item xs={12} md={2}>
                        <Field 
                            name="amount"
                            textField={{fullWidth:true}}
                            component={MaskedInput}
                            label="Valor"
                            blur={data => this.updateCubAmount(data.target.value, cubValue)}
                            
                            
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="cub"
                            textField={{fullWidth:true}}
                            component={MaskedInput}
                            label="CUB utilizado"

                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Field 
                            name="doc2_value"
                            textField={{fullWidth:true}}
                            component={MaskedInput}
                            label="Valor em CUB"
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button type="submit" variant="contained" className={classes.button}>enviar</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        <Grid item xs={12}>
            
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
     cubValue: selector(state, 'room_number') 
    });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList, getCustomList }, dispatch);

 SalesForm = connect(mapStateToPropos, mapDispatchToProps)(SalesForm)

//export default withStyles(styles)(SalesForm)
const Comp =  withStyles(styles)(SalesForm)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);