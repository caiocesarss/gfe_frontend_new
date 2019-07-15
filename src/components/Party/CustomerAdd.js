import React from 'react';
import PartyForm from './PartyForm';

export default props => {
    function redirectPage(path){
        props.history.push(path);
    }
    return (
        <PartyForm 
        category="cliente"
        title="Cliente"
        subtitle="Cadastro de Cliente"
        redirectPage = {redirectPage}
         />
    )
}