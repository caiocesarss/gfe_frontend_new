import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import InputSelect from '../../common/InputSelect';

//import { getParties, getPartyAccounts} from '../../common/SelectActions';
import { getParties, getPartyAccounts } from './SalesOrdersActions';

class AddPartyArray extends Component {

  componentWillMount() {

    //this.props.getParties();
    this.props.getParties();
    this.props.getPartyAccounts()
  }

  // getPartyAccounts(party_id){
  //  this.props.getPartyAccounts(party_id)
  // }

  render() {
    //  const selectPartyItems = [{name: 'caio', id: 1}]


    const { forwardedRef, fields, meta: { error, submitFailed }, ...props } = this.props;
    //const selectParties = [];
    //const selectPartyItems = [];
    //const selectParties = this.props.partyList;
    //      const selectPartyItems = selectParties.map(item => {
    //          return ({name: item.name, id: item.party_id})
    //    }) || [];



    //const selectPartyAccounts = [];
    //const selectPartyAccountItems = [];
    //const selectPartyAccounts = this.props.partyAccountList;
    //const selectPartyAccountItems = selectPartyAccounts.map(item => {
    //   const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
    //   return ({name: name, id: item.party_account_id})
    //}) || [];
    const selectPartyAccounts = [];
    return (
      <Grid item xs={12} md={12}>
        <br />
        <Fab onClick={() => fields.push({})} size="small" color="primary" aria-label="Add" >
          <AddIcon />
        </Fab>&nbsp;
       <br /><br />
        {submitFailed && error && <span>{error}</span>}

        {fields.map((member, index) => {
          const selectParties = this.props.salePartyList;

          const selectPartyItems = selectParties.map(item => {
            return ({ name: item.name, id: item.party_id })
          }) || [];


          selectPartyAccounts[index + 1] = this.props.salePartyAccountList;
          console.log(index);
          console.log(selectPartyAccounts[index + 1]);

          return (
            <Grid item xs={12} md={12} key={index}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <Field
                    name={`${member}.party_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyItems}
                    label={`Cliente #${index + 1}`}
                    inputProps={{ name: `${member}.party_id` }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    name={`${member}.party_account_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyAccounts[index + 1].map(item => {
                      const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
                      return ({ name: name, id: item.party_account_id })
                    })}
                    label={`Local Cliente #${index + 1}`}
                    inputProps={{ name: `${member}.party_account_id` }}

                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Fab onClick={() => fields.remove(index)} size="small" color="secondary" aria-label="Add" >
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
const mapStateToPropos = state => ({
  salePartyList: state.salesOrders.salePartyList,
  salePartyAccountList: state.salesOrders.salePartyAccountList
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getParties, getPartyAccounts }, dispatch);

AddPartyArray = connect(mapStateToPropos, mapDispatchToProps)(AddPartyArray)
export default AddPartyArray
React.forwardRef((props, ref) => <AddPartyArray {...props} forwardedRef={ref} />);