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
import CubReducer from '../components/Settings/Cub/CubReducer';
import UserReducer from '../components/Settings/User/UserReducer';
import AuthReducer from '../components/Auth/AuthReducer';

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
    toastr: toastrReducer,
    cub: CubReducer,
    user: UserReducer,
    auth: AuthReducer
    
})

export default rootReducer