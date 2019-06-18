import { combineReducers } from 'redux'
import {reducer as formReducer } from 'redux-form';
import ConstructionReducer from '../components/Construction/ConstructionReducer';
import PartyReducer from '../components/Party/PartyReducer';
import PartyAccountReducer from '../components/Party/PartyAccountReducer';
import PayablesReducer from '../components/Payables/PayablesReducer';
import SalesOrdersReducer from '../components/Sales/SalesOrdersReducer';
import SelectReducer from '../common/SelectReducer';

const rootReducer = combineReducers ({
    construction: ConstructionReducer,
    party: PartyReducer,
    partyAccount: PartyAccountReducer,
    payables: PayablesReducer,
    salesOrders: SalesOrdersReducer,
    selectInputs: SelectReducer,
    form: formReducer
    
})

export default rootReducer