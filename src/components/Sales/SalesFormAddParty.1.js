import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { reduxForm, Field, formValueSelector, formValues, change, FieldArray } from 'redux-form';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';

import { getList, getParties, getPartyAccounts} from '../../common/SelectActions';
import { createSaleParty } from './SalesOrdersActions';



const styles = defaultClass

class SalesFormAddParty extends Component {

    componentWillMount() {
   
        this.props.getParties();
      }
    
      getPartyAccounts(party_id){
          this.props.getPartyAccounts(party_id);
      }

      addPartyAccount(index){
          return false;
      }


    render (){
        const { forwardedRef, ...props } = this.props;
        const { classes, amount, handleSubmit } = this.props;
       
        const selectParties = this.props.partyList;
        const selectPartyItems = selectParties.map(item => {
            return ({name: item.name, id: item.party_id})
        }) || [];

        const selectPartyAccounts = this.props.partyAccountList;
        const selectPartyAccountItems = selectPartyAccounts.map(item => {
            const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
            return ({name: name, id: item.party_account_id})
        }) || [];

    return (
        <div className={classes.content} ref={forwardedRef}>
        <Grid container spacing={1}>
            <Grid item xs={10} md={10}>
                <form role="form" onSubmit={handleSubmit(this.props.createSaleParty)} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="party_id"
                            selectField={{fullWidth:true}}
                            component={InputSelect}
                            selectItems={selectPartyItems}
                            label="Ciente"
                            inputProps={{name: 'partySelect', id:'selparty'}}
                            onChange={data => this.getPartyAccounts({party_id: data.target.value})}
                        /> 
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Field 
                            name="party_account_id"
                            selectField={{fullWidth:true}}
                            component={InputSelect}
                            selectItems={selectPartyAccountItems}
                            label="Local Cliente"
                            inputProps={{name: 'partyAccountSelect', id:'selpartyaccount'}}
                            
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
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={2} md={2}>
                <Fab onClick={() => {this.addPartyAccount()}} size="small" color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>&nbsp;
                <Button type="button" variant="contained" className={classes.button}>Enviar</Button>
            </Grid>
        </Grid>
      </div>
    )
    }
}

SalesFormAddParty.propTypes = {
    classes: PropTypes.object.isRequired
};

SalesFormAddParty = reduxForm({form: 'SalesFormAddParty', destroyOnUnmount: false})(SalesFormAddParty);
const selector = formValueSelector('SalesFormAddParty')

const mapStateToPropos = state => ({
     list: state.selectInputs.list,
     partyList: state.selectInputs.partyList,
     partyAccountList: state.selectInputs.partyAccountsList,
     amount: selector(state, 'amount') 
    });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList, getParties, getPartyAccounts , createSaleParty, change}, dispatch);

 SalesFormAddParty = connect(mapStateToPropos, mapDispatchToProps)(SalesFormAddParty)

//export default withStyles(styles)(SalesFormAddParty)
const Comp =  withStyles(styles)(SalesFormAddParty)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);