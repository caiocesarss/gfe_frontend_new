import React from 'react';
import PartyForm from './PartyForm';

export default props => {
    function redirectPage(path){
        
        props.history.push(path);
    }
    
    return (
        <PartyForm 
        category="fornecedor"
        title="Fornecedor"
        subtitle="Cadastro de Fornecedor"
        redirectPage = {redirectPage}
         />
    )
}