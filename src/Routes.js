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
    <Route path="/contasClientes/:party_id/detalhes" component={PartyAccountPreForm} />
    <Route path="/pessoa/clientes/incluir" component={CustomerAdd} />
    <Route path="/pessoa/fornecedores/incluir" component={VendorAdd} />
    {/*<Route path="/clientes/incluir" component={PartyForm} /> */}
    <Route exact path="/payables" component={Payables} />
    <Route exact path="/payables/detalhes/:invoice_id" component={PayablesForm} />
    <Route exact path="/payables/incluir" component={PayablesForm} />
    <Route exact path="/vendas" component={SalesOrders} />
    <Route  path="/vendas/detalhes" component={SalesForm} />
    <Route  path="/obras/form" component={ConstructionForm} />
    <Route  path="/vendas/detalhesvenda/:order_id" component={SalesDetails} />
    <Route  path="/vendas/incluircliente/:order_id" component={SalesFormAddParty} />
    <Route path="*" component={Home} />
    </Switch>
  
)
}

