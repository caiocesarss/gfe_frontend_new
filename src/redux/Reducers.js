import { combineReducers } from 'redux'
import {reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import ConstructionReducer from '../components/Construction/ConstructionReducer';
import PartyReducer from '../components/Party/PartyReducer';
import PartyAccountReducer from '../components/Party/PartyAccountReducer';
import PayablesReducer from '../components/Payables/PayablesReducer';
import SalesOrdersReducer from '../components/Sales/SalesOrdersReducer';
import SelectReducer from '../common/SelectReducer';
import LocationReducer from '../components/Location/LocationReducer';
import ReceivablesReducer from '../components/Receivables/ReceivablesReducer';

const rootReducer = combineReducers ({
    construction: ConstructionReducer,
    party: PartyReducer,
    partyAccount: PartyAccountReducer,
    payables: PayablesReducer,
    receivables: ReceivablesReducer,
    salesOrders: SalesOrdersReducer,
    selectInputs: SelectReducer,
    form: formReducer,
    location: LocationReducer,
    toastr: toastrReducer
    
})

export default rootReducer