import React from "react";
import { Switch, Route, Redirect } from 'react-router';

import Home from './containers/Home';
import Construction from "./components/Construction/Construction";
import Party from "./components/Party/Party";
import PartyAccount from "./components/Party/PartyAccount";
import PartyForm from "./components/Party/PartyForm";
import Payables from "./components/Payables/Payables";
import SalesOrders from "./components/Sales/SalesOrders";
import SalesForm from "./components/Sales/SalesForm";
import SalesFormAddParty from "./components/Sales/SalesFormAddParty";
import SalesDetails from "./components/Sales/SalesDetails";
import ConstructionForm from "./components/Construction/ConstructionForm";
import PartyAccountPreForm from "./components/Party/PartyAccountPreForm";
import PartyDetail from './components/Party/PartyDetail';
import PayablesForm from './components/Payables/PayablesForm';
import Vendor from './components/Party/Vendor';
import Customer from './components/Party/Customer';
import VendorAdd from './components/Party/VendorAdd';
import CustomerAdd from './components/Party/CustomerAdd';
import VendorDetail from './components/Party/VendorDetail';
import CustomerDetail from './components/Party/CustomerDetail';
import ConstructionDetails from './components/Construction/ConstructionDetails';
import PartyAccountFormDetail from "./components/Party/PartyAccountFormDetail";
import PartyContacts from "./components/Party/PartyContacts";
import PartyContactsForm from "./components/Party/PartyContactsForm";
import Receivables from "./components/Receivables/Receivables";
import ARDetail from "./components/Receivables/ARDetail";
import Cub from "./components/Settings/Cub/Cub";
import SettingsHome from "./components/Settings/SettingsHome";
import CubForm from "./components/Settings/Cub/CubForm";
import User from "./components/Settings/User/User";
import UserForm from "./components/Settings/User/UserForm";
import Rpayments from "./components/Receivables/Rpayments";


export default props => {
    return (
    
    <Switch>
    <Route
        path="/"
        exact
        component={Home}
    />
    <Route exact path="/obras" component={Construction} />
    <Route exact path="/pessoa/cliente" component={Customer} />
    <Route exact path="/pessoa/fornecedor" component={Vendor}/>
    <Route exact path="/pessoa/detalhes/:party_id" component={PartyDetail}/>
    <Route exact path="/clientes/detalhes/:party_id" component={PartyDetail} />
    <Route exact path="/pessoa/cliente/detalhes/:party_id" component={CustomerDetail} />

    <Route exact path="/pessoa/fornecedor/detalhes/:party_id" component={VendorDetail} />
    <Route exact path="/contasPessoa/:party_id" component={PartyAccount} />
    <Route exact path="/contasPessoa/detalhes/:account_id" component={PartyAccountFormDetail} />
    <Route exact path="/contasPessoa/contatos/:party_id/:party_account_id" component={PartyContacts} />
    <Route exact path="/pessoa/cliente/contatos/:party_id" component={PartyContacts} />
    <Route exact path="/pessoa/contatos/form/:party_id/:party_account_id" component={PartyContactsForm} />
    <Route exact path="/contasPessoa/contatos/detalhes/:party_account_id/:contact_id" component={PartyContactsForm} />
    <Route path="/contasClientes/:party_id/detalhes" component={PartyAccountPreForm} />
    <Route path="/pessoa/clientes/incluir" component={CustomerAdd} />
    <Route path="/pessoa/fornecedores/incluir" component={VendorAdd} />
    <Route exact path="/payables" component={Payables} />
    <Route exact path="/payables/detalhes/:invoice_id" component={PayablesForm} />
    <Route exact path="/payables/incluir" component={PayablesForm}/>
    
    <Route exact path="/receivables" component={Receivables} />
    <Route exact path="/receivables/detalhes/:invoice_id" component={ARDetail} />
    <Route exact path="/receivables/pagamentos/:invoice_id" component={ARDetail} />
    <Route exact path="/receivables/registrarpgto/:invoice_id" component={Rpayments} />
    
    <Route exact path="/settings" component={SettingsHome} />
    <Route exact path="/settings/cub" component={Cub} />
    <Route exact path="/settings/cub/detalhes" component={CubForm} />
    <Route exact path="/settings/cub/detalhes/:cub_id" component={CubForm} />
    <Route exact path="/settings/usuario" component={User} />
    <Route exact path="/settings/usuario/detalhes" component={UserForm} />
    <Route exact path="/settings/usuario/detalhes/:user_id" component={UserForm} />

    <Route exact path="/vendas" component={SalesOrders} />
    <Route  path="/vendas/detalhes" component={SalesForm} />
    <Route  exact path="/obras/detalhes" component={ConstructionForm} />
    <Route  exact path="/obras/detalhes/:construction_id" component={ConstructionForm} />
    <Route  path="/obras/detalhes" component={ConstructionDetails} />
    <Route  path="/vendas/detalhesvenda/:order_id" component={SalesDetails} />
    <Route  path="/vendas/incluircliente/:order_id" component={SalesFormAddParty} />
    <Route path="*" component={Home} />
    </Switch>
  
)
}

