import React from "react";
import { Switch, Route, Redirect } from 'react-router';

import Home from './containers/Home';
import Construction from "./components/Construction/Construction";
import Party from "./components/Party/Party";
import PartyAccount from "./components/Party/PartyAccount";
import PartyForm from "./components/Form/PartyForm";
import Payables from "./components/Payables/Payables";
import SalesOrders from "./components/Sales/SalesOrders";
import SalesForm from "./components/Sales/SalesForm";
import SalesFormAddParty from "./components/Sales/SalesFormAddParty";
import SalesDetails from "./components/Sales/SalesDetails";


export default props => {
    return (
    
    <Switch>
    <Route
        path="/"
        exact
        component={Home}
    />
    <Route path="/obras" component={Construction} />
    <Route exact path="/clientes" component={Party} />
    <Route path="/contasClientes/:party_id" component={PartyAccount} />
    <Route path="/clientes/detalhes" component={PartyForm} />
    <Route exact path="/payables" component={Payables} />
    <Route exact path="/vendas" component={SalesOrders} />
    <Route  path="/vendas/detalhes" component={SalesForm} />
    <Route  path="/vendas/detalhesvenda/:order_id" component={SalesDetails} />
    <Route  path="/vendas/incluircliente/:order_id" component={SalesFormAddParty} />
    <Route path="*" component={Home} />
    </Switch>
  
)
}

