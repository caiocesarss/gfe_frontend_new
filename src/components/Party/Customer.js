import React from 'react';
import Party from './Party';

export default props => {
    
    return (
        <Party 
        category="cliente"
        title="Clientes"
        subtitle="Lista de Clientes"
        linkTo="/pessoa/clientes/incluir" />
    )
}