import React from 'react';
import Party from './Party';

export default props => {
    
    return (
        <Party 
        category="fornecedor"
        title="Fornecedores"
        subtitle="Lista de Fornecedores"
        linkTo="/pessoa/fornecedores/incluir" />
    )
}